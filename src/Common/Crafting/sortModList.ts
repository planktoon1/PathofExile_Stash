import { ModOutputDict } from "./interfaces";
const fs = require("fs");
const MODLIST: ModOutputDict = require("../../assets/poe_data/mods.min.json");

const filterMods = () => {
  const itemModList: ModOutputDict = {};
  for (let [modName, modData] of Object.entries(MODLIST)) {
    if (modData.domain === "item") {
      itemModList[modName] = modData;
    }
  }
  console.log("Entries: " + Object.entries(itemModList).length);
  const json = JSON.stringify(itemModList, null, 2);
  const json_min = JSON.stringify(itemModList);

  fs.writeFile("mods_domain_item.json", json, "utf8", () =>
    console.log("Finished writing json to mods_domain_item.json")
  );
  fs.writeFile("mods_domain_item.min.json", json_min, "utf8", () =>
    console.log("Finished writing json to mods_domain_item.min.json")
  );
};

filterMods();
