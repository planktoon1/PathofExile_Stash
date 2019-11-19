import { EntityStateMeta } from "../../../Common/Crafting/interfaces";
import { checkRarity } from "../helperFunctions/checkRarity";
import { getRndInteger } from "../../../Common/Utilities";
import { removeModById } from "../helperFunctions/removeModById";
import { updateRarityBasedOnAffixCount } from "../helperFunctions/updateRarityBasedOnAffixCount";
import { updateItemName } from "../helperFunctions/updateItemName";

export const orbOfAnnulment = (stateMeta: EntityStateMeta) => {
  if (!checkRarity(stateMeta, "Rare", "Magic")) {
    return false;
  }

  const modIndexToRemove = getRndInteger(
    0,
    stateMeta.affixesWithValues.length - 1
  );
  removeModById(
    stateMeta,
    stateMeta.affixesWithValues[modIndexToRemove].mod.key
  );
  updateRarityBasedOnAffixCount(stateMeta);
  updateItemName(stateMeta);
  return true;
};
