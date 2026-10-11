import { world, system, ItemStack, DisplaySlotId } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { OVERWORLD_PHASES, NETHER_PHASES, END_PHASES } from "./phases.js";
import { RARITY_TIERS, DIMENSION_TRADE_POOLS } from "./rarities.js";
import { ISLAND_THEMES, getIslandLocation, buildThemedIsland } from "./islands.js";

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

    return { arrow, dist };
  } catch (e) {
    return { arrow: "⬆", dist: 0 };
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
            p.sendMessage(`§6§l[OneBlock] §eCongratulations! Reached §aPhase ${newPhaseIdx + 1}: ${nextPhase.name}§e! §7(By AllensCreations on MCPEDL.COM)`);
            p.playSound("random.levelup", { pitch: 1.0, volume: 1.0 });
          } catch (e) {}
        }
      }
    }
  }, 20);
}

function incrementDimensionCount(dimKey, dimension) {
  const countProp = `ob_${dimKey}_count`;
  const prevState = getDimensionState(dimKey);
  const prevCount = prevState.count;
  const newCount = prevCount + 1;
  world.setDynamicProperty(countProp, newCount);

  const newState = getDimensionState(dimKey);
  const phases = getPhasesForDim(dimKey);

  // Check if phase climax was just reached
  if (newState.phaseIndex > prevState.phaseIndex) {
    spawnPhaseMiniBoss(dimKey, dimension, newState.phaseIndex);
    const isGameComplete = (dimKey === "end" && newState.phaseIndex === phases.length - 1);
    startPhaseTransition(dimKey, dimension, newState.phaseIndex, isGameComplete);

    // Check for Secret Island Materialization across 42+ Unique Void Islands
    // Islands materialize based on Progression Tiers (Tier 1: Starter, Tier 2: Mining, Tier 3: Nether/Magic, Tier 4: End/Relics)
    if (dimKey === "overworld") {
      // Determine allowed Tier based on player's current phase:
      // Phase 1-4 (idx 0-3): Tier 1
      // Phase 5-8 (idx 4-7): Tier 2
      // Phase 9-12 (idx 8-11): Tier 3
      // Phase 13+ (idx 12+): Tier 4
      const targetTier = newState.phaseIndex < 4 ? 1 : (newState.phaseIndex < 8 ? 2 : (newState.phaseIndex < 12 ? 3 : 4));
      const tierThemes = ISLAND_THEMES.filter(t => t.tier === targetTier);

      // Pick theme from the appropriate tier pool
      const themeIndex = (newState.phaseIndex + Math.floor(newCount / 200)) % tierThemes.length;
      const theme = tierThemes[themeIndex] || ISLAND_THEMES[0];
      const propKey = `island_spawned_phase_${newState.phaseIndex}_${theme.id}`;

      if (!world.getDynamicProperty(propKey)) {
        world.setDynamicProperty(propKey, true);
        const lastX = world.getDynamicProperty("last_island_x");
        const lastZ = world.getDynamicProperty("last_island_z");
        const lastPos = (lastX !== undefined && lastZ !== undefined) ? { x: lastX, z: lastZ } : null;

        const islandLoc = getIslandLocation(newState.phaseIndex, 42, theme, lastPos);

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
        world.setDynamicProperty(`island_target_y_${theme.id}`, islandLoc.center.y + 1);
        world.setDynamicProperty(`island_target_z_${theme.id}`, islandLoc.center.z);

        // 2. Build the themed Skyblock island and award compass
        system.runTimeout(() => {
          try {
            buildThemedIsland(dimension, theme, islandLoc.center);

            // Broadcast Discovery Alert with exact coordinates inscribed on compass
            for (const p of world.getAllPlayers()) {
              p.onScreenDisplay.setTitle(`${theme.color}★ SECRET ISLAND! ★`, {
                stayDuration: 100,
                fadeInDuration: 10,
                fadeOutDuration: 15,
                subtitle: `§e${theme.name} materialized!`
              });
              p.sendMessage(`\n${theme.color}⚡ [Secret Island Discovered] §fThe mysterious §l${theme.name}§r ${theme.color}has materialized!`);
              p.sendMessage(`§eA mystical Compass has been delivered! §6Target Coordinates: §bX: ${islandLoc.center.x} §aY: ${islandLoc.center.y + 1} §bZ: ${islandLoc.center.z}`);
              p.sendMessage(`§7(Coordinates are inscribed directly on the Compass item tooltip / lore!)\n`);
              p.playSound("ambient.weather.thunder", { pitch: 1.1, volume: 1.0 });

              // Award Authentic Lodestone Tracking Compass directly into player inventory (or hovering at OneBlock)
              try {
                let compass;
                try {
                  compass = new ItemStack("minecraft:lodestone_compass", 1);
                } catch (lce) {
                  compass = new ItemStack("minecraft:compass", 1);
                }

                const tierLabel = theme.tier === 1 ? "Tier 1: Starter" : (theme.tier === 2 ? "Tier 2: Mining" : (theme.tier === 3 ? "Tier 3: Nether/Magic" : "Tier 4: Relic/End"));
                compass.nameTag = `${theme.color}§l[${tierLabel}] ${theme.name}§r`;
                compass.setLore([
                  `§7Mystical Island Explorer Compass`,
                  `§eIsland: §f${theme.name} §7(§6${tierLabel}§7)`,
                  `§6Coordinates: §bX: ${islandLoc.center.x} §aY: ${islandLoc.center.y + 1} §bZ: ${islandLoc.center.z}`,
                  `§7-----------------------`,
                  `§aHold in hand for Radar HUD & Light Trail!`,
                  `§eRight-click the island Lodestone with this`,
                  `§ecompass to register discovery!`
                ]);

                // Attune Compass to the island Lodestone location via Bedrock Script API
                const lodestonePos = { x: islandLoc.center.x, y: islandLoc.center.y + 1, z: islandLoc.center.z };
                try {
                  const tracker = compass.getComponent("minecraft:lodestone_tracker");
                  if (tracker) {
                    if (typeof tracker.setLodestonePosition === "function") {
                      tracker.setLodestonePosition(lodestonePos);
                    } else if ("trackingPosition" in tracker) {
                      tracker.trackingPosition = lodestonePos;
                    }
                  }
                } catch (te) {}

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
      }
    }
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

function ensureOneBlock(dimension) {
  try {
    const dimKey = getDimKey(dimension.id);
    if (activeCountdowns.get(dimKey)) return;

    const block = dimension.getBlock(ONEBLOCK_POS);
    if (!block || block.isAir || block.typeId === "minecraft:air") {
      const state = getDimensionState(dimKey);
      let chosenId;
      if (dimKey === "overworld" && state.count < TUTORIAL_BLOCKS.length) {
        chosenId = TUTORIAL_BLOCKS[state.count].block;
      } else {
        chosenId = pickWeighted(state.phase.blocks).id;
      }
      block.setType(chosenId);
    }
  } catch (err) {}
}

// Sidebar Scoreboard displaying live Dimension, Phase name, Phase progress, and Total blocks
function updateScoreboard() {
  try {
    let objective = world.scoreboard.getObjective("oneblock_stats");
    if (!objective) {
      objective = world.scoreboard.addObjective("oneblock_stats", "§e§lONEBLOCK VOID§r");
    }

    world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, {
      objective: objective
    });

    const owState = getDimensionState("overworld");
    const netherState = getDimensionState("nether");
    const endState = getDimensionState("end");

    // Format distinct, clean scoreboard lines
    const lines = [
      "§7-----------------§r",
      `§aOverworld: §fPhase ${owState.phaseIndex + 1}`,
      `§7Progress: §b${owState.phaseProgress}§7/§b${owState.currentPhaseLength}`,
      `§cNether: §fPhase ${netherState.phaseIndex + 1}`,
      `§dThe End: §fPhase ${endState.phaseIndex + 1}`,
      `§eTotal Mined: §6${owState.count + netherState.count + endState.count}`,
      "§7------------------§r"
    ];

    // Remove obsolete participants
    try {
      const participants = objective.getParticipants();
      for (const p of participants) {
        const idName = (typeof p === "string") ? p : (p.displayName || p.id);
        if (idName && !lines.includes(idName)) {
          objective.removeParticipant(p);
        }
      }
    } catch (pe) {}

    let score = lines.length;
    for (const line of lines) {
      try {
        objective.setScore(line, score--);
      } catch (se) {}
    }
  } catch (e) {
    // Robust Command Fallback
    try {
      const ow = world.getDimension("overworld");
      if (ow) {
        ow.runCommand("scoreboard objectives add oneblock_stats dummy §e§lONEBLOCK VOID§r");
        ow.runCommand("scoreboard objectives setdisplay sidebar oneblock_stats");
      }
    } catch (ce) {}
  }
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

// Handle block destruction via playerBreakBlock afterEvent
world.afterEvents.playerBreakBlock.subscribe((event) => {
  const { block, player, dimension } = event;
  const { x, y, z } = block.location;

  if (x !== ONEBLOCK_POS.x || y !== ONEBLOCK_POS.y || z !== ONEBLOCK_POS.z) {
    return;
  }

  const dimKey = getDimKey(dimension.id);
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
    }
  } catch (e) {}

  system.run(() => {
    try {
      const targetBlock = dimension.getBlock(ONEBLOCK_POS);
      if (targetBlock && !activeCountdowns.get(dimKey)) {
        targetBlock.setType(nextBlockType);
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

    // QoL: Actionbar HUD & Compass Nav-Radar
    for (const player of world.getAllPlayers()) {
      try {
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
                navHUD = ` §e| §6[Radar: §e${nav.arrow} §b${nav.dist}m §6to ${matchedTheme.name}]`;

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

// Dual Island Discovery Registration System:
// Method 1: Automatic Proximity Registration (when player walks onto the island within 6 blocks of lodestone)
// Method 2: Manual Lodestone Right-Click (both beforeEvents and afterEvents support)

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

    // 1. Consume compass from inventory if held
    try {
      const equippable = player.getComponent("minecraft:equippable");
      const held = equippable?.getEquipment("Mainhand");
      if (held && (held.typeId.includes("compass"))) {
        equippable.setEquipment("Mainhand", undefined);
      }
    } catch (ie) {}

    // 2. Transform lodestone to gilded monument
    try {
      const targetBlock = dimension.getBlock(loc);
      if (targetBlock && targetBlock.typeId === "minecraft:lodestone") {
        targetBlock.setType("minecraft:gilded_blackstone");
      }
    } catch (be) {}

    // 3. Launch celebration fireworks
    try {
      for (let i = 0; i < 4; i++) {
        system.runTimeout(() => {
          try {
            dimension.spawnEntity("minecraft:fireworks_rocket", {
              x: loc.x + 0.5 + (Math.random() - 0.5) * 2,
              y: loc.y + 1.5,
              z: loc.z + 0.5 + (Math.random() - 0.5) * 2
            });
          } catch (fe) {}
        }, i * 8);
      }
    } catch (fwe) {}

    // 4. Audio & Visual Discovery Alert
    player.playSound("ui.toast.challenge_complete", { pitch: 1.2, volume: 1.0 });
    player.playSound("random.levelup", { pitch: 1.5, volume: 1.0 });

    player.onScreenDisplay.setTitle("§6§lISLAND REGISTERED!§r", {
      stayDuration: 90,
      fadeInDuration: 5,
      fadeOutDuration: 15,
      subtitle: `§aDiscovered: §e${matchedTheme.name}`
    });
    player.sendMessage(`\n§6★ [Island Discovery Registered] §aYou reached and registered §e§l${matchedTheme.name}§r§a!`);
    player.sendMessage(`§7The island monument is now unlocked! Enjoy your rewards in the treasure chest!\n`);
  } catch (err) {}
}

// Method 1: Interacting with Lodestone (Before Event)
world.beforeEvents.playerInteractWithBlock.subscribe((event) => {
  const { block, itemStack, player } = event;
  if (!block) return;

  if (block.typeId === "minecraft:lodestone") {
    event.cancel = true; // Prevent vanilla attunement so custom registration handles it cleanly
    system.run(() => {
      // Find theme by position or held item
      let matchedTheme = null;
      if (itemStack && itemStack.nameTag) {
        matchedTheme = ISLAND_THEMES.find(t => itemStack.nameTag.toLowerCase().includes(t.name.toLowerCase()));
      }
      if (!matchedTheme) {
        // Fallback: match by distance to known island targets
        for (const t of ISLAND_THEMES) {
          const tx = world.getDynamicProperty(`island_target_x_${t.id}`);
          const tz = world.getDynamicProperty(`island_target_z_${t.id}`);
          if (tx !== undefined && tz !== undefined) {
            const d = Math.hypot(block.location.x - tx, block.location.z - tz);
            if (d < 10) { matchedTheme = t; break; }
          }
        }
      }
      if (matchedTheme) {
        triggerIslandRegistration(player, matchedTheme, block.location);
      }
    });
  }
});

// Method 2: Proactive Auto-Discovery on Arrival (Walking within 5 blocks of the Lodestone)
system.runInterval(() => {
  try {
    for (const player of world.getAllPlayers()) {
      const pLoc = player.location;
      for (const t of ISLAND_THEMES) {
        const tx = world.getDynamicProperty(`island_target_x_${t.id}`);
        const tz = world.getDynamicProperty(`island_target_z_${t.id}`);
        if (tx !== undefined && tz !== undefined) {
          const dist = Math.hypot(pLoc.x - tx, pLoc.z - tz);
          // When player arrives on the island (within 5 blocks of the lodestone)
          if (dist <= 5 && !world.getDynamicProperty(`island_registered_${t.id}`)) {
            const ty = world.getDynamicProperty(`island_target_y_${t.id}`) ?? 65;
            triggerIslandRegistration(player, t, { x: tx, y: ty, z: tz });
            break;
          }
        }
      }
    }
  } catch (e) {}
}, 20);

