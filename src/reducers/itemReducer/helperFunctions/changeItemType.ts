import {
  EntityStateMeta,
  ItemTypes
} from "../../../Common/Crafting/interfaces";
import { updateTagList } from "./updateTagList";

export const changeItemType = (
  stateMeta: EntityStateMeta,
  itemType: ItemTypes
) => {
  stateMeta.state.itemType = itemType;
  updateTagList(stateMeta);
};
