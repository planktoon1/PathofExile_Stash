import React from "react";

import "./BaseItemSelection.css";

function TableHead({ itemCategory, itemClass }) {
  const tableHead = () => {
    const armourTableHead = (
      <div className="table flex head">
        <div className="table flex container1">
          <div className="table data img"></div>
          <div className="table data name">Name</div>
        </div>
        <div className="table flex container2">
          <div className="table flex container3">
            <div className="table data level">Level</div>
            <div className="table data armour">Armour</div>
            <div className="table data evasion">Evasion</div>
            <div className="table data energy" style={{ whiteSpace: "nowrap" }}>
              Energy Shield
            </div>
            <div className="table data str">Str</div>
            <div className="table data dex">Dex</div>
            <div className="table data int">Int</div>
          </div>
          <div className="table flex container4">
            <div className="table data implicit">Implicit Mod</div>
          </div>
        </div>
      </div>
    );

    const weaponTableHead = (
      <div className="table flex head">
        <div className="table flex container1">
          <div className="table data img"></div>
          <div className="table data name">Name</div>
        </div>
        <div className="table flex container2">
          <div className="table flex container3">
            <div className="table data level">Level</div>
            <div className="table data damage">Damage</div>
            <div className="table data aps">APS</div>
            <div className="table data dps">DPS</div>
            <div className="table data str">Str</div>
            <div className="table data dex">Dex</div>
            <div className="table data int">Int</div>
          </div>
          <div className="table flex container4">
            <div className="table data implicit">Implicit Mod</div>
            <div className="table data crit">Crit.</div>
            <div className="table data range">Range</div>
          </div>
        </div>
      </div>
    );

    const jewelleryTableHead = (
      <div className="table flex head">
        <div className="table flex container5">
          <div className="table data img"></div>
          <div className="table data name">Name</div>
        </div>
        <div className="table flex container6">
          <div className="table data level">Level</div>
          <div className="table data implicit">Implicit mod</div>
        </div>
      </div>
    );

    switch (itemCategory) {
      case "Armor":
        return armourTableHead;
      case "One Handed Weapon":
      case "Two Handed Weapon":
        return weaponTableHead;
      case "Offhand":
        if (itemClass === "Shield") return armourTableHead;
        else if (itemClass === "Quiver") return jewelleryTableHead;
        break;
      case "Accessory":
        return jewelleryTableHead;
      default:
        return <></>;
    }
  };

  return <div className="headerWrapper">{tableHead()}</div>;
}

export default TableHead;
