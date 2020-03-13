import {
  ModOutputDict,
  BaseItemDict,
  ModOutput
} from "../src/Common/Crafting/interfaces";

const MODLIST: ModOutputDict = require("../src/assets/poe_data/mods.min.json");
const BASEITEMLIST: BaseItemDict = require("../src/assets/poe_data/base_items.min.json");

// For each mod
//  Sort out all mods where domain != "item"
//  And sort out all mods where generation_type != "prefix" | "suffix"
//  For each entry in "spawn_weight" if weight > 0:
//      Add to tierlist first under the "tagname" and then under the "type"
//      tierlist[tag][type] = [{id: modId, requiredLvl: ilvl}, n...]

// Given a baseitem and a mod find the mod tier
// For each tag in baseitems tags:
//      if (tierlist[tag] && tierlist[tag][mod.type]) {
//          const index = tierlist[tag][mod.type].findIndex( e => e.id === mod.id )
//          if (index !== -1) {
//              return index + 1
//          }
//      }
// IF the algo ran through all the tags without finding the mod.. then something is wrong

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
//console.log(relevantTags);
const tierList: any = {};
/** mapping used for getting all tierGroups that a specific tag is used in */
const tagToTierGroupLookup = {};
for (let [itemName, itemData] of Object.entries(BASEITEMLIST)) {
  if (itemData.domain !== "item") {
    continue;
  }

  const tierGroupTags = itemData.tags.filter(e => relevantTags.has(e));
  const tierGroupName = tierGroupTags.join("#");
  if (!tierList[tierGroupName]) {
    tierList[tierGroupName] = { tags: tierGroupTags, itemCount: 1 };
    tierGroupTags.forEach(tag => {
      tagToTierGroupLookup[tag]
        ? tagToTierGroupLookup[tag].push(tierGroupName)
        : (tagToTierGroupLookup[tag] = [tierGroupName]);
    });
  } else {
    tierList[tierGroupName]["itemCount"] += 1;
  }
}
// console.log(tagToTierLookup);

// generate tierlist
for (let [modName, modData] of Object.entries(MODLIST)) {
  if (!modIsWithin(modData, ["item"], ["suffix", "prefix"])) {
    continue;
  }

  for (const spawnWeight of modData.spawn_weights) {
    if (spawnWeight.weight > 0 && tagToTierGroupLookup[spawnWeight.tag]) {
      // add the mod to all tierlists that it should be added to
      for (const tierGroup of tagToTierGroupLookup[spawnWeight.tag]) {
        if (!tierList[tierGroup][modData.type]) {
          tierList[tierGroup][modData.type] = [
            { reqLevel: modData.required_level, modName }
          ];
        } else {
          tierList[tierGroup][modData.type].push({
            reqLevel: modData.required_level,
            modName,
            generationType: modData.generation_type
          });
        }
      }
    }
  }
}

console.log(tierList["sword#two_hand_weapon#weapon#default"]);
console.log(Object.keys(tierList).length);

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
