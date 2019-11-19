import { BaseItem, EntityStateMeta } from "../../../Common/Crafting/interfaces";
import { getItemCategory, getModById } from "../../../Common/Crafting/CraftingUtil";
import { getRndInteger } from "../../../Common/Utilities";
import { updateTagList } from "./updateTagList";
import { removeAffixes } from "./removeAffixes";
import { addImplicit } from "./addImplicit";
import { calculateProperties } from "./calculateProperties";

export const changeBaseItem = (stateMeta: EntityStateMeta, item: BaseItem) => {
    if (stateMeta.state.baseItem) {
         if (getItemCategory(stateMeta.state.baseItem) !== getItemCategory(item)) {
             removeAffixes(stateMeta);
             stateMeta.state.corrupted = false;
         }
    }
    stateMeta.state.baseItem = item;
    stateMeta.state.itemLevel = item.drop_level;
    stateMeta.state.implicitTranslations = [];
    stateMeta.implicitsWithValues = [];
     for (const implicitId of item.implicits) {
         const implicit = getModById(implicitId);
         
         const idValueDict = {};
         if (implicit) {
             for (const stat of implicit.stats) {
                 idValueDict[stat.id] = getRndInteger( stat.min, stat.max);
             }
         
             const modWValues = {
                mod: implicit,
                statValues: idValueDict,
            }
            addImplicit(stateMeta, modWValues); 
        }
         
     }
     calculateProperties(stateMeta);
     updateTagList(stateMeta);
 };