import { ItemClassDict } from "../../src/Common/Crafting/interfaces";

const ITEMCLASSES: ItemClassDict = require("../../src/assets/poe_data/item_classes.min.json");

const tagToItemClass: { [tag: string]: string[] } = {};
const itemClassToInfluenceTags: { [itemClas: string]: string[] } = {};
for (let [itemClass, itemClassData] of Object.entries(ITEMCLASSES)) {
  for (let [type, tag] of Object.entries(itemClassData)) {
    if (type === "name" || tag === null) {
      continue;
    }
    if (tagToItemClass[tag]) {
      tagToItemClass[tag].push(itemClass);
    } else {
      tagToItemClass[tag] = [itemClass];
    }
    if (itemClassToInfluenceTags[itemClass]) {
      itemClassToInfluenceTags[itemClass].push(tag);
    } else {
      itemClassToInfluenceTags[itemClass] = [tag];
    }
  }
}

export const getItemClasses = influnceTag => {
  return tagToItemClass[influnceTag];
};

export const getInfluenceTags = itemClass => {
  return itemClassToInfluenceTags[itemClass];
};
