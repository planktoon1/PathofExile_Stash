import { ItemTypes } from "../../../Common/Crafting/interfaces";

export function setItemType(itemTypes: ItemTypes[]) {
  return {
    type: "SET_ITEM_TYPE",
    itemTypes
  } as const;
}
