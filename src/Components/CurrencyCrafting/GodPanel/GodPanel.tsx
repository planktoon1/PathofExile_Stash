import * as React from "react";
import { useContext, useState } from "react";
import { CraftingContext } from "../../../contexts/ItemContext";
import { removeCorruption } from "../../../reducers/itemReducer/actions/removeCorruption";
import { setItemLevel } from "../../../reducers/itemReducer/actions/setItemLevel";
import "./GodPanel.css";
import { resetItem } from "../../../reducers/itemReducer/actions/resetItem";
import { resetStatistics } from "../../../reducers/itemReducer/actions/resetStatistics";
import { setItemType as changeItemType } from "../../../reducers/itemReducer/actions/setItemType";
import { ItemTypes } from "../../../Common/Crafting/interfaces";

export interface Props {}

function GodPanel() {
  const { entityStateMeta } = useContext(CraftingContext);
  const [iLvl, setILvl] = useState(entityStateMeta.state.itemLevel);
  const [itemType, setItemType] = useState<ItemTypes>(
    entityStateMeta.state.itemType
  );
  const { dispatch } = useContext(CraftingContext);

  const handleIlvlChange = e => {
    const itemLevel = e.target.validity.valid ? Number(e.target.value) : iLvl;
    if (itemLevel < 0) {
      setILvl(0);
    } else if (itemLevel > 999) {
      setILvl(999);
    } else {
      setILvl(itemLevel);
    }
  };
  const onSetItemlevel = () => {
    dispatch(setItemLevel(iLvl));
  };
  const onSelectItemType = e => {
    setItemType(e.target.value);
  };
  const onSetItemType = () => {
    dispatch(changeItemType(itemType));
  };

  return (
    <div className="godPanel">
      <div className="godButtonContainer">
        <button onClick={() => dispatch(resetItem())}>Reset Item</button>
      </div>
      <div className="godButtonContainer">
        <button onClick={() => dispatch(resetStatistics())}>
          Reset Statistics
        </button>
      </div>
      <div className="godButtonContainer">
        <button onClick={() => dispatch(removeCorruption())}>
          Remove Corruption
        </button>
      </div>
      <div className="godButtonContainer">
        <button className="inputButton" onClick={onSetItemlevel}>
          Set Item Level{" "}
        </button>{" "}
        <input
          type="text"
          pattern="[0-9]*"
          value={iLvl}
          onChange={handleIlvlChange}
        ></input>
      </div>
      <div className="godButtonContainer">
        <button className="inputButton" onClick={onSetItemType}>
          Set Item Type{" "}
        </button>{" "}
        <select
          className="itemType"
          onChange={onSelectItemType}
          value={itemType}
        >
          <option>Normal</option>
          <option>Shaper</option>
          <option>Elder</option>
        </select>
      </div>
      <div className="godButtonContainer"></div>
    </div>
  );
}

export default GodPanel;

// helpers
