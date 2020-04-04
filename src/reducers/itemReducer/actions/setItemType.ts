import { ItemTypes } from "../../../Common/Crafting/interfaces";

export function setItemTypes(itemTypes: ItemTypes[]) {
  return {
    type: "SET_ITEM_TYPES",
    itemTypes,
  } as const;
}
