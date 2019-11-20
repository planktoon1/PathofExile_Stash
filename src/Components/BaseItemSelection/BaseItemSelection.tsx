import React, { useContext, useState } from "react";
import { itemClasses } from "../../Common/Crafting/CraftingUtil";
import { CraftingContext } from "../../contexts/ItemContext";
import "./BaseItemSelection.css";
import TableHead from "./tableHead";
import TableRows from "./TableRows/TableRows";

function BaseItemSelection() {
  const { entityStateMeta } = useContext(CraftingContext);
  const selectedBaseItem = entityStateMeta.state.baseItem;

  const [itemCategory, setItemCategory] = useState("Armor");
  const [itemClass, setItemClass] = useState("Gloves");

  const itemClassElements = itemClasses[itemCategory].map(item => (
    <option key={item}>{item}</option>
  ));

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
          Item Category:{" "}
          <select onChange={changeCategory} value={itemCategory}>
            <option>Armor</option>
            <option>Two Handed Weapon</option>
            <option>Offhand</option>
            <option>One Handed Weapon</option>
            <option>Jewellery</option>
          </select>
        </div>
        <div>
          Item Class:{" "}
          <select
            onChange={changeItemClass}
            value={itemClass}
            id="selectedBaseItem"
          >
            {itemClassElements}
          </select>
        </div>
      </div>
      <TableHead itemCategory={itemCategory} itemClass={itemClass} />
      <div className="scrollable">
        <TableRows itemCategory={itemCategory} itemClass={itemClass} />
      </div>
    </div>
  );
}

export default BaseItemSelection;
