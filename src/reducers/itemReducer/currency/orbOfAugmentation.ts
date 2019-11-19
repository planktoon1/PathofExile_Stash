import {
  EntityStateMeta,
  PopUpVariant
} from "../../../Common/Crafting/interfaces";
import { checkRarity } from "../helperFunctions/checkRarity";
import { getNumberOfFreeSuffixes } from "../helperFunctions/getNumberOfFreeSuffixes";
import { getNumberOfFreePrefixes } from "../helperFunctions/getNumberOfFreePrefixes";
import { rollAndAddAffix } from "../helperFunctions/rollAndAddAffix";

export const orbOfAugmentation = (stateMeta: EntityStateMeta) => {
  if (!checkRarity(stateMeta, "Magic")) return false;

  const freePrefixesCount = getNumberOfFreePrefixes(stateMeta);
  const freeSuffixesCount = getNumberOfFreeSuffixes(stateMeta);
  if (freePrefixesCount === 0 && freeSuffixesCount === 0) {
    stateMeta.popUps.push({
      variant: PopUpVariant.ERROR,
      message: `Magic items can have a maximum of one prefix and one suffix`
    });
    return false;
  }

  rollAndAddAffix(stateMeta);

  return true;
};
