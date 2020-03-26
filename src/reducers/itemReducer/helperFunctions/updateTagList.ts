import { cloneDeep } from "lodash";
import { ITEMCLASSES, MODLIST } from "../../../Common/Crafting/CraftingUtil";
import {
  EntityStateMeta,
  ItemTypes
} from "../../../Common/Crafting/interfaces";
import { updateItemName } from "./updateItemName";
import { updateTotalSpawnWeight } from "./updateTotalSpawnWeight";

export const updateTagList = (stateMeta: EntityStateMeta) => {
  if (!stateMeta.state.baseItem) {
    stateMeta.state.tags = [];
    return;
  }

  // Reset taglist to just include baseitem tags
  stateMeta.state.tags = cloneDeep(stateMeta.state.baseItem.tags);
  // Add itemType tags, such as elder or shaper tags
  addItemTypeTags(stateMeta);
  // Add the tags from the implicit modifiers if any
  for (let implicit of stateMeta.state.baseItem.implicits) {
    for (let tag of MODLIST[implicit].adds_tags) {
      if (!stateMeta.state.tags.includes(tag))
        stateMeta.state.tags.unshift(tag);
    }
  }
  // Add the tags from each additional affix on the item
  for (const modWvalues of stateMeta.affixesWithValues) {
    const mod = modWvalues.mod;
    if (!mod.adds_tags) continue;
    for (let tag of mod.adds_tags) {
      if (!stateMeta.state.tags.includes(tag))
        stateMeta.state.tags.unshift(tag);
    }
  }
  // Update total spawn weight with new taglist
  updateItemName(stateMeta);
  updateTotalSpawnWeight(stateMeta);
};

const addItemTypeTags = (stateMeta: EntityStateMeta) => {
  if (!stateMeta.state.baseItem) {
    return;
  }

  switch (stateMeta.state.itemType) {
    case ItemTypes.Elder:
      const elderTag = getElderTag(stateMeta.state.baseItem.item_class);
      if (elderTag) {
        stateMeta.state.tags.unshift(elderTag);
      }
      break;
    case ItemTypes.Shaper:
      const shaperTag = getShaperTag(stateMeta.state.baseItem.item_class);
      if (shaperTag) {
        stateMeta.state.tags.unshift(shaperTag);
      }
      break;
    default:
      break;
  }
};

export const getElderTag = (itemClass: string) => {
  return ITEMCLASSES[itemClass].elder_tag;
};

export const getShaperTag = (itemClass: string) => {
  return ITEMCLASSES[itemClass].shaper_tag;
};
