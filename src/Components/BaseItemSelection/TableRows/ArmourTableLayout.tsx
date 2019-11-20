import React, { useContext } from "react";
import {
  getImgUrlFromBaseItem,
  getModById
} from "../../../Common/Crafting/CraftingUtil";
import { getModDescription } from "../../../Common/Crafting/Translation";
import { CraftingContext } from "../../../contexts/ItemContext";
import { changeBaseItem } from "../../../reducers/itemReducer/actions/changeBaseItem";
import "../BaseItemSelection.css";

function ArmourTableLayout({ item }) {
  const implicitList: any[] = [];
  const { dispatch } = useContext(CraftingContext);
  for (let implicit of item.implicits) {
    const mod = getModById(implicit);
    if (mod) {
      implicitList.push(...getModDescription(mod));
    }
  }
  const implicits = implicitList.map(implicit => (
    <p key={implicit}>{implicit}</p>
  ));

  const handleClick = () => {
    dispatch(changeBaseItem(item.name));
  };

  return (
    <div className="table flex rowGroup" onClick={handleClick}>
      <div className="table flex container1">
        <div className="table data img">
          {" "}
          <img
            className="icon"
            title={item.name}
            src={getImgUrlFromBaseItem(item)}
            alt={item.name}
          />
        </div>
        <div className="table data name">{item.name}</div>
      </div>
      <div className="table flex container2">
        <div className="table flex container3">
          <div className="table data level" title="Level">
            {item.requirements.level}
          </div>
          <div className="table data armour" title="Armour">
            {item.properties.armour || 0}
          </div>
          <div className="table data evasion" title="Evasion Rating">
            {item.properties.evasion || 0}
          </div>
          <div className="table data energy" title="Energy Shield">
            {item.properties.energy_shield || 0}
          </div>
          <div className="table data str" title="Required Str">
            {item.requirements.strength}
          </div>
          <div className="table data dex" title="Required Dex">
            {item.requirements.dexterity}
          </div>
          <div className="table data int" title="Required Int">
            {item.requirements.intelligence}
          </div>
        </div>
        <div className="table flex container4">
          <div className="table data implicit" title="Implicit Mod">
            {" "}
            {implicits}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArmourTableLayout;
