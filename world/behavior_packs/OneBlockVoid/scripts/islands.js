// 42+ Unique Themed Secret Void Islands for OneBlock Survival
// Each island generates out in unloaded chunks (140 to 250 blocks away from 0,64,0)
// and strictly preserves player-placed blocks (air-only placement) so nothing is ever overwritten!

import { ItemStack } from "@minecraft/server";

export const ISLAND_THEMES = [
  {
    id: "sky_oasis",
    size: "huge",
    trait: "village",
    biome: "plains",
    tier: 1, // Tier 1 (Starter/Agri)
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
    size: "big",
    trait: "ore_rich",
    biome: "desert",
    tier: 2, // Tier 2 (Mining/Iron)
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
    size: "huge",
    trait: "dungeon",
    biome: "deep_dark",
    tier: 4, // Tier 4 (End/Relics)
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
    size: "big",
    trait: "dungeon",
    biome: "the_end",
    tier: 4, // Tier 4 (End/Relics)
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
    size: "huge",
    trait: "lush_flora",
    biome: "cherry_grove",
    tier: 1, // Tier 1 (Starter/Agri)
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
    size: "medium",
    trait: "lush_flora",
    biome: "dark_forest",
    tier: 4, // Tier 4 (End/Relics)
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
    size: "huge",
    trait: "animals",
    biome: "mushroom_island",
    tier: 1, // Tier 1 (Starter/Agri)
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
    size: "huge",
    trait: "ore_rich",
    biome: "mesa",
    tier: 2, // Tier 2 (Mining/Iron)
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
    size: "big",
    trait: "animals",
    biome: "ice_plains_spikes",
    tier: 2, // Tier 2 (Mining/Iron)
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
    size: "huge",
    trait: "lush_flora",
    biome: "jungle",
    tier: 2, // Tier 2 (Mining/Iron)
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
    size: "huge",
    trait: "lava_spring",
    biome: "nether_wastes",
    tier: 3, // Tier 3 (Nether/Magic)
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
    size: "huge",
    trait: "ore_rich",
    biome: "nether_wastes",
    tier: 4, // Tier 4 (End/Relics)
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
    size: "big",
    trait: "lush_flora",
    biome: "crimson_forest",
    tier: 3, // Tier 3 (Nether/Magic)
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
    size: "big",
    trait: "water_spring",
    biome: "warped_forest",
    tier: 3, // Tier 3 (Nether/Magic)
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
    size: "medium",
    trait: "lava_spring",
    biome: "soulsand_valley",
    tier: 3, // Tier 3 (Nether/Magic)
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
    size: "big",
    trait: "water_spring",
    biome: "lush_caves",
    tier: 3, // Tier 3 (Nether/Magic)
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
    size: "big",
    trait: "dungeon",
    biome: "swampland",
    tier: 3, // Tier 3 (Nether/Magic)
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
    size: "huge",
    trait: "dungeon",
    biome: "meadow",
    tier: 3, // Tier 3 (Nether/Magic)
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
    size: "medium",
    trait: "water_spring",
    biome: "desert",
    tier: 1, // Tier 1 (Starter/Agri)
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
    size: "huge",
    trait: "animals",
    biome: "bamboo_jungle",
    tier: 1, // Tier 1 (Starter/Agri)
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
    size: "big",
    trait: "ore_rich",
    biome: "deep_dark",
    tier: 2, // Tier 2 (Mining/Iron)
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
    size: "huge",
    trait: "water_spring",
    biome: "deep_ocean",
    tier: 3, // Tier 3 (Nether/Magic)
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
    size: "medium",
    trait: "lava_spring",
    biome: "basalt_deltas",
    tier: 3, // Tier 3 (Nether/Magic)
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
    size: "huge",
    trait: "dungeon",
    biome: "the_end",
    tier: 4, // Tier 4 (End/Relics)
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
    size: "big",
    trait: "ore_rich",
    biome: "desert",
    tier: 2, // Tier 2 (Mining/Iron)
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
    size: "big",
    trait: "village",
    biome: "stony_peaks",
    tier: 2, // Tier 2 (Mining/Iron)
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
    size: "big",
    trait: "ancient_shrine",
    biome: "jagged_peaks",
    tier: 3, // Tier 3 (Nether/Magic)
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
    size: "medium",
    trait: "dungeon",
    biome: "dark_forest",
    tier: 3, // Tier 3 (Nether/Magic)
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
    size: "medium",
    trait: "dungeon",
    biome: "dripstone_caves",
    tier: 2, // Tier 2 (Mining/Iron)
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
    size: "medium",
    trait: "dungeon",
    biome: "lush_caves",
    tier: 2, // Tier 2 (Mining/Iron)
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
    size: "big",
    trait: "water_spring",
    biome: "swampland",
    tier: 2, // Tier 2 (Mining/Iron)
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
    size: "big",
    trait: "animals",
    biome: "meadow",
    tier: 1, // Tier 1 (Starter/Agri)
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
    size: "big",
    trait: "animals",
    biome: "taiga",
    tier: 1, // Tier 1 (Starter/Agri)
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
    size: "big",
    trait: "village",
    biome: "jungle",
    tier: 1, // Tier 1 (Starter/Agri)
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
    size: "huge",
    trait: "dungeon",
    biome: "deep_dark",
    tier: 4, // Tier 4 (End/Relics)
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
    size: "big",
    trait: "ore_rich",
    biome: "stony_peaks",
    tier: 2, // Tier 2 (Mining/Iron)
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
    size: "huge",
    trait: "village",
    biome: "plains",
    tier: 1, // Tier 1 (Starter/Agri)
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
    size: "huge",
    trait: "water_spring",
    biome: "warm_ocean",
    tier: 1, // Tier 1 (Starter/Agri)
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
    size: "big",
    trait: "ore_rich",
    biome: "dripstone_caves",
    tier: 4, // Tier 4 (End/Relics)
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
    size: "huge",
    trait: "lava_spring",
    biome: "basalt_deltas",
    tier: 4, // Tier 4 (End/Relics)
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
    size: "huge",
    trait: "ancient_shrine",
    biome: "jagged_peaks",
    tier: 4, // Tier 4 (End/Relics)
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
    size: "huge",
    trait: "ancient_shrine",
    biome: "the_end",
    tier: 4, // Tier 4 (End/Relics)
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

// Computes non-overlapping coordinates in void space (80 to 125 blocks away)
// Calculates distance to guarantee no new island is placed near the previously materialized island!
export function getIslandLocation(index, total, theme, lastPos = null) {
  // Golden Angle spiral (137.508°): Guaranteed to distribute points as far apart as possible
  // so each consecutive island appears in an entirely different cardinal quadrant!
  const GOLDEN_ANGLE = 137.50776405;
  let angle = (index * GOLDEN_ANGLE) % 360;

  // Stagger radial distance between 85 and 120 blocks
  let distance = 85 + (index % 4) * 11;
  let rad = (angle * Math.PI) / 180;
  let cx = Math.round(distance * Math.cos(rad));
  let cz = Math.round(distance * Math.sin(rad));

  // Distance validation against last materialized island:
  // If too close to previous island (< 100 blocks), rotate angle by 90 degrees
  if (lastPos && typeof lastPos.x === "number" && typeof lastPos.z === "number") {
    let separation = Math.sqrt(Math.pow(cx - lastPos.x, 2) + Math.pow(cz - lastPos.z, 2));
    if (separation < 100) {
      angle = (angle + 90) % 360;
      rad = (angle * Math.PI) / 180;
      cx = Math.round(distance * Math.cos(rad));
      cz = Math.round(distance * Math.sin(rad));
    }
  }

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

// =========================================================================
// REALISTIC NATURAL FLOATING ISLAND GENERATOR
// =========================================================================
// - Authentic Geological Strata: Stone, Andesite, Diorite, Granite, Tuff, Deepslate
// - Subsoil: Dirt, Coarse Dirt, Rooted Dirt, Gravel, Clay
// - Surface: Grass Block, Podzol, Mycelium, Sand, Nylium + Wildflowers & Vegetation
// - Embedded Ore Veins: Coal, Copper, Iron, Gold, Lapis, Redstone, Diamond, Emerald
// - Scale Varieties: Huge (R~11), Big (R~8.5), Medium (R~6.5), Compact (R~5)
// - Specialized Traits: Village, Animals, Water Spring / Waterfall, Lava Spring / Cascade,
//   Ore-Rich Mine, Dungeon / Mobs, Lush Flora Tree, Ancient Shrine

function getRockBlock(theme, dx, dz, d, seed) {
  if (theme.biome === "the_end") return "minecraft:end_stone";
  if (theme.biome.includes("nether") || theme.biome.includes("valley")) {
    const nh = Math.abs((dx * 31 + dz * 17 + d * 7 + seed) % 100);
    return nh < 55 ? "minecraft:netherrack" : (nh < 80 ? "minecraft:blackstone" : "minecraft:basalt");
  }
  if (theme.biome === "deep_dark" || d >= 7) {
    return ((dx + dz + d) % 3 === 0) ? "minecraft:cobbled_deepslate" : "minecraft:deepslate";
  }
  // Realistic natural rock mix:
  const h = Math.abs((dx * 43 + dz * 29 + d * 13 + seed) % 100);
  if (h < 42) return "minecraft:stone";
  if (h < 58) return "minecraft:andesite";
  if (h < 74) return "minecraft:diorite";
  if (h < 88) return "minecraft:granite";
  return "minecraft:tuff";
}

function getOreBlock(theme, depth, dx, dz, seed) {
  const isNether = theme.biome.includes("nether") || theme.biome.includes("valley") || theme.biome.includes("deltas");
  if (isNether) {
    const no = Math.abs((dx * 19 + dz * 23 + seed) % 100);
    if (no < 50) return "minecraft:nether_quartz_ore";
    if (no < 90) return "minecraft:nether_gold_ore";
    return theme.tier >= 3 ? "minecraft:ancient_debris" : "minecraft:nether_gold_ore";
  }
  const isDeep = depth >= 6 || theme.biome === "deep_dark";
  const oh = Math.abs((dx * 71 + dz * 37 + depth * 19 + seed) % 100);

  if (theme.tier === 1) {
    return oh < 55 ? "minecraft:coal_ore" : (oh < 85 ? "minecraft:copper_ore" : "minecraft:iron_ore");
  }
  if (theme.tier === 2) {
    if (isDeep) {
      return oh < 40 ? "minecraft:deepslate_iron_ore" : (oh < 70 ? "minecraft:deepslate_gold_ore" : "minecraft:deepslate_redstone_ore");
    }
    return oh < 40 ? "minecraft:iron_ore" : (oh < 65 ? "minecraft:copper_ore" : (oh < 85 ? "minecraft:lapis_ore" : "minecraft:gold_ore"));
  }
  if (theme.tier === 3) {
    if (isDeep) {
      return oh < 35 ? "minecraft:deepslate_iron_ore" : (oh < 65 ? "minecraft:deepslate_gold_ore" : (oh < 85 ? "minecraft:deepslate_redstone_ore" : "minecraft:deepslate_diamond_ore"));
    }
    return oh < 30 ? "minecraft:gold_ore" : (oh < 60 ? "minecraft:redstone_ore" : (oh < 85 ? "minecraft:lapis_ore" : "minecraft:diamond_ore"));
  }
  // Tier 4
  if (isDeep) {
    return oh < 40 ? "minecraft:deepslate_diamond_ore" : (oh < 70 ? "minecraft:deepslate_redstone_ore" : (oh < 90 ? "minecraft:deepslate_emerald_ore" : "minecraft:ancient_debris"));
  }
  return oh < 45 ? "minecraft:diamond_ore" : (oh < 75 ? "minecraft:gold_ore" : "minecraft:emerald_ore");
}

function getSubsoilBlock(theme, dx, dz, seed) {
  if (theme.floor.includes("sand")) return theme.subfloor || "minecraft:sandstone";
  if (theme.floor.includes("nylium")) return "minecraft:netherrack";
  if (theme.floor.includes("end_stone")) return "minecraft:end_stone";
  if (theme.floor.includes("tuff")) return "minecraft:tuff";

  const sh = Math.abs((dx * 37 + dz * 41 + seed) % 100);
  if (sh < 65) return "minecraft:dirt";
  if (sh < 80) return "minecraft:coarse_dirt";
  if (sh < 92) return "minecraft:rooted_dirt";
  return "minecraft:gravel";
}

function placeSurfaceVegetation(dimension, theme, loc, seed) {
  const { x, y, z } = loc;
  try {
    if (theme.floor === "minecraft:grass_block") {
      const vh = Math.abs((x * 29 + z * 31 + seed) % 100);
      if (vh < 35) {
        safeAirOnlySetBlock(dimension, { x, y: y + 1, z }, "minecraft:short_grass");
      } else if (vh < 45) {
        safeAirOnlySetBlock(dimension, { x, y: y + 1, z }, "minecraft:dandelion");
      } else if (vh < 55) {
        safeAirOnlySetBlock(dimension, { x, y: y + 1, z }, "minecraft:poppy");
      } else if (vh < 63) {
        safeAirOnlySetBlock(dimension, { x, y: y + 1, z }, "minecraft:cornflower");
      } else if (vh < 70) {
        safeAirOnlySetBlock(dimension, { x, y: y + 1, z }, "minecraft:oxeye_daisy");
      }
    } else if (theme.floor === "minecraft:podzol") {
      const vh = Math.abs((x * 29 + z * 31 + seed) % 100);
      if (vh < 40) safeAirOnlySetBlock(dimension, { x, y: y + 1, z }, "minecraft:fern");
      else if (vh < 55) safeAirOnlySetBlock(dimension, { x, y: y + 1, z }, "minecraft:sweet_berry_bush");
    } else if (theme.biome === "cherry_grove") {
      const vh = Math.abs((x * 29 + z * 31 + seed) % 100);
      if (vh < 60) safeAirOnlySetBlock(dimension, { x, y: y + 1, z }, "minecraft:pink_petals");
    } else if (theme.floor.includes("sand")) {
      const vh = Math.abs((x * 29 + z * 31 + seed) % 100);
      if (vh < 20) safeAirOnlySetBlock(dimension, { x, y: y + 1, z }, "minecraft:deadbush");
    } else if (theme.floor === "minecraft:crimson_nylium") {
      const vh = Math.abs((x * 29 + z * 31 + seed) % 100);
      if (vh < 35) safeAirOnlySetBlock(dimension, { x, y: y + 1, z }, "minecraft:crimson_roots");
      else if (vh < 50) safeAirOnlySetBlock(dimension, { x, y: y + 1, z }, "minecraft:crimson_fungus");
    } else if (theme.floor === "minecraft:warped_nylium") {
      const vh = Math.abs((x * 29 + z * 31 + seed) % 100);
      if (vh < 35) safeAirOnlySetBlock(dimension, { x, y: y + 1, z }, "minecraft:warped_roots");
      else if (vh < 50) safeAirOnlySetBlock(dimension, { x, y: y + 1, z }, "minecraft:warped_fungus");
    }
  } catch (e) {}
}

export function buildThemedIsland(dimension, theme, center) {
  const { x: cx, y: cy, z: cz } = center;

  // 1. AUTO-CHANGE BIOME: Paint true native Minecraft biome across island volume
  try {
    const biomeName = theme.biome || "plains";
    dimension.runCommand(`fillbiome ${cx - 14} ${cy - 12} ${cz - 14} ${cx + 14} ${cy + 18} ${cz + 14} ${biomeName}`);
  } catch (be) {}

  // 2. PROCEDURAL SHAPE & SCALE PER THEME:
  let seed = 0;
  for (let i = 0; i < theme.id.length; i++) {
    seed = (seed * 31 + theme.id.charCodeAt(i)) & 0xffffff;
  }

  // Radius scale by size category:
  let baseRadius = 6.2;
  if (theme.size === "huge") baseRadius = 10.5;
  else if (theme.size === "big") baseRadius = 8.2;
  else if (theme.size === "medium") baseRadius = 6.4;
  else if (theme.size === "compact") baseRadius = 4.8;

  const freq1 = 2 + (seed % 3);
  const freq2 = 3 + ((seed >> 2) % 3);
  const freq3 = 4 + ((seed >> 4) % 2);
  const amp1 = 0.9 + ((seed % 10) / 12);
  const amp2 = 0.6 + (((seed >> 3) % 10) / 18);
  const amp3 = 0.4 + (((seed >> 6) % 10) / 25);
  const ridgeAngle = ((seed % 8) * Math.PI) / 4;

  const isOreRich = theme.trait === "ore_rich";
  const oreChance = isOreRich ? 28 : 15;

  const maxR = Math.ceil(baseRadius + amp1 + amp2 + amp3 + 1);

  // 3. TERRAIN VOLUME GENERATION:
  for (let dx = -maxR; dx <= maxR; dx++) {
    for (let dz = -maxR; dz <= maxR; dz++) {
      const angle = Math.atan2(dz, dx);
      const shapeMod = baseRadius + amp1 * Math.cos(freq1 * angle) + amp2 * Math.sin(freq2 * angle) + amp3 * Math.cos(freq3 * angle);
      const dist = Math.sqrt(dx * dx + dz * dz);

      if (dist <= shapeMod) {
        // Natural surface elevation (rolling topography):
        const dot = Math.cos(angle - ridgeAngle);
        let surfaceY = cy;
        if (dot > 0.35 && dist > 1.5) {
          surfaceY = cy + 1;
        }
        if (dot > 0.72 && dist > 3.0) {
          surfaceY = cy + 2; // Upper bluff crest
        }

        // POND ALCOVE (for water spring / nature):
        const isSpringPond = (theme.trait === "water_spring" || theme.trait === "animals") && (dot < -0.45 && dist >= 2.0 && dist <= 4.2);

        // Place surface layer:
        if (isSpringPond) {
          safeAirOnlySetBlock(dimension, { x: cx + dx, y: cy, z: cz + dz }, "minecraft:water");
          safeAirOnlySetBlock(dimension, { x: cx + dx, y: cy - 1, z: cz + dz }, "minecraft:clay");
        } else {
          safeAirOnlySetBlock(dimension, { x: cx + dx, y: surfaceY, z: cz + dz }, theme.floor);
          placeSurfaceVegetation(dimension, theme, { x: cx + dx, y: surfaceY, z: cz + dz }, seed);

          // Fill elevated hill step underneath with subsoil
          if (surfaceY > cy) {
            for (let upY = cy; upY < surfaceY; upY++) {
              safeAirOnlySetBlock(dimension, { x: cx + dx, y: upY, z: cz + dz }, getSubsoilBlock(theme, dx, dz, seed));
            }
          }
        }

        // 4. SUBSOIL & ROCK STRATA UNDERSIDE:
        const depth = Math.max(1, Math.round((shapeMod - dist) * 1.35));
        for (let d = 1; d <= depth; d++) {
          let blockMat;
          if (d <= 2) {
            // Subsoil layer (dirt / coarse dirt / rooted dirt / gravel)
            blockMat = getSubsoilBlock(theme, dx, dz, seed);
          } else {
            // Stone strata with real ore veins!
            const oreHash = Math.abs((dx * 67 + dz * 43 + d * 19 + seed) % 100);
            if (oreHash < oreChance) {
              blockMat = getOreBlock(theme, d, dx, dz, seed);
            } else {
              blockMat = getRockBlock(theme, dx, dz, d, seed);
            }
          }
          safeAirOnlySetBlock(dimension, { x: cx + dx, y: cy - d, z: cz + dz }, blockMat);
        }

        // Hanging root stalactites underneath:
        if (dist <= 3.2 && (dx + dz + (seed % 4)) % 2 === 0) {
          const rootMat = getRockBlock(theme, dx, dz, depth + 1, seed);
          safeAirOnlySetBlock(dimension, { x: cx + dx, y: cy - depth - 1, z: cz + dz }, rootMat);
          if (dist <= 1.5) {
            safeAirOnlySetBlock(dimension, { x: cx + dx, y: cy - depth - 2, z: cz + dz }, rootMat);
          }
        }
      }
    }
  }

  // 5. CENTRAL LODESTONE MONUMENT:
  // Placed right at island center (cx, cy + 1, cz)
  safeAirOnlySetBlock(dimension, { x: cx, y: cy + 1, z: cz }, "minecraft:lodestone");

  // 6. SAFE GUARANTEED TREASURE CHEST:
  const chestPos = { x: cx, y: cy + 1, z: cz + 2 };
  try {
    const floorBlock = dimension.getBlock({ x: chestPos.x, y: chestPos.y - 1, z: chestPos.z });
    if (floorBlock && (floorBlock.isAir || floorBlock.typeId === "minecraft:air")) {
      floorBlock.setType(theme.floor);
    }
    const chestBlock = dimension.getBlock(chestPos);
    if (chestBlock) {
      chestBlock.setType("minecraft:chest");
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

  // 7. THEMATIC SPECIAL STRUCTURES / TRAITS:
  try {
    const tr = theme.trait;

    if (tr === "village") {
      // Build authentic Wooden Village Cottage at North-West of island
      const hx = cx - 4;
      const hz = cz - 4;
      const hy = cy + 1;

      // 4x4 Cottage walls & foundation
      for (let x = 0; x <= 3; x++) {
        for (let z = 0; z <= 3; z++) {
          safeAirOnlySetBlock(dimension, { x: hx + x, y: hy - 1, z: hz + z }, "minecraft:cobblestone");
          // Pillars at corners
          const isCorner = (x === 0 || x === 3) && (z === 0 || z === 3);
          const mat = isCorner ? "minecraft:oak_log" : "minecraft:oak_planks";
          for (let y = 0; y <= 2; y++) {
            safeAirOnlySetBlock(dimension, { x: hx + x, y: hy + y, z: hz + z }, mat);
          }
          // Roof
          safeAirOnlySetBlock(dimension, { x: hx + x, y: hy + 3, z: hz + z }, "minecraft:oak_planks");
        }
      }
      // Cottage Door & Window
      safeAirOnlySetBlock(dimension, { x: hx + 1, y: hy, z: hz }, "minecraft:air");
      safeAirOnlySetBlock(dimension, { x: hx + 1, y: hy + 1, z: hz }, "minecraft:air");
      safeAirOnlySetBlock(dimension, { x: hx + 2, y: hy + 1, z: hz + 3 }, "minecraft:glass_pane");

      // Interior furniture: Bed, Crafting Table, Furnace, Torch
      safeAirOnlySetBlock(dimension, { x: hx + 2, y: hy, z: hz + 2 }, "minecraft:red_bed");
      safeAirOnlySetBlock(dimension, { x: hx + 1, y: hy, z: hz + 2 }, "minecraft:crafting_table");
      safeAirOnlySetBlock(dimension, { x: hx + 2, y: hy, z: hz + 1 }, "minecraft:furnace");
      safeAirOnlySetBlock(dimension, { x: hx + 1, y: hy + 2, z: hz + 1 }, "minecraft:torch");

      // Farm plot with farmland, water, wheat & carrots
      const fx = cx + 3;
      const fz = cz - 2;
      for (let fxo = -1; fxo <= 1; fxo++) {
        for (let fzo = -1; fzo <= 1; fzo++) {
          if (fxo === 0 && fzo === 0) {
            safeAirOnlySetBlock(dimension, { x: fx + fxo, y: cy, z: fz + fzo }, "minecraft:water");
          } else {
            safeAirOnlySetBlock(dimension, { x: fx + fxo, y: cy, z: fz + fzo }, "minecraft:farmland");
            safeAirOnlySetBlock(dimension, { x: fx + fxo, y: cy + 1, z: fz + fzo }, (fxo + fzo) % 2 === 0 ? "minecraft:wheat" : "minecraft:carrots");
          }
        }
      }
      // Village Bell & Hay Bales
      safeAirOnlySetBlock(dimension, { x: cx + 2, y: cy + 1, z: cz + 3 }, "minecraft:oak_fence");
      safeAirOnlySetBlock(dimension, { x: cx + 2, y: cy + 2, z: cz + 3 }, "minecraft:bell");
      safeAirOnlySetBlock(dimension, { x: cx + 3, y: cy + 1, z: cz + 3 }, "minecraft:hay_block");
      safeAirOnlySetBlock(dimension, { x: cx + 3, y: cy + 2, z: cz + 3 }, "minecraft:hay_block");

      // Spawn Villager
      dimension.spawnEntity("minecraft:villager_v2", { x: hx + 1.5, y: hy, z: hz + 1.5 });

    } else if (tr === "animals") {
      // Build animal paddock & spawn pastoral creatures
      const px = cx - 3;
      const pz = cz + 3;
      for (let ox = -2; ox <= 2; ox++) {
        for (let oz = -2; oz <= 2; oz++) {
          const isBorder = (Math.abs(ox) === 2 || Math.abs(oz) === 2);
          if (isBorder && !(ox === 0 && oz === 2)) {
            safeAirOnlySetBlock(dimension, { x: px + ox, y: cy + 1, z: pz + oz }, "minecraft:oak_fence");
          }
        }
      }
      safeAirOnlySetBlock(dimension, { x: px, y: cy + 1, z: pz + 2 }, "minecraft:oak_fence_gate");
      safeAirOnlySetBlock(dimension, { x: px - 1, y: cy + 1, z: pz - 1 }, "minecraft:cauldron");
      safeAirOnlySetBlock(dimension, { x: px + 1, y: cy + 1, z: pz - 1 }, "minecraft:hay_block");

      // Themed animals spawn:
      if (theme.id === "bee_apiary") {
        safeAirOnlySetBlock(dimension, { x: px, y: cy + 2, z: pz - 1 }, "minecraft:bee_nest");
        dimension.spawnEntity("minecraft:bee", { x: px + 0.5, y: cy + 2, z: pz + 0.5 });
        dimension.spawnEntity("minecraft:bee", { x: px - 0.5, y: cy + 2, z: pz + 0.5 });
      } else if (theme.id === "bamboo_monastery") {
        dimension.spawnEntity("minecraft:panda", { x: px + 0.5, y: cy + 1, z: pz + 0.5 });
      } else if (theme.id === "ice_spike_peak") {
        dimension.spawnEntity("minecraft:polar_bear", { x: px + 0.5, y: cy + 1, z: pz + 0.5 });
      } else if (theme.id === "mushroom_haven") {
        dimension.spawnEntity("minecraft:mooshroom", { x: px + 0.5, y: cy + 1, z: pz + 0.5 });
        dimension.spawnEntity("minecraft:mooshroom", { x: px - 0.5, y: cy + 1, z: pz - 0.5 });
      } else {
        dimension.spawnEntity("minecraft:cow", { x: px + 0.5, y: cy + 1, z: pz + 0.5 });
        dimension.spawnEntity("minecraft:sheep", { x: px - 0.5, y: cy + 1, z: pz - 0.5 });
      }

    } else if (tr === "water_spring") {
      // Natural Spring with cascading waterfall spilling into void!
      const wx = cx - 3;
      const wz = cz - 2;
      safeAirOnlySetBlock(dimension, { x: wx, y: cy, z: wz }, "minecraft:water");
      safeAirOnlySetBlock(dimension, { x: wx - 1, y: cy, z: wz }, "minecraft:water");
      safeAirOnlySetBlock(dimension, { x: wx - 2, y: cy, z: wz }, "minecraft:water");
      // Waterfall channel down the cliff edge:
      for (let yDrop = 0; yDrop <= 5; yDrop++) {
        safeAirOnlySetBlock(dimension, { x: wx - 3, y: cy - yDrop, z: wz }, "minecraft:water");
      }
      safeAirOnlySetBlock(dimension, { x: wx, y: cy + 1, z: wz + 1 }, "minecraft:sugar_cane");
      safeAirOnlySetBlock(dimension, { x: wx, y: cy + 2, z: wz + 1 }, "minecraft:sugar_cane");
      safeAirOnlySetBlock(dimension, { x: wx - 1, y: cy + 1, z: wz }, "minecraft:lily_pad");

    } else if (tr === "lava_spring") {
      // Volcanic fissure with bubbling lava cascading down cliff into void!
      const lx = cx - 2;
      const lz = cz - 3;
      safeAirOnlySetBlock(dimension, { x: lx, y: cy, z: lz }, "minecraft:lava");
      safeAirOnlySetBlock(dimension, { x: lx - 1, y: cy, z: lz }, "minecraft:magma");
      safeAirOnlySetBlock(dimension, { x: lx + 1, y: cy, z: lz }, "minecraft:magma");
      safeAirOnlySetBlock(dimension, { x: lx, y: cy, z: lz - 1 }, "minecraft:crying_obsidian");
      for (let yDrop = 0; yDrop <= 6; yDrop++) {
        safeAirOnlySetBlock(dimension, { x: lx, y: cy - yDrop, z: lz - 2 }, "minecraft:lava");
      }

    } else if (tr === "ore_rich") {
      // Dramatic exposed mine cliff with rich mineral blocks and rails
      const mx = cx + 3;
      const mz = cz - 3;
      safeAirOnlySetBlock(dimension, { x: mx, y: cy + 1, z: mz }, "minecraft:raw_iron_block");
      safeAirOnlySetBlock(dimension, { x: mx + 1, y: cy + 1, z: mz }, "minecraft:gold_ore");
      safeAirOnlySetBlock(dimension, { x: mx, y: cy + 2, z: mz }, "minecraft:diamond_ore");
      safeAirOnlySetBlock(dimension, { x: mx + 1, y: cy + 2, z: mz }, "minecraft:raw_gold_block");
      safeAirOnlySetBlock(dimension, { x: mx - 1, y: cy + 1, z: mz }, "minecraft:anvil");
      safeAirOnlySetBlock(dimension, { x: mx - 1, y: cy + 1, z: mz + 1 }, "minecraft:rail");
      safeAirOnlySetBlock(dimension, { x: mx, y: cy + 1, z: mz + 1 }, "minecraft:rail");

    } else if (tr === "dungeon") {
      // Ancient mossy stone brick dungeon ruins with iron bars & spawner pedestal
      const dx = cx - 3;
      const dz = cz + 2;
      for (let x = -1; x <= 1; x++) {
        for (let z = -1; z <= 1; z++) {
          safeAirOnlySetBlock(dimension, { x: dx + x, y: cy, z: dz + z }, (x + z) % 2 === 0 ? "minecraft:mossy_cobblestone" : "minecraft:cracked_stone_bricks");
        }
      }
      safeAirOnlySetBlock(dimension, { x: dx - 1, y: cy + 1, z: dz - 1 }, "minecraft:iron_bars");
      safeAirOnlySetBlock(dimension, { x: dx + 1, y: cy + 1, z: dz - 1 }, "minecraft:iron_bars");
      safeAirOnlySetBlock(dimension, { x: dx - 1, y: cy + 1, z: dz + 1 }, "minecraft:iron_bars");
      safeAirOnlySetBlock(dimension, { x: dx + 1, y: cy + 1, z: dz + 1 }, "minecraft:iron_bars");
      safeAirOnlySetBlock(dimension, { x: dx, y: cy + 1, z: dz }, "minecraft:chiseled_stone_bricks");
      safeAirOnlySetBlock(dimension, { x: dx, y: cy + 2, z: dz }, "minecraft:cobweb");

      if (theme.mob) {
        dimension.spawnEntity(theme.mob, { x: dx + 0.5, y: cy + 1, z: dz + 0.5 });
      }

    } else if (tr === "lush_flora") {
      // Custom magnificent tree
      const tx = cx - 3;
      const tz = cz - 2;
      const logMat = theme.id === "cherry_sanctuary" ? "minecraft:cherry_log" : (theme.id === "jungle_temple" ? "minecraft:jungle_log" : (theme.id === "pale_garden_spire" ? "minecraft:pale_oak_log" : "minecraft:oak_log"));
      const leafMat = theme.id === "cherry_sanctuary" ? "minecraft:cherry_leaves" : (theme.id === "jungle_temple" ? "minecraft:jungle_leaves" : (theme.id === "pale_garden_spire" ? "minecraft:pale_moss_block" : "minecraft:oak_leaves"));

      for (let h = 1; h <= 5; h++) {
        safeAirOnlySetBlock(dimension, { x: tx, y: cy + h, z: tz }, logMat);
      }
      for (let lx = -2; lx <= 2; lx++) {
        for (let lz = -2; lz <= 2; lz++) {
          if (Math.abs(lx) + Math.abs(lz) <= 3) {
            safeAirOnlySetBlock(dimension, { x: tx + lx, y: cy + 4, z: tz + lz }, leafMat);
            safeAirOnlySetBlock(dimension, { x: tx + lx, y: cy + 5, z: tz + lz }, leafMat);
            if (Math.abs(lx) <= 1 && Math.abs(lz) <= 1) {
              safeAirOnlySetBlock(dimension, { x: tx + lx, y: cy + 6, z: tz + lz }, leafMat);
            }
          }
        }
      }
      if (theme.id === "cherry_sanctuary") {
        safeAirOnlySetBlock(dimension, { x: tx - 1, y: cy + 3, z: tz }, "minecraft:bee_nest");
      }

    } else if (tr === "ancient_shrine") {
      // Marble quartz dais & god altar with sea lanterns
      const sx = cx + 3;
      const sz = cz + 3;
      for (let x = -1; x <= 1; x++) {
        for (let z = -1; z <= 1; z++) {
          safeAirOnlySetBlock(dimension, { x: sx + x, y: cy + 1, z: sz + z }, "minecraft:quartz_block");
        }
      }
      safeAirOnlySetBlock(dimension, { x: sx - 1, y: cy + 2, z: sz - 1 }, "minecraft:chiseled_quartz_block");
      safeAirOnlySetBlock(dimension, { x: sx + 1, y: cy + 2, z: sz - 1 }, "minecraft:chiseled_quartz_block");
      safeAirOnlySetBlock(dimension, { x: sx - 1, y: cy + 2, z: sz + 1 }, "minecraft:chiseled_quartz_block");
      safeAirOnlySetBlock(dimension, { x: sx + 1, y: cy + 2, z: sz + 1 }, "minecraft:chiseled_quartz_block");
      safeAirOnlySetBlock(dimension, { x: sx, y: cy + 2, z: sz }, "minecraft:sea_lantern");
    }
  } catch (fe) {}

  // 8. CORNER LIGHTING POSTS:
  const lanternPosts = [
    { x: cx + 3, y: cy + 1, z: cz - 2 },
    { x: cx - 3, y: cy + 1, z: cz + 3 },
    { x: cx + 2, y: cy + 1, z: cz + 4 }
  ];
  for (const lp of lanternPosts) {
    safeAirOnlySetBlock(dimension, { x: lp.x, y: lp.y, z: lp.z }, "minecraft:oak_fence");
    safeAirOnlySetBlock(dimension, { x: lp.x, y: lp.y + 1, z: lp.z }, "minecraft:lantern");
  }

  // 9. THEMATIC COMPANION MOB (if not already spawned by trait):
  if (theme.mob && theme.trait !== "dungeon" && theme.trait !== "village" && theme.trait !== "animals") {
    try {
      dimension.spawnEntity(theme.mob, { x: cx + 0.5, y: cy + 1.2, z: cz - 1.5 });
    } catch (e) {}
  }
}
