import { EntityStateMeta } from "../../../Common/Crafting/interfaces";
import { checkRarity } from "../helperFunctions/checkRarity";
import { rollAndAddAffix } from "../helperFunctions/rollAndAddAffix";

export const regalOrb = (stateMeta: EntityStateMeta) => {
    if (!checkRarity(stateMeta, 'Magic'))
        return false;
    
    stateMeta.state.rarity = 'Rare';
    
    rollAndAddAffix(stateMeta);
    
    return true;
};