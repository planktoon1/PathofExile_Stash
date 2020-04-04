import {
  EntityStateMeta,
  ItemTypes,
} from "../../../Common/Crafting/interfaces";
import { updateTagList } from "./updateTagList";

export const changeItemTypes = (
  stateMeta: EntityStateMeta,
  itemType: ItemTypes[]
) => {
  stateMeta.state.itemTypes = itemType;
  updateTagList(stateMeta);
};
