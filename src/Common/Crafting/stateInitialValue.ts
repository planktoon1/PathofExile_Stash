import { EntityState, ItemTypes } from "./interfaces";
import { getBaseItemFromName } from "./CraftingUtil";
import { cloneDeep } from "lodash";
import { intialCalculatedProps } from "./initialCalculatedProps";

export const stateInitialValue: EntityState = {
  baseItem: getBaseItemFromName("Maraketh Bow"),
  itemLevel: 71,
  corrupted: false,
  itemTypes: [],
  calculatedProperties: cloneDeep(intialCalculatedProps),
  name: "None",
  rarity: "Normal",
  totalSpawnWeight: 0,
  quality: 0,
  tags: [],
  implicitTranslations: [],
  modTranslations: []
};
