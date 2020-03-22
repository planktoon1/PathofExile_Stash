import {
  ModOutputDict,
  BaseItemDict,
  ModOutput,
  BaseItem
} from "../../src/Common/Crafting/interfaces";
import { getInfluenceTags } from "./itemClasses";
import { TierList, TierListLookUp, ModDetails } from "./models";

const MODLIST: ModOutputDict = require("../../src/assets/poe_data/mods.min.json");
const BASEITEMLIST: BaseItemDict = require("../../src/assets/poe_data/base_items.min.json");

/** A mapping between mod name and associated spawn_weight tag */
export const influenceMods = {
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
// Run assumption 1 to check if this is valid

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

const tierList: TierList = {};
/** mapping used for getting all tierGroups that a specific tag is used in */
const tagToTierGroupLookup: { [tag: string]: string[] } = {};
const influenceTagToTierGroupLookup: { [tag: string]: string[] } = {};

// Generate tier groups based on available base items. note: after this loop is done all groups will be generated but no mods has been added yet
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
          influenceTagToTierGroupLookup[influenceTag].indexOf(tierGroupName) ===
          -1
        ) {
          influenceTagToTierGroupLookup[influenceTag].push(tierGroupName);
        }
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
console.log(
  `tierList has been generated with '${
    Object.keys(tierList).length
  }' tierGroups/"sub"itemclasses`
);

const tierListLookUp: TierListLookUp = {};
let modCount = 0;
for (let [tierGroupName, tierGroup] of Object.entries(tierList)) {
  /** List of all the props in the tiergroup object that contains tierlists */
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
    for (const [modtypeName, mt] of Object.entries(tierGroup[list])) {
      const modType = mt as ModDetails[];
      for (let i = 0; i < modType.length; i++) {
        const tier = i + 1;
        const string = String(modType[i].modId + tierGroupName);
        // console.log(string);
        if (tierListLookUp[tierGroupName]) {
          tierListLookUp[tierGroupName][modType[i].modId] = tier;
        } else {
          tierListLookUp[tierGroupName] = {};
          tierListLookUp[tierGroupName][modType[i].modId] = tier;
        }
        modCount++;
      }
    }
  }
}
console.log(
  `tierListLookUp has been generated with '${modCount}' mods across '${
    Object.keys(tierListLookUp).length
  }' tierGroups`
);

// Lets work backwards and take all tiergroups from a itemClass and combine them together. See assumption 2 in './testAssumptions.ts' for information on why we can do this
const combinedTierGroups: {
  [itemClass: string]: {
    [modId: string]: number;
  };
} = {};
for (let [tierGroupName, tierGroupData] of Object.entries(tierList)) {
  const itemClass = tierGroupData.itemClass;
  for (let [modId, tier] of Object.entries(tierListLookUp[tierGroupName])) {
    if (!combinedTierGroups[itemClass]) {
      combinedTierGroups[itemClass] = {};
    }
    if (!combinedTierGroups[itemClass][modId]) {
      combinedTierGroups[itemClass][modId] = tier;
      // If an entry for the modId already exists compare the existing entry with the new entry
    } else if (combinedTierGroups[itemClass][modId] !== tier) {
      console.log(
        `mod: '${modId}' has tier: '${tier}' in tierGroup: '${tierGroupName}' but tier: '${combinedTierGroups[itemClass][modId]}' in another tierGroup, thus assumption 2 is wrong`
      );
    }
  }
}

/*
    Utility functions
*/
export function modIsWithin(
  modData: ModOutput,
  domains: string[] = [],
  generationType: string[] = []
): boolean {
  return (
    domains.includes(modData.domain) &&
    generationType.includes(modData.generation_type)
  );
}

/** Get the tier group a specific baseitem belongs to */
export const getTierGroup = (baseItem: Pick<BaseItem, "tags">): string => {
  const tierGroupTags = baseItem.tags.filter(e => relevantTags.has(e));
  return tierGroupTags.join("#");
};

export const getDetailedTierList = () => {
  return tierList;
};

export const getTierListLookUp = () => {
  //return tierListLookUp;
  // Note: because of assumption2 being true we can generate tierlist lookup based on itemClasses instead of tierGroupings
  return combinedTierGroups;
};
