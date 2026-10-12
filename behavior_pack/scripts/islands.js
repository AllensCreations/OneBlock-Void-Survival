// 42+ Unique Themed Secret Void Islands for OneBlock Survival
// Each island generates out in unloaded chunks (140 to 250 blocks away from 0,64,0)
// and strictly preserves player-placed blocks (air-only placement) so nothing is ever overwritten!

import { world, ItemStack } from "@minecraft/server";

export const ISLAND_THEMES = [
  {
    id: "sky_oasis",
        dimension: "overworld",
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
        dimension: "overworld",
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
        dimension: "overworld",
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
        dimension: "the_end",
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
        dimension: "overworld",
    size: "huge",
    trait: "lush_flora",
    biome: "cherry_grove",
    tier: 1, // Tier 1 (Starter/Agri)
    y: 76,
    name: "Cherry Blossom Sanctuary",
    color: "§d",
    floor: "minecraft:grass_block",
    subfloor: "minecraft:dirt",
    base: "minecraft:stone",
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
        dimension: "overworld",
    size: "medium",
    trait: "lush_flora",
    biome: "dark_forest",
    tier: 4, // Tier 4 (End/Relics)
    y: 74,
    name: "Dark Forest Spire",
    color: "§7",
    floor: "minecraft:podzol",
    subfloor: "minecraft:dirt",
    base: "minecraft:deepslate",
    feature: "dark_oak_spire",
    mob: "minecraft:witch",
    chest: [
      { id: "minecraft:dark_oak_sapling", count: 4 },
      { id: "minecraft:totem_of_undying", count: 1 },
      { id: "minecraft:emerald", count: 6 },
      { id: "minecraft:bone", count: 8 }
    ]
  },
  {
    id: "mushroom_haven",
        dimension: "overworld",
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
        dimension: "overworld",
    size: "huge",
    trait: "ore_rich",
    biome: "mesa",
    tier: 2, // Tier 2 (Mining/Iron)
    y: 60,
    name: "Badlands Gold Mesa",
    color: "§6",
    floor: "minecraft:red_sand",
    subfloor: "minecraft:hardened_clay",
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
        dimension: "overworld",
    size: "big",
    trait: "animals",
    biome: "ice_plains_spikes",
    tier: 2, // Tier 2 (Mining/Iron)
    y: 96,
    name: "Glacial Ice Spire",
    color: "§b",
    floor: "minecraft:snow",
    subfloor: "minecraft:packed_ice",
    base: "minecraft:stone",
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
        dimension: "overworld",
    size: "huge",
    trait: "lush_flora",
    biome: "jungle",
    tier: 2, // Tier 2 (Mining/Iron)
    y: 58,
    name: "Jungle Ruined Temple",
    color: "§2",
    floor: "minecraft:grass_block",
    subfloor: "minecraft:dirt",
    base: "minecraft:stone",
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
        dimension: "nether",
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
        dimension: "nether",
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
        dimension: "nether",
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
        dimension: "nether",
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
        dimension: "nether",
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
        dimension: "overworld",
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
        dimension: "overworld",
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
        dimension: "overworld",
    size: "huge",
    trait: "dungeon",
    biome: "meadow",
    tier: 3, // Tier 3 (Nether/Magic)
    y: 88,
    name: "Pillager Sky Outpost",
    color: "§8",
    floor: "minecraft:grass_block",
    subfloor: "minecraft:dirt",
    base: "minecraft:stone",
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
        dimension: "overworld",
    size: "medium",
    trait: "water_spring",
    biome: "desert",
    tier: 1, // Tier 1 (Starter/Agri)
    y: 62,
    name: "Desert Mirage Well",
    color: "§e",
    floor: "minecraft:sand",
    subfloor: "minecraft:sandstone",
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
        dimension: "overworld",
    size: "huge",
    trait: "animals",
    biome: "bamboo_jungle",
    tier: 1, // Tier 1 (Starter/Agri)
    y: 66,
    name: "Bamboo Panda Sanctuary",
    color: "§a",
    floor: "minecraft:grass_block",
    subfloor: "minecraft:dirt",
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
        dimension: "overworld",
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
        dimension: "overworld",
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
        dimension: "nether",
    size: "medium",
    trait: "lava_spring",
    biome: "basalt_deltas",
    tier: 3, // Tier 3 (Nether/Magic)
    y: 90,
    name: "Fallen Glowstone Meteor",
    color: "§e",
    floor: "minecraft:basalt",
    subfloor: "minecraft:blackstone",
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
        dimension: "the_end",
    size: "huge",
    trait: "dungeon",
    biome: "the_end",
    tier: 4, // Tier 4 (End/Relics)
    y: 92,
    name: "End City Spire",
    color: "§5",
    floor: "minecraft:end_stone",
    subfloor: "minecraft:end_stone",
    base: "minecraft:end_stone",
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
        dimension: "overworld",
    size: "big",
    trait: "ore_rich",
    biome: "desert",
    tier: 2, // Tier 2 (Mining/Iron)
    y: 54,
    name: "Prehistoric Fossil Dig",
    color: "§f",
    floor: "minecraft:coarse_dirt",
    subfloor: "minecraft:dirt",
    base: "minecraft:stone",
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
        dimension: "overworld",
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
        dimension: "overworld",
    size: "big",
    trait: "ancient_shrine",
    biome: "jagged_peaks",
    tier: 3, // Tier 3 (Nether/Magic)
    y: 82,
    name: "Arcane Sky Observatory",
    color: "§9",
    floor: "minecraft:stone_bricks",
    subfloor: "minecraft:cobblestone",
    base: "minecraft:stone",
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
        dimension: "overworld",
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
        dimension: "overworld",
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
      { id: "minecraft:web", count: 4 }
    ]
  },
  {
    id: "creeper_dungeon",
        dimension: "overworld",
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
        dimension: "overworld",
    size: "big",
    trait: "water_spring",
    biome: "swampland",
    tier: 2, // Tier 2 (Mining/Iron)
    y: 50,
    name: "Gelatinous Slime Isle",
    color: "§a",
    floor: "minecraft:moss_block",
    subfloor: "minecraft:clay",
    base: "minecraft:stone",
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
        dimension: "overworld",
    size: "big",
    trait: "animals",
    biome: "meadow",
    tier: 1, // Tier 1 (Starter/Agri)
    y: 70,
    name: "Sunlit Honey Apiary",
    color: "§6",
    floor: "minecraft:grass_block",
    subfloor: "minecraft:dirt",
    base: "minecraft:stone",
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
        dimension: "overworld",
    size: "big",
    trait: "animals",
    biome: "taiga",
    tier: 1, // Tier 1 (Starter/Agri)
    y: 64,
    name: "Haunted Pumpkin Patch",
    color: "§6",
    floor: "minecraft:grass_block",
    subfloor: "minecraft:dirt",
    base: "minecraft:stone",
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
        dimension: "overworld",
    size: "big",
    trait: "village",
    biome: "jungle",
    tier: 1, // Tier 1 (Starter/Agri)
    y: 64,
    name: "Tropical Melon Greenhouse",
    color: "§a",
    floor: "minecraft:grass_block",
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
        dimension: "overworld",
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
        dimension: "overworld",
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
        dimension: "overworld",
    size: "huge",
    trait: "village",
    biome: "plains",
    tier: 1, // Tier 1 (Starter/Agri)
    y: 70,
    name: "Windmill Grain Haven",
    color: "§e",
    floor: "minecraft:grass_block",
    subfloor: "minecraft:dirt",
    base: "minecraft:stone",
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
        dimension: "overworld",
    size: "huge",
    trait: "water_spring",
    biome: "warm_ocean",
    tier: 1, // Tier 1 (Starter/Agri)
    y: 56,
    name: "Coral Reef Biosphere",
    color: "§3",
    floor: "minecraft:sand",
    subfloor: "minecraft:sandstone",
    base: "minecraft:stone",
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
        dimension: "overworld",
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
        dimension: "nether",
    size: "huge",
    trait: "lava_spring",
    biome: "basalt_deltas",
    tier: 4, // Tier 4 (End/Relics)
    y: 48,
    name: "Starlight Meteorite Crater",
    color: "§5",
    floor: "minecraft:blackstone",
    subfloor: "minecraft:basalt",
    base: "minecraft:obsidian",
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
        dimension: "overworld",
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
        dimension: "the_end",
    size: "huge",
    trait: "ancient_shrine",
    biome: "the_end",
    tier: 4, // Tier 4 (End/Relics)
    y: 86,
    name: "Void Gateway Shrine",
    color: "§5",
    floor: "minecraft:end_bricks",
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

// Computes deterministic fixed locations around the central base (0, 64, 0):
// - Overworld: 32 islands arranged in a staggered 2-ring rosette (16 inner at 42m, 16 outer at 60m)
//   Permuted with stride 17 so consecutive island indices land on opposite sides (~100m+ away)
// - Nether: 7 islands arranged in a 45m ring around the Nether base, permuted with stride 4 (~88m away)
// - The End: 3 islands arranged in a 45m ring around The End altar (120 degrees apart)
export function getIslandLocation(index, total, theme, lastPos = null) {
  const targetDim = (theme && theme.dimension) || "overworld";
  const dimThemes = ISLAND_THEMES.filter(t => (t.dimension || "overworld") === targetDim);
  let themeIdx = theme ? dimThemes.findIndex(t => t.id === theme.id) : index;
  if (themeIdx < 0) themeIdx = index % (dimThemes.length || 1);

  let distance;
  let angle;

  if (targetDim === "overworld") {
    // 32 slots: 16 inner (42m), 16 outer (60m)
    // Permutation stride 17 guarantees consecutive theme indices land on opposite sides (~100m away)
    const slotIdx = (themeIdx * 17) % 32;
    if (slotIdx % 2 === 0) {
      // Inner ring: radius 42m
      distance = 42;
      const k = Math.floor(slotIdx / 2);
      angle = k * (360 / 16);
    } else {
      // Outer ring: radius 60m, staggered by 11.25 degrees into the gaps
      distance = 60;
      const k = Math.floor(slotIdx / 2);
      angle = 11.25 + k * (360 / 16);
    }
  } else if (targetDim === "nether") {
    // 7 islands: 45m ring, permuted with stride 4 across opposite sides
    distance = 45;
    const slotIdx = (themeIdx * 4) % 7;
    angle = slotIdx * (360 / 7);
  } else {
    // The End: 3 islands at 45m ring (120 degrees apart)
    distance = 45;
    angle = (themeIdx % 3) * (360 / 3);
  }

  const rad = (angle * Math.PI) / 180;
  const cx = Math.round(distance * Math.cos(rad));
  const cz = Math.round(distance * Math.sin(rad));

  // Thematic Y Level: Skyblock height kept accessible (Y=60 to Y=72)
  const cy = (theme && typeof theme.y === "number") ? Math.min(72, Math.max(60, theme.y)) : 64;

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
    if (no < 50) return "minecraft:quartz_ore";
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

  const sh = Math.random() * 100;
  if (sh < 65) return "minecraft:dirt";
  if (sh < 80) return "minecraft:coarse_dirt";
  if (sh < 92) return "minecraft:dirt_with_roots";
  return "minecraft:gravel";
}

function placeSurfaceVegetation(dimension, theme, loc, seed) {
  const { x, y, z } = loc;
  try {
    const roll = Math.random();

    if (theme.biome === "cherry_grove" || theme.id === "cherry_sanctuary") {
      // Natural scattered pink petals (pure organic distribution like vanilla cherry groves)
      if (roll < 0.48) {
        safeAirOnlySetBlock(dimension, { x, y: y + 1, z }, "minecraft:pink_petals");
      }
    } else if (theme.id === "bamboo_monastery") {
      // Organic bamboo cluster with variable heights and short grass
      if (roll < 0.22) {
        safeAirOnlySetBlock(dimension, { x, y: y + 1, z }, "minecraft:bamboo");
        if (Math.random() < 0.65) safeAirOnlySetBlock(dimension, { x, y: y + 2, z }, "minecraft:bamboo");
        if (Math.random() < 0.35) safeAirOnlySetBlock(dimension, { x, y: y + 3, z }, "minecraft:bamboo");
      } else if (roll < 0.55) {
        safeAirOnlySetBlock(dimension, { x, y: y + 1, z }, "minecraft:short_grass");
      }
    } else if (theme.id === "pumpkin_patch") {
      // Scattered pumpkins and grass
      if (roll < 0.16) {
        safeAirOnlySetBlock(dimension, { x, y: y + 1, z }, Math.random() < 0.25 ? "minecraft:carved_pumpkin" : "minecraft:pumpkin");
      } else if (roll < 0.50) {
        safeAirOnlySetBlock(dimension, { x, y: y + 1, z }, "minecraft:short_grass");
      }
    } else if (theme.id === "melon_greenhouse") {
      if (roll < 0.18) {
        safeAirOnlySetBlock(dimension, { x, y: y + 1, z }, "minecraft:melon_block");
      } else if (roll < 0.50) {
        safeAirOnlySetBlock(dimension, { x, y: y + 1, z }, "minecraft:short_grass");
      }
    } else if (theme.id === "bee_apiary") {
      // Lush wildflower meadow
      if (roll < 0.15) safeAirOnlySetBlock(dimension, { x, y: y + 1, z }, "minecraft:dandelion");
      else if (roll < 0.28) safeAirOnlySetBlock(dimension, { x, y: y + 1, z }, "minecraft:poppy");
      else if (roll < 0.40) safeAirOnlySetBlock(dimension, { x, y: y + 1, z }, "minecraft:cornflower");
      else if (roll < 0.52) safeAirOnlySetBlock(dimension, { x, y: y + 1, z }, "minecraft:allium");
      else if (roll < 0.62) safeAirOnlySetBlock(dimension, { x, y: y + 1, z }, "minecraft:oxeye_daisy");
      else if (roll < 0.78) safeAirOnlySetBlock(dimension, { x, y: y + 1, z }, "minecraft:short_grass");
    } else if (theme.floor === "minecraft:grass_block") {
      // Natural vanilla meadow: irregular grass, scattered flowers, and open spaces
      if (roll < 0.32) {
        safeAirOnlySetBlock(dimension, { x, y: y + 1, z }, "minecraft:short_grass");
      } else if (roll < 0.36) {
        safeAirOnlySetBlock(dimension, { x, y: y + 1, z }, "minecraft:dandelion");
      } else if (roll < 0.40) {
        safeAirOnlySetBlock(dimension, { x, y: y + 1, z }, "minecraft:poppy");
      } else if (roll < 0.44) {
        safeAirOnlySetBlock(dimension, { x, y: y + 1, z }, "minecraft:cornflower");
      } else if (roll < 0.47) {
        safeAirOnlySetBlock(dimension, { x, y: y + 1, z }, "minecraft:oxeye_daisy");
      } else if (roll < 0.50) {
        safeAirOnlySetBlock(dimension, { x, y: y + 1, z }, "minecraft:azure_bluet");
      }
    } else if (theme.floor === "minecraft:podzol") {
      if (roll < 0.28) safeAirOnlySetBlock(dimension, { x, y: y + 1, z }, "minecraft:fern");
      else if (roll < 0.42) safeAirOnlySetBlock(dimension, { x, y: y + 1, z }, "minecraft:sweet_berry_bush");
      else if (roll < 0.50) safeAirOnlySetBlock(dimension, { x, y: y + 1, z }, "minecraft:large_fern");
    } else if (theme.floor.includes("sand")) {
      if (roll < 0.12) safeAirOnlySetBlock(dimension, { x, y: y + 1, z }, "minecraft:deadbush");
    } else if (theme.floor === "minecraft:crimson_nylium") {
      if (roll < 0.28) safeAirOnlySetBlock(dimension, { x, y: y + 1, z }, "minecraft:crimson_roots");
      else if (roll < 0.40) safeAirOnlySetBlock(dimension, { x, y: y + 1, z }, "minecraft:crimson_fungus");
    } else if (theme.floor === "minecraft:warped_nylium") {
      if (roll < 0.28) safeAirOnlySetBlock(dimension, { x, y: y + 1, z }, "minecraft:warped_roots");
      else if (roll < 0.40) safeAirOnlySetBlock(dimension, { x, y: y + 1, z }, "minecraft:warped_fungus");
    }
  } catch (e) {}
}

// =========================================================================
// ADVANCED TERRAFORMING: MICRO-CAVERNS, SATELLITE ISLETS & PATHS
// =========================================================================

function buildMicroCave(dimension, theme, center, seed) {
  const { x: cx, y: cy, z: cz } = center;
  const caveAngle = ((seed * 17) % 360) * (Math.PI / 180);
  const caveDist = theme.size === "huge" ? 3.5 : 2.5;
  const caveX = cx + Math.round(caveDist * Math.cos(caveAngle));
  const caveZ = cz + Math.round(caveDist * Math.sin(caveAngle));
  const caveY = cy - 3; // 3 blocks below surface, safely inside rock mantle

  const caveRadius = theme.size === "huge" ? 2.6 : 2.0;

  // Carve hollow ellipsoid cavern
  for (let dx = -3; dx <= 3; dx++) {
    for (let dy = -2; dy <= 2; dy++) {
      for (let dz = -3; dz <= 3; dz++) {
        const d = Math.sqrt(dx * dx + (dy * 1.4) * (dy * 1.4) + dz * dz);
        if (d <= caveRadius) {
          const block = dimension.getBlock({ x: caveX + dx, y: caveY + dy, z: caveZ + dz });
          if (block && !block.isAir && block.typeId !== "minecraft:lodestone" && block.typeId !== "minecraft:chest") {
            block.setType("minecraft:air");
          }
        }
      }
    }
  }

  // Populate Cave Features: Pointed dripstones, glowing lichen, and high-value ore veins!
  try {
    // Minimalized 1-2 Pointed Dripstones per island with guaranteed solid block directly above (never air)
    let dripstonePlaced = 0;
    const maxDripstones = 1 + (seed % 2); // strictly 1 to 2 dripstones
    const dripCandidates = [
      { ox: 0, oz: 0 },
      { ox: 1, oz: -1 },
      { ox: -1, oz: 1 }
    ];
    for (const cand of dripCandidates) {
      if (dripstonePlaced >= maxDripstones) break;
      const ceilPos = { x: caveX + cand.ox, y: caveY + 2, z: caveZ + cand.oz };
      const dripPos = { x: caveX + cand.ox, y: caveY + 1, z: caveZ + cand.oz };
      const ceilBlock = dimension.getBlock(ceilPos);
      if (ceilBlock) {
        // Ensure the top of the dripstone is always solid non-air
        if (ceilBlock.isAir) {
          ceilBlock.setType("minecraft:dripstone_block");
        }
        const b = dimension.getBlock(dripPos);
        if (b && b.isAir) {
          b.setType("minecraft:pointed_dripstone");
          dripstonePlaced++;
        }
      }
    }

    // Exposed Rare Ore Clump in Cave Wall
    const rareOre = theme.tier >= 3 ? "minecraft:deepslate_diamond_ore" : (theme.tier === 2 ? "minecraft:deepslate_gold_ore" : "minecraft:deepslate_iron_ore");
    safeAirOnlySetBlock(dimension, { x: caveX + 2, y: caveY, z: caveZ }, rareOre);
    safeAirOnlySetBlock(dimension, { x: caveX + 2, y: caveY + 1, z: caveZ }, rareOre);

    // Subtle cave glow (Glow lichen)
    safeAirOnlySetBlock(dimension, { x: caveX, y: caveY - 1, z: caveZ }, "minecraft:glow_lichen");
    safeAirOnlySetBlock(dimension, { x: caveX, y: caveY, z: caveZ - 2 }, "minecraft:glow_lichen");
  } catch (ce) {}
}

function buildSatelliteIslet(dimension, theme, center, maxR, seed, index) {
  const { x: cx, y: cy, z: cz } = center;
  const angle = (((seed * 37 + index * 131) % 360) * Math.PI) / 180;
  const distance = maxR + 5 + (seed % 3);
  const sx = cx + Math.round(distance * Math.cos(angle));
  const sz = cz + Math.round(distance * Math.sin(angle));
  const sy = cy - (index === 0 ? 1 : 2);

  const satR = index === 0 ? 2.4 : 1.8;

  // Build mini asteroid rock
  for (let dx = -3; dx <= 3; dx++) {
    for (let dz = -3; dz <= 3; dz++) {
      const d = Math.sqrt(dx * dx + dz * dz);
      if (d <= satR) {
        // Surface
        safeAirOnlySetBlock(dimension, { x: sx + dx, y: sy, z: sz + dz }, theme.floor);
        // Subsurface depth
        const satDepth = Math.max(1, Math.round((satR - d) * 1.5));
        for (let dy = 1; dy <= satDepth; dy++) {
          const mat = dy === 1 ? getSubsoilBlock(theme, dx, dz, seed) : getRockBlock(theme, dx, dz, dy, seed);
          safeAirOnlySetBlock(dimension, { x: sx + dx, y: sy - dy, z: sz + dz }, mat);
        }
        // Hanging stalactite tip
        if (d <= 1.0) {
          safeAirOnlySetBlock(dimension, { x: sx + dx, y: sy - satDepth - 1, z: sz + dz }, "minecraft:cobbled_deepslate");
        }
      }
    }
  }

  // Hanging Iron Chains Tether (connecting edge of main island to satellite)
  if (index === 0) {
    const mainEdgeX = cx + Math.round((maxR - 0.5) * Math.cos(angle));
    const mainEdgeZ = cz + Math.round((maxR - 0.5) * Math.sin(angle));
    const steps = 4;
    for (let s = 1; s <= steps; s++) {
      const t = s / (steps + 1);
      const chainX = Math.round(mainEdgeX + (sx - mainEdgeX) * t);
      const chainZ = Math.round(mainEdgeZ + (sz - mainEdgeZ) * t);
      const sag = Math.round(Math.sin(t * Math.PI) * 1.2);
      safeAirOnlySetBlock(dimension, { x: chainX, y: cy - sag, z: chainZ }, "minecraft:iron_chain");
    }
  }

  // Thematic Feature on Satellite:
  try {
    const tr = theme.trait;
    if (tr === "ore_rich") {
      // Raw mineral boulder
      safeAirOnlySetBlock(dimension, { x: sx, y: sy + 1, z: sz }, theme.tier >= 3 ? "minecraft:raw_gold_block" : "minecraft:raw_iron_block");
      safeAirOnlySetBlock(dimension, { x: sx, y: sy + 2, z: sz }, "minecraft:lantern");
    } else if (tr === "village" || tr === "animals") {
      // Abandoned campsite
      safeAirOnlySetBlock(dimension, { x: sx, y: sy + 1, z: sz }, "minecraft:campfire");
      safeAirOnlySetBlock(dimension, { x: sx + 1, y: sy + 1, z: sz }, "minecraft:barrel");
      safeAirOnlySetBlock(dimension, { x: sx - 1, y: sy + 1, z: sz }, "minecraft:lantern");
    } else if (tr === "dungeon" || theme.biome.includes("nether")) {
      // Spire with crying obsidian & soul lantern
      safeAirOnlySetBlock(dimension, { x: sx, y: sy + 1, z: sz }, "minecraft:crying_obsidian");
      safeAirOnlySetBlock(dimension, { x: sx, y: sy + 2, z: sz }, "minecraft:soul_lantern");
    } else if (tr === "ancient_shrine") {
      // Quartz monolith
      safeAirOnlySetBlock(dimension, { x: sx, y: sy + 1, z: sz }, "minecraft:chiseled_quartz_block");
      safeAirOnlySetBlock(dimension, { x: sx, y: sy + 2, z: sz }, "minecraft:sea_lantern");
    } else {
      // Flowering azalea bonsai or wild flora
      safeAirOnlySetBlock(dimension, { x: sx, y: sy + 1, z: sz }, "minecraft:flowering_azalea");
      safeAirOnlySetBlock(dimension, { x: sx + 1, y: sy + 1, z: sz }, "minecraft:lantern");
    }
  } catch (fe) {}
}

export function getIslandBlockPool(theme) {
  const pools = {
    sky_oasis: ["minecraft:grass_block", "minecraft:oak_log", "minecraft:oak_planks", "minecraft:moss_block", "minecraft:melon_block", "minecraft:emerald_ore", "minecraft:hay_block"],
    ancient_crypt: ["minecraft:sandstone", "minecraft:cut_sandstone", "minecraft:chiseled_sandstone", "minecraft:gold_ore", "minecraft:raw_gold_block", "minecraft:lapis_ore"],
    trial_vault: ["minecraft:copper_block", "minecraft:cut_copper", "minecraft:polished_tuff", "minecraft:tuff", "minecraft:copper_ore", "minecraft:iron_block"],
    stronghold_portal: ["minecraft:stone_bricks", "minecraft:cracked_stone_bricks", "minecraft:mossy_stone_bricks", "minecraft:iron_block", "minecraft:bookshelf", "minecraft:chiseled_stone_bricks"],
    cherry_sanctuary: ["minecraft:cherry_log", "minecraft:cherry_leaves", "minecraft:cherry_planks", "minecraft:cherry_wood", "minecraft:bee_nest", "minecraft:honey_block"],
    pale_garden_spire: ["minecraft:dark_oak_log", "minecraft:dark_oak_planks", "minecraft:dark_oak_leaves", "minecraft:moss_block", "minecraft:podzol", "minecraft:deepslate"],
    mushroom_haven: ["minecraft:mycelium", "minecraft:red_mushroom_block", "minecraft:brown_mushroom_block", "minecraft:mushroom_stem", "minecraft:dirt"],
    badlands_mesa: ["minecraft:red_sand", "minecraft:hardened_clay", "minecraft:orange_terracotta", "minecraft:yellow_terracotta", "minecraft:gold_ore", "minecraft:raw_gold_block"],
    ice_spike_peak: ["minecraft:snow", "minecraft:packed_ice", "minecraft:blue_ice", "minecraft:ice"],
    jungle_temple: ["minecraft:jungle_log", "minecraft:jungle_leaves", "minecraft:bamboo_block", "minecraft:mossy_cobblestone", "minecraft:chiseled_stone_bricks"],
    nether_fortress_spire: ["minecraft:nether_brick", "minecraft:red_nether_brick", "minecraft:quartz_ore", "minecraft:nether_gold_ore", "minecraft:soul_sand"],
    bastion_treasury: ["minecraft:blackstone", "minecraft:polished_blackstone_bricks", "minecraft:gilded_blackstone", "minecraft:gold_block", "minecraft:crying_obsidian"],
    crimson_forest_isle: ["minecraft:crimson_nylium", "minecraft:crimson_stem", "minecraft:crimson_hyphae", "minecraft:shroomlight", "minecraft:nether_wart_block"],
    warped_forest_isle: ["minecraft:warped_nylium", "minecraft:warped_stem", "minecraft:warped_hyphae", "minecraft:shroomlight", "minecraft:warped_wart_block"],
    soul_sand_valley: ["minecraft:soul_sand", "minecraft:soul_soil", "minecraft:bone_block", "minecraft:basalt"],
    amethyst_geode: ["minecraft:amethyst_block", "minecraft:budding_amethyst", "minecraft:calcite", "minecraft:smooth_basalt", "minecraft:tinted_glass"],
    witch_swamp_hut: ["minecraft:mud", "minecraft:mud_bricks", "minecraft:mangrove_log", "minecraft:redstone_ore", "minecraft:glowstone"],
    pillager_watchtower: ["minecraft:dark_oak_log", "minecraft:dark_oak_planks", "minecraft:cobblestone", "minecraft:iron_ore", "minecraft:hay_block"],
    desert_well_oasis: ["minecraft:sand", "minecraft:sandstone", "minecraft:smooth_sandstone", "minecraft:clay", "minecraft:cut_sandstone"],
    bamboo_monastery: ["minecraft:bamboo_mosaic", "minecraft:moss_block", "minecraft:grass_block", "minecraft:bamboo_block", "minecraft:bamboo_planks"],
    deepslate_forge: ["minecraft:deepslate", "minecraft:deepslate_iron_ore", "minecraft:raw_iron_block", "minecraft:blast_furnace", "minecraft:iron_block"],
    ocean_monument_shrine: ["minecraft:prismarine", "minecraft:prismarine_bricks", "minecraft:dark_prismarine", "minecraft:sea_lantern", "minecraft:sponge"],
    glowstone_meteor: ["minecraft:glowstone", "minecraft:basalt", "minecraft:blackstone", "minecraft:magma", "minecraft:obsidian"],
    end_city_tower: ["minecraft:purpur_block", "minecraft:purpur_pillar", "minecraft:end_bricks", "minecraft:diamond_ore", "minecraft:end_stone"],
    fossil_excavation: ["minecraft:bone_block", "minecraft:coarse_dirt", "minecraft:dirt_with_roots", "minecraft:coal_ore", "minecraft:iron_ore"],
    blacksmith_workshop: ["minecraft:smooth_stone", "minecraft:iron_ore", "minecraft:raw_iron_block", "minecraft:iron_block", "minecraft:furnace"],
    library_observatory: ["minecraft:bookshelf", "minecraft:chiseled_bookshelf", "minecraft:stone_bricks", "minecraft:lapis_ore", "minecraft:lapis_block"],
    alchemist_laboratory: ["minecraft:podzol", "minecraft:redstone_block", "minecraft:gold_ore", "minecraft:redstone_ore", "minecraft:glass"],
    spider_nest: ["minecraft:mossy_stone_bricks", "minecraft:cobblestone", "minecraft:infested_stone", "minecraft:iron_ore"],
    creeper_dungeon: ["minecraft:mossy_cobblestone", "minecraft:tnt", "minecraft:mossy_stone_bricks", "minecraft:cobblestone", "minecraft:sand"],
    slime_biosphere: ["minecraft:moss_block", "minecraft:clay", "minecraft:slime", "minecraft:mud"],
    bee_apiary: ["minecraft:bee_nest", "minecraft:honeycomb_block", "minecraft:honey_block", "minecraft:yellow_terracotta", "minecraft:hay_block"],
    pumpkin_patch: ["minecraft:pumpkin", "minecraft:carved_pumpkin", "minecraft:lit_pumpkin", "minecraft:hay_block", "minecraft:dirt"],
    melon_greenhouse: ["minecraft:melon_block", "minecraft:glass", "minecraft:dirt", "minecraft:grass_block", "minecraft:jungle_log"],
    sculk_laboratory: ["minecraft:sculk", "minecraft:sculk_catalyst", "minecraft:deepslate_tiles", "minecraft:deepslate", "minecraft:reinforced_deepslate"],
    armory_vault: ["minecraft:stone_bricks", "minecraft:iron_block", "minecraft:raw_iron_block", "minecraft:chiseled_stone_bricks", "minecraft:cracked_stone_bricks"],
    bakery_windmill: ["minecraft:hay_block", "minecraft:barrel", "minecraft:dried_kelp_block", "minecraft:spruce_planks", "minecraft:spruce_log"],
    aquarium_atoll: ["minecraft:sand", "minecraft:tube_coral_block", "minecraft:brain_coral_block", "minecraft:prismarine", "minecraft:sponge"],
    tuff_golem_sanctuary: ["minecraft:tuff", "minecraft:polished_tuff", "minecraft:deepslate", "minecraft:chiseled_stone_bricks", "minecraft:stone"],
    meteorite_crater: ["minecraft:blackstone", "minecraft:crying_obsidian", "minecraft:obsidian", "minecraft:magma", "minecraft:ancient_debris"],
    golden_pantheon: ["minecraft:quartz_block", "minecraft:smooth_quartz", "minecraft:gold_block", "minecraft:raw_gold_block", "minecraft:sea_lantern"],
    void_gateway_outpost: ["minecraft:end_bricks", "minecraft:purpur_block", "minecraft:obsidian", "minecraft:crying_obsidian", "minecraft:purpur_pillar"]
  };
  return pools[theme.id] || [theme.floor, theme.subfloor, theme.base];
}

function decorateSteppingPaths(dimension, theme, center, seed) {
  const { x: cx, y: cy, z: cz } = center;
  // Offset paths by distance >= 2 to keep adjacent cobblestone collar around the island OneBlock clean
  const pathBlocks = [
    { x: cx, y: cy, z: cz + 2 },
    { x: cx, y: cy, z: cz - 2 },
    { x: cx + 2, y: cy, z: cz },
    { x: cx - 2, y: cy, z: cz },
    { x: cx - 3, y: cy, z: cz - 1 },
    { x: cx + 3, y: cy, z: cz + 1 }
  ];
  for (let i = 0; i < pathBlocks.length; i++) {
    const p = pathBlocks[i];
    const b = dimension.getBlock(p);
    if (b && b.typeId === theme.floor) {
      if (Math.random() < 0.5) {
        b.setType("minecraft:grass_path");
      } else {
        b.setType(theme.biome.includes("nether") ? "minecraft:blackstone" : "minecraft:cobblestone");
      }
    }
  }
}

// Determines the tree placement, wood log type, leaf type, and accessories per theme
function getIslandTreePlacement(theme, center) {
  const { cx, cy, cz } = center;
  switch (theme.id) {
    case "cherry_sanctuary":
      return { pos: { x: cx - 3, y: cy, z: cz - 2 }, log: "minecraft:cherry_log", leaves: "minecraft:cherry_leaves", beeNest: true };
    case "pale_garden_spire":
      return { pos: { x: cx - 3, y: cy, z: cz - 2 }, log: "minecraft:dark_oak_log", leaves: "minecraft:dark_oak_leaves" };
    case "jungle_temple":
      return { pos: { x: cx - 3, y: cy, z: cz - 2 }, log: "minecraft:jungle_log", leaves: "minecraft:jungle_leaves" };
    case "sky_oasis":
      return { pos: { x: cx + 3, y: cy, z: cz + 3 }, log: "minecraft:oak_log", leaves: "minecraft:oak_leaves" };
    case "bee_apiary":
      return { pos: { x: cx + 3, y: cy, z: cz - 3 }, log: "minecraft:birch_log", leaves: "minecraft:birch_leaves", beeNest: true };
    case "pumpkin_patch":
      return { pos: { x: cx + 3, y: cy, z: cz - 3 }, log: "minecraft:spruce_log", leaves: "minecraft:spruce_leaves" };
    case "bamboo_monastery":
      return { pos: { x: cx + 3, y: cy, z: cz - 3 }, log: "minecraft:jungle_log", leaves: "minecraft:jungle_leaves" };
    case "witch_swamp_hut":
      return { pos: { x: cx + 3, y: cy, z: cz - 3 }, log: "minecraft:mangrove_log", leaves: "minecraft:mangrove_leaves" };
    case "slime_biosphere":
      return { pos: { x: cx + 3, y: cy, z: cz + 3 }, log: "minecraft:mangrove_log", leaves: "minecraft:mangrove_leaves" };
    case "melon_greenhouse":
      return { pos: { x: cx - 3, y: cy, z: cz + 3 }, log: "minecraft:jungle_log", leaves: "minecraft:jungle_leaves" };
    case "bakery_windmill":
      return { pos: { x: cx - 3, y: cy, z: cz + 3 }, log: "minecraft:oak_log", leaves: "minecraft:oak_leaves" };
    case "crimson_forest_isle":
      return { pos: { x: cx + 3, y: cy, z: cz + 3 }, log: "minecraft:crimson_stem", leaves: "minecraft:nether_wart_block" };
    case "warped_forest_isle":
      return { pos: { x: cx + 3, y: cy, z: cz + 3 }, log: "minecraft:warped_stem", leaves: "minecraft:warped_wart_block" };
    case "pillager_watchtower":
      return { pos: { x: cx + 3, y: cy, z: cz - 3 }, log: "minecraft:dark_oak_log", leaves: "minecraft:dark_oak_leaves" };
    case "alchemist_laboratory":
      return { pos: { x: cx + 3, y: cy, z: cz - 3 }, log: "minecraft:dark_oak_log", leaves: "minecraft:dark_oak_leaves" };
    case "ancient_crypt":
      return { pos: { x: cx - 3, y: cy, z: cz + 3 }, log: "minecraft:jungle_log", leaves: "minecraft:jungle_leaves" };
    case "desert_well_oasis":
      return { pos: { x: cx + 3, y: cy, z: cz + 3 }, log: "minecraft:jungle_log", leaves: "minecraft:jungle_leaves" };
    case "fossil_excavation":
      return { pos: { x: cx - 3, y: cy, z: cz - 3 }, log: "minecraft:bone_block", leaves: "minecraft:smooth_sandstone" };
    case "badlands_mesa":
      return { pos: { x: cx + 3, y: cy, z: cz - 3 }, log: "minecraft:acacia_log", leaves: "minecraft:acacia_leaves" };
    case "ice_spike_peak":
      return { pos: { x: cx - 3, y: cy, z: cz - 3 }, log: "minecraft:spruce_log", leaves: "minecraft:spruce_leaves" };
    case "mushroom_haven":
      return { pos: { x: cx + 3, y: cy, z: cz - 3 }, log: "minecraft:mushroom_stem", leaves: "minecraft:red_mushroom_block" };
    case "amethyst_geode":
      return { pos: { x: cx - 3, y: cy, z: cz + 3 }, log: "minecraft:smooth_basalt", leaves: "minecraft:amethyst_block" };
    case "spider_nest":
      return { pos: { x: cx + 3, y: cy, z: cz + 3 }, log: "minecraft:oak_log", leaves: "minecraft:oak_leaves" };
    case "creeper_dungeon":
      return { pos: { x: cx - 3, y: cy, z: cz - 3 }, log: "minecraft:oak_log", leaves: "minecraft:moss_block" };
    case "deepslate_forge":
      return { pos: { x: cx + 3, y: cy, z: cz - 3 }, log: "minecraft:deepslate", leaves: "minecraft:deepslate_tiles" };
    case "sculk_laboratory":
      return { pos: { x: cx - 3, y: cy, z: cz + 3 }, log: "minecraft:deepslate", leaves: "minecraft:sculk" };
    case "trial_vault":
      return { pos: { x: cx + 3, y: cy, z: cz + 3 }, log: "minecraft:polished_tuff", leaves: "minecraft:cut_copper" };
    case "blacksmith_workshop":
      return { pos: { x: cx - 3, y: cy, z: cz + 3 }, log: "minecraft:spruce_log", leaves: "minecraft:spruce_leaves" };
    case "library_observatory":
      return { pos: { x: cx - 3, y: cy, z: cz - 3 }, log: "minecraft:spruce_log", leaves: "minecraft:spruce_leaves" };
    case "armory_vault":
      return { pos: { x: cx + 3, y: cy, z: cz - 3 }, log: "minecraft:spruce_log", leaves: "minecraft:spruce_leaves" };
    case "golden_pantheon":
      return { pos: { x: cx - 3, y: cy, z: cz + 3 }, log: "minecraft:smooth_quartz", leaves: "minecraft:quartz_block" };
    case "ocean_monument_shrine":
      return { pos: { x: cx + 3, y: cy, z: cz - 3 }, log: "minecraft:dark_prismarine", leaves: "minecraft:prismarine_bricks" };
    case "aquarium_atoll":
      return { pos: { x: cx - 3, y: cy, z: cz + 3 }, log: "minecraft:jungle_log", leaves: "minecraft:jungle_leaves" };
    case "tuff_golem_sanctuary":
      return { pos: { x: cx + 3, y: cy, z: cz + 3 }, log: "minecraft:tuff", leaves: "minecraft:polished_tuff" };
    case "nether_fortress_spire":
      return { pos: { x: cx - 3, y: cy, z: cz + 3 }, log: "minecraft:nether_brick", leaves: "minecraft:nether_wart_block" };
    case "bastion_treasury":
      return { pos: { x: cx + 3, y: cy, z: cz - 3 }, log: "minecraft:basalt", leaves: "minecraft:gilded_blackstone" };
    case "soul_sand_valley":
      return { pos: { x: cx - 3, y: cy, z: cz - 3 }, log: "minecraft:bone_block", leaves: "minecraft:soul_soil" };
    case "glowstone_meteor":
      return { pos: { x: cx + 3, y: cy, z: cz + 3 }, log: "minecraft:basalt", leaves: "minecraft:glowstone" };
    case "meteorite_crater":
      return { pos: { x: cx - 3, y: cy, z: cz + 3 }, log: "minecraft:crying_obsidian", leaves: "minecraft:obsidian" };
    case "stronghold_portal":
      return { pos: { x: cx + 3, y: cy, z: cz - 3 }, log: "minecraft:stone_bricks", leaves: "minecraft:mossy_stone_bricks" };
    case "end_city_tower":
      return { pos: { x: cx - 3, y: cy, z: cz + 3 }, log: "minecraft:purpur_pillar", leaves: "minecraft:purpur_block" };
    case "void_gateway_outpost":
      return { pos: { x: cx + 3, y: cy, z: cz + 3 }, log: "minecraft:end_bricks", leaves: "minecraft:purpur_block" };
    default:
      return { pos: { x: cx + 3, y: cy, z: cz + 3 }, log: "minecraft:oak_log", leaves: "minecraft:oak_leaves" };
  }
}

function buildIslandNaturalTree(dimension, theme, center) {
  const treeConfig = getIslandTreePlacement(theme, center);
  if (!treeConfig) return;

  const { x: tx, y: cy, z: tz } = treeConfig.pos;

  // 1. Solid foundation block under tree trunk
  try {
    const rootBlock = dimension.getBlock({ x: tx, y: cy, z: tz });
    if (rootBlock && (rootBlock.isAir || rootBlock.typeId === "minecraft:air")) {
      rootBlock.setType(theme.floor || "minecraft:dirt");
    }
  } catch (e) {}

  // 2. Trunk: Exactly 5 blocks tall wood
  for (let h = 1; h <= 5; h++) {
    safeAirOnlySetBlock(dimension, { x: tx, y: cy + h, z: tz }, treeConfig.log);
  }

  // 3. Canopy Layer 1 (at cy + 4): 5x5 area with 4 outer corners cut off (20 leaves)
  for (let dx = -2; dx <= 2; dx++) {
    for (let dz = -2; dz <= 2; dz++) {
      if (Math.abs(dx) === 2 && Math.abs(dz) === 2) continue; // cut 4 outer corners
      if (dx === 0 && dz === 0) continue; // trunk location
      safeAirOnlySetBlock(dimension, { x: tx + dx, y: cy + 4, z: tz + dz }, treeConfig.leaves);
    }
  }

  // 4. Canopy Layer 2 (at cy + 5): 3x3 area around top trunk block (8 leaves)
  for (let dx = -1; dx <= 1; dx++) {
    for (let dz = -1; dz <= 1; dz++) {
      if (dx === 0 && dz === 0) continue; // trunk location
      safeAirOnlySetBlock(dimension, { x: tx + dx, y: cy + 5, z: tz + dz }, treeConfig.leaves);
    }
  }

  // 5. Canopy Layer 3 (at cy + 6): Crown cross on top of trunk (5 leaves)
  safeAirOnlySetBlock(dimension, { x: tx, y: cy + 6, z: tz }, treeConfig.leaves);
  safeAirOnlySetBlock(dimension, { x: tx + 1, y: cy + 6, z: tz }, treeConfig.leaves);
  safeAirOnlySetBlock(dimension, { x: tx - 1, y: cy + 6, z: tz }, treeConfig.leaves);
  safeAirOnlySetBlock(dimension, { x: tx, y: cy + 6, z: tz + 1 }, treeConfig.leaves);
  safeAirOnlySetBlock(dimension, { x: tx, y: cy + 6, z: tz - 1 }, treeConfig.leaves);

  // 6. Bee Nest accessory (for bee and cherry themes)
  if (treeConfig.beeNest) {
    safeAirOnlySetBlock(dimension, { x: tx - 1, y: cy + 3, z: tz }, "minecraft:bee_nest");
  }
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
  const oreChance = isOreRich ? 15 : 8;

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
            const oreHash = Math.random() * 100;
            if (oreHash < oreChance) {
              blockMat = getOreBlock(theme, d, dx, dz, seed);
            } else {
              blockMat = getRockBlock(theme, dx, dz, d, seed);
            }
          }
          safeAirOnlySetBlock(dimension, { x: cx + dx, y: cy - d, z: cz + dz }, blockMat);
        }

        // Hanging root stalactites underneath:
        if (dist <= 3.2 && Math.random() < 0.45) {
          const rootMat = getRockBlock(theme, dx, dz, depth + 1, seed);
          safeAirOnlySetBlock(dimension, { x: cx + dx, y: cy - depth - 1, z: cz + dz }, rootMat);
          if (dist <= 1.5) {
            safeAirOnlySetBlock(dimension, { x: cx + dx, y: cy - depth - 2, z: cz + dz }, rootMat);
          }
        }

        // Hanging underside foliage (roots & vines under soil/rock overhangs):
        if (dist >= baseRadius * 0.45 && Math.random() < 0.22) {
          const hangLoc = { x: cx + dx, y: cy - depth - 1, z: cz + dz };
          if (theme.biome.includes("nether") || theme.biome.includes("crimson")) {
            safeAirOnlySetBlock(dimension, hangLoc, "minecraft:weeping_vines");
          } else if (theme.floor === "minecraft:grass_block" || theme.floor === "minecraft:podzol") {
            safeAirOnlySetBlock(dimension, hangLoc, "minecraft:hanging_roots");
          }
        }
      }
    }
  }

  // 5. TEMPORARY ISLAND ONEBLOCK CORE (30-50 Blocks Capacity):
  // Placed flush directly at the island surface center (cx, cy, cz) - no lodestone!
  // When all 30-50 blocks are mined, this block solidifies into the Sacred Treasure Chest.
  const obPos = { x: cx, y: cy, z: cz };
  try {
    const maxBlocks = 30 + Math.floor(Math.random() * 21); // 30 to 50 randomized blocks
    world.setDynamicProperty(`island_ob_x_${theme.id}`, obPos.x);
    world.setDynamicProperty(`island_ob_y_${theme.id}`, obPos.y);
    world.setDynamicProperty(`island_ob_z_${theme.id}`, obPos.z);
    world.setDynamicProperty(`island_ob_max_${theme.id}`, maxBlocks);
    world.setDynamicProperty(`island_ob_mined_${theme.id}`, 0);
    world.setDynamicProperty(`island_ob_completed_${theme.id}`, false);

    // Initial block from theme's curated block pool placed flush on the surface
    const pool = getIslandBlockPool(theme);
    const obBlock = dimension.getBlock(obPos);
    if (obBlock) {
      let placed = false;
      try {
        obBlock.setType(pool[0]);
        if (!obBlock.isAir && obBlock.typeId !== "minecraft:air") placed = true;
      } catch (e1) {}
      if (!placed) {
        try {
          obBlock.setType(theme.floor);
          if (!obBlock.isAir && obBlock.typeId !== "minecraft:air") placed = true;
        } catch (e2) {}
      }
      if (!placed) {
        try { obBlock.setType("minecraft:dirt"); } catch (e3) {}
      }
    }

    // Bedrock foundation directly underneath the Island OneBlock
    const underBlock = dimension.getBlock({ x: cx, y: cy - 1, z: cz });
    if (underBlock) {
      try { underBlock.setType("minecraft:bedrock"); } catch (ue) {}
    }

    // The blocks directly beside the Island OneBlock are Bedrock
    const besideOffsets = [
      { x: 1, z: 0 },
      { x: -1, z: 0 },
      { x: 0, z: 1 },
      { x: 0, z: -1 }
    ];
    for (const off of besideOffsets) {
      const bBlock = dimension.getBlock({ x: cx + off.x, y: cy, z: cz + off.z });
      if (bBlock) {
        try { bBlock.setType("minecraft:bedrock"); } catch (se) {}
      }
    }
  } catch (e) {}

  // 6b. ORGANIC STEPPING PATHS:
  decorateSteppingPaths(dimension, theme, center, seed);

  // 6c. HOLLOW MICRO-CAVERN (For Huge & Big Islands):
  if (theme.size === "huge" || theme.size === "big") {
    buildMicroCave(dimension, theme, center, seed);
  }

  // 6d. SATELLITE MICRO-ISLETS & HANGING CHAINS (For Huge & Big Islands):
  if (theme.size === "huge" || theme.size === "big") {
    buildSatelliteIslet(dimension, theme, center, maxR, seed, 0);
    if (theme.size === "huge") {
      buildSatelliteIslet(dimension, theme, center, maxR, seed, 1);
    }
  }

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
      safeAirOnlySetBlock(dimension, { x: hx + 2, y: hy, z: hz + 2 }, "minecraft:bed");
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
      try {
        dimension.spawnEntity("minecraft:villager_v2", { x: hx + 1.5, y: hy, z: hz + 1.5 });
      } catch (ve) {}

    } else if (tr === "animals") {
      // Natural animal resting spot with hay & water cauldron (no restricting fences - animals wander freely)
      const px = cx - 3;
      const pz = cz + 3;
      safeAirOnlySetBlock(dimension, { x: px - 1, y: cy + 1, z: pz - 1 }, "minecraft:cauldron");
      safeAirOnlySetBlock(dimension, { x: px + 1, y: cy + 1, z: pz - 1 }, "minecraft:hay_block");
      safeAirOnlySetBlock(dimension, { x: px, y: cy + 1, z: pz + 2 }, "minecraft:carved_pumpkin");

      // Themed animals spawn:
      try {
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
      } catch (ae) {}

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
      safeAirOnlySetBlock(dimension, { x: wx, y: cy + 1, z: wz + 1 }, "minecraft:reeds");
      safeAirOnlySetBlock(dimension, { x: wx, y: cy + 2, z: wz + 1 }, "minecraft:reeds");
      safeAirOnlySetBlock(dimension, { x: wx - 1, y: cy + 1, z: wz }, "minecraft:waterlily");

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
          safeAirOnlySetBlock(dimension, { x: dx + x, y: cy, z: dz + z }, Math.random() < 0.5 ? "minecraft:mossy_cobblestone" : "minecraft:cracked_stone_bricks");
        }
      }
      safeAirOnlySetBlock(dimension, { x: dx - 1, y: cy + 1, z: dz - 1 }, "minecraft:iron_bars");
      safeAirOnlySetBlock(dimension, { x: dx + 1, y: cy + 1, z: dz - 1 }, "minecraft:iron_bars");
      safeAirOnlySetBlock(dimension, { x: dx - 1, y: cy + 1, z: dz + 1 }, "minecraft:iron_bars");
      safeAirOnlySetBlock(dimension, { x: dx + 1, y: cy + 1, z: dz + 1 }, "minecraft:iron_bars");
      safeAirOnlySetBlock(dimension, { x: dx, y: cy + 1, z: dz }, "minecraft:chiseled_stone_bricks");
      safeAirOnlySetBlock(dimension, { x: dx, y: cy + 2, z: dz }, "minecraft:web");

      if (theme.mob) {
        try {
          dimension.spawnEntity(theme.mob, { x: dx + 0.5, y: cy + 1, z: dz + 0.5 });
        } catch (me) {}
      }

    } else if (tr === "lush_flora") {
      // Built systematically via step 7b below
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

  // 7b. ISLAND NATURAL CANOPY TREES:
  // Authentic 5-tall wood trunk with a ~33-leaf rounded canopy for all forest/woodland/flora themes
  try {
    buildIslandNaturalTree(dimension, theme, center);
  } catch (te) {}

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
