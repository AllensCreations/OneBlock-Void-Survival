import { world, system, ItemStack, DisplaySlotId } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { OVERWORLD_PHASES, NETHER_PHASES, END_PHASES } from "./phases.js";
import { RARITY_TIERS, DIMENSION_TRADE_POOLS } from "./rarities.js";
import { ISLAND_THEMES, getIslandLocation, buildThemedIsland, getIslandBlockPool } from "./islands.js";

// Progressive Phase Length Scaling:
// Early Biomes (Phases 0-4): 50 blocks (fast progression through starter woods/caves)
// Mid Biomes (Phases 5-9): 100 blocks (steady exploration)
// Late & Dimension Biomes (Phases 10+): 150 blocks (deep progression through Trials, Deepslate, End)
function getPhaseLength(phaseIndex) {
  if (phaseIndex <= 4) return 50;
  if (phaseIndex <= 9) return 100;
  return 150;
}

const ONEBLOCK_POS = { x: 0, y: 64, z: 0 };
const CHEST_CHANCE = 0.02; // 2%
const MOB_CHANCE = 0.03;   // 3%

const LUCKY_RUSH_CHANCE = 0.005; // 0.5% (1 in 200 blocks)
const VOID_SURGE_CHANCE = 0.005; // 0.5% (1 in 200 blocks)
const JACKPOT_CHANCE = 0.001;    // 0.1% (1 in 1000 blocks)

const PICKAXE_STATS = {
  "minecraft:wooden_pickaxe": { durability: 59, interval: 40 },
  "minecraft:stone_pickaxe": { durability: 131, interval: 30 },
  "minecraft:iron_pickaxe": { durability: 250, interval: 20 },
  "minecraft:golden_pickaxe": { durability: 32, interval: 10 },
  "minecraft:diamond_pickaxe": { durability: 1561, interval: 12 },
  "minecraft:netherrite_pickaxe": { durability: 2031, interval: 8 },
  "minecraft:netherite_pickaxe": { durability: 2031, interval: 8 }
};

const activeCountdowns = new Map();
const activeLuckyRush = new Map(); // dimensionKey -> secondsLeft

function rollRarityTier() {
  const total = 100.0;
  let rand = Math.random() * total;
  for (let i = 0; i < RARITY_TIERS.length; i++) {
    if (rand < RARITY_TIERS[i].weight) {
      return i;
    }
    rand -= RARITY_TIERS[i].weight;
  }
  return 0;
}

function pickWeighted(items) {
  const total = items.reduce((sum, item) => sum + (item.weight || 1), 0);
  let random = Math.random() * total;
  for (const item of items) {
    if (random < item.weight) return item;
    random -= item.weight;
  }
  return items[0];
}

function getDimKey(dimensionId) {
  if (dimensionId.includes("nether")) return "nether";
  if (dimensionId.includes("the_end") || dimensionId.includes("end")) return "end";
  return "overworld";
}

function getPhasesForDim(dimKey) {
  switch (dimKey) {
    case "nether": return NETHER_PHASES;
    case "end": return END_PHASES;
    default: return OVERWORLD_PHASES;
  }
}

// Computes progressive phase index and progress from block count
function getDimensionState(dimKey) {
  const countProp = `ob_${dimKey}_count`;
  const count = world.getDynamicProperty(countProp) ?? 0;
  const phases = getPhasesForDim(dimKey);

  let accumulated = 0;
  let phaseIndex = 0;
  let progressInPhase = 0;
  let currentPhaseLength = getPhaseLength(0);

  for (let i = 0; i < phases.length; i++) {
    const len = getPhaseLength(i);
    if (accumulated + len > count || i === phases.length - 1) {
      phaseIndex = i;
      progressInPhase = Math.max(0, count - accumulated);
      currentPhaseLength = len;
      break;
    }
    accumulated += len;
  }

  return {
    count,
    phaseIndex,
    phase: phases[phaseIndex],
    progressInPhase,
    currentPhaseLength
  };
}

// Calculates directional arrow and distance from player to target island
function calculateNavIndicator(pPos, pRotation, targetPos) {
  try {
    const dx = targetPos.x - pPos.x;
    const dz = targetPos.z - pPos.z;
    const dist = Math.round(Math.sqrt(dx * dx + dz * dz));

    // Target angle in Minecraft world (-180 to 180 degrees)
    const targetAngle = (Math.atan2(-dx, dz) * 180) / Math.PI;
    const diff = ((targetAngle - pRotation.y + 180) % 360 + 360) % 360 - 180;

    let arrow = "⬆";
    if (Math.abs(diff) <= 22.5) {
      arrow = "⬆";
    } else if (diff > 22.5 && diff < 67.5) {
      arrow = "↗";
    } else if (diff >= 67.5 && diff < 112.5) {
      arrow = "➡";
    } else if (diff >= 112.5 && diff < 157.5) {
      arrow = "↘";
    } else if (Math.abs(diff) >= 157.5) {
      arrow = "⬇";
    } else if (diff <= -22.5 && diff > -67.5) {
      arrow = "↖";
    } else if (diff <= -67.5 && diff > -112.5) {
      arrow = "⬅";
    } else {
      arrow = "↙";
    }

    const deg = ((Math.atan2(dz, dx) * 180) / Math.PI + 360) % 360;
    const directions = ["East", "South-East", "South", "South-West", "West", "North-West", "North", "North-East"];
    const cardinalIdx = Math.round(deg / 45) % 8;
    const cardinal = directions[cardinalIdx];

    return { arrow, dist, cardinal };
  } catch (e) {
    return { arrow: "⬆", dist: 0, cardinal: "North" };
  }
}

// Drops item precisely hovering above OneBlock at (0.5, 65.2, 0.5) with zero velocity
function hoverDropAboveOneBlock(dimension, itemStack) {
  try {
    const itemEntity = dimension.spawnItem(itemStack, { x: 0.5, y: 65.2, z: 0.5 });
    itemEntity.clearVelocity();
  } catch (err) {}
}

// Spawns a real Minecraft Chest block at ONEBLOCK_POS and populates it with items
function spawnOneBlockChest(dimension, items = []) {
  try {
    const block = dimension.getBlock(ONEBLOCK_POS);
    if (block) {
      block.setType("minecraft:chest");
      const chestComp = block.getComponent("minecraft:inventory");
      if (chestComp && chestComp.container) {
        for (const item of items) {
          if (item) {
            chestComp.container.addItem(item);
          }
        }
      }
    }
  } catch (e) {}
}

// Scatters loot across random single-chest slots (0-26) with realistic splitting, like vanilla structure loot chests
function spawnScatteredLootInChest(container, chestItems = []) {
  try {
    if (!container || !chestItems || chestItems.length === 0) return;

    // Available slot indices [0..container.size - 1] (single chest: 0..26)
    const availableSlots = [];
    for (let s = 0; s < container.size; s++) {
      availableSlots.push(s);
    }
    // Fisher-Yates shuffle
    for (let i = availableSlots.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [availableSlots[i], availableSlots[j]] = [availableSlots[j], availableSlots[i]];
    }

    // Deconstruct chest items into smaller stacks if count > 4 for authentic structure chest distribution
    const itemsToPlace = [];
    for (const entry of chestItems) {
      if (!entry) continue;
      if (entry instanceof ItemStack) {
        itemsToPlace.push(entry);
        continue;
      }
      let itemId = typeof entry === "string" ? entry : (entry.id || entry.typeId);
      let count = entry.count || entry.amount || 1;
      if (!itemId) continue;

      if (count > 4 && Math.random() < 0.75) {
        const half = Math.floor(count / 2);
        const rem = count - half;
        try { itemsToPlace.push(new ItemStack(itemId, half)); } catch (e) {}
        try { itemsToPlace.push(new ItemStack(itemId, rem)); } catch (e) {}
      } else {
        try {
          itemsToPlace.push(new ItemStack(itemId, count));
        } catch (e) {}
      }
    }

    // Place into randomized slots
    for (const stack of itemsToPlace) {
      if (availableSlots.length === 0) break;
      const slot = availableSlots.pop();
      try {
        container.setItem(slot, stack);
      } catch (e) {
        try { container.addItem(stack); } catch (e2) {}
      }
    }
  } catch (err) {}
}

// Handles breaking of an Island Mini-OneBlock Core (30-50 blocks capacity)
function handleIslandOneBlockBreak(dimension, loc, player) {
  try {
    let matchedTheme = null;
    for (const theme of ISLAND_THEMES) {
      const completed = world.getDynamicProperty(`island_ob_completed_${theme.id}`);
      if (completed) continue;
      const obX = world.getDynamicProperty(`island_ob_x_${theme.id}`);
      if (obX === undefined) continue;
      const obY = world.getDynamicProperty(`island_ob_y_${theme.id}`);
      const obZ = world.getDynamicProperty(`island_ob_z_${theme.id}`);
      if (loc.x === obX && loc.y === obY && loc.z === obZ) {
        matchedTheme = theme;
        break;
      }
    }
    if (!matchedTheme) return;

    const maxBlocks = world.getDynamicProperty(`island_ob_max_${matchedTheme.id}`) ?? 40;
    const currentMined = (world.getDynamicProperty(`island_ob_mined_${matchedTheme.id}`) ?? 0) + 1;
    world.setDynamicProperty(`island_ob_mined_${matchedTheme.id}`, currentMined);

    const progress = currentMined / maxBlocks;

    // Visual feedback ONLY via particle progression (no action bar counter text)
    if (progress < 0.5) {
      // Early Stage (<50%): Happy villager green sparkles
      dimension.spawnParticle("minecraft:villager_happy", { x: loc.x + 0.5, y: loc.y + 1.2, z: loc.z + 0.5 });
      dimension.playSound("random.orb", loc, { pitch: 1.0, volume: 0.6 });
    } else if (progress < 0.85) {
      // Mid Stage (50-85%): Golden sparks
      dimension.spawnParticle("minecraft:wax_particle", { x: loc.x + 0.5, y: loc.y + 1.2, z: loc.z + 0.5 });
      dimension.playSound("random.orb", loc, { pitch: 1.3, volume: 0.7 });
    } else {
      // Final Stage (>85%): Mystical Purple Amethyst & Void sparkles
      dimension.spawnParticle("minecraft:portal_particle", { x: loc.x + 0.5, y: loc.y + 1.2, z: loc.z + 0.5 });
      dimension.spawnParticle("minecraft:dragon_breath_fire", { x: loc.x + 0.5, y: loc.y + 1.2, z: loc.z + 0.5 });
      dimension.playSound("block.amethyst_block.chime", loc, { pitch: 1.4, volume: 0.9 });
    }

    if (currentMined < maxBlocks) {
      // Respawn next thematic block from the island's unique pool
      const pool = getIslandBlockPool(matchedTheme);
      const nextBlockId = pool[Math.floor(Math.random() * pool.length)];

      system.run(() => {
        try {
          const targetBlock = dimension.getBlock(loc);
          if (targetBlock) {
            targetBlock.setType(nextBlockId);
          }
        } catch (e) {}
      });

      // Keep drops floating safely above altar
      system.runTimeout(() => {
        try {
          const nearbyItems = dimension.getEntities({
            type: "minecraft:item",
            location: { x: loc.x + 0.5, y: loc.y + 0.5, z: loc.z + 0.5 },
            maxDistance: 2.5
          });
          for (const itemEnt of nearbyItems) {
            itemEnt.teleport({ x: loc.x + 0.5, y: loc.y + 1.2, z: loc.z + 0.5 });
            itemEnt.clearVelocity();
          }
        } catch (e) {}
      }, 1);
    } else {
      // Fully mined! Core transforms into the Sacred Island Treasure Chest with scattered loot
      world.setDynamicProperty(`island_ob_completed_${matchedTheme.id}`, true);

      system.run(() => {
        try {
          const targetBlock = dimension.getBlock(loc);
          if (targetBlock) {
            targetBlock.setType("minecraft:chest");
            const chestComp = targetBlock.getComponent("minecraft:inventory");
            if (chestComp && chestComp.container) {
              spawnScatteredLootInChest(chestComp.container, matchedTheme.chest);
            }
          }
        } catch (e) {}
      });

      // Celebration effects: fireworks, totem particles, levelup sound, chat announcement
      try {
        dimension.spawnEntity("minecraft:fireworks_rocket", { x: loc.x + 0.5, y: loc.y + 1.5, z: loc.z + 0.5 });
        dimension.spawnParticle("minecraft:totem_particle", { x: loc.x + 0.5, y: loc.y + 1.0, z: loc.z + 0.5 });
        dimension.playSound("random.levelup", loc, { pitch: 1.2, volume: 1.0 });
        dimension.playSound("random.totem", loc, { pitch: 1.0, volume: 0.8 });
      } catch (e) {}

      for (const p of world.getAllPlayers()) {
        p.sendMessage(`${matchedTheme.color}★ [Island Core Conquered] §fYou have mined all blocks of the §l${matchedTheme.name}§r ${matchedTheme.color}Core! The Sacred Treasure Chest has manifested!`);
      }
    }
  } catch (err) {}
}

function spawnCelebrationFireworks(dimension) {
  try {
    for (let i = 0; i < 5; i++) {
      system.runTimeout(() => {
        try {
          const offsetX = (Math.random() - 0.5) * 4;
          const offsetZ = (Math.random() - 0.5) * 4;
          dimension.spawnEntity("minecraft:fireworks_rocket", {
            x: 0.5 + offsetX,
            y: 66.0,
            z: 0.5 + offsetZ
          });
        } catch (e) {}
      }, i * 15);
    }
  } catch (e) {}
}

// Spawn Phase Climax Mini-Boss strictly in Late-Game (Phase 10+ in Overworld, or Nether/End)
function spawnPhaseMiniBoss(dimKey, dimension, phaseIndex) {
  try {
    // Completely skip mini-bosses for the first 10 phases of Overworld (Phases 0 to 9 are peaceful / exploration focused!)
    if (dimKey === "overworld" && phaseIndex < 10) {
      return;
    }

    let bossType = "minecraft:zombie";
    let bossName = "§c§lZombie King§r";

    if (dimKey === "nether") {
      bossType = "minecraft:wither_skeleton";
      bossName = "§4§lWither Skeleton Warlord§r";
    } else if (dimKey === "end") {
      bossType = "minecraft:enderman";
      bossName = "§5§lVoid Assassin§r";
    } else {
      // Alternate Zombie King, Skeleton Captain, or Breeze in Late Overworld
      if (Math.random() < 0.5) {
        bossType = "minecraft:skeleton";
        bossName = "§c§lSkeleton Captain§r";
      }
    }

    const boss = dimension.spawnEntity(bossType, { x: 0.5, y: 65.0, z: 0.5 });
    boss.nameTag = bossName;
    boss.clearVelocity();

    dimension.spawnParticle("minecraft:huge_explosion_emitter", { x: 0.5, y: 65.0, z: 0.5 });
    dimension.playSound("mob.enderdragon.growl", { x: 0.5, y: 65.0, z: 0.5 }, { volume: 1.0, pitch: 0.8 });

    for (const p of world.getAllPlayers()) {
      p.sendMessage(`§c§l[PHASE CLIMAX] §4A ${bossName} §4burst from the OneBlock! Defeat it!`);
    }
  } catch (err) {}
}

// Start Lucky Rush event (10 seconds)
function triggerLuckyRush(dimKey, dimension) {
  activeLuckyRush.set(dimKey, 10);

  for (const p of world.getAllPlayers()) {
    p.onScreenDisplay.setTitle("§6§l★ LUCKY RUSH! ★", {
      stayDuration: 60,
      fadeInDuration: 5,
      fadeOutDuration: 10,
      subtitle: "§e10s of Golden Mineral Spawns!"
    });
    p.playSound("random.levelup", { pitch: 1.5, volume: 1.0 });
  }

  let timer = 10;
  const loop = system.runInterval(() => {
    timer--;
    activeLuckyRush.set(dimKey, timer);

    try {
      dimension.spawnParticle("minecraft:villager_happy", { x: 0.5, y: 65.5, z: 0.5 });
    } catch (e) {}

    if (timer <= 0) {
      system.clearRun(loop);
      activeLuckyRush.delete(dimKey);
      for (const p of world.getAllPlayers()) {
        p.sendMessage("§6[Lucky Rush] §eThe Lucky Rush event has concluded!");
      }
    }
  }, 20);
}

// Start Void Surge event (10 seconds dark particles + lightning sound + hostile waves)
function triggerVoidSurge(dimKey, dimension) {
  for (const p of world.getAllPlayers()) {
    p.onScreenDisplay.setTitle("§5§l⚡ VOID SURGE! ⚡", {
      stayDuration: 60,
      fadeInDuration: 5,
      fadeOutDuration: 10,
      subtitle: "§cSurvive the dark rift!"
    });
    p.playSound("ambient.weather.thunder", { pitch: 0.9, volume: 1.0 });
  }

  let surgeTimer = 10;
  const surgeLoop = system.runInterval(() => {
    surgeTimer -= 2;

    try {
      dimension.spawnParticle("minecraft:portal_reverse_particle", { x: 0.5, y: 65.5, z: 0.5 });
      dimension.playSound("ambient.weather.lightning.impact", { x: 0.5, y: 65.0, z: 0.5 }, { volume: 0.8, pitch: 1.0 });

      // Spawn surge hostile mob
      const mobPool = dimKey === "nether" ? ["minecraft:piglin_brute", "minecraft:magma_cube"] : ["minecraft:spider", "minecraft:zombie", "minecraft:skeleton"];
      const chosenMob = mobPool[Math.floor(Math.random() * mobPool.length)];
      const mob = dimension.spawnEntity(chosenMob, { x: 0.5, y: 65.0, z: 0.5 });
      mob.clearVelocity();
    } catch (e) {}

    if (surgeTimer <= 0) {
      system.clearRun(surgeLoop);
      for (const p of world.getAllPlayers()) {
        p.sendMessage("§5[Void Surge] §aThe dark rift has sealed! Island is safe again.");
      }
    }
  }, 40);
}

// Trigger Jackpot Geode Chest
function triggerJackpot(dimension) {
  try {
    const jackpotMinerals = ["minecraft:diamond_block", "minecraft:emerald_block", "minecraft:iron_block", "minecraft:gold_block"];
    const count = Math.floor(Math.random() * 3) + 3; // 3 to 5 mineral blocks
    const items = [];
    for (let i = 0; i < count; i++) {
      const mineralId = jackpotMinerals[Math.floor(Math.random() * jackpotMinerals.length)];
      items.push(new ItemStack(mineralId, 1));
    }
    spawnOneBlockChest(dimension, items);
    dimension.spawnParticle("minecraft:totem_particle", { x: 0.5, y: 65.5, z: 0.5 });
    dimension.playSound("ui.toast.challenge_complete", { x: 0.5, y: 65.0, z: 0.5 }, { volume: 1.0, pitch: 1.2 });

    for (const p of world.getAllPlayers()) {
      p.onScreenDisplay.setTitle("§e§lJACKPOT CHEST!§r", {
        stayDuration: 60,
        fadeInDuration: 5,
        fadeOutDuration: 10,
        subtitle: `§aUncovered ${count}x Precious Mineral Blocks in a Chest!`
      });
    }
  } catch (err) {}
}

function startPhaseTransition(dimKey, dimension, newPhaseIdx, isGameComplete) {
  const phases = getPhasesForDim(dimKey);
  const nextPhase = phases[newPhaseIdx];

  activeCountdowns.set(dimKey, true);

  try {
    const ob = dimension.getBlock(ONEBLOCK_POS);
    if (ob) ob.setType("minecraft:bedrock");
  } catch (e) {}

  let secondsLeft = 5;

  const timerId = system.runInterval(() => {
    // Keep bedrock locked firmly at (0,64,0) throughout the entire countdown
    try {
      const ob = dimension.getBlock(ONEBLOCK_POS);
      if (ob && ob.typeId !== "minecraft:bedrock") {
        ob.setType("minecraft:bedrock");
      }
    } catch (be) {}

    if (secondsLeft > 0) {
      for (const p of world.getAllPlayers()) {
        try {
          p.onScreenDisplay.setTitle(`§c§l${secondsLeft}`, {
            stayDuration: 20,
            fadeInDuration: 0,
            fadeOutDuration: 10,
            subtitle: `§ePhase Advancing in...`
          });
          p.playSound("note.pling", { pitch: 1.0 + (5 - secondsLeft) * 0.2, volume: 1.0 });
        } catch (e) {}
      }
      secondsLeft--;
    } else {
      system.clearRun(timerId);
      activeCountdowns.delete(dimKey);

      try {
        const ob = dimension.getBlock(ONEBLOCK_POS);
        if (ob) {
          const chosen = pickWeighted(nextPhase.blocks);
          ob.setType(chosen.id);
        }
      } catch (e) {}

      spawnCelebrationFireworks(dimension);

      if (isGameComplete) {
        for (const p of world.getAllPlayers()) {
          try {
            p.addTag("void_champion");
            p.nameTag = `§6[Void Champion] §f${p.name}`;
            p.onScreenDisplay.setTitle("§6§lCONGRATULATIONS!", {
              stayDuration: 140,
              fadeInDuration: 10,
              fadeOutDuration: 20,
              subtitle: "§a§lPRESTIGE TITLE UNLOCKED: VOID CHAMPION!§r"
            });
            p.sendMessage("\n§6==================================================");
            p.sendMessage("§e★ §6§lCONGRATULATIONS! YOU HAVE CONQUERED ALL PHASES! §e★");
            p.sendMessage("§fThank you so much for playing this map!");
            p.sendMessage("§aYou have earned the permanent prestige title: §6[Void Champion]§a!");
            p.sendMessage("§bCreator: §eAllensCreations");
            p.sendMessage("§aPlease support the game by downloading & rating on §6MCPEDL.COM§a!");
            p.sendMessage("§6==================================================\n");
            p.playSound("ui.toast.challenge_complete", { pitch: 1.0, volume: 1.0 });
          } catch (e) {}
        }
      } else {
        for (const p of world.getAllPlayers()) {
          try {
            p.onScreenDisplay.setTitle(`§a§lPHASE ${newPhaseIdx + 1}!`, {
              stayDuration: 80,
              fadeInDuration: 10,
              fadeOutDuration: 15,
              subtitle: `§6${nextPhase.name}`
            });
            p.sendMessage(`§d§l[OneBlocked] §eCongratulations! Reached §aPhase ${newPhaseIdx + 1}: ${nextPhase.name}§e! §7(by §bAllensCreations§7)`);
            p.playSound("random.levelup", { pitch: 1.0, volume: 1.0 });
          } catch (e) {}
        }
      }
    }
  }, 20);
}

function materializeIsland(dimension, theme, phaseIndex, totalCount) {
  try {
    const lastX = world.getDynamicProperty("last_island_x");
    const lastZ = world.getDynamicProperty("last_island_z");
    const lastPos = (lastX !== undefined && lastZ !== undefined) ? { x: lastX, z: lastZ } : null;

    const islandLoc = getIslandLocation(phaseIndex + Math.floor(totalCount / 100), 42, theme, lastPos);

    // Record this island as the last materialized island
    world.setDynamicProperty("last_island_x", islandLoc.center.x);
    world.setDynamicProperty("last_island_z", islandLoc.center.z);

    // 1. PRELOAD CHUNK: Add ticking area first so the chunk is actively loaded in memory
    const areaName = `isl_${theme.id}`.slice(0, 16);
    try {
      dimension.runCommand(`tickingarea add circle ${islandLoc.center.x} ${islandLoc.center.y} ${islandLoc.center.z} 2 ${areaName}`);
    } catch (tce) {}

    // Store active island target in world dynamic properties for radar navigation
    world.setDynamicProperty(`island_target_x_${theme.id}`, islandLoc.center.x);
    world.setDynamicProperty(`island_target_y_${theme.id}`, islandLoc.center.y);
    world.setDynamicProperty(`island_target_z_${theme.id}`, islandLoc.center.z);

    // 2. Build the themed Skyblock island and award compass
    system.runTimeout(() => {
      try {
        buildThemedIsland(dimension, theme, islandLoc.center);

        // Subtle Ambient Discovery: Audio chime, action bar notification, and chat coordinates (NO full screen title)
        for (const p of world.getAllPlayers()) {
          p.playSound("random.levelup", { pitch: 1.2, volume: 0.8 });
          p.playSound("block.amethyst_block.chime", { pitch: 1.1, volume: 1.0 });

          p.onScreenDisplay.setActionBar(`§e⚡ A secret island (${theme.name}) has materialized! Check your compass!`);

          p.sendMessage(`\n${theme.color}⚡ [Secret Island Materialized] §fThe mysterious §l${theme.name}§r ${theme.color}has appeared in the void!`);
          p.sendMessage(`§eA mystical Compass has been delivered! §6Target Coordinates: §bX: ${islandLoc.center.x} §aY: ${islandLoc.center.y} §bZ: ${islandLoc.center.z}`);
          p.sendMessage(`§7(Coordinates are inscribed directly on the Compass item tooltip / lore!)\n`);

          // Award Mystical Tracking Compass directly into player inventory (or hovering at OneBlock)
          try {
            const compass = new ItemStack("minecraft:compass", 1);

            const tierLabel = theme.tier === 1 ? "Tier 1: Starter" : (theme.tier === 2 ? "Tier 2: Mining" : (theme.tier === 3 ? "Tier 3: Nether/Magic" : "Tier 4: Relic/End"));
            const sizeLabel = theme.size ? (theme.size.charAt(0).toUpperCase() + theme.size.slice(1)) : "Medium";
            const traitLabel = theme.trait ? theme.trait.replace("_", " ").toUpperCase() : "ISLAND";
            compass.nameTag = `${theme.color}§l[${tierLabel}] ${theme.name}§r`;
            compass.setLore([
              `§7Mystical Island Explorer Compass`,
              `§eIsland: §f${theme.name} §7(§6${tierLabel}§7)`,
              `§dScale: §f${sizeLabel} §8| §bTrait: §f${traitLabel}`,
              `§6Coordinates: §bX: ${islandLoc.center.x} §aY: ${islandLoc.center.y} §bZ: ${islandLoc.center.z}`,
              `§7-----------------------`,
              `§aHold in hand for Radar HUD & Light Trail!`,
              `§bRight-Click for Interactive Sonar Ping!`,
              `§eAuto-dissolves when you reach the island!`
            ]);

            const inv = p.getComponent("minecraft:inventory")?.container;
            if (inv && inv.emptySlotsCount > 0) {
              inv.addItem(compass);
            } else {
              hoverDropAboveOneBlock(dimension, compass);
            }
          } catch (ce) {}
        }
      } catch (ie) {}
    }, 10);
  } catch (err) {}
}

function checkRandomIslandSpawn(dimension, phaseIndex, totalCount) {
  try {
    // 1. Determine player's active tier based on phase:
    // Phase 1-4 (idx 0-3): Tier 1
    // Phase 5-8 (idx 4-7): Tier 2
    // Phase 9-12 (idx 8-11): Tier 3
    // Phase 13+ (idx 12+): Tier 4
    const currentTier = phaseIndex < 4 ? 1 : (phaseIndex < 8 ? 2 : (phaseIndex < 12 ? 3 : 4));

    // 2. Track blocks mined since last island spawn:
    const lastMineCount = world.getDynamicProperty("last_island_mine_count") ?? 0;
    const blocksSinceLast = totalCount - lastMineCount;

    // 3. Pity timer (>= 150 blocks) or random chance (~0.8% = 1 in 125 blocks)
    const isPity = blocksSinceLast >= 150;
    const isRandom = Math.random() < 0.008;

    if (!isPity && !isRandom) return;

    // 4. Find all unspawned islands for unlocked tiers (tiers <= currentTier)
    const unspawnedCurrentTier = [];
    const unspawnedEarlierTiers = [];

    for (const t of ISLAND_THEMES) {
      if (t.tier > currentTier) continue; // Locked future tier!
      const isSpawned = world.getDynamicProperty(`island_spawned_${t.id}`);
      if (!isSpawned) {
        if (t.tier === currentTier) {
          unspawnedCurrentTier.push(t);
        } else {
          unspawnedEarlierTiers.push(t);
        }
      }
    }

    if (unspawnedCurrentTier.length === 0 && unspawnedEarlierTiers.length === 0) return;

    // 5. Weighted Tier Selection: 70% current tier, 30% earlier tiers
    let selectedTheme = null;
    const rollTier = Math.random();

    if (unspawnedCurrentTier.length > 0 && (rollTier < 0.70 || unspawnedEarlierTiers.length === 0)) {
      const idx = Math.floor(Math.random() * unspawnedCurrentTier.length);
      selectedTheme = unspawnedCurrentTier[idx];
    } else if (unspawnedEarlierTiers.length > 0) {
      const idx = Math.floor(Math.random() * unspawnedEarlierTiers.length);
      selectedTheme = unspawnedEarlierTiers[idx];
    } else {
      selectedTheme = unspawnedCurrentTier[0];
    }

    if (!selectedTheme) return;

    // Mark spawned and record mine count
    world.setDynamicProperty(`island_spawned_${selectedTheme.id}`, true);
    world.setDynamicProperty("last_island_mine_count", totalCount);

    materializeIsland(dimension, selectedTheme, phaseIndex, totalCount);
  } catch (err) {}
}

function incrementDimensionCount(dimKey, dimension) {
  const countProp = `ob_${dimKey}_count`;
  const prevState = getDimensionState(dimKey);
  const prevCount = prevState.count;
  const newCount = prevCount + 1;
  world.setDynamicProperty(countProp, newCount);

  const newState = getDimensionState(dimKey);
  const phases = getPhasesForDim(dimKey);

  // Random Chance Island Materialization with Pity Timer in Overworld
  if (dimKey === "overworld") {
    checkRandomIslandSpawn(dimension, newState.phaseIndex, newCount);
  }

  // Check if phase climax was just reached
  if (newState.phaseIndex > prevState.phaseIndex) {
    spawnPhaseMiniBoss(dimKey, dimension, newState.phaseIndex);
    const isGameComplete = (dimKey === "end" && newState.phaseIndex === phases.length - 1);
    startPhaseTransition(dimKey, dimension, newState.phaseIndex, isGameComplete);
  }

  // Check global island milestones
  const milestones = [
    { target: 500, title: "500 BLOCKS MINED!" },
    { target: 1000, title: "1,000 BLOCKS MINED!" },
    { target: 2000, title: "2,000 BLOCKS MINED!" },
    { target: 5000, title: "5,000 BLOCKS MINED!" }
  ];
  for (const m of milestones) {
    if (newCount === m.target) {
      for (const p of world.getAllPlayers()) {
        p.onScreenDisplay.setTitle(`§e★ ${m.title} ★`, {
          stayDuration: 80,
          fadeInDuration: 10,
          fadeOutDuration: 10,
          subtitle: `§6Global Island Milestone Reached!`
        });
        p.playSound("ui.toast.challenge_complete", { pitch: 1.0, volume: 1.0 });
      }
      break;
    }
  }

  return { newCount, newPhaseIdx: newState.phaseIndex };
}

// Adjacent cardinal offsets around ONEBLOCK_POS where a pushed block could land
const ADJACENT_PUSH_OFFSETS = [
  { x: 1, y: 0, z: 0 },
  { x: -1, y: 0, z: 0 },
  { x: 0, y: 0, z: 1 },
  { x: 0, y: 0, z: -1 },
  { x: 0, y: 1, z: 0 }
];

const lastKnownOneBlockType = {};
const blockBrokenByPlayer = {};

function ensureOneBlock(dimension) {
  try {
    const dimKey = getDimKey(dimension.id);
    if (activeCountdowns.get(dimKey)) return;

    // 1. Bedrock foundation at (0, 63, 0) directly below the OneBlock:
    // Guarantees gravity blocks (sand, gravel, concrete powder) never fall into the void!
    const bedrockPos = { x: ONEBLOCK_POS.x, y: ONEBLOCK_POS.y - 1, z: ONEBLOCK_POS.z };
    try {
      const bFloor = dimension.getBlock(bedrockPos);
      if (bFloor && bFloor.typeId !== "minecraft:bedrock") {
        bFloor.setType("minecraft:bedrock");
      }
    } catch (bfe) {}

    const block = dimension.getBlock(ONEBLOCK_POS);
    const isLiquid = block && (block.typeId === "minecraft:water" || block.typeId === "minecraft:flowing_water" || block.typeId === "minecraft:lava" || block.typeId === "minecraft:flowing_lava");
    const isMissing = !block || block.isAir || block.typeId === "minecraft:air" || isLiquid;

    // 2. Piston Anti-Duplication Protection:
    // If the OneBlock was displaced without a playerBreakBlock event, it was pushed by a piston!
    if (isMissing && !blockBrokenByPlayer[dimKey] && lastKnownOneBlockType[dimKey]) {
      const pushedType = lastKnownOneBlockType[dimKey];
      for (const offset of ADJACENT_PUSH_OFFSETS) {
        try {
          const adjPos = { x: ONEBLOCK_POS.x + offset.x, y: ONEBLOCK_POS.y + offset.y, z: ONEBLOCK_POS.z + offset.z };
          const adjBlock = dimension.getBlock(adjPos);
          if (adjBlock && (adjBlock.typeId === pushedType || adjBlock.typeId === "minecraft:moving_block")) {
            // Decay displaced block into cobblestone so players cannot duplicate valuable ores/blocks!
            adjBlock.setType("minecraft:cobblestone");
            dimension.playSound("random.fizz", adjPos, { volume: 0.8, pitch: 1.2 });
            dimension.spawnParticle("minecraft:smoke_particle", { x: adjPos.x + 0.5, y: adjPos.y + 0.5, z: adjPos.z + 0.5 });
            for (const p of world.getAllPlayers()) {
              p.sendMessage("§e[OneBlock] Piston movement detected! The pushed block decayed into Cobblestone to prevent duplication.");
            }
            break;
          }
        } catch (pe) {}
      }
    }

    // Reset player break flag
    blockBrokenByPlayer[dimKey] = false;

    // 3. Regenerate OneBlock if missing or flooded with liquid
    if (isMissing) {
      const state = getDimensionState(dimKey);
      let chosenId;
      if (dimKey === "overworld" && state.count < TUTORIAL_BLOCKS.length) {
        chosenId = TUTORIAL_BLOCKS[state.count].block;
      } else {
        chosenId = pickWeighted(state.phase.blocks).id;
      }
      block.setType(chosenId);
      lastKnownOneBlockType[dimKey] = chosenId;
    } else if (block) {
      lastKnownOneBlockType[dimKey] = block.typeId;
    }
  } catch (err) {}
}

let previousScoreboardLines = [];

// Modern RPG Sidebar Scoreboard following the Player's Username & Live Stats
function updateScoreboard() {
  try {
    const players = world.getAllPlayers();
    const primaryPlayer = players.length > 0 ? players[0] : null;
    const playerName = primaryPlayer ? primaryPlayer.name : "Survivor";

    const owState = getDimensionState("overworld");
    const netherState = getDimensionState("nether");
    const endState = getDimensionState("end");
    const totalMined = owState.count + netherState.count + endState.count;

    let currentDimKey = "overworld";
    if (primaryPlayer) {
      currentDimKey = getDimKey(primaryPlayer.dimension.id);
    }
    const activeState = getDimensionState(currentDimKey);
    const activePhase = activeState.phase;
    const phaseName = activePhase?.name || `Phase ${activeState.phaseIndex + 1}`;

    // Blocks mined towards next island pity guarantee (150 blocks)
    const lastMineCount = world.getDynamicProperty("last_island_mine_count") ?? 0;
    const pityMined = Math.min(150, Math.max(0, owState.count - lastMineCount));

    // Modern RPG Scoreboard Layout (Player-following):
    const lines = [
      "§7-----------------",
      `§fPlayer: §a${playerName}`,
      `§ePhase: §f${phaseName}`,
      `§7Progress: §b${activeState.phaseProgress}§7/§b${activeState.currentPhaseLength}`,
      `§6Total Mined: §e${totalMined}`,
      `§dNext Island: §e${pityMined}/150 §7(0.8%)`,
      "§7------------------"
    ];

    const title = "§l§dOne§5Blocked §r§8[§bAllensCreations§8]";

    let success = false;
    try {
      let objective = world.scoreboard.getObjective("oneblock_stats");
      if (!objective) {
        objective = world.scoreboard.addObjective("oneblock_stats", title);
      } else {
        objective.displayName = title;
      }

      // DisplaySlotId check: supports string "sidebar" and DisplaySlotId enum
      const slot = (typeof DisplaySlotId !== "undefined" && DisplaySlotId.sidebar) ? DisplaySlotId.sidebar : "sidebar";
      world.scoreboard.setObjectiveAtDisplaySlot(slot, { objective: objective });

      // Clean up previous lines that are no longer present
      try {
        const participants = objective.getParticipants();
        for (const p of participants) {
          const idName = (typeof p === "string") ? p : (p.displayName || p.id);
          if (idName && !lines.includes(idName)) {
            objective.removeParticipant(p);
          }
        }
      } catch (pe) {}

      let scoreVal = lines.length;
      for (const line of lines) {
        objective.setScore(line, scoreVal--);
      }
      success = true;
    } catch (apiErr) {
      success = false;
    }

    // Command fallback (Rock-solid across all Bedrock engine versions)
    if (!success) {
      const ow = world.getDimension("overworld");
      if (ow) {
        try { ow.runCommand(`scoreboard objectives add oneblock_stats dummy "${title}"`); } catch (e) {}
        try { ow.runCommand(`scoreboard objectives setdisplay sidebar oneblock_stats`); } catch (e) {}

        // Remove old lines that changed to prevent ghost entries and avoid flickering
        for (const oldLine of previousScoreboardLines) {
          if (!lines.includes(oldLine)) {
            try { ow.runCommand(`scoreboard players reset "${oldLine}" oneblock_stats`); } catch (e) {}
          }
        }

        let scoreVal = lines.length;
        for (const line of lines) {
          try {
            ow.runCommand(`scoreboard players set "${line}" oneblock_stats ${scoreVal--}`);
          } catch (e) {}
        }
      }
    }

    previousScoreboardLines = [...lines];
  } catch (err) {}
}

// 8 perimeter positions around (0, 64, 0)
const SURROUNDING_OFFSETS = [
  { x: -1, z: -1 }, { x: 0, z: -1 }, { x: 1, z: -1 },
  { x: -1, z: 0 },                    { x: 1, z: 0 },
  { x: -1, z: 1 },  { x: 0, z: 1 },  { x: 1, z: 1 }
];

// 15 Total Curated Tutorial Blocks that perfectly build up the player's starter setup:
// Steps 0-7: 8 Dirts (each auto-places at one side to build safe 3x3 platform)
// Steps 8-10: 3 Oak Logs (1 for Crafting Table, 1 for Sticks, 1 for Pickaxe)
// Steps 11-13: 3 Stones (mine Cobblestone for a Stone Pickaxe)
// Step 14: 1 Coal Ore (for torches & smelting)
const TUTORIAL_BLOCKS = [
  { block: "minecraft:dirt", msg: "§6[Step 1/15] §eMining Dirt... §aAuto-placed 1/8 of safe platform!" },
  { block: "minecraft:dirt", msg: "§6[Step 2/15] §eMining Dirt... §aAuto-placed 2/8 of safe platform!" },
  { block: "minecraft:dirt", msg: "§6[Step 3/15] §eMining Dirt... §aAuto-placed 3/8 of safe platform!" },
  { block: "minecraft:dirt", msg: "§6[Step 4/15] §eMining Dirt... §aAuto-placed 4/8 of safe platform!" },
  { block: "minecraft:dirt", msg: "§6[Step 5/15] §eMining Dirt... §aAuto-placed 5/8 of safe platform!" },
  { block: "minecraft:dirt", msg: "§6[Step 6/15] §eMining Dirt... §aAuto-placed 6/8 of safe platform!" },
  { block: "minecraft:dirt", msg: "§6[Step 7/15] §eMining Dirt... §aAuto-placed 7/8 of safe platform!" },
  { block: "minecraft:dirt", msg: "§6[Step 8/15] §aPlatform complete! Safe 3x3 foundation built!" },
  { block: "minecraft:oak_log", msg: "§6[Step 9/15] §eWood #1! Use for a Crafting Table." },
  { block: "minecraft:oak_log", msg: "§6[Step 10/15] §eWood #2! Use for crafting Sticks." },
  { block: "minecraft:oak_log", msg: "§6[Step 11/15] §eWood #3! Craft a Wooden Pickaxe!" },
  { block: "minecraft:stone", msg: "§6[Step 12/15] §eStone #1! Mine with pickaxe for Cobblestone." },
  { block: "minecraft:stone", msg: "§6[Step 13/15] §eStone #2! Keep gathering Cobblestone." },
  { block: "minecraft:stone", msg: "§6[Step 14/15] §eStone #3! Craft a sturdy Stone Pickaxe!" },
  { block: "minecraft:coal_ore", msg: "§a§l[Tutorial Complete!] §eCoal for torches! Phase 1 begins!" }
];

// -------------------------------------------------------------
// Dimension Shifter Engine
// -------------------------------------------------------------
const dimensionShifterState = {
  overworld: { nextVisitIn: getRandomInterval(), isPresent: false, secondsLeft: 0, trades: [] },
  nether: { nextVisitIn: getRandomInterval(), isPresent: false, secondsLeft: 0, trades: [] },
  end: { nextVisitIn: getRandomInterval(), isPresent: false, secondsLeft: 0, trades: [] }
};

function getRandomInterval() {
  return Math.floor(Math.random() * (1200 - 480 + 1)) + 480;
}

function generateRandomTrades(dimKey) {
  const pool = DIMENSION_TRADE_POOLS[dimKey] || DIMENSION_TRADE_POOLS.overworld;
  const trades = [];
  let hasMythicOrFabled = false;

  for (let slot = 0; slot < 5; slot++) {
    const tierIdx = rollRarityTier();
    const tier = RARITY_TIERS[tierIdx];
    const itemData = pool[tierIdx];

    const cost = Math.floor(Math.random() * (tier.costMax - tier.costMin + 1)) + tier.costMin;
    const stock = tierIdx >= 16 ? 1 : Math.floor(Math.random() * 2) + 2;

    if (tierIdx >= 18) {
      hasMythicOrFabled = true;
    }

    trades.push({
      tierIdx,
      tierName: tier.name,
      tierColor: tier.color,
      currency: tier.currency,
      cost,
      itemId: itemData.id,
      itemCount: itemData.count,
      stock
    });
  }

  return { trades, hasMythicOrFabled };
}

function tickDimensionShifters() {
  const dims = [
    { key: "overworld", dim: world.getDimension("overworld") },
    { key: "nether", dim: world.getDimension("nether") },
    { key: "end", dim: world.getDimension("the_end") }
  ];

  for (const { key, dim } of dims) {
    const state = dimensionShifterState[key];

    if (!state.isPresent) {
      state.nextVisitIn--;
      if (state.nextVisitIn <= 0) {
        state.isPresent = true;
        state.secondsLeft = 180;

        const { trades, hasMythicOrFabled } = generateRandomTrades(key);
        state.trades = trades;

        try {
          const stallMaterial = key === "nether" ? "minecraft:nether_brick" : key === "end" ? "minecraft:end_stone_bricks" : "minecraft:oak_planks";
          for (let x = 2; x <= 4; x++) {
            for (let z = -1; z <= 1; z++) {
              const b = dim.getBlock({ x, y: 63, z });
              if (b && b.isAir) b.setType(stallMaterial);
            }
          }

          const entity = dim.spawnEntity("minecraft:wandering_trader", { x: 3.5, y: 64.0, z: 0.5 });
          entity.addTag("dimension_shifter");
          entity.addTag(`shifter_${key}`);
          entity.nameTag = `§d✦ Dimension Shifter ✦\n§e[Leaves in 3m 00s]`;

          dim.playSound("mob.endermen.portal", { x: 3.5, y: 64.0, z: 0.5 }, { volume: 1.0, pitch: 1.0 });

          for (const p of world.getAllPlayers()) {
            p.sendMessage(`§d[Dimension Shifter] §eA Dimension Shifter emerged in the §a${key.toUpperCase()}§e! §7(Leaves in 3 mins)`);
            p.playSound("random.levelup", { pitch: 1.2, volume: 1.0 });
          }

          if (hasMythicOrFabled) {
            for (const p of world.getAllPlayers()) {
              p.sendMessage("§e★ §6§l[MYTHIC ROLL!] §eThe Dimension Shifter is carrying a §b§lFABLED§e/§e§lMYTHIC§e item this visit! §e★");
              p.playSound("ui.toast.challenge_complete", { pitch: 1.2, volume: 1.0 });
            }
          }
        } catch (e) {}
      }
    } else {
      state.secondsLeft--;

      const mins = Math.floor(state.secondsLeft / 60);
      const secs = state.secondsLeft % 60;
      const timeStr = `${mins}m ${secs < 10 ? "0" : ""}${secs}s`;

      try {
        for (const entity of dim.getEntities({ tags: ["dimension_shifter"] })) {
          entity.nameTag = `§d✦ Dimension Shifter ✦\n§e[Leaves in ${timeStr}]`;
        }
      } catch (e) {}

      if (state.secondsLeft <= 0) {
        state.isPresent = false;
        state.nextVisitIn = getRandomInterval();

        try {
          for (const entity of dim.getEntities({ tags: ["dimension_shifter"] })) {
            dim.playSound("mob.endermen.portal", entity.location, { volume: 1.0, pitch: 0.8 });
            entity.remove();
          }
          for (const p of world.getAllPlayers()) {
            p.sendMessage(`§d[Dimension Shifter] §7The Dimension Shifter in ${key.toUpperCase()} slipped through the rift. He will return later!`);
          }
        } catch (e) {}
      }
    }
  }
}

function openShifterTradeModal(player, dimKey) {
  const state = dimensionShifterState[dimKey];
  if (!state || !state.isPresent || state.trades.length === 0) {
    player.sendMessage("§cThe Dimension Shifter is not available right now.");
    return;
  }

  const form = new ActionFormData();
  form.title("§d✦ Dimension Shifter Trades ✦");
  form.body("§7Choose a trade to purchase using your gathered materials.\nStock is shared across all players on the island!");

  for (const trade of state.trades) {
    const currName = trade.currency.replace("minecraft:", "").replace(/_/g, " ");
    const itemName = trade.itemId.replace("minecraft:", "").replace(/_/g, " ");
    const stockStr = trade.stock > 0 ? `§a[Stock: ${trade.stock}]` : "§c[SOLD OUT]";

    form.button(
      `${trade.tierColor}[${trade.tierName}] §f${trade.itemCount}x ${itemName}\n§ePrice: ${trade.cost}x ${currName} ${stockStr}`
    );
  }

  form.show(player).then((response) => {
    if (response.canceled || response.selection === undefined) return;

    const selectedTrade = state.trades[response.selection];
    if (!selectedTrade) return;

    if (selectedTrade.stock <= 0) {
      player.sendMessage("§c[Dimension Shifter] That item is completely sold out for this visit!");
      player.playSound("note.bass", { pitch: 0.8, volume: 1.0 });
      return;
    }

    const inv = player.getComponent("minecraft:inventory")?.container;
    if (!inv) return;

    let availableCurrency = 0;
    for (let slot = 0; slot < inv.size; slot++) {
      const item = inv.getItem(slot);
      if (item && item.typeId === selectedTrade.currency) {
        availableCurrency += item.amount;
      }
    }

    if (availableCurrency < selectedTrade.cost) {
      const currName = selectedTrade.currency.replace("minecraft:", "").replace(/_/g, " ");
      player.sendMessage(`§c[Dimension Shifter] You need §e${selectedTrade.cost}x ${currName}§c, but you only have §e${availableCurrency}§c!`);
      player.playSound("note.bass", { pitch: 0.8, volume: 1.0 });
      return;
    }

    let remainingToDeduct = selectedTrade.cost;
    for (let slot = 0; slot < inv.size; slot++) {
      if (remainingToDeduct <= 0) break;
      const item = inv.getItem(slot);
      if (item && item.typeId === selectedTrade.currency) {
        if (item.amount <= remainingToDeduct) {
          remainingToDeduct -= item.amount;
          inv.setItem(slot, undefined);
        } else {
          item.amount -= remainingToDeduct;
          remainingToDeduct = 0;
          inv.setItem(slot, item);
        }
      }
    }

    selectedTrade.stock--;
    const purchasedItem = new ItemStack(selectedTrade.itemId, selectedTrade.itemCount);
    hoverDropAboveOneBlock(player.dimension, purchasedItem);

    const itemName = selectedTrade.itemId.replace("minecraft:", "").replace(/_/g, " ");
    player.sendMessage(`§a[Dimension Shifter] Trade complete! Purchased §e${selectedTrade.itemCount}x ${itemName}§a!`);
    player.playSound("random.orb", { pitch: 1.2, volume: 1.0 });
    player.dimension.spawnParticle("minecraft:totem_particle", player.location);
  });
}

// Player interaction with entities
world.beforeEvents.playerInteractWithEntity.subscribe((event) => {
  const { player, target } = event;

  if (target.hasTag("dimension_shifter")) {
    event.cancel = true;
    system.run(() => {
      const dimKey = getDimKey(player.dimension.id);
      openShifterTradeModal(player, dimKey);
    });
    return;
  }
});

// Entity hurt event: if Dimension Shifter is attacked or damaged, vanish instantly
world.afterEvents.entityHurt.subscribe((event) => {
  const { hurtEntity } = event;
  if (hurtEntity.hasTag("dimension_shifter")) {
    system.run(() => {
      try {
        const dimKey = getDimKey(hurtEntity.dimension.id);
        const state = dimensionShifterState[dimKey];
        if (state) {
          state.isPresent = false;
          state.nextVisitIn = getRandomInterval();
        }
        hurtEntity.dimension.playSound("mob.endermen.portal", hurtEntity.location, { volume: 1.0, pitch: 0.8 });
        hurtEntity.remove();

        for (const p of world.getAllPlayers()) {
          p.sendMessage(`§c[Dimension Shifter] The Dimension Shifter was harmed and fled into the rift!`);
        }
      } catch (e) {}
    });
  }
});

// Liquid Protection: Prevent placing water, lava, or powder snow directly into the OneBlock space at (0, 64, 0)
world.beforeEvents.itemUseOn.subscribe((event) => {
  try {
    const { itemStack, block, player } = event;
    if (!itemStack || !block) return;

    const loc = block.location;
    const isBucket = itemStack.typeId === "minecraft:water_bucket" || itemStack.typeId === "minecraft:lava_bucket" || itemStack.typeId === "minecraft:powder_snow_bucket";
    if (isBucket && loc.x === ONEBLOCK_POS.x && loc.y === ONEBLOCK_POS.y && loc.z === ONEBLOCK_POS.z) {
      event.cancel = true;
      if (player) {
        player.sendMessage("§c[Liquid Protection] Liquids cannot be poured directly into the Sacred OneBlock Core!");
        player.playSound("note.bass", player.location, { volume: 0.8, pitch: 0.8 });
      }
    }
  } catch (e) {}
});

// Piston Movement Hook: Detect if a piston is extending to manipulate the OneBlock
try {
  if (world.beforeEvents && world.beforeEvents.pistonActivate) {
    world.beforeEvents.pistonActivate.subscribe((event) => {
      try {
        if (!event.isExpanding) return;
        const blocks = typeof event.getAttachedBlocks === "function" ? event.getAttachedBlocks() : [];
        for (const b of blocks) {
          const loc = b.location;
          if (loc.x === ONEBLOCK_POS.x && loc.y === ONEBLOCK_POS.y && loc.z === ONEBLOCK_POS.z) {
            const dimKey = getDimKey(event.dimension.id);
            blockBrokenByPlayer[dimKey] = false;
            break;
          }
        }
      } catch (e) {}
    });
  }
} catch (e) {}

// Handle block destruction via playerBreakBlock afterEvent
world.afterEvents.playerBreakBlock.subscribe((event) => {
  const { block, player, dimension } = event;
  const { x, y, z } = block.location;

  if (x !== ONEBLOCK_POS.x || y !== ONEBLOCK_POS.y || z !== ONEBLOCK_POS.z) {
    handleIslandOneBlockBreak(dimension, block.location, player);
    return;
  }

  const dimKey = getDimKey(dimension.id);
  blockBrokenByPlayer[dimKey] = true;
  if (activeCountdowns.get(dimKey)) return;

  const state = getDimensionState(dimKey);
  const phase = state.phase;

  // Auto-elevation teleport strictly during the first 8 Dirts (steps 0 to 7) to ensure player never clips through while the perimeter auto-builds
  if (player && dimKey === "overworld" && state.count < SURROUNDING_OFFSETS.length) {
    const pLoc = player.location;
    if (Math.abs(pLoc.x - 0.5) < 0.9 && Math.abs(pLoc.z - 0.5) < 0.9 && pLoc.y < 65.1 && pLoc.y >= 63.8) {
      system.run(() => {
        try {
          player.teleport(
            { x: pLoc.x, y: 65.0, z: pLoc.z },
            { dimension: dimension, checkForBlocks: false }
          );
          player.clearVelocity();
        } catch (err) {}
      });
    }
  }

  // Determine next block to regenerate:
  let nextBlockType;
  if (dimKey === "overworld" && state.count < TUTORIAL_BLOCKS.length) {
    const tutorialStep = TUTORIAL_BLOCKS[state.count];
    nextBlockType = tutorialStep.block;

    // Automated platform placement for the first 8 Dirts (steps 0 to 7)
    if (state.count < SURROUNDING_OFFSETS.length) {
      const offset = SURROUNDING_OFFSETS[state.count];
      system.run(() => {
        try {
          const sideBlock = dimension.getBlock({ x: offset.x, y: 64, z: offset.z });
          if (sideBlock && sideBlock.isAir) {
            sideBlock.setType("minecraft:dirt");
            dimension.spawnParticle("minecraft:villager_happy", { x: offset.x + 0.5, y: 64.5, z: offset.z + 0.5 });
            dimension.playSound("dig.gravel", { x: offset.x, y: 64, z: offset.z }, { volume: 0.8, pitch: 1.2 });
          }
        } catch (err) {}
      });
    }

    // Clean, small on-screen guidance
    for (const p of world.getAllPlayers()) {
      p.onScreenDisplay.setActionBar(`§e${tutorialStep.msg}`);
      p.sendMessage(tutorialStep.msg);
      p.playSound("random.orb", { pitch: 1.2, volume: 0.8 });
    }

    // At final step (completion), spawn a Starter Reward Chest with 2 Ice blocks for infinite water pool
    if (state.count === TUTORIAL_BLOCKS.length - 1) {
      try {
        const iceGift = new ItemStack("minecraft:ice", 2);
        spawnOneBlockChest(dimension, [iceGift]);
        for (const p of world.getAllPlayers()) {
          p.sendMessage("§b[Starter Gift] §aA Starter Chest appeared with 2x Ice Blocks! Melt them with torches to create an infinite water pool!");
        }
      } catch (err) {}
    }
  } else if (activeLuckyRush.get(dimKey)) {
    const luckyBlocks = ["minecraft:gold_block", "minecraft:emerald_block", "minecraft:diamond_ore", "minecraft:gold_ore", "minecraft:iron_block"];
    nextBlockType = luckyBlocks[Math.floor(Math.random() * luckyBlocks.length)];
  } else {
    nextBlockType = pickWeighted(phase.blocks).id;
  }

  try {
    const targetBlock = dimension.getBlock(ONEBLOCK_POS);
    if (targetBlock && !activeCountdowns.get(dimKey)) {
      targetBlock.setType(nextBlockType);
      lastKnownOneBlockType[dimKey] = nextBlockType;
    }
  } catch (e) {}

  system.run(() => {
    try {
      // Ensure bedrock foundation directly below OneBlock
      const bFloor = dimension.getBlock({ x: ONEBLOCK_POS.x, y: ONEBLOCK_POS.y - 1, z: ONEBLOCK_POS.z });
      if (bFloor && bFloor.typeId !== "minecraft:bedrock") {
        bFloor.setType("minecraft:bedrock");
      }

      const targetBlock = dimension.getBlock(ONEBLOCK_POS);
      if (targetBlock && !activeCountdowns.get(dimKey)) {
        targetBlock.setType(nextBlockType);
        lastKnownOneBlockType[dimKey] = nextBlockType;
      }
    } catch (e) {}
  });

  // Ensure drops never fall: teleport all item entities around (0, 64, 0) to hover safely atop the block
  system.runTimeout(() => {
    try {
      const nearbyItems = dimension.getEntities({
        type: "minecraft:item",
        location: { x: 0.5, y: 64.5, z: 0.5 },
        maxDistance: 2.5
      });
      for (const itemEnt of nearbyItems) {
        // For the first 8 dirts (steps 0 to 7), the dirt went into building the platform, so remove the dropped dirt item
        if (dimKey === "overworld" && state.count < SURROUNDING_OFFSETS.length) {
          try {
            const itemStack = itemEnt.getComponent("minecraft:item")?.itemStack;
            if (itemStack && itemStack.typeId === "minecraft:dirt") {
              itemEnt.remove();
              continue;
            }
          } catch (ie) {}
        }
        itemEnt.teleport({ x: 0.5, y: 65.2, z: 0.5 });
        itemEnt.clearVelocity();
      }

      // Also ensure player didn't pick up the dirt instantly on break
      if (dimKey === "overworld" && state.count < SURROUNDING_OFFSETS.length && player) {
        try {
          const inv = player.getComponent("minecraft:inventory")?.container;
          if (inv) {
            for (let s = 0; s < inv.size; s++) {
              const it = inv.getItem(s);
              if (it && it.typeId === "minecraft:dirt") {
                if (it.amount > 1) {
                  it.amount -= 1;
                  inv.setItem(s, it);
                } else {
                  inv.setItem(s, undefined);
                }
                break;
              }
            }
          }
        } catch (pe) {}
      }
    } catch (err) {}
  }, 1);

  // Pure Vanilla Block Drops: do not spawn an artificial duplicate item!
  // The block broken naturally drops its vanilla items (dirt drops dirt, stone drops cobblestone, coal ore drops coal with fortune/silk-touch).

  // Mid-Phase Events: strictly trigger in the middle window (30% to 70% of the phase)
  const minMid = Math.floor(state.currentPhaseLength * 0.3);
  const maxMid = Math.floor(state.currentPhaseLength * 0.7);
  if (state.phaseProgress >= minMid && state.phaseProgress <= maxMid) {
    const roll = Math.random();

    if (roll < CHEST_CHANCE) {
      // Spawn a real mystery loot chest on the OneBlock!
      const itemsToPut = [];
      const numItems = Math.floor(Math.random() * 3) + 2; // 2 to 4 unique items
      for (let i = 0; i < numItems; i++) {
        const reward = pickWeighted(phase.chests);
        const count = Math.floor(Math.random() * (reward.max - reward.min + 1)) + reward.min;
        try {
          itemsToPut.push(new ItemStack(reward.id, count));
        } catch (ie) {}
      }
      spawnOneBlockChest(dimension, itemsToPut);
      player.sendMessage("§6[OneBlock] §e★ A Mystery Chest has appeared! Open it for phase loot! ★");
      player.playSound("random.chestopen", { pitch: 1.0, volume: 1.0 });
    } else if (roll < CHEST_CHANCE + MOB_CHANCE && phase.mobs && phase.mobs.length > 0) {
      const mobId = phase.mobs[Math.floor(Math.random() * phase.mobs.length)];
      try {
        const mob = dimension.spawnEntity(mobId, { x: 0.5, y: 65.0, z: 0.5 });
        mob.clearVelocity();
        player.playSound("random.orb", { pitch: 1.0, volume: 1.0 });
      } catch (err) {}
    } else if (roll < CHEST_CHANCE + MOB_CHANCE + LUCKY_RUSH_CHANCE) {
      triggerLuckyRush(dimKey, dimension);
    } else if (roll < CHEST_CHANCE + MOB_CHANCE + LUCKY_RUSH_CHANCE + VOID_SURGE_CHANCE) {
      triggerVoidSurge(dimKey, dimension);
    } else if (roll < CHEST_CHANCE + MOB_CHANCE + LUCKY_RUSH_CHANCE + VOID_SURGE_CHANCE + JACKPOT_CHANCE) {
      triggerJackpot(dimension);
    } else if (Math.random() < 0.001) {
      // 0.1% chance: Ancient Enchantment Relic inside a treasure chest
      try {
        const book = new ItemStack("minecraft:enchanted_book", 1);
        book.nameTag = "§6§lAncient Enchantment Relic§r";
        spawnOneBlockChest(dimension, [book]);
        player.sendMessage("§6[OneBlock] §e★ A RELIC CHEST APPEARED WITH AN ANCIENT ENCHANTED BOOK! ★");
        player.playSound("ui.toast.challenge_complete", { pitch: 1.2, volume: 1.0 });
      } catch (e) {}
    } else if (Math.random() < 0.001) {
      // 0.1% chance: Ancient Totem of Undying inside a chest
      try {
        const totem = new ItemStack("minecraft:totem_of_undying", 1);
        spawnOneBlockChest(dimension, [totem]);
        player.sendMessage("§e[OneBlock] §a★ A Sacred Chest appeared with an Ancient Totem of Undying! ★");
        player.playSound("random.totem", { pitch: 1.0, volume: 1.0 });
      } catch (e) {}
    } else if (dimKey === "end" && Math.random() < 0.001) {
      // 0.1% chance in The End: Dragon Egg trophy inside a chest
      try {
        const egg = new ItemStack("minecraft:dragon_egg", 1);
        spawnOneBlockChest(dimension, [egg]);
        player.sendMessage("§5[OneBlock] §d★ AN ENDER DRAGON EGG TROPHY CHEST HAS APPEARED! ★");
        player.playSound("ui.toast.challenge_complete", { pitch: 1.2, volume: 1.0 });
      } catch (e) {}
    }
  }

  incrementDimensionCount(dimKey, dimension);
});

// Portal Arrival Platform & Ender Dragon Bedrock Altar at (0,64,0) in The End
world.afterEvents.playerDimensionChange.subscribe((event) => {
  const { player, toDimension } = event;
  const dimKey = getDimKey(toDimension.id);

  if (dimKey === "nether" || dimKey === "end") {
    system.run(() => {
      try {
        const padMaterial = dimKey === "nether" ? "minecraft:nether_brick" : "minecraft:end_stone_bricks";
        for (let dx = -1; dx <= 1; dx++) {
          for (let dz = -1; dz <= 1; dz++) {
            const loc = { x: dx, y: 63, z: dz };
            const b = toDimension.getBlock(loc);
            if (b && b.isAir) {
              b.setType(padMaterial);
            }
          }
        }
        ensureOneBlock(toDimension);

        // Dragon Altar structure in The End (Bedrock frame anchor at 0,60,0)
        if (dimKey === "end") {
          for (let dx = -2; dx <= 2; dx++) {
            for (let dz = -2; dz <= 2; dz++) {
              if (Math.abs(dx) === 2 || Math.abs(dz) === 2) {
                const b = toDimension.getBlock({ x: dx, y: 63, z: dz });
                if (b && b.isAir) b.setType("minecraft:obsidian");
              }
            }
          }
        }

        const pLoc = player.location;
        const dist = Math.hypot(pLoc.x, pLoc.z);
        if (dist > 5) {
          player.sendMessage(`§e§l[OneBlock Guide] §aWelcome to the ${dimKey === "nether" ? "Nether" : "The End"}!`);
          player.sendMessage(`§6➤ Your Dimension OneBlock is waiting at coordinates: §bX: 0, Y: 64, Z: 0`);
          player.sendMessage(`§7Bridge toward (0, 64, 0) to find your infinite block!`);
        }
      } catch (err) {}
    });
  }
});

// Player initial spawn & Welcome Introduction
world.afterEvents.playerSpawn.subscribe((event) => {
  const { player, initialSpawn } = event;
  if (initialSpawn) {
    system.run(() => {
      try {
        const loc = player.location;
        if (Math.abs(loc.x) < 5 && Math.abs(loc.z) < 5) {
          player.teleport({ x: 0.5, y: 65.0, z: 0.5 });
          player.clearVelocity();
        }

        // Ensure OneBlock is immediately active on spawn
        try {
          const ob = player.dimension.getBlock(ONEBLOCK_POS);
          if (ob && (ob.isAir || ob.typeId === "minecraft:air")) {
            ob.setType("minecraft:dirt");
          }
          ensureOneBlock(player.dimension);
        } catch (e) {}

        // Enforce Pure Survival on joining player
        try {
          if (player.getGameMode && player.getGameMode() !== "survival") {
            player.setGameMode("survival");
          }
        } catch (gme) {
          try { player.runCommand("gamemode survival @s"); } catch (e2) {}
        }

        // Initialize Scoreboard for the joining player
        try {
          updateScoreboard();
        } catch (sbe) {}

        // Welcome introduction & creator thank you
        player.sendMessage("\n§6==================================================");
        player.sendMessage("§e★ §6§lWELCOME TO ONEBLOCK VOID SURVIVAL! §e★");
        player.sendMessage("§fThank you so much for playing my game!");
        player.sendMessage("§bCreated by: §eAllensCreations");
        player.sendMessage("§aMore features & biomes to be updated soon!");
        player.sendMessage("§eLook at the floating holographic guide above the block to start!");
        player.sendMessage("§6==================================================\n");
        player.playSound("random.levelup", { pitch: 1.0, volume: 1.0 });
      } catch (e) {}
    });
  }
});

// Chat command helper for players (!hud)
world.beforeEvents.chatSend.subscribe((event) => {
  const { message, sender } = event;
  const msg = message.trim().toLowerCase();
  if (msg === "!hud") {
    event.cancel = true;
    system.run(() => {
      if (sender.hasTag("hide_hud")) {
        sender.removeTag("hide_hud");
        sender.sendMessage("§a[HUD] Actionbar HUD enabled!");
      } else {
        sender.addTag("hide_hud");
        sender.sendMessage("§e[HUD] Actionbar HUD hidden!");
      }
    });
  }
});

// Fast Block Health-Check Loop (runs every 5 ticks / 0.25s) to guarantee the OneBlock never stays air
system.runInterval(() => {
  try {
    const ow = world.getDimension("overworld");
    if (ow) ensureOneBlock(ow);
  } catch (e) {}

  try {
    const nether = world.getDimension("nether");
    if (nether) ensureOneBlock(nether);
  } catch (e) {}

  try {
    const end = world.getDimension("the_end");
    if (end) ensureOneBlock(end);
  } catch (e) {}
}, 5);

// Periodic maintenance & loop (1 second)
let tickCounter = 0;
system.runInterval(() => {
  try {
    tickCounter++;

    try { tickDimensionShifters(); } catch (e) {}

    try { updateScoreboard(); } catch (e) {}

    // Permanently Lock World Difficulty to Hard
    if (tickCounter % 10 === 0) {
      try {
        const ow = world.getDimension("overworld");
        if (ow) ow.runCommand("difficulty hard");
      } catch (de) {}
    }

    // QoL: Actionbar HUD & Compass Nav-Radar
    for (const player of world.getAllPlayers()) {
      try {
        // Permanently Lock Player GameMode to Pure Survival
        try {
          if (player.getGameMode && player.getGameMode() !== "survival") {
            player.setGameMode("survival");
            player.sendMessage("§c[World Settings Locked] This world is permanently locked to Pure Survival on Hard difficulty!");
          }
        } catch (ge) {
          try { player.runCommand("gamemode survival @s[m=!survival]"); } catch (e2) {}
        }
        if (!player.hasTag("hide_hud")) {
          const dimKey = getDimKey(player.dimension.id);
          const state = getDimensionState(dimKey);
          const progressInPhase = (state.count % BLOCKS_PER_PHASE);
          const phaseName = state.phase ? state.phase.name : "Starting";
          const dimPrefix = dimKey === "nether" ? "§c[Nether]" : (dimKey === "end" ? "§d[End]" : "§a[Overworld]");

          // Check if player is holding a Secret Island Compass in main hand
          let navHUD = "";
          try {
            const equippable = player.getComponent("minecraft:equippable");
            const heldItem = equippable?.getEquipment("Mainhand");
            const isCompass = heldItem && (heldItem.typeId === "minecraft:compass" || heldItem.typeId === "minecraft:lodestone_compass");
            if (isCompass && heldItem.nameTag) {
              const heldName = heldItem.nameTag || "";
              const matchedTheme = ISLAND_THEMES.find(t => heldName.toLowerCase().includes(t.name.toLowerCase()));
            if (matchedTheme) {
              const targetX = world.getDynamicProperty(`island_target_x_${matchedTheme.id}`);
              const targetY = world.getDynamicProperty(`island_target_y_${matchedTheme.id}`) ?? 64;
              const targetZ = world.getDynamicProperty(`island_target_z_${matchedTheme.id}`);
              if (targetX !== undefined && targetZ !== undefined) {
                const nav = calculateNavIndicator(player.location, player.getRotation(), { x: targetX, y: targetY, z: targetZ });
                navHUD = ` §e| §6[Radar: §e${nav.arrow} §b${nav.dist}m §7(${nav.cardinal}) §6${matchedTheme.name}]`;

                // Proactive Materialization: If player is within 60 blocks of island target, ensure island blocks are materialized in the newly loaded chunk!
                if (nav.dist <= 60 && !world.getDynamicProperty(`island_built_${matchedTheme.id}`)) {
                  world.setDynamicProperty(`island_built_${matchedTheme.id}`, true);
                  try {
                    buildThemedIsland(player.dimension, matchedTheme, { x: targetX, y: targetY - 1, z: targetZ });
                  } catch (pbe) {}
                }
              }
            }
          }
        } catch (ne) {}

        player.onScreenDisplay.setActionBar(
          `${dimPrefix} §ePhase ${state.phaseIndex + 1}: §f${phaseName} §7[§b${progressInPhase}§7/§b${BLOCKS_PER_PHASE}§7] §eTotal: §6${state.count}${navHUD}`
        );
      }
    } catch (e) {}
  }

  if (tickCounter % 2 === 0) {
    try {
      const nether = world.getDimension("nether");
      if (nether) nether.spawnParticle("minecraft:endrod", { x: 0.5, y: 65.5, z: 0.5 });
    } catch (e) {}
    try {
      const end = world.getDimension("the_end");
      if (end) end.spawnParticle("minecraft:endrod", { x: 0.5, y: 65.5, z: 0.5 });
    } catch (e) {}
    // Compass Particle Guide: emit a trail of shining particles extending in front of player towards island
    try {
      for (const player of world.getAllPlayers()) {
        const equippable = player.getComponent("minecraft:equippable");
        const heldItem = equippable?.getEquipment("Mainhand");
        const isCompass = heldItem && (heldItem.typeId === "minecraft:compass" || heldItem.typeId === "minecraft:lodestone_compass");
        if (isCompass && heldItem.nameTag) {
          const heldName = heldItem.nameTag || "";
          const matchedTheme = ISLAND_THEMES.find(t => heldName.toLowerCase().includes(t.name.toLowerCase()));
          if (matchedTheme) {
            const tx = world.getDynamicProperty(`island_target_x_${matchedTheme.id}`);
            const ty = world.getDynamicProperty(`island_target_y_${matchedTheme.id}`) ?? 64;
              const tz = world.getDynamicProperty(`island_target_z_${matchedTheme.id}`);
              if (tx !== undefined && tz !== undefined) {
                const px = player.location.x;
                const py = player.location.y + 1.2;
                const pz = player.location.z;
                const dx = tx - px;
                const dy = ty - py;
                const dz = tz - pz;
                const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
                if (len > 0.1) {
                  const ux = dx / len;
                  const uy = dy / len;
                  const uz = dz / len;
                  // Spawn 5 particle steps extending out from player
                  for (let step = 1; step <= 5; step++) {
                    const d = step * 1.5;
                    player.dimension.spawnParticle("minecraft:endrod", {
                      x: px + ux * d,
                      y: py + uy * d,
                      z: pz + uz * d
                    });
                  }
                }
              }
            }
          }
        }
      } catch (pe) {}
    }
  } catch (err) {}
}, 20);

// =========================================================================
// INTERACTIVE COMPASS & AUTO-DISSOLVING ISLAND DISCOVERY SYSTEM
// =========================================================================

// Completely removes island compasses from player inventory, mainhand, and offhand
function removeIslandCompassFromPlayer(player, theme) {
  let removed = 0;
  try {
    // 1. Scan player inventory slots (0 - 35)
    const inv = player.getComponent("minecraft:inventory")?.container;
    if (inv) {
      for (let slot = 0; slot < inv.size; slot++) {
        const item = inv.getItem(slot);
        if (item && (item.typeId === "minecraft:compass" || item.typeId === "minecraft:lodestone_compass")) {
          const name = item.nameTag || "";
          if (!theme || name.toLowerCase().includes(theme.name.toLowerCase()) || name.includes("Secret") || name.includes("Island")) {
            inv.setItem(slot, undefined);
            removed++;
          }
        }
      }
    }

    // 2. Scan equippable slots (Mainhand & Offhand)
    const equippable = player.getComponent("minecraft:equippable");
    if (equippable) {
      for (const slotId of ["Mainhand", "Offhand"]) {
        try {
          const eqItem = equippable.getEquipment(slotId);
          if (eqItem && (eqItem.typeId === "minecraft:compass" || eqItem.typeId === "minecraft:lodestone_compass")) {
            const name = eqItem.nameTag || "";
            if (!theme || name.toLowerCase().includes(theme.name.toLowerCase()) || name.includes("Secret") || name.includes("Island")) {
              equippable.setEquipment(slotId, undefined);
              removed++;
            }
          }
        } catch (eqe) {}
      }
    }
  } catch (err) {}
  return removed;
}

// Interactive Compass Sonar Ping on Right-Click
world.afterEvents.itemUse.subscribe((event) => {
  try {
    const { itemStack, source: player } = event;
    if (!itemStack || !player) return;

    if (itemStack.typeId === "minecraft:compass" || itemStack.typeId === "minecraft:lodestone_compass") {
      const name = itemStack.nameTag || "";
      const matchedTheme = ISLAND_THEMES.find(t => name.toLowerCase().includes(t.name.toLowerCase()));
      if (matchedTheme) {
        const tx = world.getDynamicProperty(`island_target_x_${matchedTheme.id}`);
        const ty = world.getDynamicProperty(`island_target_y_${matchedTheme.id}`) ?? 65;
        const tz = world.getDynamicProperty(`island_target_z_${matchedTheme.id}`);

        if (tx !== undefined && tz !== undefined) {
          const pLoc = player.location;
          const nav = calculateNavIndicator(pLoc, player.getRotation(), { x: tx, y: ty, z: tz });

          // Sonar Audio Feedback
          player.playSound("block.amethyst_block.chime", { pitch: 1.5, volume: 1.0 });
          player.playSound("note.harp", { pitch: 1.8, volume: 0.9 });

          // Shoot Sonar Particle Beam towards target island
          const dx = tx - pLoc.x;
          const dy = ty - (pLoc.y + 1.2);
          const dz = tz - pLoc.z;
          const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (len > 0.1) {
            const ux = dx / len;
            const uy = dy / len;
            const uz = dz / len;
            for (let step = 1; step <= 10; step++) {
              const d = step * 1.5;
              player.dimension.spawnParticle("minecraft:endrod", {
                x: pLoc.x + ux * d,
                y: pLoc.y + 1.2 + uy * d,
                z: pLoc.z + uz * d
              });
            }
          }

          // Sonar HUD & Chat Alert
          const sizeStr = matchedTheme.size ? matchedTheme.size.toUpperCase() : "MEDIUM";
          const traitStr = matchedTheme.trait ? matchedTheme.trait.replace("_", " ").toUpperCase() : "ISLAND";
          player.onScreenDisplay.setActionBar(`§b✦ SONAR PING: §e${nav.arrow} §f${matchedTheme.name} §6${nav.dist}m §7[${nav.cardinal}]`);
          player.sendMessage(`§b✦ [Compass Sonar Ping] §fTarget: §e§l${matchedTheme.name}§r §7(${sizeStr} | ${traitStr})`);
          player.sendMessage(`  §8» §6Distance: §b${nav.dist} blocks §8| §6Bearing: §a${nav.cardinal} §8| §6Heading: §e${nav.arrow}`);
        }
      }
    }
  } catch (err) {}
});

function triggerIslandRegistration(player, matchedTheme, blockPos) {
  try {
    const dimension = player.dimension;
    const loc = blockPos || {
      x: world.getDynamicProperty(`island_target_x_${matchedTheme.id}`) ?? player.location.x,
      y: (world.getDynamicProperty(`island_target_y_${matchedTheme.id}`) ?? 65),
      z: world.getDynamicProperty(`island_target_z_${matchedTheme.id}`) ?? player.location.z
    };

    const regKey = `island_registered_${matchedTheme.id}`;
    if (world.getDynamicProperty(regKey)) return; // Already registered
    world.setDynamicProperty(regKey, true);

    // 1. AUTO-DISAPPEAR COMPASS: Remove tracking compass from player inventory & hands!
    const removedCount = removeIslandCompassFromPlayer(player, matchedTheme);


    // 3. Launch celebration fireworks
    try {
      for (let i = 0; i < 5; i++) {
        system.runTimeout(() => {
          try {
            dimension.spawnEntity("minecraft:fireworks_rocket", {
              x: loc.x + 0.5 + (Math.random() - 0.5) * 3,
              y: loc.y + 1.5,
              z: loc.z + 0.5 + (Math.random() - 0.5) * 3
            });
          } catch (fe) {}
        }, i * 8);
      }
    } catch (fwe) {}

    // 4. Totem dissolving particles on player
    try {
      dimension.spawnParticle("minecraft:totem_particle", {
        x: player.location.x,
        y: player.location.y + 1,
        z: player.location.z
      });
    } catch (pe) {}

    // 5. Audio & Visual Discovery Alert
    player.playSound("ui.toast.challenge_complete", { pitch: 1.2, volume: 1.0 });
    player.playSound("random.levelup", { pitch: 1.5, volume: 1.0 });

    const sizeStr = matchedTheme.size ? matchedTheme.size.toUpperCase() : "MEDIUM";
    player.onScreenDisplay.setTitle("§6§lISLAND DISCOVERED!§r", {
      stayDuration: 100,
      fadeInDuration: 5,
      fadeOutDuration: 15,
      subtitle: `§a${matchedTheme.name} §7(${sizeStr})`
    });
    player.sendMessage(`\n§6★ [Island Discovered] §aYou arrived at §e§l${matchedTheme.name}§r§a!`);
    if (removedCount > 0) {
      player.sendMessage(`§d✦ Your mystical Island Compass dissolved into starlight as you set foot on the island!`);
    }
    player.sendMessage(`§7The island monument is now unlocked! Enjoy your rewards in the treasure chest!\n`);
  } catch (err) {}
}


// Method 2: Proactive Auto-Discovery on Arrival (Walking onto the Island platform)
system.runInterval(() => {
  try {
    for (const player of world.getAllPlayers()) {
      const pLoc = player.location;
      for (const t of ISLAND_THEMES) {
        const tx = world.getDynamicProperty(`island_target_x_${t.id}`);
        const tz = world.getDynamicProperty(`island_target_z_${t.id}`);
        if (tx !== undefined && tz !== undefined) {
          const dist = Math.hypot(pLoc.x - tx, pLoc.z - tz);
          // Scale-based arrival detection radius:
          let arrivalDist = 8.5;
          if (t.size === "huge") arrivalDist = 14.0;
          else if (t.size === "big") arrivalDist = 11.0;
          else if (t.size === "medium") arrivalDist = 8.5;
          else if (t.size === "compact") arrivalDist = 6.5;

          // When player arrives on the island platform
          if (dist <= arrivalDist) {
            if (!world.getDynamicProperty(`island_registered_${t.id}`)) {
              const ty = world.getDynamicProperty(`island_target_y_${t.id}`) ?? 65;
              triggerIslandRegistration(player, t, { x: tx, y: ty, z: tz });
              break;
            } else {
              // If already registered, ensure any remaining compass automatically dissolves
              removeIslandCompassFromPlayer(player, t);
            }
          }
        }
      }
    }
  } catch (e) {}
}, 20);

