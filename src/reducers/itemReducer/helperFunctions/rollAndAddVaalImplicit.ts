import { EntityStateMeta, Mod, ModWithStatValues } from "../../../Common/Crafting/interfaces";
import { getRndInteger } from "../../../Common/Utilities";
import { addImplicit } from "./addImplicit";
import { generateSpawnableCorruptedImplicits } from "./generateSpawnableCorruptedImplicits";
import { getSpawnWeight } from "./getSpawnWeight";
import { getTotalSpawnWeight } from "./getTotalSpawnWeight";


export const rollAndAddVaalImplicit = (stateMeta: EntityStateMeta) => {
    // Get available implicits
    const availableImplicits = generateSpawnableCorruptedImplicits(stateMeta);

    // Roll mod
    const maxRoll = getTotalSpawnWeight(stateMeta, availableImplicits);
    const roll = getRndInteger(1, maxRoll);
    
    // Find mod that is equivalent to the roll
    let weightSum = getSpawnWeight(stateMeta, availableImplicits[0]);
    let modToAdd: Mod | undefined = undefined;
    for (const mod of availableImplicits) {
        if (weightSum >= roll) {
            modToAdd=mod;
            break;
        }
        weightSum+= getSpawnWeight(stateMeta, mod);
    }
    // Value roll
    const idValueDict = {};
    if (modToAdd) {
        for (const stat of modToAdd.stats) {
            idValueDict[stat.id] = getRndInteger( stat.min, stat.max);
        }
        const modWValues: ModWithStatValues = {
            mod: modToAdd,
            statValues: idValueDict,
        }
        addImplicit(stateMeta, modWValues);
    }
};