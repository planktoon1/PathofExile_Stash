import {
  Mod,
  Translation,
  IdValueDict,
  IdAvrMinMaxDict,
  TranslationEntry,
  TranslationDict
} from "./interfaces";
import { isEmpty, onlyUnique, isIterable } from "../Utilities";
import { formats } from "./format";
import { indexHandlers } from "./indexHandlers";

export const modlist = require("../../assets/poe_data/processed_mod_list.min");
export const baseItems = require("../../assets/poe_data/base_items.min.json");
export const modTranslations = require("../../assets/poe_data/stat_translations.min.json");

const applyIndexHandlers = (
  entry: TranslationEntry,
  values: number[]
): number[] => {
  const valuesAfterHandlers: number[] = [];

  for (let i = 0; i < values.length; i++) {
    let value: number = values[i];
    for (let handler of entry.index_handlers[i]) {
      value = indexHandlers[handler](value);
    }
    valuesAfterHandlers.push(value);
  }

  return valuesAfterHandlers;
};

const insertValuesIntoString = (
  entry: TranslationEntry,
  values: number[]
): string => {
  let entryString: string = entry.string;

  for (let i = 0; i < values.length; i++) {
    if (entry.format[i] === "ignore") {
      continue;
    }
    const searchString = "{" + String(i) + "}";
    const formattedValue = formats[entry.format[i]](values[i]);
    entryString = entryString.replace(searchString, formattedValue);
  }

  return entryString;
};

/**
 * Applies a list of values to a translation and returns the corresponding translation
 * note that the value count needs to match the id count of the translation.
 * Use GetStatTranalation(translationObject, idValueDict) if you dont have all values.
 * @param   {Translation} translationObject   The translation to apply the values to
 * @param   {number[]} values                   The values to insert into the translation
 * @returns {String}    The final translation that can be shown to the user, or an empty
 *                      string if nothing should be shown.
 * @throws  {TypeError} translationObject.length must be equal to values.length
 */
const getStatTranslationAllValues = (
  translationObject: Translation,
  values: number[]
) => {
  let statIds = translationObject.ids;

  // Number of values does not match number of ids
  if (statIds.length !== values.length) {
    throw new TypeError("Number of values does not match number of ids");
  }

  // Tranlation of stats with all values 0 has no effect
  if (values.every(v => v === 0)) {
    return "";
  }

  for (let entry of translationObject.English) {
    const match = entry.condition
      .map((c: any, i: any) => {
        if (isEmpty(c)) return true;
        if (!c.min && values[i] <= c.max) return true;
        if (!c.max && values[i] >= c.min) return true;
        if (values[i] >= c.min && values[i] <= c.max) return true;
        return false;
      })
      .every((e: any) => e);

    if (match) {
      // Nothing to return
      if (entry.string === "") {
        return "";
      }

      const valuesAfterHandlers = applyIndexHandlers(entry, values);
      return insertValuesIntoString(entry, valuesAfterHandlers);
    }
  }
  // Didnt find anything
  return "";
};

/**
 * Applies a list of values to a translation and returns the corresponding translation
 * @param   {Translation} translationObject   The translation to apply the values to
 * @param   {IdValueDict} values              dictionary of the values to translate.
 *                                            The keys are the ids the values belong to.
 * @returns {String[]}    The final translation that can be shown to the user, or an empty
 *                      string if nothing should be shown.
 * @throws  {TypeError} translationObject. length must be equal to values.length
 */
export const getStatTranslation = (
  translationObject: Translation,
  idValueDict: IdValueDict
) => {
  const ids = translationObject.ids;
  const values: number[] = [];
  for (let i = 0; i < ids.length; i++) {
    const value = idValueDict[ids[i]];
    if (value) {
      values.push(value);
    } else {
      values.push(0);
    }
  }

  return getStatTranslationAllValues(translationObject, values);
};

/**
 * Finds all distinct translations for a list of stat ids
 * @param   {string[]} statIds              The ids to search for translations for
 * @param   {Translation[]} tranlations     The list of translations to search withtin
 * @returns {string[]}                      A list of all the distinct translations found
 */
const getTranslationsFromIds = (
  statIds: string[],
  tranlations: Translation[]
): Translation[] => {
  const translationsReturn: Translation[] = [];

  const translationDict: TranslationDict = tranlations.reduce<TranslationDict>(
    function(map, translation: Translation) {
      // TODO - LEFT WORK HERE
      if (!isIterable(translation.ids)) {
        console.log("ERROR: " + translation.ids + " is not iterable");
        return map;
      }

      for (const id of translation.ids) {
        map[id] ? map[id].push(translation) : (map[id] = [translation]);
      }
      return map;
    },
    {}
  );

  for (const id of statIds) {
    const translationsWId = translationDict[id];
    if (!translationsWId) {
      if (id !== "local_stat_monsters_pick_up_item") {
        console.log(`WARNING: Couldn't find translation for the id: ${id}!`);
      }
      continue;
    }
    if (translationsWId.length > 1) {
      // For the 2 cases where there is more than one translation in the lookup,
      // take the full match with the most ids (the one with 2 ids if both are given, else
      // the one with only the current id).
      const fullMatches = translationsWId.filter(t =>
        t.ids.every(id => statIds.indexOf(id) !== -1)
      );
      const fullMatchWMostIds = fullMatches.reduce((acc, val) =>
        val.ids.length > acc.ids.length ? val : acc
      );
      translationsReturn.push(fullMatchWMostIds);
    } else {
      // There is at least one translation in the lookup for each id
      translationsReturn.push(translationsWId[0]);
    }
  }

  return translationsReturn.filter(onlyUnique);
};

/**
 * Returns a string representation of a mod with given values
 * @param   {Mod} mod                       The mod to translate into a description
 * @param   {IdValueDict} idValueDict       A dictionary with the stat id as key and the associated value as value
 * @param   {Translation[]} tranlations     The list of translations to search withtin
 * @returns {string}                        The mod translation string(s).
 */
export const getModTranslations = (
  mod: Mod,
  idValueDict: IdValueDict,
  translations: Translation[] = modTranslations
): string[] => {
  const returnModTranslations: string[] = [];

  const ids: string[] = [];
  mod.stats.forEach(stat => {
    ids.push(stat.id);
  });

  const allTranslations = getTranslationsFromIds(ids, translations);

  for (const translation of allTranslations) {
    returnModTranslations.push(getStatTranslation(translation, idValueDict));
  }
  return returnModTranslations;
};

/**
 * Returns a mod description based on the stats and min/max values on the mod
 * @param   {Mod} mod                       The mod to translate into a description
 * @param   {Translation[]} tranlations     The list of translations to search withtin
 * @returns {string}                        The mod description.
 */
export const getModDescription = (
  mod: Mod,
  excludeText: boolean = false,
  translations: Translation[] = modTranslations
): string[] => {
  const modDescriptions: string[] = [];
  const ids: string[] = [];
  let idValueDict: IdAvrMinMaxDict = {};
  mod.stats.forEach(stat => {
    ids.push(stat.id);
    // used to determine if for example a mod describtion should be prefixed with plus or minus
    idValueDict[stat.id] = {
      avr: (stat.max + stat.min) / 2,
      min: stat.min,
      max: stat.max
    };
  });

  const allTranslations = getTranslationsFromIds(ids, translations);

  for (const t of allTranslations) {
    const ids = t.ids;
    const averageValues: number[] = [];
    const minValues: number[] = [];
    const maxValues: number[] = [];
    for (let i = 0; i < ids.length; i++) {
      const value = idValueDict[ids[i]];
      if (value) {
        averageValues.push(value.avr);
        minValues.push(value.min);
        maxValues.push(value.max);
      } else {
        averageValues.push(0);
      }
    }

    // ************** getStatTranslationAllValues **************
    let translation = "";

    // Number of values does not match number of ids
    if (ids.length !== averageValues.length) {
      throw new TypeError("Number of values does not match number of ids");
    }

    // Tranlation of stats with all values 0 has no effect
    if (averageValues.every(v => v === 0)) {
      translation = "";
    }

    for (let entry of t.English) {
      const match = entry.condition
        .map((c, i) => {
          if (isEmpty(c)) return true;
          if (!c.min && averageValues[i] <= c.max!) return true;
          if (!c.max && averageValues[i] >= c.min!) return true;
          if (averageValues[i] >= c.min! && averageValues[i] <= c.max!)
            return true;
          return false;
        })
        .every(e => e);

      if (match) {
        // Nothing to return
        if (entry.string === "") {
          translation = "";
        }

        const minValuesAfterHandlers = applyIndexHandlers(entry, minValues);
        const maxValuesAfterHandlers = applyIndexHandlers(entry, maxValues);
        const avrValuesAfterHandlers = applyIndexHandlers(entry, averageValues);
        // ************** insertValuesIntoString **************
        let entryString: string = entry.string;

        for (let i = 0; i < minValuesAfterHandlers.length; i++) {
          if (entry.format[i] === "ignore") {
            continue;
          }
          const searchString = "{" + String(i) + "}";

          const combinedMinMax =
            minValuesAfterHandlers[i] === maxValuesAfterHandlers[i]
              ? `${minValuesAfterHandlers[i]}`
              : `(${minValuesAfterHandlers[i]}-${maxValuesAfterHandlers[i]})`;
          let formattedValue = `${formats[entry.format[i]](
            avrValuesAfterHandlers[i]
          )}`;
          formattedValue = formattedValue.replace(
            String(avrValuesAfterHandlers[i]),
            combinedMinMax
          );

          if (excludeText) {
            entryString =
              i === 0 ? formattedValue : `${entryString} / ${formattedValue}`;
          } else {
            entryString = entryString.replace(searchString, formattedValue);
          }
        }

        translation = entryString;
        // ************** /insertValuesIntoString **************
      }
    }

    // ************** /getStatTranslationAllValues **************
    modDescriptions.push(translation);
  }

  return modDescriptions;
};
