import { EntityStateMeta } from "../../../Common/Crafting/interfaces";
import { updateTotalSpawnWeight } from "./updateTotalSpawnWeight";

export const removeAffixes = (stateMeta: EntityStateMeta) => {
    stateMeta.state.modTranslations = [];
    stateMeta.affixesWithValues = [];
    stateMeta.state.rarity = 'Normal';
    updateTotalSpawnWeight(stateMeta);
};