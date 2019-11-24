import React from "react";
import { EntityStateMeta } from "../../Common/Crafting/interfaces";
import "./ItemStats.css";
import {
  faArrowCircleDown,
  faArrowUp
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { onCollapsible } from "../../Common/collapsible/collapsible";
import "../../Common/collapsible/collapsible.css";

interface Props {
  entityStateMeta: EntityStateMeta;
}

const WeaponStats: React.FC<Props> = ({ entityStateMeta }) => {
  const aps = 1000 / entityStateMeta.state.calculatedProperties.attack_time;
  const avgPhysDmg =
    (entityStateMeta.state.calculatedProperties.physical_damage_min +
      entityStateMeta.state.calculatedProperties.physical_damage_max) /
    2;
  const avgFireDmg =
    (entityStateMeta.state.calculatedProperties.fire_damage_min +
      entityStateMeta.state.calculatedProperties.fire_damage_max) /
    2;
  const avgColdDmg =
    (entityStateMeta.state.calculatedProperties.cold_damage_min +
      entityStateMeta.state.calculatedProperties.cold_damage_max) /
    2;
  const avgLightningDmg =
    (entityStateMeta.state.calculatedProperties.lightning_damage_min +
      entityStateMeta.state.calculatedProperties.lightning_damage_max) /
    2;
  const avgEleDmg = avgFireDmg + avgColdDmg + avgLightningDmg;

  const physDps = aps * avgPhysDmg;
  const eleDps = aps * avgEleDmg;
  const dps = eleDps + physDps;

  return (
    <div className="weaponStats">
      <button className="collapsible" onClick={onCollapsible}>
        <div></div>
        <div className="edps">
          Elemental DPS:{" "}
          <span className="itemStat final">{eleDps.toFixed(4)}</span>{" "}
        </div>
        <FontAwesomeIcon
          title="Click to get more detailed info"
          className="arrowIcon"
          icon={faArrowCircleDown}
        />
      </button>
      <div className="collapsibleContent">
        {avgFireDmg > 0 && avgFireDmgJSX()}
        {avgColdDmg > 0 && avgColdDmgJSX()}
        {avgLightningDmg > 0 && avgLightningDmgJSX()}
        <div className="calculation">
          <span title="Attacks Per Second">{aps.toFixed(2)}</span> * (
          <span title="Average Fire Damage" className="fire">
            {avgFireDmg.toFixed(2)}
          </span>{" "}
          +{" "}
          <span title="Average Cold Damage" className="cold">
            {avgColdDmg.toFixed(2)}
          </span>{" "}
          +{" "}
          <span title="Average Lightning Damage" className="lightning">
            {avgLightningDmg.toFixed(2)}
          </span>
          ) ={" "}
          <span title="Elemental Damage Per Second" className="final">
            {" "}
            {eleDps.toFixed(4)}
          </span>
        </div>
      </div>

      <button className="collapsible" onClick={onCollapsible}>
        <div></div>
        <div className="pdps">
          Physical DPS:{" "}
          <span className="itemStat final">{physDps.toFixed(4)}</span>
        </div>
        <FontAwesomeIcon
          title="Click to get more detailed info"
          className="arrowIcon"
          icon={faArrowCircleDown}
        />
      </button>
      <div className="collapsibleContent">
        <div className="calculation">
          <span title="Attacks Per Second">{aps.toFixed(2)}</span> * (
          <span title="Minimum Physical Damage">
            {entityStateMeta.state.calculatedProperties.physical_damage_min.toFixed(
              2
            )}
          </span>{" "}
          +{" "}
          <span title="Maximum Physical Damage">
            {" "}
            {entityStateMeta.state.calculatedProperties.physical_damage_max.toFixed(
              2
            )}
          </span>
          ) / 2 ={" "}
          <span title="Physical Damage Per Second" className="final">
            {physDps.toFixed(4)} PDPS
          </span>
        </div>
      </div>
      <button className="collapsible" onClick={onCollapsible}>
        <div></div>
        <div className="dps">
          Total DPS: <span className="itemStat final">{dps.toFixed(4)}</span>
        </div>
        <FontAwesomeIcon
          title="Click to get more detailed info"
          className="arrowIcon"
          icon={faArrowCircleDown}
        />
      </button>
      <div className="collapsibleContent">
        <div className="calculation">
          <span title="Physical Damage Per Second">{physDps.toFixed(2)}</span> +{" "}
          <span title="Elemental Damage Per Second">{eleDps.toFixed(2)}</span> ={" "}
          <span title="Total Damage Per Second" className="final">
            {dps.toFixed(4)} DPS
          </span>
        </div>
      </div>
    </div>
  );

  function avgFireDmgJSX() {
    return (
      <>
        <div className="calculation">
          (
          <span title="Minimum Fire Damage">
            {entityStateMeta.state.calculatedProperties.fire_damage_min}
          </span>{" "}
          +{" "}
          <span title="Maximum Fire Damage">
            {entityStateMeta.state.calculatedProperties.fire_damage_max}
          </span>
          ) / 2 ={" "}
          <span title="Average Fire Damage" className="fire">
            {" "}
            {avgFireDmg} avgFireDmg
          </span>
        </div>
      </>
    );
  }

  function avgColdDmgJSX() {
    return (
      <>
        <div className="calculation">
          (
          <span title="Minimum Cold Damage">
            {entityStateMeta.state.calculatedProperties.cold_damage_min}
          </span>{" "}
          +{" "}
          <span title="Maximum Cold Damage">
            {entityStateMeta.state.calculatedProperties.cold_damage_max}
          </span>
          ) / 2 ={" "}
          <span title="Average Cold Damage" className="cold">
            {" "}
            {avgColdDmg} avgColdDmg
          </span>
        </div>
      </>
    );
  }

  function avgLightningDmgJSX() {
    return (
      <>
        <div className="calculation">
          (
          <span title="Minimum Lightning Damage">
            {entityStateMeta.state.calculatedProperties.lightning_damage_min}
          </span>{" "}
          +{" "}
          <span title="Maximum Lightning Damage">
            {entityStateMeta.state.calculatedProperties.lightning_damage_max}
          </span>
          ) / 2 ={" "}
          <span title="Average Lightning Damage" className="lightning">
            {" "}
            {avgLightningDmg} avgLtgDmg
          </span>
        </div>
      </>
    );
  }
};

export default WeaponStats;
