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
  const implicits = implicitList.map(implicit => <p>{implicit}</p>);

  const handleClick = () => {
    dispatch(changeBaseItem(item.name));
  };

  return (
    <colgroup className="rowGroup" onClick={handleClick} key={item.key}>
      <tr>
        <td className="icon" rowSpan={2}>
          <img
            className="icon"
            title={item.name}
            src={getImgUrlFromBaseItem(item)}
            alt={item.name}
          />
        </td>
        <td className="name" rowSpan={2}>
          {item.name}
        </td>
        <td className="level" title="Level">
          {item.requirements.level}
        </td>
        <td className="Armour" title="Armour">
          {item.properties.armour || 0}
        </td>
        <td className="Evasion" title="Evasion">
          {item.properties.evasion || 0}
        </td>
        <td className="EnergyShield" title="Energy Shield">
          {item.properties.energy_shield || 0}
        </td>
        <td className="ReqStr" title="Required Str">
          {item.requirements.strength}
        </td>
        <td className="ReqDex" title="Required Dex">
          {item.requirements.dexterity}
        </td>
        <td className="ReqInt" title="Required Int">
          {item.requirements.intelligence}
        </td>
      </tr>
      <tr>
        <td className="implicit" title="Implicit Mod" colSpan={7}>
          {implicits}
        </td>
      </tr>
    </colgroup>
  );
}

export default ArmourTableLayout;
