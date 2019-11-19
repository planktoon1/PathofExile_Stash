import {
  EntityStateMeta,
  Mod,
  ModWithStatValues
} from "../../../Common/Crafting/interfaces";
import { getRndInteger } from "../../../Common/Utilities";
import { addMod } from "./addMod";
import { getAvailableMods } from "./getAvailableMods";
import { getSpawnWeight } from "./getSpawnWeight";
import { getTotalSpawnWeight } from "./getTotalSpawnWeight";

export const rollAndAddAffix = (stateMeta: EntityStateMeta) => {
  const availableMods = getAvailableMods(stateMeta);
  // Roll mod
  const maxRoll = getTotalSpawnWeight(stateMeta, availableMods);
  const roll = getRndInteger(1, maxRoll);

  // Find mod that is equivalent to the roll
  let weightSum = getSpawnWeight(stateMeta, availableMods[0]);
  let modToAdd: Mod | undefined = undefined;
  for (const mod of availableMods) {
    if (weightSum >= roll) {
      modToAdd = mod;
      break;
    }
    weightSum += getSpawnWeight(stateMeta, mod);
  }

  // Value roll
  const idValueDict = {};
  if (modToAdd) {
    for (const stat of modToAdd.stats) {
      idValueDict[stat.id] = getRndInteger(stat.min, stat.max);
    }
    const modWValues: ModWithStatValues = {
      mod: modToAdd,
      statValues: idValueDict
    };
    addMod(stateMeta, modWValues);
  }
};
