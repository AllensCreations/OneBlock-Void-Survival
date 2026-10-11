# OneBlock Void Survival (Minecraft Bedrock Edition)

**Creator**: AllensCreations  
**Compatibility**: Minecraft Bedrock v1.20 – v1.26+ (MCPE, Windows, Xbox, PlayStation, Switch)  
**Type**: Pure Vanilla Map (`experiments_ever_used: 0`)  

---

## 🌟 Map Overview
**OneBlock Void Survival** is a feature-complete infinite OneBlock experience built purely for Minecraft Bedrock with `@minecraft/server` Script API v1.8.0.

Players spawn at `(0, 65, 0)` standing directly above an infinite regenerative block at `(0, 64, 0)` in the Overworld, Nether, and The End void.

---

## 🚀 Key Features

### 1. 100% Pure Vanilla Survival (No Experimental Flags)
- Zero experimental toggles needed (`experiments_ever_used: 0`).
- No experimental warning banners or world corruption risks on Bedrock updates.
- Fast, smooth, and lightweight for mobile (MCPE) devices.

### 2. Balanced 15-Step Starter Foundation Tutorial
- **Blocks 1 to 8 (Platform Auto-Build)**: 
  - Each broken dirt block auto-places into one of the 8 perimeter spots around the center to form a safe 3x3 platform.
  - **No Item Duplication**: Broken dirt is not collected into player inventory during these 8 steps.
  - **Temporary Anti-Clip Elevation**: Automatically prevents players from falling through the block during foundation building, and turns off permanently after block 8.
- **Blocks 9 to 11**: Oak Logs (Crafting Table, Sticks, Wooden Pickaxe).
- **Blocks 12 to 14**: Stone (gather Cobblestone for a Stone Pickaxe).
- **Block 15 (Completion)**: Spawns Coal Ore and gifts a **Starter Chest** containing **2x Ice Blocks** to create an infinite water source pool.

### 3. Dynamic Phase Progression
- **27 Comprehensive Phases across Dimensions**:
  - **15 Overworld Phases**: Plains, Birch & Flower Forest, Cherry Grove, Taiga, Underground Caves, Desert, Savanna, Jungle & Bamboo, Swamp & Mangrove, Pale Garden & Creaking, Trial Chambers & Tuff, Deepslate & Caverns, Snowy Tundra, Ocean & Lush Caves, and End Portal Prep.
  - **7 Nether Phases**: Nether Wastes, Crimson Forest, Warped Forest, Soul Sand Valley, Basalt Deltas, Nether Fortress, and Bastion Remnants.
  - **5 End Phases**: End Void, End Highlands, Chorus Plantations, End City, and Void Pinnacle.
- **Progressive Phase Length Scaling**:
  - Phases 0–4 (Early Biomes): 50 blocks.
  - Phases 5–9 (Mid Biomes): 100 blocks.
  - Phases 10+ (Late Biomes): 150 blocks.
- **5-Second Transition Countdown**: Bedrock lock, countdown titles (`5..4..3..2..1`), and celebration fireworks.

### 4. Interactive Physical Reward Chests
- **Mid-Phase Mystery Chests (2% Chance)**: Real `minecraft:chest` placed on top of the OneBlock with 2–4 themed items.
- **Jackpot Chests (0.1% Chance)**: Filled with 3 to 5 valuable mineral blocks (Diamonds, Emeralds, Gold, Iron).
- **Ancient Relic Chests (0.1% Chance)**: Holds Ancient Enchantment Books (Mending, Unbreaking III, Efficiency V), Totems of Undying, or Dragon Egg trophies.
- **Lucky Rush & Void Surges**:
  - **Lucky Rush (0.5% chance)**: 10 seconds of high-value mineral block spawning.
  - **Void Surge (0.5% chance)**: 10 seconds of dark rift storm events spawning hostile waves.

### 5. 42+ Unique Secret Void Islands & Lodestone Compass Quests
- **Unloaded Chunk Distances ($R = 140$ to $240$ blocks away)**: Spawns far out in the void in radial angular positions.
- **Zero Overlapping / Air-Only Build Protection**: Strict air-only placement preserves all player-placed bridges, platforms, and farms.
- **Thematic Y Level Heights**:
  - **Celestial & Peaks ($Y=80–96$)**: Glacial Ice Spire, End City Spire, Glowstone Meteor, Pantheon of the Gods, Observatory.
  - **Surface & Gardens ($Y=62–76$)**: Cherry Blossom Sanctuary, Pale Garden Spire, Floral Oasis Village, Panda Sanctuary.
  - **Sunken Crypts & Depths ($Y=32–60$)**: Ancient Sandstone Crypt, Trial Vault, Bastion Treasury, Nether Fortress Outpost, Deepslate Forge, Sculk Laboratory.
- **Mystical Lodestone Compass Tracking**:
  - Exact $(X, Y, Z)$ coordinates are kept hidden for authentic exploration.
  - Players receive an attuned **Lodestone Compass** whose needle points toward the island's central Lodestone block across the void.
- **Island Claiming & Discovery Registration**:
  - Right-clicking the island's Lodestone with its respective Compass launches fireworks, plays a victory fanfare, consumes the compass, and transforms the Lodestone into a **Gilded Blackstone** monument.

### 6. Dual Display HUD & Scoreboard System
- **Sidebar Scoreboard (Right Screen)**: Displays live Overworld Phase, Phase Progress (`[X/Length]`), Nether Phase, End Phase, and Total Blocks Mined.
- **Actionbar HUD (Above Hotbar)**: Minimalist HUD showing dimension, phase name, progress, and total block count.
- **Toggle Command**: Type `!hud` in chat to toggle the Actionbar HUD on or off.

---

## 📁 Repository Structure
```
├── behavior_pack/
│   ├── manifest.json
│   ├── pack_icon.png
│   ├── scripts/
│   │   ├── main.js         # Core OneBlock generation engine & event listeners
│   │   ├── phases.js       # All 27 phase block & chest loot tables
│   │   ├── islands.js      # 42+ themed secret void islands generator
│   │   └── rarities.js     # Dimension shifters & rarity trade pools
│   └── dimensions/
├── world/
│   ├── level.dat           # Clean level data (experiments_ever_used: 0)
│   ├── world_behavior_packs.json
│   └── db/                 # World storage
└── releases/
    ├── OneBlock_Void_Survival.mcworld  # Ready-to-import Bedrock world
    └── OneBlock_Void_Survival.mcpack   # Standalone behavior pack
```

---

## 🎮 How to Install and Play

### Option 1: One-Click `.mcworld` Import (Recommended)
1. Download `releases/OneBlock_Void_Survival.mcworld`.
2. Tap / open the file on your device (Android, iOS, Windows, etc.).
3. Minecraft will launch automatically and import the world into your world list!

### Option 2: Add Behavior Pack to Existing World
1. Download `releases/OneBlock_Void_Survival.mcpack`.
2. Import it into Minecraft.
3. Apply the **OneBlock Void Behavior Pack** under **Behavior Packs** in your world settings.
