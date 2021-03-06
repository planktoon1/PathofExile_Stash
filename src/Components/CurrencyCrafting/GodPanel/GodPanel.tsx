import * as React from "react";
import { useContext, useState } from "react";
import { CraftingContext } from "../../../contexts/ItemContext";
import { removeCorruption } from "../../../reducers/itemReducer/actions/removeCorruption";
import { setItemLevel } from "../../../reducers/itemReducer/actions/setItemLevel";
import "./GodPanel.css";
import { resetItem } from "../../../reducers/itemReducer/actions/resetItem";
import { resetStatistics } from "../../../reducers/itemReducer/actions/resetStatistics";
import { setItemTypes as changeItemTypes } from "../../../reducers/itemReducer/actions/setItemType";
import { ItemTypes } from "../../../Common/Crafting/interfaces";
import InfluenceSelector from "./InfluenceSelector";

export interface Props {}

function GodPanel() {
  const {
    entityStateMeta,
    setShowAdvancedDetails,
    showAdvancedDetails,
  } = useContext(CraftingContext);

  const [iLvl, setILvl] = useState(entityStateMeta.state.itemLevel);
  const { dispatch } = useContext(CraftingContext);

  const toggleShowAdvancedDetails = () => {
    setShowAdvancedDetails(!showAdvancedDetails);
  };
  const handleIlvlChange = (e) => {
    const itemLevel = e.target.validity.valid ? Number(e.target.value) : iLvl;
    let validItemLevel = 0;
    if (itemLevel < 0) {
      validItemLevel = 0;
    } else if (itemLevel > 999) {
      validItemLevel = 999;
    } else {
      validItemLevel = itemLevel;
    }
    setILvl(validItemLevel);
    dispatch(setItemLevel(validItemLevel));
  };

  const onSelectItemInfluence = (types: ItemTypes[]) => {
    dispatch(changeItemTypes(types));
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
        <button className="inputButton" disabled>
          Item Level:{" "}
        </button>{" "}
        <input
          type="text"
          pattern="[0-9]*"
          value={iLvl}
          onChange={handleIlvlChange}
        ></input>
      </div>
      <div className="godButtonContainer">
        <button disabled>
          <span style={{ float: "right", paddingRight: "0.3rem" }}>
            Influence:{" "}
          </span>
        </button>{" "}
        <InfluenceSelector
          onSelectItemInfluence={onSelectItemInfluence}
          itemTypes={entityStateMeta.state.itemTypes}
        />
      </div>
      <div className="godButtonContainer">
        <button className="inputButton" disabled>
          Advanced Mod Description:{" "}
        </button>{" "}
        <label className="checkboxContainer">
          <input
            type="checkbox"
            checked={showAdvancedDetails}
            onChange={toggleShowAdvancedDetails}
          />
          <span className="checkmark"></span>
        </label>
      </div>
      <div className="godButtonContainer"></div>
    </div>
  );
}

export default GodPanel;
