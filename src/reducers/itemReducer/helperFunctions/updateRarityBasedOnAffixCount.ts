import { EntityStateMeta } from "../../../Common/Crafting/interfaces";
import { countSuffixes } from "./countSuffixes";
import { countPrefixes } from "./countPrefixes";

export const updateRarityBasedOnAffixCount = (stateMeta: EntityStateMeta) => {
    const affixCount = countSuffixes(stateMeta) + countPrefixes(stateMeta);
    switch (affixCount) {
        case 0:
            stateMeta.state.rarity = "Normal";
            break;
        case 1:
        case 2:
            stateMeta.state.rarity = "Magic";
            break;
        case 3:
        case 4:
        case 5:
        case 6:
            stateMeta.state.rarity = "Rare";
            break;
        default:
            stateMeta.state.rarity = "Unique"; 
            break;
    }
};