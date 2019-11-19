import { EntityStateMeta } from "../../../Common/Crafting/interfaces";
import { generate_spawnable_mod_list, MODLIST } from "../../../Common/Crafting/CraftingUtil";
import { getRequiredLevel } from "./getRequiredLevel";
import { getAffixGroups } from "./getAffixGroups";

export const generateSpawnablePrefixes =  (stateMeta: EntityStateMeta)  => {
    if (!stateMeta.state.baseItem) {
        return [];
    }
    return generate_spawnable_mod_list(MODLIST, stateMeta.state.baseItem.domain, 
        'prefix', 
        getRequiredLevel(stateMeta), 
        stateMeta.state.tags, 
        getAffixGroups(stateMeta)
    );
};