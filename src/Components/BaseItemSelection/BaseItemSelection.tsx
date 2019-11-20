import React, { useContext, useState } from "react";
import { itemClasses } from "../../Common/Crafting/CraftingUtil";
import { CraftingContext } from "../../contexts/ItemContext";
import "./BaseItemSelection.css";
import TableHead from "./tableHead";
import TableRows from "./TableRows/TableRows";
import SearchBar from "../AvailableAffixes/searchBar";

export enum SortByOptions {
  LEVEL_DESC,
  LEVEL_ASC,
  NAME_DESC,
  NAME_ASC,
  ARMOUR_DESC,
  ARMOUR_ASC,
  EVASION_DESC,
  EVASION_ASC,
  SHIELD_ASC,
  SHIELD_DESC,
  STR_ASC,
  STR_DESC,
  INT_ASC,
  INT_DESC,
  DEX_ASC,
  DEX_DESC,
  IMPLICIT_ASC,
  IMPLICIT_DESC,
  DPS_ASC,
  DPS_DESC,
  APS_ASC,
  APS_DESC,
  DAMAGE_ASC,
  DAMAGE_DESC,
  RANGE_ASC,
  RANGE_DESC,
  CRIT_ASC,
  CRIT_DESC
}

function BaseItemSelection() {
  const { entityStateMeta } = useContext(CraftingContext);
  const selectedBaseItem = entityStateMeta.state.baseItem;

  const [sortBy, setSortBy] = useState<SortByOptions>(
    SortByOptions.ARMOUR_DESC
  );
  const [itemCategory, setItemCategory] = useState("Armor");
  const [itemClass, setItemClass] = useState("Gloves");

  const itemClassElements: any[] = itemClasses[itemCategory].map(iClass => (
    <option key={iClass}>{iClass}</option>
  ));
  if (itemCategory !== "Offhand") {
    itemClassElements.unshift(<option key="any">{"Any"}</option>);
  }

  const selectedBaseItemText = selectedBaseItem
    ? selectedBaseItem.name
    : "None";

  const changeCategory = e => {
    setItemCategory(e.target.value);
    setItemClass(itemClasses[e.target.value][0]);
  };

  const changeItemClass = e => {
    setItemClass(e.target.value);
  };

  return (
    <div className="craftingArea selectBaseItem">
      <div className="selected-baseItem">
        Selected Base Item:{" "}
        <p className="selectedBaseItemText"> {selectedBaseItemText}</p>
      </div>
      <div className="categorySelection">
        <div>
          Category:{" "}
          <select onChange={changeCategory} value={itemCategory}>
            <option>Armor</option>
            <option>Two Handed Weapon</option>
            <option>Offhand</option>
            <option>One Handed Weapon</option>
            <option>Accessory</option>
          </select>
        </div>
        <div>
          Class:{" "}
          <select
            onChange={changeItemClass}
            value={itemClass}
            id="selectedBaseItem"
          >
            {itemClassElements}
          </select>
        </div>
        <SearchBar
          setSearchString={s => {
            console.log("Search: " + s);
          }}
        />
      </div>
      <TableHead
        itemCategory={itemCategory}
        setSortBy={setSortBy}
        sortBy={sortBy}
        itemClass={itemClass}
      />
      <div className="scrollable">
        <TableRows
          itemCategory={itemCategory}
          sortBy={sortBy}
          itemClass={itemClass}
        />
      </div>
    </div>
  );
}

export default BaseItemSelection;
