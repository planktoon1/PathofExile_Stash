import {
  EntityStateMeta,
  Mod,
  ModWithStatValues
} from "../../../Common/Crafting/interfaces";
import { getModTranslations } from "../../../Common/Crafting/Translation";
import { getRndInteger } from "../../../Common/Utilities";
import { updateRarity } from "./updateRarity";
import { updateTagList } from "./updateTagList";

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
  for (const mod of getModTranslations(modWvalues.mod, modWvalues.statValues)) {
    stateMeta.state.modTranslations.push({
      translation: mod,
      modId: modWvalues.mod.key
    });
  }
  if (triggerUpdateTagList) {
    updateTagList(stateMeta);
  }
};
