import {
  BaseItem,
  BaseItemDict,
  ItemClasses,
  Mod,
  TranslationDict,
  ItemClassDict,
  ItemTypes,
  ModDict,
} from "./interfaces";
export const MODLIST: ModDict = require("../../assets/poe_data/processed_mod_list.min.json");
export const BASEITEMS: BaseItemDict = require("../../assets/poe_data/base_items.min.json");
export const MODTRANSLATIONS: TranslationDict = require("../../assets/poe_data/stat_translations.min.json");
export const ITEMCLASSES: ItemClassDict = require("../../assets/poe_data/item_classes.min.json");
export const TIERLIST: {
  [itemClass: string]: { [modId: string]: number };
} = require("../../assets/poe_data/mod_tier_lookup.min.json");

// Used as options in the base items selection, therefore not including all posibilitis, like jewels.
export const itemClasses: ItemClasses = {
  Armor: ["Gloves", "Boots", "Body Armour", "Helmet", "Shield"],
  "One Handed Weapon": [
    "Claw",
    "Dagger",
    "Rune Dagger",
    "Wand",
    "One Hand Sword",
    "Thrusting One Hand Sword",
    "One Hand Mace",
    "One Hand Axe",
    "Sceptre",
  ],
  "Two Handed Weapon": [
    "Bow",
    "Staff",
    "Two Hand Sword",
    "Two Hand Axe",
    "Two Hand Mace",
    "Warstaff",
    "FishingRod",
  ],
  // Offhand: ["Shield", "Quiver"],
  Accessory: ["Amulet", "Ring", "Belt", "Quiver"],
};

export const getItemCategory = (
  item: BaseItem,
  itemClassesDI: ItemClasses = itemClasses
): string | undefined => {
  for (const category in itemClassesDI) {
    if (itemClasses[category].includes(item.item_class)) return category;
  }
  return undefined;
};

export const getImgUrlFromBaseItem = (
  baseItem: BaseItem,
  itemTypes: ItemTypes[] = []
): string => {
  const height = baseItem.inventory_height;
  const width = baseItem.inventory_width;
  let optionalParams = `?w=${width}&h=${height}&scale=1&${itemTypes
    .map((e) => `${e}=1`)
    .join("&")}`.toLowerCase();

  const inGameImgUrl = baseItem.visual_identity.dds_file;

  return `https://web.poecdn.com/image/${inGameImgUrl.replace(
    ".dds",
    ".png"
  )}${optionalParams}`;
};

export const getModById = (modId: string): Mod | undefined => {
  return MODLIST[modId];
};

export const getBaseItemsInDomain = (
  domain: string,
  itemClass: string[] = ["any"]
): BaseItem[] => {
  const baseItemsInDomain: BaseItem[] = [];

  for (let [itemName, itemData] of Object.entries(BASEITEMS)) {
    if (itemData.domain !== domain) {
      continue;
    }
    if (
      !itemClass.includes("any") &&
      !itemClass.includes(itemData.item_class)
    ) {
      continue;
    }
    if (
      itemData.properties.attack_time &&
      itemData.properties.physical_damage_min &&
      itemData.properties.physical_damage_max
    ) {
      itemData.dps =
        ((itemData.properties.physical_damage_min +
          itemData.properties.physical_damage_max) /
          2) *
        (1000 / itemData.properties.attack_time);
    }
    itemData.key = itemName;
    baseItemsInDomain.push(itemData);
  }
  return baseItemsInDomain;
};

export const getBaseItemFromName = (name: string): BaseItem => {
  for (let [, itemData] of Object.entries(BASEITEMS)) {
    if (itemData.name === name) {
      return itemData;
    }
  }
  throw Error(`Failed to find item with name ${name}`);
};

export const generate_spawnable_mod_list = (
  mod_list: ModDict = MODLIST,
  domain: string = "item",
  generation_type: string | string[],
  level: number = 1,
  tags: string[] = ["default"],
  excludeGroups: string[] = [],
  ignoreTags: boolean = false
): Mod[] => {
  if (typeof generation_type === "string") {
    generation_type = [generation_type];
  }
  const mods: Mod[] = [];

  for (let [, modData] of Object.entries(mod_list)) {
    if (level < modData.required_level) {
      continue;
    }
    if (domain !== modData.domain) {
      continue;
    }
    if (excludeGroups.includes(modData.group)) {
      continue;
    }
    if (!generation_type.includes(modData.generation_type)) {
      continue;
    }

    if (!ignoreTags && get_spawn_weight(modData, tags) === 0) {
      continue;
    }
    mods.push(modData);
  }
  return mods;
};

export const get_spawn_weight = (mod, tags) => {
  let current_weight = 0;

  for (let { tag, weight } of mod.spawn_weights) {
    if (tags.includes(tag)) {
      current_weight = weight;
      break;
    }
  }
  return current_weight;
};
