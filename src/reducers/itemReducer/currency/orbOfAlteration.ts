import { EntityStateMeta } from "../../../Common/Crafting/interfaces";
import { checkRarity } from "../helperFunctions/checkRarity";
import { orbOfScouring } from "./orbOfScouring";
import { orbOfTransmutation } from "./orbOfTransmutation";

export const orbOfAlteration =  (stateMeta: EntityStateMeta) => {
    if (!checkRarity(stateMeta,'Magic'))
        return false;

    orbOfScouring(stateMeta);
    return orbOfTransmutation(stateMeta);
};