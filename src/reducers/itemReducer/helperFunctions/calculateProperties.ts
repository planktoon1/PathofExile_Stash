import { cloneDeep } from "lodash";
import { itemClasses } from "../../../Common/Crafting/CraftingUtil";
import { intialCalculatedProps } from "../../../Common/Crafting/initialCalculatedProps";
import { EntityStateMeta } from "../../../Common/Crafting/interfaces";
import { getPropertiesFromTranslations } from "../../../Common/Crafting/matchers";

export const calculateProperties = (stateMeta: EntityStateMeta) => {
  const propertiesToAdd = getPropertiesFromTranslations(
    stateMeta.state.modTranslations
  );
  let newCalculatedProperties = cloneDeep(intialCalculatedProps);
  // Get current stats based on baseitem
  if (stateMeta.state.baseItem) {
    for (const prop in stateMeta.state.baseItem.properties)
      newCalculatedProperties[prop] = stateMeta.state.baseItem.properties[prop]
        ? stateMeta.state.baseItem.properties[prop]
        : 0;

    for (const req in stateMeta.state.baseItem.requirements)
      newCalculatedProperties[req] = stateMeta.state.baseItem.requirements[req]
        ? stateMeta.state.baseItem.requirements[req]
        : 0;
  }

  const propertyMultipliers = cloneDeep(intialCalculatedProps);
  // Add flat stats and aggregate multipliers
  for (const stat in propertiesToAdd) {
    for (const type in propertiesToAdd[stat]) {
      switch (type) {
        case "to":
          newCalculatedProperties[stat] += Number(propertiesToAdd[stat][type]);
          break;
        case "increased":
          propertyMultipliers[stat] += Number(propertiesToAdd[stat][type]);
          break;
        case "reduced":
          propertyMultipliers[stat] -= Number(propertiesToAdd[stat][type]);
          break;
        default:
          break;
      }
    }
  }
  // Add quality
  if (stateMeta.state.quality > 0 && stateMeta.state.baseItem) {
    if (itemClasses["Armor"].includes(stateMeta.state.baseItem.item_class)) {
      // Armour
      for (const stat of ["armour", "evasion", "energy_shield"]) {
        propertyMultipliers[stat] += stateMeta.state.quality;
      }
    } else if (
      itemClasses["One Handed Weapon"].includes(
        stateMeta.state.baseItem.item_class
      ) ||
      itemClasses["Two Handed Weapon"].includes(
        stateMeta.state.baseItem.item_class
      )
    ) {
      // weapon
      for (const stat of ["physical_damage_min", "physical_damage_max"]) {
        propertyMultipliers[stat] += stateMeta.state.quality;
      }
    }
  }
  // Add multipliers
  for (const prop in newCalculatedProperties) {
    if (propertyMultipliers[prop]) {
      if (prop === "attack_time") {
        newCalculatedProperties[prop] /= 1 + propertyMultipliers[prop] / 100;
      } else {
        newCalculatedProperties[prop] *= 1 + propertyMultipliers[prop] / 100;
      }
    }
  }
  stateMeta.state.calculatedProperties = newCalculatedProperties;
};
