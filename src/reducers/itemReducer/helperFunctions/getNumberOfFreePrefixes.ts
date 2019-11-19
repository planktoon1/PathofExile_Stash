import { EntityStateMeta } from "../../../Common/Crafting/interfaces";
import { countPrefixes } from "./countPrefixes";

export const getNumberOfFreePrefixes = (stateMeta: EntityStateMeta) => {
  switch (stateMeta.state.rarity) {
    case "Normal":
      return 1;
    case "Magic":
      return 1 - countPrefixes(stateMeta);
    case "Rare":
      return 3 - countPrefixes(stateMeta);
    default:
      return 20; //Idk if theres a limitation on uniques.
  }
};
