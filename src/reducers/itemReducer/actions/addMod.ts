import { Mod } from "../../../Common/Crafting/interfaces";

/**
 * Adds a mod to the current item. The values will be randomly choosen from the available values
 */
export function addMod(mod: Mod) {
  return {
    type: "ADD_MOD",
    mod
  } as const;
}
