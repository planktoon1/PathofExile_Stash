import { ModDict, ModOutputDict } from "../src/Common/Crafting/interfaces";
import { getModDescription } from "../src/Common/Crafting/Translation";
const fs = require("fs");
const MODLIST: ModOutputDict = require("../src/assets/poe_data/mods.min.json");

/** Used to filter the mod list to only contain valid item mods, to avoid iterating over irrelevant data */
const filterMods = (modlist: ModOutputDict) => {
  const itemModList: ModOutputDict = {};
  for (let [modName, modData] of Object.entries(modlist)) {
    if (modData.domain === "item") {
      itemModList[modName] = modData;
    }
  }
  return itemModList;
};

/** Used to add descriptions to mods, so that it only has to be done this one time and not on every mod render */
const addDescriptionsToModList = (modlist: ModOutputDict): ModDict => {
  const itemModList: ModDict = {};
  for (let [modName, modData] of Object.entries(modlist)) {
    itemModList[modName] = {
      ...modData,
      key: modName,
      description: getModDescription(modData).join(" / "),
      description_only_values: getModDescription(modData, true).join(" / ")
    };
  }
  return itemModList;
};

console.log("Entries before filtering: " + Object.entries(MODLIST).length);
const filteredModList = filterMods(MODLIST);
console.log(
  "Entries after filtering: " + Object.entries(filteredModList).length
);
const alteredModList = addDescriptionsToModList(filteredModList);

const json = JSON.stringify(alteredModList, null, 2);
const json_min = JSON.stringify(alteredModList);

fs.writeFile("processed_mod_list.json", json, "utf8", () =>
  console.log("Finished writing json to processed_mod_list.json")
);
fs.writeFile("processed_mod_list.min.json", json_min, "utf8", () =>
  console.log("Finished writing json to processed_mod_list.min.json")
);
