import React, { useContext } from "react";
import {
  getModById,
  getImgUrlFromBaseItem
} from "../../../Common/Crafting/CraftingUtil";
import { getModDescription } from "../../../Common/Crafting/Translation";
import "../BaseItemSelection.css";
import { CraftingContext } from "../../../contexts/ItemContext";
import { changeBaseItem } from "../../../reducers/itemReducer/actions/changeBaseItem";

function JewelleryTableLayout({ item }) {
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
      <div className="table flex container5">
        <div className="table data img">
          <img
            className="icon"
            title={item.name}
            src={getImgUrlFromBaseItem(item)}
            alt={item.name}
          />
        </div>
        <div className="table data name">{item.name}</div>
      </div>
      <div className="table flex container6">
        <div className="table data level" title="Level">
          {item.drop_level}
        </div>
        <div className="table data implicit" title="Implicit Mod">
          {implicits}
        </div>
      </div>
    </div>
  );
}

export default JewelleryTableLayout;
