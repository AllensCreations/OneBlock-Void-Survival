// 42+ Unique Themed Secret Void Islands for OneBlock Survival
// Each island generates out in unloaded chunks (140 to 250 blocks away from 0,64,0)
// and strictly preserves player-placed blocks (air-only placement) so nothing is ever overwritten!

import { ItemStack } from "@minecraft/server";

export const ISLAND_THEMES = [
  {
    id: "sky_oasis",
    y: 68,
    name: "Lush Floral Oasis",
    color: "§a",
    floor: "minecraft:grass_block",
    subfloor: "minecraft:dirt",
    base: "minecraft:stone",
    feature: "well",
    mob: "minecraft:villager_v2",
    chest: [
      { id: "minecraft:emerald", count: 8 },
      { id: "minecraft:golden_carrot", count: 4 },
      { id: "minecraft:bread", count: 6 },
      { id: "minecraft:wheat_seeds", count: 8 },
      { id: "minecraft:bell", count: 1 }
    ]
  },
  {
    id: "ancient_crypt",
    y: 54,
    name: "Ancient Sandstone Crypt",
    color: "§6",
    floor: "minecraft:cut_sandstone",
    subfloor: "minecraft:smooth_sandstone",
    base: "minecraft:sandstone",
    feature: "pillars",
    mob: null,
    chest: [
      { id: "minecraft:diamond", count: 3 },
      { id: "minecraft:gold_ingot", count: 8 },
      { id: "minecraft:enchanted_book", count: 1 },
      { id: "minecraft:saddle", count: 1 },
      { id: "minecraft:iron_horse_armor", count: 1 }
    ]
  },
  {
    id: "trial_vault",
    y: 48,
    name: "Trial & Breeze Vault",
    color: "§b",
    floor: "minecraft:cut_copper",
    subfloor: "minecraft:polished_tuff",
    base: "minecraft:deepslate",
    feature: "copper_spire",
    mob: "minecraft:breeze",
    chest: [
      { id: "minecraft:trial_key", count: 2 },
      { id: "minecraft:wind_charge", count: 8 },
      { id: "minecraft:heavy_core", count: 1 },
      { id: "minecraft:iron_block", count: 2 },
      { id: "minecraft:diamond", count: 2 }
    ]
  },
  {
    id: "stronghold_portal",
    y: 40,
    name: "Stronghold End Chamber",
    color: "§d",
    floor: "minecraft:stone_bricks",
    subfloor: "minecraft:cracked_stone_bricks",
    base: "minecraft:mossy_stone_bricks",
    feature: "portal_frame",
    mob: null,
    chest: [
      { id: "minecraft:ender_eye", count: 12 },
      { id: "minecraft:golden_apple", count: 3 },
      { id: "minecraft:diamond_sword", count: 1 },
      { id: "minecraft:bookshelf", count: 3 }
    ]
  },
  {
    id: "cherry_sanctuary",
    y: 76,
    name: "Cherry Blossom Sanctuary",
    color: "§d",
    floor: "minecraft:cherry_log",
    subfloor: "minecraft:cherry_leaves",
    base: "minecraft:grass_block",
    feature: "blossom_tree",
    mob: "minecraft:bee",
    chest: [
      { id: "minecraft:cherry_sapling", count: 4 },
      { id: "minecraft:honey_bottle", count: 3 },
      { id: "minecraft:pink_petals", count: 8 },
      { id: "minecraft:bee_nest", count: 1 }
    ]
  },
  {
    id: "pale_garden_spire",
    y: 74,
    name: "Pale Garden Eerie Spire",
    color: "§7",
    floor: "minecraft:pale_oak_log",
    subfloor: "minecraft:pale_moss_block",
    base: "minecraft:deepslate",
    feature: "creaking_heart",
    mob: "minecraft:creaking",
    chest: [
      { id: "minecraft:pale_oak_sapling", count: 4 },
      { id: "minecraft:resin_clump", count: 6 },
      { id: "minecraft:creaking_heart", count: 1 },
      { id: "minecraft:bone", count: 8 }
    ]
  },
  {
    id: "mushroom_haven",
    y: 62,
    name: "Giant Mushroom Haven",
    color: "§c",
    floor: "minecraft:mycelium",
    subfloor: "minecraft:dirt",
    base: "minecraft:stone",
    feature: "huge_mushroom",
    mob: "minecraft:mooshroom",
    chest: [
      { id: "minecraft:mushroom_stew", count: 4 },
      { id: "minecraft:red_mushroom", count: 8 },
      { id: "minecraft:brown_mushroom", count: 8 },
      { id: "minecraft:bowl", count: 6 }
    ]
  },
  {
    id: "badlands_mesa",
    y: 60,
    name: "Badlands Gold Mesa",
    color: "§6",
    floor: "minecraft:terracotta",
    subfloor: "minecraft:red_sandstone",
    base: "minecraft:stone",
    feature: "gold_core",
    mob: null,
    chest: [
      { id: "minecraft:raw_gold", count: 12 },
      { id: "minecraft:gold_ingot", count: 8 },
      { id: "minecraft:tnt", count: 4 },
      { id: "minecraft:rail", count: 16 }
    ]
  },
  {
    id: "ice_spike_peak",
    y: 96,
    name: "Glacial Ice Spire",
    color: "§b",
    floor: "minecraft:blue_ice",
    subfloor: "minecraft:packed_ice",
    base: "minecraft:snow_block",
    feature: "ice_spike",
    mob: "minecraft:polar_bear",
    chest: [
      { id: "minecraft:snowball", count: 16 },
      { id: "minecraft:ice", count: 8 },
      { id: "minecraft:leather_boots", count: 1 },
      { id: "minecraft:powder_snow_bucket", count: 1 }
    ]
  },
  {
    id: "jungle_temple",
    y: 58,
    name: "Jungle Ruined Temple",
    color: "§2",
    floor: "minecraft:mossy_cobblestone",
    subfloor: "minecraft:chiseled_stone_bricks",
    base: "minecraft:cobblestone",
    feature: "bamboo_grove",
    mob: "minecraft:parrot",
    chest: [
      { id: "minecraft:cocoa_beans", count: 8 },
      { id: "minecraft:bamboo", count: 12 },
      { id: "minecraft:crossbow", count: 1 },
      { id: "minecraft:emerald", count: 6 }
    ]
  },
  {
    id: "nether_fortress_spire",
    y: 44,
    name: "Nether Fortress Outpost",
    color: "§4",
    floor: "minecraft:nether_brick",
    subfloor: "minecraft:red_nether_brick",
    base: "minecraft:netherrack",
    feature: "blaze_altar",
    mob: "minecraft:blaze",
    chest: [
      { id: "minecraft:blaze_rod", count: 4 },
      { id: "minecraft:nether_wart", count: 6 },
      { id: "minecraft:magma_cream", count: 4 },
      { id: "minecraft:nether_brick", count: 16 }
    ]
  },
  {
    id: "bastion_treasury",
    y: 42,
    name: "Bastion Piglin Treasury",
    color: "§e",
    floor: "minecraft:blackstone",
    subfloor: "minecraft:polished_blackstone_bricks",
    base: "minecraft:gilded_blackstone",
    feature: "gold_monolith",
    mob: "minecraft:piglin",
    chest: [
      { id: "minecraft:ancient_debris", count: 1 },
      { id: "minecraft:netherite_scrap", count: 1 },
      { id: "minecraft:gilded_blackstone", count: 4 },
      { id: "minecraft:gold_block", count: 2 }
    ]
  },
  {
    id: "crimson_forest_isle",
    y: 46,
    name: "Crimson Fungus Atoll",
    color: "§4",
    floor: "minecraft:crimson_nylium",
    subfloor: "minecraft:crimson_stem",
    base: "minecraft:netherrack",
    feature: "shroomlight",
    mob: "minecraft:hoglin",
    chest: [
      { id: "minecraft:crimson_fungus", count: 4 },
      { id: "minecraft:shroomlight", count: 3 },
      { id: "minecraft:nether_wart_block", count: 8 },
      { id: "minecraft:ender_pearl", count: 4 }
    ]
  },
  {
    id: "warped_forest_isle",
    y: 46,
    name: "Warped Void Grove",
    color: "§3",
    floor: "minecraft:warped_nylium",
    subfloor: "minecraft:warped_stem",
    base: "minecraft:netherrack",
    feature: "shroomlight",
    mob: "minecraft:enderman",
    chest: [
      { id: "minecraft:warped_fungus", count: 4 },
      { id: "minecraft:shroomlight", count: 3 },
      { id: "minecraft:warped_wart_block", count: 8 },
      { id: "minecraft:ender_pearl", count: 6 }
    ]
  },
  {
    id: "soul_sand_valley",
    y: 40,
    name: "Soul Sand Catacomb",
    color: "§8",
    floor: "minecraft:soul_sand",
    subfloor: "minecraft:soul_soil",
    base: "minecraft:bone_block",
    feature: "soul_fire",
    mob: "minecraft:skeleton",
    chest: [
      { id: "minecraft:ghast_tear", count: 2 },
      { id: "minecraft:gunpowder", count: 6 },
      { id: "minecraft:soul_campfire", count: 1 },
      { id: "minecraft:bone", count: 12 }
    ]
  },
  {
    id: "amethyst_geode",
    y: 50,
    name: "Celestial Amethyst Geode",
    color: "§d",
    floor: "minecraft:amethyst_block",
    subfloor: "minecraft:budding_amethyst",
    base: "minecraft:calcite",
    feature: "amethyst_crystal",
    mob: null,
    chest: [
      { id: "minecraft:amethyst_shard", count: 12 },
      { id: "minecraft:spyglass", count: 1 },
      { id: "minecraft:tinted_glass", count: 6 },
      { id: "minecraft:calcite", count: 8 }
    ]
  },
  {
    id: "witch_swamp_hut",
    y: 58,
    name: "Witch Brew Hut",
    color: "§5",
    floor: "minecraft:mud_bricks",
    subfloor: "minecraft:mangrove_wood",
    base: "minecraft:mud",
    feature: "cauldron",
    mob: "minecraft:cat",
    chest: [
      { id: "minecraft:brewing_stand", count: 1 },
      { id: "minecraft:glass_bottle", count: 6 },
      { id: "minecraft:glowstone_dust", count: 6 },
      { id: "minecraft:redstone", count: 8 }
    ]
  },
  {
    id: "pillager_watchtower",
    y: 88,
    name: "Pillager Sky Outpost",
    color: "§8",
    floor: "minecraft:dark_oak_planks",
    subfloor: "minecraft:dark_oak_log",
    base: "minecraft:cobblestone",
    feature: "watchtower",
    mob: "minecraft:pillager",
    chest: [
      { id: "minecraft:crossbow", count: 1 },
      { id: "minecraft:arrow", count: 24 },
      { id: "minecraft:iron_ingot", count: 5 },
      { id: "minecraft:emerald", count: 6 }
    ]
  },
  {
    id: "desert_well_oasis",
    y: 62,
    name: "Desert Mirage Well",
    color: "§e",
    floor: "minecraft:sandstone",
    subfloor: "minecraft:sand",
    base: "minecraft:stone",
    feature: "sand_well",
    mob: "minecraft:camel",
    chest: [
      { id: "minecraft:cactus", count: 4 },
      { id: "minecraft:glass", count: 8 },
      { id: "minecraft:rabbit_hide", count: 4 },
      { id: "minecraft:water_bucket", count: 1 }
    ]
  },
  {
    id: "bamboo_monastery",
    y: 66,
    name: "Bamboo Panda Sanctuary",
    color: "§a",
    floor: "minecraft:bamboo_block",
    subfloor: "minecraft:moss_block",
    base: "minecraft:stone",
    feature: "bamboo_pillars",
    mob: "minecraft:panda",
    chest: [
      { id: "minecraft:cake", count: 1 },
      { id: "minecraft:bamboo", count: 16 },
      { id: "minecraft:cookie", count: 8 },
      { id: "minecraft:lead", count: 2 }
    ]
  },
  {
    id: "deepslate_forge",
    y: 36,
    name: "Ancient Deepslate Forge",
    color: "§7",
    floor: "minecraft:deepslate_bricks",
    subfloor: "minecraft:chiseled_deepslate",
    base: "minecraft:cobbled_deepslate",
    feature: "lava_forge",
    mob: null,
    chest: [
      { id: "minecraft:blast_furnace", count: 1 },
      { id: "minecraft:anvil", count: 1 },
      { id: "minecraft:iron_block", count: 2 },
      { id: "minecraft:raw_iron", count: 12 }
    ]
  },
  {
    id: "ocean_monument_shrine",
    y: 52,
    name: "Prismarine Ocean Shrine",
    color: "§3",
    floor: "minecraft:dark_prismarine",
    subfloor: "minecraft:prismarine_bricks",
    base: "minecraft:prismarine",
    feature: "sea_lanterns",
    mob: "minecraft:guardian",
    chest: [
      { id: "minecraft:sponge", count: 2 },
      { id: "minecraft:heart_of_the_sea", count: 1 },
      { id: "minecraft:nautilus_shell", count: 2 },
      { id: "minecraft:prismarine_shard", count: 8 }
    ]
  },
  {
    id: "glowstone_meteor",
    y: 90,
    name: "Fallen Glowstone Meteor",
    color: "§e",
    floor: "minecraft:glowstone",
    subfloor: "minecraft:magma",
    base: "minecraft:obsidian",
    feature: "meteor_core",
    mob: null,
    chest: [
      { id: "minecraft:glowstone_dust", count: 16 },
      { id: "minecraft:fire_charge", count: 4 },
      { id: "minecraft:golden_apple", count: 2 },
      { id: "minecraft:obsidian", count: 4 }
    ]
  },
  {
    id: "end_city_tower",
    y: 92,
    name: "End City Spire",
    color: "§5",
    floor: "minecraft:purpur_block",
    subfloor: "minecraft:purpur_pillar",
    base: "minecraft:end_stone_bricks",
    feature: "end_rod",
    mob: "minecraft:shulker",
    chest: [
      { id: "minecraft:shulker_shell", count: 2 },
      { id: "minecraft:chorus_fruit", count: 8 },
      { id: "minecraft:end_rod", count: 4 },
      { id: "minecraft:diamond", count: 2 }
    ]
  },
  {
    id: "fossil_excavation",
    y: 54,
    name: "Prehistoric Fossil Dig",
    color: "§f",
    floor: "minecraft:bone_block",
    subfloor: "minecraft:coarse_dirt",
    base: "minecraft:dirt",
    feature: "fossil_rib",
    mob: "minecraft:sniffer",
    chest: [
      { id: "minecraft:sniffer_egg", count: 1 },
      { id: "minecraft:torchflower_seeds", count: 4 },
      { id: "minecraft:pitcher_pod", count: 4 },
      { id: "minecraft:bone_meal", count: 16 }
    ]
  },
  {
    id: "blacksmith_workshop",
    y: 64,
    name: "Sky Blacksmith Forge",
    color: "§8",
    floor: "minecraft:smooth_stone",
    subfloor: "minecraft:cobblestone",
    base: "minecraft:stone",
    feature: "furnace",
    mob: "minecraft:iron_golem",
    chest: [
      { id: "minecraft:iron_pickaxe", count: 1 },
      { id: "minecraft:diamond_chestplate", count: 1 },
      { id: "minecraft:obsidian", count: 6 },
      { id: "minecraft:iron_ingot", count: 8 }
    ]
  },
  {
    id: "library_observatory",
    y: 82,
    name: "Arcane Sky Observatory",
    color: "§9",
    floor: "minecraft:bookshelf",
    subfloor: "minecraft:chiseled_bookshelf",
    base: "minecraft:stone_bricks",
    feature: "enchanting_setup",
    mob: null,
    chest: [
      { id: "minecraft:enchanted_book", count: 2 },
      { id: "minecraft:lapis_lazuli", count: 16 },
      { id: "minecraft:book", count: 6 },
      { id: "minecraft:experience_bottle", count: 8 }
    ]
  },
  {
    id: "alchemist_laboratory",
    y: 60,
    name: "Void Alchemist Laboratory",
    color: "§d",
    floor: "minecraft:polished_andesite",
    subfloor: "minecraft:andesite",
    base: "minecraft:stone",
    feature: "brewing_setup",
    mob: null,
    chest: [
      { id: "minecraft:brewing_stand", count: 1 },
      { id: "minecraft:glistering_melon_slice", count: 4 },
      { id: "minecraft:golden_carrot", count: 4 },
      { id: "minecraft:blaze_powder", count: 4 }
    ]
  },
  {
    id: "spider_nest",
    y: 44,
    name: "Cobweb Cave Nest",
    color: "§f",
    floor: "minecraft:infested_stone",
    subfloor: "minecraft:cobblestone",
    base: "minecraft:stone",
    feature: "webs",
    mob: "minecraft:cave_spider",
    chest: [
      { id: "minecraft:string", count: 16 },
      { id: "minecraft:spider_eye", count: 6 },
      { id: "minecraft:fermented_spider_eye", count: 3 },
      { id: "minecraft:cobweb", count: 4 }
    ]
  },
  {
    id: "creeper_dungeon",
    y: 46,
    name: "Volatile Gunpowder Depot",
    color: "§2",
    floor: "minecraft:mossy_cobblestone",
    subfloor: "minecraft:cobblestone",
    base: "minecraft:stone",
    feature: "tnt_barrel",
    mob: "minecraft:creeper",
    chest: [
      { id: "minecraft:tnt", count: 6 },
      { id: "minecraft:gunpowder", count: 12 },
      { id: "minecraft:music_disc_cat", count: 1 },
      { id: "minecraft:flint_and_steel", count: 1 }
    ]
  },
  {
    id: "slime_biosphere",
    y: 50,
    name: "Gelatinous Slime Isle",
    color: "§a",
    floor: "minecraft:lime_concrete",
    subfloor: "minecraft:moss_block",
    base: "minecraft:clay",
    feature: "slime_core",
    mob: "minecraft:slime",
    chest: [
      { id: "minecraft:slime_ball", count: 12 },
      { id: "minecraft:lead", count: 4 },
      { id: "minecraft:sticky_piston", count: 2 },
      { id: "minecraft:slime", count: 4 }
    ]
  },
  {
    id: "bee_apiary",
    y: 70,
    name: "Sunlit Honey Apiary",
    color: "§6",
    floor: "minecraft:honeycomb_block",
    subfloor: "minecraft:grass_block",
    base: "minecraft:dirt",
    feature: "beehive",
    mob: "minecraft:bee",
    chest: [
      { id: "minecraft:honey_bottle", count: 4 },
      { id: "minecraft:honeycomb", count: 8 },
      { id: "minecraft:shears", count: 1 },
      { id: "minecraft:sunflower", count: 4 }
    ]
  },
  {
    id: "pumpkin_patch",
    y: 64,
    name: "Haunted Pumpkin Patch",
    color: "§6",
    floor: "minecraft:carved_pumpkin",
    subfloor: "minecraft:grass_block",
    base: "minecraft:dirt",
    feature: "jack_o_lantern",
    mob: "minecraft:snow_golem",
    chest: [
      { id: "minecraft:pumpkin_pie", count: 4 },
      { id: "minecraft:pumpkin_seeds", count: 8 },
      { id: "minecraft:shears", count: 1 },
      { id: "minecraft:hay_block", count: 4 }
    ]
  },
  {
    id: "melon_greenhouse",
    y: 64,
    name: "Tropical Melon Greenhouse",
    color: "§a",
    floor: "minecraft:melon_block",
    subfloor: "minecraft:dirt",
    base: "minecraft:stone",
    feature: "glass_dome",
    mob: null,
    chest: [
      { id: "minecraft:melon_seeds", count: 8 },
      { id: "minecraft:glistering_melon_slice", count: 4 },
      { id: "minecraft:glass", count: 12 },
      { id: "minecraft:bone_meal", count: 8 }
    ]
  },
  {
    id: "sculk_laboratory",
    y: 32,
    name: "Ancient Sculk Laboratory",
    color: "§1",
    floor: "minecraft:sculk",
    subfloor: "minecraft:sculk_catalyst",
    base: "minecraft:deepslate",
    feature: "sculk_shrieker",
    mob: null,
    chest: [
      { id: "minecraft:echo_shard", count: 4 },
      { id: "minecraft:recovery_compass", count: 1 },
      { id: "minecraft:disc_fragment_5", count: 3 },
      { id: "minecraft:experience_bottle", count: 10 }
    ]
  },
  {
    id: "armory_vault",
    y: 52,
    name: "Knight Sky Armory",
    color: "§7",
    floor: "minecraft:stone_bricks",
    subfloor: "minecraft:iron_bars",
    base: "minecraft:cobblestone",
    feature: "anvil_stand",
    mob: null,
    chest: [
      { id: "minecraft:netherite_upgrade_smithing_template", count: 1 },
      { id: "minecraft:shield", count: 1 },
      { id: "minecraft:diamond_sword", count: 1 },
      { id: "minecraft:iron_block", count: 2 }
    ]
  },
  {
    id: "bakery_windmill",
    y: 70,
    name: "Windmill Grain Haven",
    color: "§e",
    floor: "minecraft:hay_block",
    subfloor: "minecraft:spruce_planks",
    base: "minecraft:dirt",
    feature: "hay_spire",
    mob: "minecraft:villager_v2",
    chest: [
      { id: "minecraft:bread", count: 12 },
      { id: "minecraft:cookie", count: 12 },
      { id: "minecraft:cake", count: 2 },
      { id: "minecraft:wheat", count: 16 }
    ]
  },
  {
    id: "aquarium_atoll",
    y: 56,
    name: "Coral Reef Biosphere",
    color: "§3",
    floor: "minecraft:tube_coral_block",
    subfloor: "minecraft:brain_coral_block",
    base: "minecraft:sand",
    feature: "coral_pool",
    mob: "minecraft:axolotl",
    chest: [
      { id: "minecraft:axolotl_bucket", count: 1 },
      { id: "minecraft:tropical_fish_bucket", count: 1 },
      { id: "minecraft:sea_pickle", count: 4 },
      { id: "minecraft:sponge", count: 1 }
    ]
  },
  {
    id: "tuff_golem_sanctuary",
    y: 42,
    name: "Tuff Golem Sanctuary",
    color: "§8",
    floor: "minecraft:chiseled_tuff_bricks",
    subfloor: "minecraft:tuff_bricks",
    base: "minecraft:tuff",
    feature: "copper_bulb",
    mob: null,
    chest: [
      { id: "minecraft:copper_bulb", count: 4 },
      { id: "minecraft:copper_grate", count: 6 },
      { id: "minecraft:trial_key", count: 2 },
      { id: "minecraft:diamond", count: 2 }
    ]
  },
  {
    id: "meteorite_crater",
    y: 48,
    name: "Starlight Meteorite Crater",
    color: "§5",
    floor: "minecraft:crying_obsidian",
    subfloor: "minecraft:obsidian",
    base: "minecraft:magma",
    feature: "star_core",
    mob: null,
    chest: [
      { id: "minecraft:nether_star", count: 1 },
      { id: "minecraft:diamond", count: 4 },
      { id: "minecraft:crying_obsidian", count: 6 },
      { id: "minecraft:ender_eye", count: 4 }
    ]
  },
  {
    id: "golden_pantheon",
    y: 95,
    name: "Pantheon of the Gods",
    color: "§6",
    floor: "minecraft:quartz_block",
    subfloor: "minecraft:chiseled_quartz_block",
    base: "minecraft:gold_block",
    feature: "god_altar",
    mob: null,
    chest: [
      { id: "minecraft:enchanted_golden_apple", count: 2 },
      { id: "minecraft:totem_of_undying", count: 1 },
      { id: "minecraft:netherite_ingot", count: 1 },
      { id: "minecraft:gold_block", count: 4 }
    ]
  },
  {
    id: "void_gateway_outpost",
    y: 86,
    name: "Void Gateway Shrine",
    color: "§5",
    floor: "minecraft:end_stone_bricks",
    subfloor: "minecraft:purpur_pillar",
    base: "minecraft:obsidian",
    feature: "gateway_beam",
    mob: null,
    chest: [
      { id: "minecraft:elytra", count: 1 },
      { id: "minecraft:dragon_breath", count: 3 },
      { id: "minecraft:ender_eye", count: 6 },
      { id: "minecraft:firework_rocket", count: 16 }
    ]
  }
];

// Computes non-overlapping coordinates in unloaded void chunks (140 to 250 blocks from spawn)
export function getIslandLocation(index, total, theme) {
  const angle = (index * 360) / total;
  const rad = (angle * Math.PI) / 180;
  // Radial distance from 80 to 120 blocks: Visible with normal render distance, feels like a real voyage!
  const distance = 80 + (index % 5) * 10;
  const cx = Math.round(distance * Math.cos(rad));
  const cz = Math.round(distance * Math.sin(rad));
  // Thematic Y Level: Skyblock height kept accessible (Y=62 to Y=74)
  const cy = (theme && typeof theme.y === "number") ? Math.min(74, Math.max(62, theme.y)) : 64;

  let cardinal = "North";
  if (Math.abs(cx) > Math.abs(cz)) {
    cardinal = cx > 0 ? "East" : "West";
  } else {
    cardinal = cz > 0 ? "South" : "North";
  }

  return {
    center: { x: cx, y: cy, z: cz },
    distance,
    cardinal: `${cardinal} (X: ${cx}, Z: ${cz})`
  };
}

// Strictly places blocks only where air currently exists.
// Never overwrites player-placed blocks, structures, or bridges!
function safeAirOnlySetBlock(dimension, loc, typeId) {
  try {
    const b = dimension.getBlock(loc);
    if (b && (b.isAir || b.typeId === "minecraft:air")) {
      b.setType(typeId);
      return true;
    }
  } catch (e) {}
  return false;
}

// Builds the themed island platform safely
export function buildThemedIsland(dimension, theme, center) {
  const { x: cx, y: cy, z: cz } = center;

  // 1. Foundation: 9x9 natural tiered Skyblock floating island platform (downward cone)
  for (let dx = -4; dx <= 4; dx++) {
    for (let dz = -4; dz <= 4; dz++) {
      const distSq = dx * dx + dz * dz;
      // Top surface (radius ~4)
      if (distSq <= 16) {
        safeAirOnlySetBlock(dimension, { x: cx + dx, y: cy, z: cz + dz }, theme.floor);
      }
      // Layer -1 (radius ~3.5)
      if (distSq <= 12) {
        safeAirOnlySetBlock(dimension, { x: cx + dx, y: cy - 1, z: cz + dz }, theme.subfloor);
      }
      // Layer -2 (radius ~2.8)
      if (distSq <= 8) {
        safeAirOnlySetBlock(dimension, { x: cx + dx, y: cy - 2, z: cz + dz }, theme.base);
      }
      // Layer -3 hanging bedrock/stone root tip (radius ~1.5)
      if (distSq <= 3) {
        safeAirOnlySetBlock(dimension, { x: cx + dx, y: cy - 3, z: cz + dz }, theme.base);
      }
      // Island bottom point
      if (distSq <= 1) {
        safeAirOnlySetBlock(dimension, { x: cx + dx, y: cy - 4, z: cz + dz }, theme.base);
      }
    }
  }

  // 2. Center Lodestone beacon (compass tracking destination)
  safeAirOnlySetBlock(dimension, { x: cx, y: cy + 1, z: cz }, "minecraft:lodestone");

  // 3. Thematic Corner Lanterns / Torches
  const corners = [[-3, -3], [3, -3], [-3, 3], [3, 3]];
  for (const [ox, oz] of corners) {
    safeAirOnlySetBlock(dimension, { x: cx + ox, y: cy + 1, z: cz + oz }, "minecraft:lantern");
  }

  // 4. Compact Thematic Skyblock Feature / Micro-Structure
  try {
    const feat = theme.feature;
    if (feat === "blossom_tree" || feat === "bamboo_grove") {
      // Natural Tree feature
      const log = feat === "blossom_tree" ? "minecraft:cherry_log" : "minecraft:oak_log";
      const leaves = feat === "blossom_tree" ? "minecraft:cherry_leaves" : "minecraft:oak_leaves";
      for (let h = 1; h <= 4; h++) safeAirOnlySetBlock(dimension, { x: cx - 2, y: cy + h, z: cz - 2 }, log);
      for (let lx = -3; lx <= -1; lx++) {
        for (let lz = -3; lz <= -1; lz++) {
          safeAirOnlySetBlock(dimension, { x: cx + lx, y: cy + 4, z: cz + lz }, leaves);
          safeAirOnlySetBlock(dimension, { x: cx + lx, y: cy + 5, z: cz + lz }, leaves);
        }
      }
    } else if (feat === "huge_mushroom") {
      for (let h = 1; h <= 4; h++) safeAirOnlySetBlock(dimension, { x: cx - 2, y: cy + h, z: cz - 2 }, "minecraft:mushroom_stem");
      for (let mx = -3; mx <= -1; mx++) {
        for (let mz = -3; mz <= -1; mz++) {
          safeAirOnlySetBlock(dimension, { x: cx + mx, y: cy + 4, z: cz + mz }, "minecraft:red_mushroom_block");
        }
      }
    } else if (feat === "copper_spire" || feat === "pillars") {
      const spireMat = feat === "copper_spire" ? "minecraft:copper_block" : "minecraft:chiseled_sandstone";
      for (let h = 1; h <= 3; h++) {
        safeAirOnlySetBlock(dimension, { x: cx - 2, y: cy + h, z: cz - 2 }, spireMat);
        safeAirOnlySetBlock(dimension, { x: cx + 2, y: cy + h, z: cz - 2 }, spireMat);
      }
    } else if (feat === "well" || feat === "sand_well") {
      safeAirOnlySetBlock(dimension, { x: cx - 2, y: cy + 1, z: cz - 2 }, "minecraft:water");
    } else if (feat === "amethyst_crystal") {
      safeAirOnlySetBlock(dimension, { x: cx - 2, y: cy + 1, z: cz - 2 }, "minecraft:amethyst_block");
      safeAirOnlySetBlock(dimension, { x: cx - 2, y: cy + 2, z: cz - 2 }, "minecraft:amethyst_cluster");
    }
  } catch (fe) {}

  // 5. Guaranteed Treasure Chest with resource progression loot
  const chestPos = { x: cx, y: cy + 1, z: cz + 2 };
  safeAirOnlySetBlock(dimension, chestPos, "minecraft:chest");
  try {
    const chestBlock = dimension.getBlock(chestPos);
    if (chestBlock) {
      const inv = chestBlock.getComponent("minecraft:inventory")?.container;
      if (inv) {
        for (const item of theme.chest) {
          try {
            inv.addItem(new ItemStack(item.id, item.count));
          } catch (ie) {}
        }
      }
    }
  } catch (e) {}

  // 6. Thematic Mob Spawn (if specified)
  if (theme.mob) {
    try {
      dimension.spawnEntity(theme.mob, { x: cx + 0.5, y: cy + 1, z: cz - 1.5 });
    } catch (e) {}
  }
}
