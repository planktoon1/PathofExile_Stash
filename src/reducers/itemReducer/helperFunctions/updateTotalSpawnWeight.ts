import { EntityStateMeta, Mod } from "../../../Common/Crafting/interfaces";
import { getSpawnWeight } from "./getSpawnWeight";
import { getAvailableMods } from "./getAvailableMods";

export const updateTotalSpawnWeight = (stateMeta: EntityStateMeta) => {
  // modlist to base calculation on, list of all mods that is possible to roll
  const modList: Mod[] = getAvailableMods(stateMeta);

  let totalSpawnWeight = 0;
  for (const mod of modList) {
    totalSpawnWeight += getSpawnWeight(stateMeta, mod);
  }
  stateMeta.state.totalSpawnWeight = totalSpawnWeight;

  return totalSpawnWeight;
};
