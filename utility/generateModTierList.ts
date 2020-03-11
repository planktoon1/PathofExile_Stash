import { ModOutputDict } from "../src/Common/Crafting/interfaces";

const MODLIST: ModOutputDict = require("../src/assets/poe_data/mods.min.json");

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
