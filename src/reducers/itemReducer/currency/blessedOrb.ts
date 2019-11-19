import { EntityStateMeta } from "../../../Common/Crafting/interfaces";
import { cloneDeep } from "lodash";
import { getRndInteger } from "../../../Common/Utilities";
import { addImplicit } from "../helperFunctions/addImplicit";

export const blessedOrb = (stateMeta: EntityStateMeta) => {
  if (stateMeta.implicitsWithValues.length === 0) {
    return false;
  }
  const tempImplicits = cloneDeep(stateMeta.implicitsWithValues);
  stateMeta.state.implicitTranslations = [];
  stateMeta.implicitsWithValues = [];

  for (const implicitWValue of tempImplicits) {
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
    addImplicit(stateMeta, {
      mod: implicitWValue.mod,
      statValues: idValueDict
    });
  }

  return true;
};
