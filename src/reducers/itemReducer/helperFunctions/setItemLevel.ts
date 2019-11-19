import { EntityStateMeta } from "../../../Common/Crafting/interfaces";
import { updateTotalSpawnWeight } from "./updateTotalSpawnWeight";

export const _setItemLevel = (stateMeta: EntityStateMeta, ilvl: number) => {
  if (!ilvl || ilvl < 0) {
    ilvl = 0;
  } else if (ilvl > 999) {
    ilvl = 999;
  }
  stateMeta.state.itemLevel = ilvl;
  updateTotalSpawnWeight(stateMeta);
};
