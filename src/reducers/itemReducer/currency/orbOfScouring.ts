import { EntityStateMeta } from "../../../Common/Crafting/interfaces";
import { checkRarity } from "../helperFunctions/checkRarity";
import { removeAffixes } from "../helperFunctions/removeAffixes";

export const orbOfScouring = (stateMeta: EntityStateMeta) => {
            if (!checkRarity(stateMeta,'Magic', 'Rare'))
                return false;

            removeAffixes(stateMeta);
            return true;
        };