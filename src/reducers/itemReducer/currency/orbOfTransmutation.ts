import { EntityStateMeta } from "../../../Common/Crafting/interfaces";
import { checkRarity } from "../helperFunctions/checkRarity";
import { getRndInteger } from "../../../Common/Utilities";
import { rollAndAddAffix } from "../helperFunctions/rollAndAddAffix";

export const orbOfTransmutation = (stateMeta: EntityStateMeta) => {
    if (!checkRarity(stateMeta, 'Normal'))
        return false;

    stateMeta.state.rarity = 'Magic';
    const numberOfMods = getRndInteger(1, 2);
    for (let index = 0; index < numberOfMods; index++) {
        rollAndAddAffix(stateMeta);
    }
    
    return true;
};