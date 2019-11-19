import { isEmpty, cloneDeep } from "lodash";
import { ModTranslation, EntityStateCalculatedProperties } from "./interfaces";
import { intialCalculatedProps } from "./initialCalculatedProps";

const VALUEMINSUFFIX = "_MIN";
const VALUEMAXSUFFIX = "_MAX";
type PropertyProperties = "increased" | "reduced" | "to" | "more";
interface Properties {
  [stat: string]: Partial<Record<PropertyProperties, number>>;
}

const TYPES: Record<PropertyProperties, number> = {
  more: 0,
  increased: 0,
  reduced: 0,
  to: 0
};

// Dict with all stats that we are looking for as key and the stat to add to as value
// Aware: that the values has to be valid EntityStateCalculatedProperties

export const STATS: { [statId: string]: string[] } = {
  "Attribute Requirements": ["dexterity", "strength", "intelligence"],
  "Evasion Rating": ["evasion"],
  Armour: ["armour"],
  "maximum Energy Shield": ["energy_shield"],
  "Energy Shield": ["energy_shield"],

  "Attack Speed": ["attack_time"],
  "Critical Strike Chance": ["critical_strike_chance"],
  Block: ["block"],

  "Physical Damage": ["physical_damage_min", "physical_damage_max"],
  "Physical Damage_MIN": ["physical_damage_min"],
  "Physical Damage_MAX": ["physical_damage_max"],

  "Physical Damage to Attacks": ["physical_damage_min", "physical_damage_max"],
  "Physical Damage to Attacks_MIN": ["physical_damage_min"],
  "Physical Damage to Attacks_MAX": ["physical_damage_max"],

  "Lightning Damage to Attacks": [
    "lightning_damage_max",
    "lightning_damage_min"
  ],
  "Lightning Damage to Attacks_MIN": ["lightning_damage_min"],
  "Lightning Damage to Attacks_MAX": ["lightning_damage_max"],

  "Lightning Damage": ["lightning_damage_max", "lightning_damage_min"],
  "Lightning Damage_MIN": ["lightning_damage_min"],
  "Lightning Damage_MAX": ["lightning_damage_max"],

  "Fire Damage to Attacks": ["fire_damage_min", "fire_damage_max"],
  "Fire Damage to Attacks_MIN": ["fire_damage_min"],
  "Fire Damage to Attacks_MAX": ["fire_damage_max"],

  "Fire Damage": ["fire_damage_min", "fire_damage_max"],
  "Fire Damage_MIN": ["fire_damage_min"],
  "Fire Damage_MAX": ["fire_damage_max"],

  "Cold Damage to Attacks": ["cold_damage_min", "cold_damage_max"],
  "Cold Damage to Attacks_MIN": ["cold_damage_min"],
  "Cold Damage to Attacks_MAX": ["cold_damage_max"],

  "Cold Damage": ["cold_damage_min", "cold_damage_max"],
  "Cold Damage_MIN": ["cold_damage_min"],
  "Cold Damage_MAX": ["cold_damage_max"],

  "Chaos Damage to Attacks": ["chaos_damage_min", "chaos_damage_max"],
  "Chaos Damage to Attacks_MIN": ["chaos_damage_min"],
  "Chaos Damage to Attacks_MAX": ["chaos_damage_max"],

  "Chaos Damage": ["chaos_damage_min", "chaos_damage_max"],
  "Chaos Damage_MIN": ["chaos_damage_min"],
  "Chaos Damage_MAX": ["chaos_damage_max"],

  "Weapon range": ["range"]
};

// A regex that is a string..
enum VALUEMATCHER {
  // Allows a number prefixed with '-', '+' or nothing, followed by '%', 'chance' or nothing
  SINGLEVALUEMATCH = "(^-{0,1}|^\\+{0,1})(\\d*)(%|% Chance){0,1}",
  // Allows a string of the form: 'Adds # to # STAT
  DUALVALUEMATCH = "^Adds (\\d*) to (\\d*)"
}

const buildTranslationRegex = (
  valueMatch: VALUEMATCHER = VALUEMATCHER.SINGLEVALUEMATCH,
  types = TYPES,
  stats = STATS
): RegExp => {
  if (isEmpty(types) || isEmpty(stats)) {
    return /a^/; // impossible to match
  }

  const typeMatchArray = ["("];
  for (const type in types) {
    typeMatchArray.push(String(type), "|");
  }
  typeMatchArray.pop();
  typeMatchArray.push(")");
  const typeMatch = typeMatchArray.join("");

  const statMatchArray = ["("];
  for (const stat in stats) {
    statMatchArray.push(String(stat), "|");
  }
  statMatchArray.pop();
  statMatchArray.push(")");
  const statMatch = statMatchArray.join("");

  switch (valueMatch) {
    case VALUEMATCHER.DUALVALUEMATCH:
      return new RegExp(valueMatch + " " + statMatch + "$");
    case VALUEMATCHER.SINGLEVALUEMATCH:
      return new RegExp(valueMatch + " " + typeMatch + " " + statMatch + "$");
    default:
      return new RegExp(valueMatch + " " + typeMatch + " " + statMatch + "$");
  }
};

export const getPropertyFromTranslation = (
  translation: ModTranslation
): EntityStateCalculatedProperties => {
  const singleValMatchRegex = buildTranslationRegex(
    VALUEMATCHER.SINGLEVALUEMATCH
  );
  const singleValMatch = translation.translation.match(singleValMatchRegex);
  const properties: EntityStateCalculatedProperties = cloneDeep(
    intialCalculatedProps
  );
  if (singleValMatch) {
    let type = singleValMatch[4];
    const stat = singleValMatch[5];
    const value = singleValMatch[2];

    if (!STATS[stat]) {
      throw new Error(`ERROR: ${stat} is missing in the STATS definition`);
    }

    STATS[stat].forEach(prop => {
      // Invert increased/reduced on certain propertiers
      if (
        prop === "Attack Speed" &&
        (type === "increased" || type === "reduced")
      ) {
        type = type === "increased" ? "reduced" : "increased";
      }
      properties[prop] = {};
      properties[prop][type] = Number(value);
    });
    return properties;
  }

  const dualValMatchRegex = buildTranslationRegex(VALUEMATCHER.DUALVALUEMATCH);
  const dualValMatch = translation.translation.match(dualValMatchRegex);
  if (dualValMatch) {
    const type = "to";
    const stat = dualValMatch[3];
    const minValue = dualValMatch[1];
    const maxValue = dualValMatch[2];

    const statMinKey = String(stat + VALUEMINSUFFIX);
    const statMaxKey = String(stat + VALUEMAXSUFFIX);

    if (!STATS[statMinKey] || !STATS[statMaxKey]) {
      throw new Error(
        `ERROR: Either ${statMinKey} or ${statMaxKey} is missing in the STATS definition`
      );
    }

    STATS[statMinKey].forEach(prop => {
      properties[prop] = {};
      properties[prop][type] = Number(minValue);
    });
    STATS[statMaxKey].forEach(prop => {
      properties[prop] = {};
      properties[prop][type] = Number(maxValue);
    });
    return properties;
  }

  return properties;
};

export const getPropertiesFromTranslations = (
  translations: ModTranslation[]
): Properties => {
  const properties: Properties = {};
  for (const translation of translations) {
    const propsToAdd = getPropertyFromTranslation(translation);

    for (const stat in propsToAdd) {
      for (const type in propsToAdd[stat]) {
        if (properties[stat] && properties[stat][type]) {
          properties[stat][type] += propsToAdd[stat][type];
        } else if (properties[stat]) {
          properties[stat][type] = propsToAdd[stat][type];
        } else {
          properties[stat] = {};
          properties[stat][type] = propsToAdd[stat][type];
        }
      }
    }
  }

  return properties;
};
