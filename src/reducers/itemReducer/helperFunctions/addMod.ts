import {
  EntityStateMeta,
  Mod,
  ModWithStatValues
} from "../../../Common/Crafting/interfaces";
import { getModTranslations } from "../../../Common/Crafting/Translation";
import { getRndInteger } from "../../../Common/Utilities";
import { updateRarity } from "./updateRarity";
import { updateTagList } from "./updateTagList";
import { getModTier } from "../../../Components/Item/utility";

export const addModWithRandomStats = (stateMeta: EntityStateMeta, mod: Mod) => {
  // Roll random stats
  const idValueDict = {};
  for (const stat of mod.stats) {
    idValueDict[stat.id] = getRndInteger(stat.min, stat.max);
  }
  const modWvalues: ModWithStatValues = {
    mod,
    statValues: idValueDict
  };
  // add the mod
  addMod(stateMeta, modWvalues);
  updateRarity(stateMeta);
};

export const addMod = (
  stateMeta: EntityStateMeta,
  modWvalues: ModWithStatValues,
  triggerUpdateTagList: boolean = true
) => {
  if (!modWvalues.mod) return;
  stateMeta.affixesWithValues.push(modWvalues);
  let displayAdvancedDetails = true;
  for (const mod of getModTranslations(modWvalues.mod, modWvalues.statValues)) {
    const translationWithMinMax = `test3`;
    const advancedDetails = capitalize_Words(
      `${modWvalues.mod.generation_type} modifier "${
        modWvalues.mod.name
      }" (tier: ${getModTier(
        stateMeta.state.baseItem.item_class,
        modWvalues.mod.key
      )})`
    );

    stateMeta.state.modTranslations.push({
      translation: mod,
      modId: modWvalues.mod.key,
      translationWithMinMax,
      displayAdvancedDetails,
      advancedDetails
    });
    displayAdvancedDetails = false;
  }
  if (triggerUpdateTagList) {
    updateTagList(stateMeta);
  }
};

function capitalize_Words(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
