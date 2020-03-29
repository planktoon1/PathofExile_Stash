import { EntityStateMeta, Mod } from "../../../Common/Crafting/interfaces";
import { get_spawn_weight } from "../../../Common/Crafting/CraftingUtil";
import { getAffixGroups } from "./getAffixGroups";
import { getNumberOfFreePrefixes } from "./getNumberOfFreePrefixes";
import { getNumberOfFreeSuffixes } from "./getNumberOfFreeSuffixes";
import { capitalize } from "lodash";
import { getSpawnChance } from "./getSpawnChance";

interface GenerateGroupedModListParameters {
  includeUnavailableGroups?: boolean;
  mod_list: Mod[];
  domain?: string;
  generation_type: string | string[];
  level?: number;
  tags?: string[];
  includeModTypes?: ModTypes[];
  excludeGroups?: string[];
}

/** Function to produce the list being presented in the available Affixes tab
 * Generates a list of mods grouped by their modgroups
 * Also adds relevant meta data based on the entityStateMeta
 */
export const generateGroupedModList = (
  stateMeta: EntityStateMeta,
  {
    includeUnavailableGroups = false,
    generation_type,
    mod_list,
    /**Empty array means include all modTypes */
    includeModTypes = [],
    domain = "item",
    level = 1,
    excludeGroups = getAffixGroups(stateMeta),
    tags = stateMeta.state.tags
  }: GenerateGroupedModListParameters
): GroupedMods => {
  // if theres only one generation type specified, convert it to an array
  if (typeof generation_type === "string") {
    generation_type = [generation_type];
  }
  const groupedMods: GroupedMods = {};

  for (let mod of mod_list) {
    const modWMetaData: ModWithMetaData = {
      mod,
      metaData: {
        spawnChance: 0,
        available: true,
        availabilityReasons: [],
        modType: getModtype(mod)
      }
    };

    // exclude modTypes
    if (includeModTypes.length > 0) {
      if (!includeModTypes.includes(modWMetaData.metaData.modType)) {
        continue;
      }
    }

    // exclude generation types
    if (!generation_type.includes(modWMetaData.mod.generation_type)) {
      continue;
    }

    if (domain !== mod.domain) {
      continue;
    }

    const spaceForSuffix: boolean = getNumberOfFreeSuffixes(stateMeta) > 0;
    const spaceForPrefix: boolean = getNumberOfFreePrefixes(stateMeta) > 0;
    // if theres no space for affixes but the rarity is not rare we assume the item will be upgraded before adding a mod. therefore we ignore that theres no space for affixes
    if (
      !(!spaceForSuffix && !spaceForPrefix && stateMeta.state.rarity !== "Rare")
    ) {
      if (
        stateMeta.state.rarity !== "Normal" &&
        mod.generation_type === "prefix" &&
        !spaceForPrefix
      ) {
        modWMetaData.metaData.available = false;
        modWMetaData.metaData.availabilityReasons.push(
          `Item does not have space for more preffixes`
        );
      }

      if (
        stateMeta.state.rarity !== "Normal" &&
        mod.generation_type === "suffix" &&
        !spaceForSuffix
      ) {
        modWMetaData.metaData.available = false;
        modWMetaData.metaData.availabilityReasons.push(
          `Item does not have space for more suffixes`
        );
      }
    }

    if (level < mod.required_level) {
      modWMetaData.metaData.available = false;
      modWMetaData.metaData.availabilityReasons.push(
        `Item has to be atleast item level: ${mod.required_level}`
      );
    }
    if (excludeGroups.includes(mod.group)) {
      modWMetaData.metaData.available = false;
      modWMetaData.metaData.availabilityReasons.push(
        `Item already has mod in group: ${mod.group}`
      );
    }

    // if no other reason has made the item unavailable and the weight still is 0
    if (modWMetaData.metaData.available && get_spawn_weight(mod, tags) === 0) {
      modWMetaData.metaData.available = false;
      modWMetaData.metaData.availabilityReasons.push(
        `Mod weight is 0, a tag is either missing from item or the item has a tag that excludes this mod`
      );
    }

    if (modWMetaData.metaData.available) {
      modWMetaData.metaData.spawnChance = getSpawnChance(stateMeta, mod);
    }
    if (groupedMods[mod.type]) {
      groupedMods[mod.type].mods.push(modWMetaData);
      groupedMods[mod.type].tiers++;
      groupedMods[mod.type].spawnChance += modWMetaData.metaData.spawnChance;
      groupedMods[mod.type].tiersAvailable += modWMetaData.metaData.available
        ? 1
        : 0;
    } else {
      groupedMods[mod.type] = {
        generationType: capitalize(modWMetaData.mod.generation_type),
        mods: [modWMetaData],
        tiers: 1,
        tiersAvailable: modWMetaData.metaData.available ? 1 : 0,
        spawnChance: modWMetaData.metaData.spawnChance,
        modType: getModtype(mod),
        description: mod.description
      };
    }
  }

  for (const groupName in groupedMods) {
    const group = groupedMods[groupName];
    if (group.tiersAvailable < 1 && !includeUnavailableGroups) {
      delete groupedMods[groupName];
    } else if (group.tiersAvailable !== 1) {
      groupedMods[groupName].description = groupedMods[
        groupName
      ].description.replace(/[0-9]+/g, "#");
      // Sort mods
      group.mods.sort((a, b) => a.mod.required_level - b.mod.required_level);
    }
  }
  return groupedMods;
};

export interface GroupedMods {
  [groupname: string]: {
    mods: ModWithMetaData[];
    generationType: string;
    tiers: number;
    tiersAvailable: number;
    spawnChance: number;
    description: string;
    modType: ModTypes;
  };
}

export interface ModWithMetaData {
  mod: Mod;
  metaData: {
    spawnChance: number;
    available: boolean;
    availabilityReasons: string[];
    modType: ModTypes;
  };
}

export enum ModTypes {
  BASE_ITEM = "Base Item",
  ELDER = "Elder",
  SHAPER = "Shaper",
  DELVE = "Delve",
  MASTER = "Master",
  ESSENCE = "Essence"
}

const getModtype = (mod: Mod): ModTypes => {
  // if elder
  if (elderNames.includes(mod.name)) {
    return ModTypes.ELDER;
  }
  // if shaper
  if (shaperNames.includes(mod.name)) {
    return ModTypes.SHAPER;
  }

  return ModTypes.BASE_ITEM;
};

const shaperNames = ["The Shaper's", "of Shaping"];
const elderNames = ["Eldritch", "of the Elder"];
