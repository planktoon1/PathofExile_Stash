import { cloneDeep } from "lodash";
import { EntityStateMeta } from "../../Common/Crafting/interfaces";
import { applyCurrency } from "./actions/applyCurrency";
import { changeBaseItem } from "./actions/changeBaseItem";
import { clearPopUps } from "./actions/clearPopUps";
import { removeCorruption } from "./actions/removeCorruption";
import { resetItem } from "./actions/resetItem";
import { resetStatistics } from "./actions/resetStatistics";
import { setItemLevel } from "./actions/setItemLevel";
import { armourersScrap } from "./currency/armourersScrap";
import { blacksmithsWhetstone } from "./currency/blacksmithsWhetstone";
import { blessedOrb } from "./currency/blessedOrb";
import { chaosOrb } from "./currency/chaosOrb";
import { divineOrb } from "./currency/divineOrb";
import { exaltedOrb } from "./currency/exaltedOrb";
import { orbOfAlchemy } from "./currency/orbOfAlchemy";
import { orbOfAnnulment } from "./currency/orbOfAnnulment";
import { orbOfAugmentation } from "./currency/orbOfAugmentation";
import { orbOfScouring } from "./currency/orbOfScouring";
import { orbOfTransmutation } from "./currency/orbOfTransmutation";
import { regalOrb } from "./currency/regalOrb";
import { vaalOrb } from "./currency/vaalOrb";
import { calculateProperties } from "./helperFunctions/calculateProperties";
import { changeBaseItemByName } from "./helperFunctions/changeBaseItemByName";
import { _removeCorruption } from "./helperFunctions/removeCorruption";
import { _resetItem } from "./helperFunctions/resetItem";
import { _setItemLevel } from "./helperFunctions/setItemLevel";
import { orbOfAlteration } from "./currency/orbOfAlteration";
import { addMod } from "./actions/addMod";
import { addModWithRandomStats } from "./helperFunctions/addMod";
import { setItemType } from "./actions/setItemType";
import { changeItemType } from "./helperFunctions/changeItemType";
import { updateTotalSpawnWeight } from "./helperFunctions/updateTotalSpawnWeight";
import { stateInitialValue } from "../../Common/Crafting/stateInitialValue";

enum PopUpVariant {
  ERROR = "error",
  INFO = "info"
}

export type ItemReducerAction = ReturnType<
  | typeof applyCurrency
  | typeof clearPopUps
  | typeof changeBaseItem
  | typeof setItemLevel
  | typeof removeCorruption
  | typeof resetItem
  | typeof resetStatistics
  | typeof addMod
  | typeof setItemType
>;

export const entityStateMetaInitValue: EntityStateMeta = {
  affixesWithValues: [],
  implicitsWithValues: [],
  state: stateInitialValue,
  popUps: [],
  statistics: {}
};

export const ItemReducer = (
  stateMeta: EntityStateMeta,
  action: ItemReducerAction
): EntityStateMeta => {
  switch (action.type) {
    case "USE_CURRENCY":
      _applyCurrreny(stateMeta, action.currencyId);
      return cloneDeep(stateMeta);
    case "CLEAR_POPUPS":
      return {
        ...stateMeta,
        popUps: []
      };
    case "CHANGE_BASEITEM":
      changeBaseItemByName(stateMeta, action.itemId);
      return cloneDeep(stateMeta);
    case "SET_ITEM_LEVEL":
      _setItemLevel(stateMeta, action.itemLevel);
      return cloneDeep(stateMeta);
    case "REMOVE_CORRUPTION":
      _removeCorruption(stateMeta);
      return cloneDeep(stateMeta);
    case "RESET_ITEM":
      _resetItem(stateMeta);
      return cloneDeep(stateMeta);
    case "RESET_STATISTICS":
      stateMeta.statistics = {};
      return cloneDeep(stateMeta);
    case "ADD_MOD":
      addModWithRandomStats(stateMeta, action.mod);
      calculateProperties(stateMeta);
      return cloneDeep(stateMeta);
    case "SET_ITEM_TYPE":
      changeItemType(stateMeta, action.itemTypes);

      return cloneDeep(stateMeta);
    default:
      return stateMeta;
  }
};

const _applyCurrreny = (stateMeta: EntityStateMeta, currencyId: string) => {
  let success = false;
  if (stateMeta.state.corrupted && currencyId !== null) {
    stateMeta.popUps.push({
      variant: PopUpVariant.ERROR,
      message: "Corrupted items cannot be altered further with crafting orbs"
    });
    return;
  }

  switch (currencyId) {
    case "Orb of Transmutation":
      success = orbOfTransmutation(stateMeta);
      break;
    case "Orb of Augmentation":
      success = orbOfAugmentation(stateMeta);
      break;
    case "Orb of Alteration":
      success = orbOfAlteration(stateMeta);
      break;
    case "Regal Orb":
      success = regalOrb(stateMeta);
      break;
    case "Orb of Alchemy":
      success = orbOfAlchemy(stateMeta);
      break;
    case "Chaos Orb":
      success = chaosOrb(stateMeta);
      break;
    case "Exalted Orb":
      success = exaltedOrb(stateMeta);
      break;
    case "Orb of Annulment":
      success = orbOfAnnulment(stateMeta);
      break;
    case "Orb of Scouring":
      success = orbOfScouring(stateMeta);
      break;
    case "Armourer's Scrap":
      success = armourersScrap(stateMeta);
      break;
    case "Blacksmith's Whetstone":
      success = blacksmithsWhetstone(stateMeta);
      break;
    case "Blessed Orb":
      success = blessedOrb(stateMeta);
      break;
    case "Divine Orb":
      success = divineOrb(stateMeta);
      break;
    case "Vaal Orb":
      success = vaalOrb(stateMeta);
      break;
    case null:
    default:
      stateMeta.popUps.push({
        variant: PopUpVariant.ERROR,
        message: `${currencyId} not implemented`
      });
      console.log(`${currencyId} not implemented`);
      break;
  }
  if (success) {
    calculateProperties(stateMeta);
    stateMeta.statistics = {
      ...stateMeta.statistics,
      [currencyId]: {
        count: stateMeta.statistics[currencyId]
          ? stateMeta.statistics[currencyId].count + 1
          : 1
      }
    };
    updateTotalSpawnWeight(stateMeta);
  }
};
