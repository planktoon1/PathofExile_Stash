// Assumption 1: For a given itemclass  all tiergroups within does not have any tierlists that disrupt eachother.
// effectivly meaning that there is no need for tiergroups, but just itemclasses

import {
  getTierList,
  TierGroup,
  ModDetailsDict,
  ModDetails
} from "./generateModTierList";

const TIERLIST = getTierList();

/* For a itemclass test tiergroups against eachother
    For the assumption to be true two tiergroups can not have tiertypes where any of the mods are not the same tier or non existant in the other tier groups
*/
const itemClass = "Body Armour";
const combinedTierGroup: TierGroup = {
  tags: [],
  itemClass: itemClass,
  itemCount: 0,
  naturalTypes: {},
  _elder: {},
  _shaper: {},
  _crusader: {},
  _adjudicator: {},
  _basilisk: {},
  _eyrie: {}
};
for (let [tierGroupName, tierGroup] of Object.entries(TIERLIST)) {
  if (tierGroup.itemClass !== itemClass) {
    continue;
  }

  const listTypes = [
    "naturalTypes",
    "_elder",
    "_shaper",
    "_crusader",
    "_adjudicator",
    "_basilisk",
    "_eyrie"
  ];
  // run through all tierlists and compare them to the combined tierGroup
  console.log("*********************************" + tierGroupName);

  for (const list of listTypes) {
    for (const [modtypeName, mt] of Object.entries(tierGroup[list])) {
      const modType = mt as ModDetails[];
      for (const mod of modType) {
        //
        combinedTierGroup[list][modType];
        console.log(mod.modId);
      }
    }
  }
}
console.log("hello");
