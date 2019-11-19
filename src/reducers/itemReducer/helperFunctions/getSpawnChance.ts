import { Mod, EntityStateMeta } from "../../../Common/Crafting/interfaces";
import { get_spawn_weight } from "../../../Common/Crafting/CraftingUtil";

export const getSpawnChance = (stateMeta: EntityStateMeta, mod: Mod) => {
  const modSpawnWeight = get_spawn_weight(mod, stateMeta.state.tags);

  return modSpawnWeight / stateMeta.state.totalSpawnWeight;
};
