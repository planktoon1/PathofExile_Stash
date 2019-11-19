import { EntityStateMeta } from "../../../Common/Crafting/interfaces";

export const checkItemClass = (stateMeta: EntityStateMeta, ...itemClass) => {
    if (!stateMeta.state.baseItem)
        return false;
    if (!itemClass.includes(stateMeta.state.baseItem.item_class)) {
        return false;
    } else 
        return true;
};