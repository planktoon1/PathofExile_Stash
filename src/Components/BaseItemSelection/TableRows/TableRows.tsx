import React from "react";
import {
  getBaseItemsInDomain,
  itemClasses
} from "../../../Common/Crafting/CraftingUtil";
import { BaseItem } from "../../../Common/Crafting/interfaces";
import "../BaseItemSelection.css";
import ArmourTableLayout from "./ArmourTableLayout";
import JewelleryTableLayout from "./JewelleryTableLayout";
import WeaponTableLayout from "./WeaponTableLayout";
import { SortByOptions } from "../BaseItemSelection";

export interface TableLayoutProps {
  item: BaseItem;
}

export interface TableRowsProps {
  itemCategory: string;
  itemClass: string;
  sortBy: SortByOptions;
}

const TableRows = React.memo<any>(({ itemCategory, itemClass, sortBy }) => {
  const itemClassesToFind =
    itemClass === "Any" ? itemClasses[itemCategory] : [itemClass];
  const baseItems = getBaseItemsInDomain("item", itemClassesToFind);
  baseItems.sort(getSortFunction(sortBy));
  switch (itemCategory) {
    case "Armor":
      return baseItems.map(item => (
        <ArmourTableLayout key={item.key} item={item} />
      ));
    case "One Handed Weapon":
    case "Two Handed Weapon":
      return baseItems.map(item => (
        <WeaponTableLayout key={item.key} item={item} />
      ));
    case "Offhand":
      if (itemClass === "Shield")
        return baseItems.map(item => (
          <ArmourTableLayout key={item.key} item={item} />
        ));
      else if (itemClass === "Quiver")
        return baseItems.map(item => (
          <JewelleryTableLayout key={item.key} item={item} />
        ));
      break;
    case "Accessory":
      return baseItems.map(item => (
        <JewelleryTableLayout key={item.key} item={item} />
      ));
    default:
      return <></>;
  }
});

export default TableRows;

const getSortFunction = (
  sortByOption: SortByOptions
): ((a: BaseItem, b: BaseItem) => number) => {
  switch (sortByOption) {
    case SortByOptions.LEVEL_DESC:
      return (item1, item2) => item2.drop_level - item1.drop_level;
    case SortByOptions.LEVEL_ASC:
      return (item1, item2) => item1.drop_level - item2.drop_level;
    case SortByOptions.NAME_ASC:
      return (item1, item2) => item2.name.localeCompare(item1.name);
    case SortByOptions.NAME_DESC:
      return (item1, item2) => item1.name.localeCompare(item2.name);
    case SortByOptions.IMPLICIT_ASC:
      return (item1, item2) => item1.implicits.length - item2.implicits.length;
    case SortByOptions.IMPLICIT_DESC:
      return (item1, item2) => item2.implicits.length - item1.implicits.length;
    case SortByOptions.ARMOUR_DESC:
      return (item1, item2) =>
        (item2.properties.armour || 0) - (item1.properties.armour || 0);
    case SortByOptions.ARMOUR_ASC:
      return (item1, item2) =>
        (item1.properties.armour || 0) - (item2.properties.armour || 0);
    case SortByOptions.EVASION_DESC:
      return (item1, item2) =>
        (item2.properties.evasion || 0) - (item1.properties.evasion || 0);
    case SortByOptions.EVASION_ASC:
      return (item1, item2) =>
        (item1.properties.evasion || 0) - (item2.properties.evasion || 0);
    case SortByOptions.SHIELD_DESC:
      return (item1, item2) =>
        (item2.properties.energy_shield || 0) -
        (item1.properties.energy_shield || 0);
    case SortByOptions.SHIELD_ASC:
      return (item1, item2) =>
        (item1.properties.energy_shield || 0) -
        (item2.properties.energy_shield || 0);

    case SortByOptions.STR_DESC:
      return (item1, item2) => {
        if (item1.requirements && item2.requirements) {
          return (
            (item2.requirements.strength || 0) -
            (item1.requirements.strength || 0)
          );
        } else return 0;
      };
    case SortByOptions.STR_ASC:
      return (item1, item2) => {
        if (item1.requirements && item2.requirements) {
          return (
            (item1.requirements.strength || 0) -
            (item2.requirements.strength || 0)
          );
        } else return 0;
      };
    case SortByOptions.DEX_DESC:
      return (item1, item2) => {
        if (item1.requirements && item2.requirements) {
          return (
            (item2.requirements.dexterity || 0) -
            (item1.requirements.dexterity || 0)
          );
        } else return 0;
      };
    case SortByOptions.DEX_ASC:
      return (item1, item2) => {
        if (item1.requirements && item2.requirements) {
          return (
            (item1.requirements.dexterity || 0) -
            (item2.requirements.dexterity || 0)
          );
        } else return 0;
      };
    case SortByOptions.INT_DESC:
      return (item1, item2) => {
        if (item1.requirements && item2.requirements) {
          return (
            (item2.requirements.intelligence || 0) -
            (item1.requirements.intelligence || 0)
          );
        } else return 0;
      };
    case SortByOptions.INT_ASC:
      return (item1, item2) => {
        if (item1.requirements && item2.requirements) {
          return (
            (item1.requirements.intelligence || 0) -
            (item2.requirements.intelligence || 0)
          );
        } else return 0;
      };

    case SortByOptions.DAMAGE_DESC:
      return (item1, item2) =>
        (item2.properties.physical_damage_max || 0) -
        (item1.properties.physical_damage_max || 0);
    case SortByOptions.DAMAGE_ASC:
      return (item1, item2) =>
        (item1.properties.physical_damage_max || 0) -
        (item2.properties.physical_damage_max || 0);
    case SortByOptions.DPS_DESC:
      return (item1, item2) => (item2.dps || 0) - (item1.dps || 0);
    case SortByOptions.DPS_ASC:
      return (item1, item2) => (item1.dps || 0) - (item2.dps || 0);
    case SortByOptions.APS_DESC:
      return (item1, item2) =>
        (item1.properties.attack_time || 0) -
        (item2.properties.attack_time || 0);
    case SortByOptions.APS_ASC:
      return (item1, item2) =>
        (item2.properties.attack_time || 0) -
        (item1.properties.attack_time || 0);
    case SortByOptions.CRIT_DESC:
      return (item1, item2) =>
        (item2.properties.critical_strike_chance || 0) -
        (item1.properties.critical_strike_chance || 0);
    case SortByOptions.CRIT_ASC:
      return (item1, item2) =>
        (item1.properties.critical_strike_chance || 0) -
        (item2.properties.critical_strike_chance || 0);
    case SortByOptions.RANGE_DESC:
      return (item1, item2) =>
        (item2.properties.range || 0) - (item1.properties.range || 0);
    case SortByOptions.RANGE_ASC:
      return (item1, item2) =>
        (item1.properties.range || 0) - (item2.properties.range || 0);
    default:
      break;
  }
  // default level descending
  return (item1, item2) => item2.drop_level - item1.drop_level;
};
