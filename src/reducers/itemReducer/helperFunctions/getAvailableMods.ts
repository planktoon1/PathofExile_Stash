import { EntityStateMeta, Mod } from "../../../Common/Crafting/interfaces";
import { generateSpawnablePrefixes } from "./generateSpawnablePrefixes";
import { generateSpawnableSuffixes } from "./generateSpawnableSuffixes";
import { getNumberOfFreePrefixes } from "./getNumberOfFreePrefixes";
import { getNumberOfFreeSuffixes } from "./getNumberOfFreeSuffixes";

export const getAvailableMods = (stateMeta: EntityStateMeta): Mod[] => {
  let availableMods: Mod[] = [];

  /* This method rolls an available affix and adds it to the item.*/
  const spaceForPrefix = getNumberOfFreePrefixes(stateMeta) > 0;
  const spaceForSuffix = getNumberOfFreeSuffixes(stateMeta) > 0;
  // if theres no space for affixes but the rarity is not rare we assume the item will be upgraded before adding a mod. therefore we ignore that theres no space for affixes
  if (!spaceForSuffix && !spaceForSuffix && stateMeta.state.rarity !== "Rare") {
    availableMods = generateSpawnablePrefixes(stateMeta);
    availableMods = availableMods.concat(generateSpawnableSuffixes(stateMeta));
  }
  // Get list of all available mods
  if (spaceForPrefix) {
    availableMods = generateSpawnablePrefixes(stateMeta);
  }
  if (spaceForSuffix) {
    availableMods = availableMods.concat(generateSpawnableSuffixes(stateMeta));
  }

  return availableMods;
};
