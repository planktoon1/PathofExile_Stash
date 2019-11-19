import { Mod, EntityStateMeta } from "../../../Common/Crafting/interfaces";
import { get_spawn_weight } from "../../../Common/Crafting/CraftingUtil";

export const getSpawnWeight = (stateMeta: EntityStateMeta ,mod: Mod) => {
    return get_spawn_weight(mod, stateMeta.state.tags);
};