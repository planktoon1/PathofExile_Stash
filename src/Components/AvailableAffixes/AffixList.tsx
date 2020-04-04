import React from "react";
import { GroupedMods } from "../../reducers/itemReducer/helperFunctions/generateGroupedModList";
import Affix from "./affix";
import "./AffixList.css";
import "../../Common/collapsible/collapsible.css";
import { onCollapsible } from "../../Common/collapsible/collapsible";

interface Props {
  groupedAffixes: GroupedMods;
}

const AffixList: React.FunctionComponent<Props> = ({ groupedAffixes }) => {
  const affixList = () => {
    // Make a list of the mods to be displayed
    const affixList: any[] = [];
    for (const groupName in groupedAffixes) {
      const group = groupedAffixes[groupName];
      const header = group.description;
      const spawnChance = group.spawnChance * 100;
      const groupPresentation = (
        <li className="modCard" key={groupName}>
          <button className="collapsible" onClick={onCollapsible}>
            <table className="table">
              <thead>
                <tr>
                  <th colSpan={3}>{header}</th>
                </tr>
                <tr>
                  <td className="alignLeft">
                    {group.modTypes.join(" or ")} - {group.generationType}
                  </td>
                  <td title={`Spawn chance: ${spawnChance.toFixed(6)}%`}>
                    Chance: {`${spawnChance.toFixed(1)}%`}{" "}
                  </td>
                  <td className="alignRight">
                    Tiers: {group.tiersAvailable}/{group.tiers}
                  </td>
                </tr>
              </thead>
            </table>
          </button>
          <div className="collapsibleContent">
            {group.mods.map((mod) => (
              <Affix affixData={mod} key={mod.mod.key} />
            ))}
          </div>
        </li>
      );
      affixList.push(groupPresentation);
    }
    return affixList;
  };

  return <ul className="scrollable">{affixList()}</ul>;
};

export default AffixList;
