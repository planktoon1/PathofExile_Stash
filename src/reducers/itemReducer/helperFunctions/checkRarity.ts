import {
  EntityStateMeta,
  PopUpVariant
} from "../../../Common/Crafting/interfaces";

export const checkRarity = (stateMeta: EntityStateMeta, ...rarity) => {
  if (!rarity.includes(stateMeta.state.rarity)) {
    stateMeta.popUps.push({
      variant: PopUpVariant.ERROR,
      message: `Item has to be of rarity: ${rarity.join(" or ")}`
    });
    return false;
  } else return true;
};
