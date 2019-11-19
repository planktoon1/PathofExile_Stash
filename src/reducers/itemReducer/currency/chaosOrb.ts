import { EntityStateMeta } from "../../../Common/Crafting/interfaces";
import { checkRarity } from "../helperFunctions/checkRarity";
import { orbOfAlchemy } from "./orbOfAlchemy";
import { orbOfScouring } from "./orbOfScouring";

export const chaosOrb = (stateMeta: EntityStateMeta) => {
    if (!checkRarity(stateMeta,'Rare'))
        return false;

    orbOfScouring(stateMeta);
    orbOfAlchemy(stateMeta);
    return true;
};