import { EntityStateMeta } from "../../../Common/Crafting/interfaces";
import { updateItemName } from "./updateItemName";

export const updateRarity = (stateMeta: EntityStateMeta) => {
  const realRarity =
    stateMeta.affixesWithValues.length === 0
      ? "Normal"
      : stateMeta.affixesWithValues.length <= 2
      ? "Magic"
      : "Rare";
  stateMeta.state.rarity = realRarity;
  updateItemName(stateMeta);
};
