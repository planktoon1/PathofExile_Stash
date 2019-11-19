import {
  EntityStateMeta,
  PopUpVariant
} from "../../../Common/Crafting/interfaces";
import { itemClasses } from "../../../Common/Crafting/CraftingUtil";
import { checkItemClass } from "../helperFunctions/checkItemClass";

export const armourersScrap = (stateMeta: EntityStateMeta) => {
  if (!checkItemClass(stateMeta, ...itemClasses["Armor"])) {
    stateMeta.popUps.push({
      variant: PopUpVariant.ERROR,
      message: `Armourer's Scrap can only be used on armour`
    });
    return false;
  }

  switch (stateMeta.state.rarity) {
    case "Normal":
      stateMeta.state.quality += 5;
      break;
    case "Magic":
      stateMeta.state.quality += 2;
      break;
    case "Rare":
    case "Unique":
    default:
      stateMeta.state.quality += 1;
      break;
  }

  if (stateMeta.state.quality > 20) {
    stateMeta.state.quality = 20;
    return false;
  }

  return true;
};
