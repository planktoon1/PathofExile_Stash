import {
  EntityStateMeta,
  PopUpVariant
} from "../../../Common/Crafting/interfaces";
import { checkRarity } from "../helperFunctions/checkRarity";
import { rollAndAddAffix } from "../helperFunctions/rollAndAddAffix";
import { getNumberOfFreePrefixes } from "../helperFunctions/getNumberOfFreePrefixes";
import { getNumberOfFreeSuffixes } from "../helperFunctions/getNumberOfFreeSuffixes";

export const exaltedOrb = (stateMeta: EntityStateMeta) => {
  if (!checkRarity(stateMeta, "Rare")) return false;

  const freePrefixesCount = getNumberOfFreePrefixes(stateMeta);
  const freeSuffixesCount = getNumberOfFreeSuffixes(stateMeta);
  if (freePrefixesCount === 0 && freeSuffixesCount === 0) {
    stateMeta.popUps.push({
      variant: PopUpVariant.ERROR,
      message: `Rare items can have a maximum of 3 prefixes and 3 suffixes`
    });
    return false;
  }

  rollAndAddAffix(stateMeta);

  return true;
};
