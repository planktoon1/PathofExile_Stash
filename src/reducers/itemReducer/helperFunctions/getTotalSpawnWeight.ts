import { Mod, EntityStateMeta } from "../../../Common/Crafting/interfaces";
import { updateTotalSpawnWeight } from "./updateTotalSpawnWeight";
import { getSpawnWeight } from "./getSpawnWeight";

/**
 * Given a list of mods returns the total spawn weight of those. Given no mod list returns the total spawnweight of all currently possible mods
 */
export const getTotalSpawnWeight = (
  stateMeta: EntityStateMeta,
  modList: Mod[] = []
) => {
  if (modList.length === 0) {
    return updateTotalSpawnWeight(stateMeta);
  }

  let totalSpawnWeight = 0;
  for (const mod of modList) {
    totalSpawnWeight += getSpawnWeight(stateMeta, mod);
  }
  stateMeta.state.totalSpawnWeight = totalSpawnWeight;
  return totalSpawnWeight;
};
