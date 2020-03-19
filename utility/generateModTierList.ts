import {
  ModOutputDict,
  BaseItemDict,
  ModOutput,
  BaseItem,
  Mod
} from "../src/Common/Crafting/interfaces";

const MODLIST: ModOutputDict = require("../src/assets/poe_data/mods.min.json");
const BASEITEMLIST: BaseItemDict = require("../src/assets/poe_data/base_items.min.json");

// get list of tags that matter for the tierlist
let relevantTags = new Set();
for (let [modName, modData] of Object.entries(MODLIST)) {
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
  [tierGroup: string]: {
    tags: string[];
    itemCount: number;
    modTypes: {
      [tierType: string]: ModDetails[];
    };
  };
}

const tierListExample = {
  tierGroupName1: {
    tags: ["tag1", "tag2", "tag3", "tag4"],
    itemCount: 3,
    modTypes: {
      modType1: [
        {
          reqLevel: 15,
          modName: "WeaponElementalDamageOnWeapons1",
          generationType: "prefix"
        },
        {
          reqLevel: 30,
          modName: "WeaponElementalDamageOnWeapons2",
          generationType: "prefix"
        },
        {
          reqLevel: 60,
          modName: "WeaponElementalDamageOnWeapons3",
          generationType: "prefix"
        }
      ],
      modType2: [
        {
          reqLevel: 15,
          modName: "funMod1",
          generationType: "suffix"
        },
        {
          reqLevel: 31,
          modName: "funMod2",
          generationType: "suffix"
        },
        {
          reqLevel: 64,
          modName: "funMod3",
          generationType: "suffix"
        }
      ]
    }
  }
};

const tierList: TierList = {};
/** mapping used for getting all tierGroups that a specific tag is used in */
const tagToTierGroupLookup: { [tag: string]: string[] } = {};
// Generate tier groups based on available base items
for (let [itemName, itemData] of Object.entries(BASEITEMLIST)) {
  if (itemData.domain !== "item") {
    continue;
  }

  const tierGroupTags = itemData.tags.filter(e => relevantTags.has(e));
  const tierGroupName = tierGroupTags.join("#");
  if (!tierList[tierGroupName]) {
    tierList[tierGroupName] = {
      tags: tierGroupTags,
      itemCount: 1,
      modTypes: {}
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

/** Get the tier group a specific baseitem belongs to */
const getTierGroup = (baseItem: Pick<BaseItem, "tags">): string => {
  const tierGroupTags = baseItem.tags.filter(e => relevantTags.has(e));
  return tierGroupTags.join("#");
};

// generate tierlist, inserting mods into tier groups generated above
for (let [modId, modData] of Object.entries(MODLIST)) {
  if (!modIsWithin(modData, ["item"], ["suffix", "prefix"])) {
    continue;
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
        if (!tierList[tierGroup].modTypes[modData.type]) {
          tierList[tierGroup].modTypes[modData.type] = [
            {
              reqLevel: modData.required_level,
              modId,
              generationType: modData.generation_type
            }
          ];
        } else {
          tierList[tierGroup].modTypes[modData.type].push({
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
  for (const [tierTypeName, tierType] of Object.entries(tierGroup.modTypes)) {
    tierType.sort((a, b) => b.reqLevel - a.reqLevel);
  }
}

const getModTier = (
  baseItem: Pick<BaseItem, "tags">,
  mod: Pick<Mod, "type" | "key">
): undefined | number => {
  const tierGroup = getTierGroup(baseItem);
  const tierListEntry = tierList[tierGroup]?.modTypes[mod.type];
  if (!tierListEntry) {
    return undefined;
  }

  const tier = tierListEntry.findIndex(e => e.modId === mod.key);
  return tier === -1 ? undefined : tier + 1;
};

console.log(tierList["dex_int_armour#boots#armour#default"].modTypes);

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

console.log(getModTier(testBaseItem, testMod));

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
