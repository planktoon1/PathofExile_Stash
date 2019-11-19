import { EntityStateMeta } from "../../../Common/Crafting/interfaces";
import { getModById } from "../../../Common/Crafting/CraftingUtil";
import { removeAffixes } from "./removeAffixes";
import { addImplicit } from "./addImplicit";
import { getRndInteger } from "../../../Common/Utilities";
import { calculateProperties } from "./calculateProperties";
import { updateTagList } from "./updateTagList";

export const _resetItem = (stateMeta: EntityStateMeta) => {
  removeAffixes(stateMeta);
  stateMeta.state.corrupted = false;
  stateMeta.state.itemLevel = stateMeta.state.baseItem
    ? stateMeta.state.baseItem.drop_level
    : stateMeta.state.itemLevel;
  stateMeta.state.implicitTranslations = [];
  stateMeta.implicitsWithValues = [];
  stateMeta.state.quality = 0;

  if (stateMeta.state.baseItem) {
    for (const implicitId of stateMeta.state.baseItem.implicits) {
      const implicit = getModById(implicitId);

      const idValueDict = {};
      if (implicit) {
        for (const stat of implicit.stats) {
          idValueDict[stat.id] = getRndInteger(stat.min, stat.max);
        }
        const modWValues = {
          mod: implicit,
          statValues: idValueDict
        };
        addImplicit(stateMeta, modWValues);
      }
    }
  }
  calculateProperties(stateMeta);
  updateTagList(stateMeta);
};
