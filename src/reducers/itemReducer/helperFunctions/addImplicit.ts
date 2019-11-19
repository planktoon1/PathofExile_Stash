import { ModWithStatValues, EntityStateMeta } from "../../../Common/Crafting/interfaces";
import { getModTranslations } from "../../../Common/Crafting/Translation";

export const addImplicit = (stateMeta: EntityStateMeta, modWvalues: ModWithStatValues) => {
    if (!modWvalues.mod)
        return;

    stateMeta.implicitsWithValues.push(modWvalues);
    for (const mod of getModTranslations(modWvalues.mod, modWvalues.statValues)) {
        stateMeta.state.implicitTranslations.push({translation: mod, modId: modWvalues.mod.key});    
    }
};