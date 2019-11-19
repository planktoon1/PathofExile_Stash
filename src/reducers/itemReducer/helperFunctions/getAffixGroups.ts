import { EntityStateMeta } from "../../../Common/Crafting/interfaces";

export const  getAffixGroups =  (stateMeta: EntityStateMeta) => {
    const affixGroups: string[] = [];
    for (const mod of stateMeta.affixesWithValues) {
        if (!affixGroups.includes(mod.mod.group))
        affixGroups.push(mod.mod.group);
    }
    return affixGroups;
};