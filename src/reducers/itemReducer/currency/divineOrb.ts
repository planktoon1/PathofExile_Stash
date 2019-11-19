import { EntityStateMeta } from "../../../Common/Crafting/interfaces";
import { cloneDeep } from "lodash";
import { getRndInteger } from "../../../Common/Utilities";
import { addMod } from "../helperFunctions/addMod";

export const divineOrb = (stateMeta: EntityStateMeta) => {
  // A bit of a work around, but we remove all mods and add them again to get newly rolled values
  const tempAffixes = cloneDeep(stateMeta.affixesWithValues);
  stateMeta.state.modTranslations = [];
  stateMeta.affixesWithValues = [];

  for (const implicitWValue of tempAffixes) {
    const idValueDict = {};
    for (const stat of implicitWValue.mod.stats) {
      const currentValue = implicitWValue.statValues[stat.id];
      let newValue = implicitWValue.statValues[stat.id];
      const statMin = stat.min;
      const statMax = stat.max;

      if (statMin === statMax) {
        // dont roll
      } else {
        let i = 0;
        const maxItr = 500;
        while (newValue === currentValue && i < maxItr) {
          newValue = getRndInteger(statMin, statMax);
          i++;
        }
      }
      idValueDict[stat.id] = newValue;
    }
    addMod(
      stateMeta,
      {
        mod: implicitWValue.mod,
        statValues: idValueDict
      },
      false
    );
  }

  return true;
};
