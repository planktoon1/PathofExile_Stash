import { EntityStateMeta } from "../../../Common/Crafting/interfaces"

export const getRequiredLevel = (stateMeta: EntityStateMeta) => {
    // Calculates and returns the entities required level
    return stateMeta.state.itemLevel
};