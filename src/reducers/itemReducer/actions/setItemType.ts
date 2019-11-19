import { ItemTypes } from "../../../Common/Crafting/interfaces";

export function setItemType(itemType: ItemTypes) {
  return {
    type: "SET_ITEM_TYPE",
    itemType
  } as const;
}
