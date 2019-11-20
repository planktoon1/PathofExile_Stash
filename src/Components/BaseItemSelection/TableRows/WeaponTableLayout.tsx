import React, { useContext } from "react";
import {
  getModById,
  getImgUrlFromBaseItem
} from "../../../Common/Crafting/CraftingUtil";
import { getModDescription } from "../../../Common/Crafting/Translation";
import "../BaseItemSelection.css";
import { CraftingContext } from "../../../contexts/ItemContext";
import { changeBaseItem } from "../../../reducers/itemReducer/actions/changeBaseItem";

function WeaponTableLayout({ item }) {
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
        <div className="table data img" title={item.name}>
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
          <div className="table data level">{item.requirements.level || 0}</div>
          <div className="table data damage" title="Damage">
            {item.properties.physical_damage_min} to{" "}
            {item.properties.physical_damage_max}
          </div>
          <div className="table data aps" title="Attacks Per Second">
            {(1000 / item.properties.attack_time).toFixed(2)}
          </div>
          <div className="table data dps" title="Damage Per Second">
            {(
              ((item.properties.physical_damage_min +
                item.properties.physical_damage_max) /
                2) *
              (1000 / item.properties.attack_time)
            ).toFixed(1)}
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
            {implicits}
          </div>
          <div className="table data crit" title="Critical Strike Chance">
            {(item.properties.critical_strike_chance / 100).toFixed(2)}%
          </div>
          <div className="table data range" title="Weapon Range">
            {item.properties.range}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeaponTableLayout;
