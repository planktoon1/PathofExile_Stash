import React from "react";

import "./BaseItemSelection.css";
import { SortByOptions } from "./BaseItemSelection";
import TableData from "./TableData";
interface Props {
  itemCategory: string;
  itemClass: string;
  sortBy: SortByOptions;
  setSortBy: (sortByOption: SortByOptions) => void;
}

const TableHead: React.FunctionComponent<Props> = ({
  itemCategory,
  itemClass,
  setSortBy,
  sortBy
}) => {
  const tableHead = () => {
    const armourTableHead = (
      <div className="table flex head">
        <div className="table flex container1">
          <div className="table data img"></div>
          <TableData
            className="name"
            setSortBy={setSortBy}
            sortBy={sortBy}
            text="Name"
            sortOption_ASC={SortByOptions.NAME_ASC}
            sortOption_DESC={SortByOptions.NAME_DESC}
          />
        </div>
        <div className="table flex container2">
          <div className="table flex container3">
            <TableData
              className="level"
              setSortBy={setSortBy}
              sortBy={sortBy}
              text="Level"
              sortOption_ASC={SortByOptions.LEVEL_ASC}
              sortOption_DESC={SortByOptions.LEVEL_DESC}
            />
            <TableData
              className="armour"
              setSortBy={setSortBy}
              sortBy={sortBy}
              text="Armour"
              sortOption_ASC={SortByOptions.ARMOUR_ASC}
              sortOption_DESC={SortByOptions.ARMOUR_DESC}
            />
            <TableData
              className="evasion"
              setSortBy={setSortBy}
              sortBy={sortBy}
              text="Evasion"
              sortOption_ASC={SortByOptions.EVASION_ASC}
              sortOption_DESC={SortByOptions.EVASION_DESC}
            />
            <TableData
              className="energy"
              setSortBy={setSortBy}
              style={{ whiteSpace: "nowrap" }}
              sortBy={sortBy}
              text="Energy Shield"
              sortOption_ASC={SortByOptions.SHIELD_ASC}
              sortOption_DESC={SortByOptions.SHIELD_DESC}
            />
            <TableData
              className="str"
              setSortBy={setSortBy}
              sortBy={sortBy}
              text="Str"
              sortOption_ASC={SortByOptions.STR_ASC}
              sortOption_DESC={SortByOptions.STR_DESC}
            />
            <TableData
              className="dex"
              setSortBy={setSortBy}
              sortBy={sortBy}
              text="Dex"
              sortOption_ASC={SortByOptions.DEX_ASC}
              sortOption_DESC={SortByOptions.DEX_DESC}
            />
            <TableData
              className="int"
              setSortBy={setSortBy}
              sortBy={sortBy}
              text="Int"
              sortOption_ASC={SortByOptions.INT_ASC}
              sortOption_DESC={SortByOptions.INT_DESC}
            />
          </div>
          <div className="table flex container4">
            <TableData
              className="implicit"
              setSortBy={setSortBy}
              sortBy={sortBy}
              text="Implicit Mod"
              sortOption_ASC={SortByOptions.IMPLICIT_ASC}
              sortOption_DESC={SortByOptions.IMPLICIT_DESC}
            />
          </div>
        </div>
      </div>
    );

    const weaponTableHead = (
      <div className="table flex head">
        <div className="table flex container1">
          <div className="table data img"></div>
          <TableData
            className="name"
            setSortBy={setSortBy}
            sortBy={sortBy}
            text="Name"
            sortOption_ASC={SortByOptions.NAME_ASC}
            sortOption_DESC={SortByOptions.NAME_DESC}
          />
        </div>
        <div className="table flex container2">
          <div className="table flex container3">
            <TableData
              className="level"
              setSortBy={setSortBy}
              sortBy={sortBy}
              text="Level"
              sortOption_ASC={SortByOptions.LEVEL_ASC}
              sortOption_DESC={SortByOptions.LEVEL_DESC}
            />
            <TableData
              className="damage"
              setSortBy={setSortBy}
              sortBy={sortBy}
              text="Damage"
              sortOption_ASC={SortByOptions.DAMAGE_ASC}
              sortOption_DESC={SortByOptions.DAMAGE_DESC}
            />
            <TableData
              className="aps"
              setSortBy={setSortBy}
              sortBy={sortBy}
              text="APS"
              sortOption_ASC={SortByOptions.APS_ASC}
              sortOption_DESC={SortByOptions.APS_DESC}
            />
            <TableData
              className="dps"
              setSortBy={setSortBy}
              sortBy={sortBy}
              text="DPS"
              sortOption_ASC={SortByOptions.DPS_ASC}
              sortOption_DESC={SortByOptions.DPS_DESC}
            />
            <TableData
              className="str"
              setSortBy={setSortBy}
              sortBy={sortBy}
              text="Str"
              sortOption_ASC={SortByOptions.STR_ASC}
              sortOption_DESC={SortByOptions.STR_DESC}
            />
            <TableData
              className="dex"
              setSortBy={setSortBy}
              sortBy={sortBy}
              text="Dex"
              sortOption_ASC={SortByOptions.DEX_ASC}
              sortOption_DESC={SortByOptions.DEX_DESC}
            />
            <TableData
              className="int"
              setSortBy={setSortBy}
              sortBy={sortBy}
              text="Int"
              sortOption_ASC={SortByOptions.INT_ASC}
              sortOption_DESC={SortByOptions.INT_DESC}
            />
          </div>
          <div className="table flex container4">
            <TableData
              className="implicit"
              setSortBy={setSortBy}
              sortBy={sortBy}
              text="Implicit Mod"
              sortOption_ASC={SortByOptions.IMPLICIT_ASC}
              sortOption_DESC={SortByOptions.IMPLICIT_DESC}
            />
            <TableData
              className="crit"
              setSortBy={setSortBy}
              sortBy={sortBy}
              text="Crit."
              sortOption_ASC={SortByOptions.CRIT_ASC}
              sortOption_DESC={SortByOptions.CRIT_DESC}
            />
            <TableData
              className="range"
              setSortBy={setSortBy}
              sortBy={sortBy}
              text="Range"
              sortOption_ASC={SortByOptions.RANGE_ASC}
              sortOption_DESC={SortByOptions.RANGE_DESC}
            />
          </div>
        </div>
      </div>
    );

    const jewelleryTableHead = (
      <div className="table flex head">
        <div className="table flex container5">
          <div className="table data img"></div>
          <TableData
            className="name"
            setSortBy={setSortBy}
            sortBy={sortBy}
            text="Name"
            sortOption_ASC={SortByOptions.NAME_ASC}
            sortOption_DESC={SortByOptions.NAME_DESC}
          />
        </div>
        <div className="table flex container6">
          <TableData
            className="level"
            setSortBy={setSortBy}
            sortBy={sortBy}
            text="Level"
            sortOption_ASC={SortByOptions.LEVEL_ASC}
            sortOption_DESC={SortByOptions.LEVEL_DESC}
          />
          <TableData
            className="implicit"
            setSortBy={setSortBy}
            sortBy={sortBy}
            text="Implicit Mod"
            sortOption_ASC={SortByOptions.IMPLICIT_ASC}
            sortOption_DESC={SortByOptions.IMPLICIT_DESC}
          />
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
};

export default TableHead;
