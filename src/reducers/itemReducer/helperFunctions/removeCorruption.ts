import { EntityStateMeta } from "../../../Common/Crafting/interfaces";

export const _removeCorruption = (stateMeta: EntityStateMeta) => {
    stateMeta.state.corrupted = false;
};