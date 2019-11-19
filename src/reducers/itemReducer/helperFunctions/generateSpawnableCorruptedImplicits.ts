import { Mod, EntityStateMeta } from "../../../Common/Crafting/interfaces";
import { MODLIST, generate_spawnable_mod_list } from "../../../Common/Crafting/CraftingUtil";
import { getRequiredLevel } from "./getRequiredLevel";

export const generateSpawnableCorruptedImplicits = (stateMeta: EntityStateMeta): Mod[] => {
    if (!stateMeta.state.baseItem) {
        return [];
    }
    return generate_spawnable_mod_list(MODLIST, stateMeta.state.baseItem.domain, 'corrupted', getRequiredLevel(stateMeta), stateMeta.state.tags);
};