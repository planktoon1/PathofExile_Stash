import { EntityStateMeta } from "../../../Common/Crafting/interfaces";

export const countPrefixes = (stateMeta: EntityStateMeta) => {
    let preCount = 0;
    for (const modWvalue of stateMeta.affixesWithValues) {
        if (modWvalue.mod.generation_type === "prefix")
            preCount++;
    }
    return preCount;
};