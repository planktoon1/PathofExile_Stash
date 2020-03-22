import { ModOutputDict } from "../../src/Common/Crafting/interfaces";
import {
  getDetailedTierList,
  influenceMods,
  modIsWithin
} from "./generateModTierList";
import { TierListLookUp } from "./models";
const MODLIST: ModOutputDict = require("../../src/assets/poe_data/mods.min.json");
const TIERLISTLOOKUP: TierListLookUp = require("../../src/assets/poe_data/mod_tier_lookup.min.json");
const TIERLIST = getDetailedTierList();

/*######################################################### 
    Assumptions
    Creation of tier list is based on some assumptions. 
    To make sure these assumptions holds true some utility functions are
    here created to test the validity of the assumptions.
    Ideally these should be run everytime there is a game data update.
###########################################################*/

// Assumption 1: all mods with one of the influence mod names only has tags that has the corresponding influence suffix in the tag name. Excluding blocking tags/tags that has spawn weight 0
const assumption1IsTrue = (): boolean => {
  let assumptionIsValid = true;
  for (let [modId, modData] of Object.entries(MODLIST)) {
    // For now tier list only includes these domains and generation types. so we only test mods within these
    if (!modIsWithin(modData, ["item"], ["suffix", "prefix"])) {
      continue;
    }
    if (!influenceMods[modData.name]) {
      continue;
    }

    const influenceTagSuffix = influenceMods[modData.name];
    for (const spawnWeight of modData.spawn_weights) {
      if (
        spawnWeight.weight > 0 &&
        !spawnWeight.tag.includes(influenceTagSuffix)
      ) {
        console.log(
          ` Mod: '${modId}' tag: '${spawnWeight.tag}' does not have the '${influenceTagSuffix}' suffix, thus assumption1 is wrong`
        );
        assumptionIsValid = false;
      }
    }
  }
  return assumptionIsValid;
};

console.log("Assumption 1 is: " + assumption1IsTrue());

// Assumption 2: For a given itemclass  all tiergroups within does not have any tierlists that disrupt eachother.
// effectivly meaning that there is no need for tiergroups, but just itemclasses

// Note this being true makes it so that the generated json file can be significantly smaller, as there doesnt have to be an entry for each "sub" itemclass
// BUT because i need to produce the tierlist with the tiergroups/"sub" itemclasses before generating the file that i use to check this assumption, i still need the code for generating the tierlist with "sub"itemclasses
const assumption2IsTrue = (): boolean => {
  let assumptionIsValid = true;

  const combinedTierGroups: {
    [itemClass: string]: {
      [modId: string]: number;
    };
  } = {};
  for (let [tierGroupName, tierGroupData] of Object.entries(TIERLIST)) {
    const itemClass = tierGroupData.itemClass;
    for (let [modId, tier] of Object.entries(TIERLISTLOOKUP[tierGroupName])) {
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
        assumptionIsValid = false;
      }
    }
  }

  return assumptionIsValid;
};

console.log("Assumption 2 is: " + assumption2IsTrue());
