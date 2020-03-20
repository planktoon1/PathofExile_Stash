import {
  ModOutputDict,
  BaseItemDict,
  ModOutput,
  BaseItem,
  Mod
} from "../../src/Common/Crafting/interfaces";
import { getInfluenceTags } from "./itemClasses";

const MODLIST: ModOutputDict = require("../../src/assets/poe_data/mods.min.json");
const BASEITEMLIST: BaseItemDict = require("../../src/assets/poe_data/base_items.min.json");

/** A mapping between mod name and associated spawn_weight tag */
const influenceMods = {
  Eldritch: "_elder",
  "of the Elder": "_elder",
  "The Shaper's": "_shaper",
  "of Shaping": "_shaper",
  "Crusader's": "_crusader",
  "of the Crusade": "_crusader",
  "Warlord's": "_adjudicator",
  "of the Conquest": "_adjudicator",
  "Hunter's": "_basilisk",
  "of the Hunt": "_basilisk",
  "Redeemer's": "_eyrie",
  "of Redemption": "_eyrie"
};
// Note: all mods with one of the mod names above only has tags that has the corresponding influence suffix in the tag name. Excluding blocking tags/tags that has spawn weight 0

// get list of tags that matter for the tierlist
let relevantTags = new Set();
for (let [modId, modData] of Object.entries(MODLIST)) {
  if (!modIsWithin(modData, ["item"], ["suffix", "prefix"])) {
    continue;
  }
  for (const spawnWeight of modData.spawn_weights) {
    if (spawnWeight.weight > 0) {
      relevantTags.add(spawnWeight.tag);
    }
  }
}

interface ModDetails {
  reqLevel: number;
  modId: string;
  generationType: string;
}
/** The actual tier lists are stored here under tier groups */
export interface TierList {
  /** A tier group is a tier list that applies to a specific set of base items */
  [tierGroup: string]: {
    /** What determines what tier group a specific base item belongs to is the tags on that item,
     * because the tags are ultimately what determines what mods are available to roll */
    tags: string[];
    /** How many base items belong to this tier group  */
    itemCount: number;
    itemClass: string;
    naturalTypes: {
      [tierType: string]: ModDetails[];
    };
    _elder: {
      [tierType: string]: ModDetails[];
    };
    _shaper: {
      [tierType: string]: ModDetails[];
    };
    _crusader: {
      [tierType: string]: ModDetails[];
    };
    _adjudicator: {
      [tierType: string]: ModDetails[];
    };
    _basilisk: {
      [tierType: string]: ModDetails[];
    };
    _eyrie: {
      [tierType: string]: ModDetails[];
    };
  };
}

const tierList: TierList = {};
/** mapping used for getting all tierGroups that a specific tag is used in */
const tagToTierGroupLookup: { [tag: string]: string[] } = {};
const influenceTagToTierGroupLookup: { [tag: string]: string[] } = {};

// Generate tier groups based on available base items. note: after this all groups will be generated but no mods has been added
for (let [itemName, itemData] of Object.entries(BASEITEMLIST)) {
  if (itemData.domain !== "item") {
    continue;
  }

  const tierGroupTags = itemData.tags.filter(e => relevantTags.has(e));
  const tierGroupName = tierGroupTags.join("#");

  // influenceTagToTierGroupLookup
  const influenceTags = getInfluenceTags(itemData.item_class);

  if (influenceTags) {
    for (const influenceTag of influenceTags) {
      if (influenceTagToTierGroupLookup[influenceTag]) {
        if (
          influenceTagToTierGroupLookup[influenceTag].indexOf(
            "tierGroupName"
          ) !== -1
        )
          influenceTagToTierGroupLookup[influenceTag].push(tierGroupName);
      } else {
        influenceTagToTierGroupLookup[influenceTag] = [tierGroupName];
      }
    }
  }

  // end influenceTagToTierGroupLookup

  if (!tierList[tierGroupName]) {
    tierList[tierGroupName] = {
      tags: tierGroupTags,
      itemClass: itemData.item_class,
      itemCount: 1,
      naturalTypes: {},
      _elder: {},
      _shaper: {},
      _crusader: {},
      _adjudicator: {},
      _basilisk: {},
      _eyrie: {}
    };
    tierGroupTags.forEach(tag => {
      tagToTierGroupLookup[tag]
        ? tagToTierGroupLookup[tag].push(tierGroupName)
        : (tagToTierGroupLookup[tag] = [tierGroupName]);
    });
  } else {
    tierList[tierGroupName]["itemCount"] += 1;
  }
}

// Inserting mods into tier groups generated above
for (let [modId, modData] of Object.entries(MODLIST)) {
  if (!modIsWithin(modData, ["item"], ["suffix", "prefix"])) {
    continue;
  }

  // If its an influence mod add it to the associated groups
  const influenceTagSuffix = influenceMods[modData.name];
  if (influenceTagSuffix) {
    for (const spawnWeight of modData.spawn_weights) {
      const tierGroups = influenceTagToTierGroupLookup[spawnWeight.tag];
      if (tierGroups) {
        for (const tierGroup of tierGroups) {
          if (!tierList[tierGroup][influenceTagSuffix][modData.type]) {
            tierList[tierGroup][influenceTagSuffix][modData.type] = [
              {
                reqLevel: modData.required_level,
                modId,
                generationType: modData.generation_type
              }
            ];
          } else {
            tierList[tierGroup][influenceTagSuffix][modData.type].push({
              reqLevel: modData.required_level,
              modId,
              generationType: modData.generation_type
            });
          }
        }
      }
    }
  }

  const AddedToTierGroups: any = {};
  for (const spawnWeight of modData.spawn_weights) {
    if (spawnWeight.weight > 0 && tagToTierGroupLookup[spawnWeight.tag]) {
      // add the mod to all tierlists that it should be added to
      for (const tierGroup of tagToTierGroupLookup[spawnWeight.tag]) {
        // avoid duplicate mods in tierlists
        if (AddedToTierGroups[tierGroup]) {
          continue;
        }
        AddedToTierGroups[tierGroup] = true;
        if (!tierList[tierGroup].naturalTypes[modData.type]) {
          tierList[tierGroup].naturalTypes[modData.type] = [
            {
              reqLevel: modData.required_level,
              modId,
              generationType: modData.generation_type
            }
          ];
        } else {
          tierList[tierGroup].naturalTypes[modData.type].push({
            reqLevel: modData.required_level,
            modId,
            generationType: modData.generation_type
          });
        }
      }
    }
  }
}

// Go through all tier lists and sort them on requiredLevel
for (const [tierGroupName, tierGroup] of Object.entries(tierList)) {
  const listTypes = [
    "naturalTypes",
    "_elder",
    "_shaper",
    "_crusader",
    "_adjudicator",
    "_basilisk",
    "_eyrie"
  ];
  for (const list of listTypes) {
    for (const [tierTypeName, tierType] of Object.entries(tierGroup[list])) {
      (tierType as any).sort((a, b) => b.reqLevel - a.reqLevel);
    }
  }
}

/** Get the tier group a specific baseitem belongs to */
const getTierGroup = (baseItem: Pick<BaseItem, "tags">): string => {
  const tierGroupTags = baseItem.tags.filter(e => relevantTags.has(e));
  return tierGroupTags.join("#");
};

const getModTier = (
  baseItem: Pick<BaseItem, "tags">,
  mod: Pick<Mod, "type" | "key">
): undefined | number => {
  const tierGroup = getTierGroup(baseItem);
  const tierListEntry = tierList[tierGroup]?.naturalTypes[mod.type];
  if (!tierListEntry) {
    return undefined;
  }

  const tier = tierListEntry.findIndex(e => e.modId === mod.key);
  return tier === -1 ? undefined : tier + 1;
};

console.log(tierList["dex_int_armour#boots#armour#default"]._elder);

// for (let [tierGroup, tierData] of Object.entries(tierList)) {
//   console.log(
//     `${tierGroup}.. itemCount: ${tierData.itemCount}.. class: ${tierData.itemClass}`
//   );
// }

const testBaseItem = {
  tags: [
    "not_for_sale",
    "atlas_base_type",
    "bootsatlas1",
    "dex_int_armour",
    "boots",
    "armour",
    "default"
  ]
};

const testMod = {
  type: "LifeRegeneration",
  key: "LifeRegeneration1"
};

//console.log(getModTier(testBaseItem, testMod));

/*
    Utility functions
*/
function modIsWithin(
  modData: ModOutput,
  domains: string[] = [],
  generationType: string[] = []
): boolean {
  return (
    domains.includes(modData.domain) &&
    generationType.includes(modData.generation_type)
  );
}
