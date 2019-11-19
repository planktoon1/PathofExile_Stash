import { EntityStateMeta } from "../../../Common/Crafting/interfaces";
import { generateMagicItemName } from "./generateMagicItemName";
import { generateRareItemName } from "./generateRareItemName";

export const updateItemName = (stateMeta: EntityStateMeta) => {
  let name: string = "";

  if (stateMeta.state.rarity === "Magic") {
    name = generateMagicItemName(stateMeta);
  } else if (stateMeta.state.rarity === "Rare") {
    name = generateRareItemName(stateMeta);
  }
  stateMeta.state.name = name;
  return name;
};
