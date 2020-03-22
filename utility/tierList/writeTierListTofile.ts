import { getTierListLookUp } from "./generateModTierList";
const fs = require("fs");

const TIERLISTLOOKUP = getTierListLookUp();
const json = JSON.stringify(TIERLISTLOOKUP, null, 2);
const json_min = JSON.stringify(TIERLISTLOOKUP);
const OUTPUTDIR_MIN = `./src/assets/poe_data/`;
const OUTPUTDIR_READABLE = `utility/tierList/`;

fs.writeFile(`${OUTPUTDIR_READABLE}mod_tier_lookup.json`, json, "utf8", err => {
  if (err) {
    throw err;
  }
  console.log("Finished writing json to processed_mod_list.json");
});
fs.writeFile(
  `${OUTPUTDIR_MIN}mod_tier_lookup.min.json`,
  json_min,
  "utf8",
  err => {
    if (err) {
      throw err;
    }
    console.log("Finished writing json to processed_mod_list.min.json");
  }
);
