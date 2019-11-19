import { EntityStateMeta } from "../../../Common/Crafting/interfaces";
import { countSuffixes } from "./countSuffixes";

export const getNumberOfFreeSuffixes = (stateMeta: EntityStateMeta) => {
  switch (stateMeta.state.rarity) {
    case "Normal":
      return 1;
    case "Magic":
      return 1 - countSuffixes(stateMeta);
    case "Rare":
      return 3 - countSuffixes(stateMeta);
    default:
      return 20; //Idk if theres a limitation on uniques.
  }
};
