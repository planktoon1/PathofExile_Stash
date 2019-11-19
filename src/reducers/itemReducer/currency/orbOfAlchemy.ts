import { EntityStateMeta } from "../../../Common/Crafting/interfaces";
import { getRndInteger } from "../../../Common/Utilities";
import { checkRarity } from "../helperFunctions/checkRarity";
import { rollAndAddAffix } from "../helperFunctions/rollAndAddAffix";

export const orbOfAlchemy = (stateMeta: EntityStateMeta) => {
    if (!checkRarity(stateMeta,'Normal'))
        return false;

    stateMeta.state.rarity = 'Rare';
    const percentage = getRndInteger(1, 100);
    const numberOfMods = (percentage <= 65)
                         ? 4
                         : (percentage <= 90) 
                         ? 5 
                         : 6;
    for (let index = 0; index < numberOfMods; index++) {
        rollAndAddAffix(stateMeta);
    }
    return true;
};