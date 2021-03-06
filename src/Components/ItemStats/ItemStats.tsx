import React, { useContext } from "react";
import { getItemCategory } from "../../Common/Crafting/CraftingUtil";
import { CraftingContext } from "../../contexts/ItemContext";
import "./ItemStats.css";
import WeaponStats from "./WeaponStats";

enum ItemStatTypes {
  NONE,
  WEAPON,
  ARMOUR
}

const ItemStats = () => {
  const { entityStateMeta } = useContext(CraftingContext);
  const category = getItemCategory(entityStateMeta.state.baseItem);
  let itemStatType: ItemStatTypes = ItemStatTypes.NONE;
  if (category === "One Handed Weapon" || category === "Two Handed Weapon") {
    itemStatType = ItemStatTypes.WEAPON;
  } else if (category === "Armor") {
    itemStatType = ItemStatTypes.ARMOUR;
  }

  const getItemStats = () => {
    switch (itemStatType) {
      case ItemStatTypes.WEAPON:
        return <WeaponStats entityStateMeta={entityStateMeta} />
      default:
        return <div></div>;
    }

  }

  return (
    <div className="itemStats scrollable">
      {getItemStats()}
    </div>
  );
};

export default ItemStats;
