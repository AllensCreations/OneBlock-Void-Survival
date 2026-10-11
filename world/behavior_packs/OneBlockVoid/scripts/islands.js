// 42+ Unique Themed Secret Void Islands for OneBlock Survival
// Each island generates out in unloaded chunks (140 to 250 blocks away from 0,64,0)
// and strictly preserves player-placed blocks (air-only placement) so nothing is ever overwritten!

import { ItemStack } from "@minecraft/server";

export const ISLAND_THEMES = [
  {
    id: "sky_oasis",
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

// Builds the themed island platform safely
export function buildThemedIsland(dimension, theme, center) {
  const { x: cx, y: cy, z: cz } = center;

  // 1. Natural Organic Micro-Continent Layout:
  // Asymmetrical shape with organic contours, elevated bluff ridge, scenic pond, and cliffside alcove
  // We compute an organic radius per angle around center
  for (let dx = -6; dx <= 6; dx++) {
    for (let dz = -6; dz <= 6; dz++) {
      // Noise/harmonic contour to produce natural coastline shape (not a plain circle)
      const angle = Math.atan2(dz, dx);
      // Shape modulation: wider on North-East/South-West axis, cliff on North-West
      const shapeMod = 4.8 + 1.2 * Math.cos(2 * angle) + 0.6 * Math.sin(3 * angle);
      const dist = Math.sqrt(dx * dx + dz * dz);

      if (dist <= shapeMod) {
        // Natural Elevation: Ridge/hill rises on the North side (+1 height), gentle beach slope on South
        let surfaceY = cy;
        if (dz <= -2 && dx >= -1 && dx <= 3) {
          surfaceY = cy + 1; // Elevated bluff / cliff ridge
        } else if (dz >= 3) {
          surfaceY = cy; // Lower plateau
        }

        // POND ALCOVE: Small natural pool at (dx: -2, dz: 1)
        const isPond = (dx === -2 && dz === 1) || (dx === -3 && dz === 1) || (dx === -2 && dz === 2);

        // Place top surface layer
        if (isPond) {
          safeAirOnlySetBlock(dimension, { x: cx + dx, y: cy, z: cz + dz }, "minecraft:water");
          safeAirOnlySetBlock(dimension, { x: cx + dx, y: cy - 1, z: cz + dz }, "minecraft:clay");
        } else {
          safeAirOnlySetBlock(dimension, { x: cx + dx, y: surfaceY, z: cz + dz }, theme.floor);
          // If elevated bluff, fill step underneath with subfloor
          if (surfaceY > cy) {
            safeAirOnlySetBlock(dimension, { x: cx + dx, y: cy, z: cz + dz }, theme.subfloor);
          }
        }

        // Tiered Underside & Hanging Roots (Tapers down naturally)
        const depth = Math.max(1, Math.round((shapeMod - dist) * 1.2));
        for (let d = 1; d <= depth; d++) {
          const mat = d === 1 ? theme.subfloor : theme.base;
          safeAirOnlySetBlock(dimension, { x: cx + dx, y: cy - d, z: cz + dz }, mat);
        }

        // Occasional stalactite root hanging into the void
        if (dist <= 2.2 && (dx + dz) % 2 === 0) {
          safeAirOnlySetBlock(dimension, { x: cx + dx, y: cy - depth - 1, z: cz + dz }, theme.base);
          if (dist <= 1.2) {
            safeAirOnlySetBlock(dimension, { x: cx + dx, y: cy - depth - 2, z: cz + dz }, theme.base);
          }
        }
      }
    }
  }

  // 2. Central Lodestone Beacon Monument (At exact island target coordinates: cx, cy+1, cz)
  safeAirOnlySetBlock(dimension, { x: cx, y: cy + 1, z: cz }, "minecraft:lodestone");

  // 3. Natural Thematic Lighting: Lanterns on cobblestone/wood posts along the cliffs
  const lightPosts = [
    { x: cx + 3, y: cy + 1, z: cz - 3 },
    { x: cx - 4, y: cy + 1, z: cz - 1 },
    { x: cx + 2, y: cy + 1, z: cz + 3 }
  ];
  for (const lp of lightPosts) {
    safeAirOnlySetBlock(dimension, { x: lp.x, y: lp.y, z: lp.z }, "minecraft:oak_fence");
    safeAirOnlySetBlock(dimension, { x: lp.x, y: lp.y + 1, z: lp.z }, "minecraft:lantern");
  }

  // 4. Thematic Micro-Structure & Flora on the Western bluff
  try {
    const feat = theme.feature;
    if (feat === "blossom_tree" || feat === "bamboo_grove" || feat === "beehive") {
      const log = feat === "blossom_tree" ? "minecraft:cherry_log" : "minecraft:oak_log";
      const leaves = feat === "blossom_tree" ? "minecraft:cherry_leaves" : "minecraft:oak_leaves";
      for (let h = 1; h <= 4; h++) safeAirOnlySetBlock(dimension, { x: cx - 1, y: cy + h, z: cz - 3 }, log);
      for (let lx = -2; lx <= 0; lx++) {
        for (let lz = -4; lz <= -2; lz++) {
          safeAirOnlySetBlock(dimension, { x: cx + lx, y: cy + 4, z: cz + lz }, leaves);
          safeAirOnlySetBlock(dimension, { x: cx + lx, y: cy + 5, z: cz + lz }, leaves);
        }
      }
      if (feat === "beehive") {
        safeAirOnlySetBlock(dimension, { x: cx - 1, y: cy + 2, z: cz - 4 }, "minecraft:bee_nest");
      }
    } else if (feat === "huge_mushroom") {
      for (let h = 1; h <= 4; h++) safeAirOnlySetBlock(dimension, { x: cx - 1, y: cy + h, z: cz - 3 }, "minecraft:mushroom_stem");
      for (let mx = -2; mx <= 0; mx++) {
        for (let mz = -4; mz <= -2; mz++) {
          safeAirOnlySetBlock(dimension, { x: cx + mx, y: cy + 4, z: cz + mz }, "minecraft:red_mushroom_block");
        }
      }
    } else if (feat === "copper_spire" || feat === "pillars" || feat === "gold_monolith") {
      const mat = feat === "copper_spire" ? "minecraft:copper_block" : feat === "gold_monolith" ? "minecraft:gold_block" : "minecraft:chiseled_sandstone";
      for (let h = 1; h <= 3; h++) {
        safeAirOnlySetBlock(dimension, { x: cx - 1, y: cy + h, z: cz - 3 }, mat);
      }
    } else if (feat === "amethyst_crystal") {
      safeAirOnlySetBlock(dimension, { x: cx - 1, y: cy + 1, z: cz - 3 }, "minecraft:amethyst_block");
      safeAirOnlySetBlock(dimension, { x: cx - 1, y: cy + 2, z: cz - 3 }, "minecraft:amethyst_cluster");
    }
  } catch (fe) {}

  // 5. Cliffside Alcove Chest with Tier-Appropriate Loot
  const chestPos = { x: cx, y: cy + 1, z: cz + 2 };
  // Ensure solid floor under chest
  try {
    const floorBlock = dimension.getBlock({ x: chestPos.x, y: chestPos.y - 1, z: chestPos.z });
    if (floorBlock && (floorBlock.isAir || floorBlock.typeId === "minecraft:air")) {
      floorBlock.setType(theme.floor);
    }
  } catch (fe) {}

  try {
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

  // 6. Thematic Mob Companion / Guardian
  if (theme.mob) {
    try {
      dimension.spawnEntity(theme.mob, { x: cx + 0.5, y: cy + 1.2, z: cz - 0.5 });
    } catch (e) {}
  }
}
