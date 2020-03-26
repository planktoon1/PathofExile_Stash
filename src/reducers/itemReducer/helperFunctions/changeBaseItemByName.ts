import { getBaseItemFromName } from "../../../Common/Crafting/CraftingUtil";
import { changeBaseItem } from "./changeBaseItem";
import { EntityStateMeta } from "../../../Common/Crafting/interfaces";

export const changeBaseItemByName = (
  stateMeta: EntityStateMeta,
  baseItemName: string
) => {
  // Changes the base item of the entity if the name matches any of the available baseitems

  const newBaseItem = getBaseItemFromName(baseItemName);
  if (newBaseItem) {
    changeBaseItem(stateMeta, newBaseItem);
  } else {
    throw Error(
      `Error: Couldn't find a baseitem with the name: '${baseItemName}'`
    );
  }
};
