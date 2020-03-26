import { TIERLIST } from "../../Common/Crafting/CraftingUtil";

export const getModTier = (itemClass, modId) => {
  if (TIERLIST[itemClass]) {
    return TIERLIST[itemClass][modId];
  } else {
    console.warn(`Mod tier not found for id: ${modId}, class: ${itemClass}`);

    return undefined;
  }
};
