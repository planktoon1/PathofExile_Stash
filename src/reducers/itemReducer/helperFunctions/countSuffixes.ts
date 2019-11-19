import { EntityStateMeta } from "../../../Common/Crafting/interfaces";

export const countSuffixes = (stateMeta: EntityStateMeta) => {
    let sufCount = 0;
    for (const modWvalue of stateMeta.affixesWithValues) {
        if (modWvalue.mod.generation_type === "suffix")
            sufCount++;
    }
    return sufCount;
};