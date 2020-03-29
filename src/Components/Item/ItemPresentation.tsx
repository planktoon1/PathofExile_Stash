import PropTypes from "prop-types";
import React from "react";
import {
  getImgUrlFromBaseItem,
  itemClasses
} from "../../Common/Crafting/CraftingUtil";
import "./ItemPresentation.css";
import { EntityState } from "../../Common/Crafting/interfaces";
import { getModTier } from "./utility";

function ItemPresentation({
  item,
  showAdvancedDetails
}: {
  item: EntityState;
  showAdvancedDetails: boolean;
}) {
  // ------------- Item Header -------------
  const itemHeader = () => {
    const doubleLinedRarities = ["Rare", "Unique"];
    if (doubleLinedRarities.includes(item.rarity)) {
      return (
        <div className={`itemHeader ${item.rarity} ${item.itemType}`}>
          <div className="itemName">{item.name}</div>
          <div className="itemName typeLine">{item.baseItem.name}</div>
        </div>
      );
    } else {
      let name = item.baseItem.name;
      if (item.rarity === "Magic") {
        name = item.name;
      }

      return (
        <div className={`itemHeader ${item.rarity} ${item.itemType}`}>
          <div
            className="itemName typeLine"
            style={{ fontSize: name.length > 32 ? 15 : 19 }}
          >
            {name}
          </div>
        </div>
      );
    }
  };

  // ------------- Type Related Stat -------------
  const typeRelatedStats = () => {
    // Armour type
    if (
      itemClasses["Armor"].includes(item.baseItem.item_class) ||
      item.baseItem.item_class === "Shield"
    ) {
      const block =
        item.baseItem.properties.block === item.calculatedProperties.block ? (
          <span className="value">{item.baseItem.properties.block}%</span>
        ) : (
          <span className="value augmented">
            {item.calculatedProperties.block}%
          </span>
        );
      const armour =
        item.baseItem.properties.armour === item.calculatedProperties.armour ? (
          <span className="value">{item.baseItem.properties.armour}</span>
        ) : (
          <span className="value augmented">
            {item.calculatedProperties.armour.toFixed(0)}
          </span>
        );
      const evasion =
        item.baseItem.properties.evasion ===
        item.calculatedProperties.evasion ? (
          <span className="value">{item.baseItem.properties.evasion}</span>
        ) : (
          <span className="value augmented">
            {item.calculatedProperties.evasion.toFixed(0)}
          </span>
        );
      const energyShield =
        item.baseItem.properties.energy_shield ===
        item.calculatedProperties.energy_shield ? (
          <span className="value">
            {item.baseItem.properties.energy_shield}
          </span>
        ) : (
          <span className="value augmented">
            {item.calculatedProperties.energy_shield.toFixed(0)}
          </span>
        );
      return (
        <div className="stats">
          {item.quality > 0 && (
            <p>
              Quality: <span className="value augmented">{item.quality}%</span>
            </p>
          )}
          {!!item.baseItem.properties.block && <p> Chance to Block {block}</p>}
          {!!item.baseItem.properties.armour && <p> Armour {armour}</p>}
          {!!item.baseItem.properties.evasion && <p> Evasion {evasion}</p>}
          {!!item.baseItem.properties.energy_shield && (
            <p> Energy Shield {energyShield}</p>
          )}
          <div className={`separator ${item.rarity}`}></div>
        </div>
      );
    }
    // Weapon type
    else if (
      itemClasses["One Handed Weapon"].includes(item.baseItem.item_class) ||
      itemClasses["Two Handed Weapon"].includes(item.baseItem.item_class)
    ) {
      const physicalDamage =
        item.baseItem.properties.physical_damage_min ===
          item.calculatedProperties.physical_damage_min &&
        item.baseItem.properties.physical_damage_max ===
          item.calculatedProperties.physical_damage_max ? (
          <span className="value">
            {item.baseItem.properties.physical_damage_min}-
            {item.baseItem.properties.physical_damage_max}
          </span>
        ) : (
          <span className="value augmented">
            {item.calculatedProperties.physical_damage_min.toFixed(0)}-
            {item.calculatedProperties.physical_damage_max.toFixed(0)}
          </span>
        );
      const criticalStrikeChance =
        item.baseItem.properties.critical_strike_chance ===
        item.calculatedProperties.critical_strike_chance ? (
          <span className="value">
            {(item.baseItem.properties.critical_strike_chance / 100).toFixed(2)}
            %
          </span>
        ) : (
          <span className="value augmented">
            {(item.calculatedProperties.critical_strike_chance / 100).toFixed(
              2
            )}
            %
          </span>
        );
      const attackTime =
        item.baseItem.properties.attack_time ===
        item.calculatedProperties.attack_time ? (
          <span className="value">
            {(1000 / item.baseItem.properties.attack_time).toFixed(2)}
          </span>
        ) : (
          <span className="value augmented">
            {(1000 / item.calculatedProperties.attack_time).toFixed(2)}
          </span>
        );
      const weaponRange =
        item.baseItem.properties.range === item.calculatedProperties.range ? (
          <span className="value">{item.baseItem.properties.range}</span>
        ) : (
          <span className="value augmented">
            {item.calculatedProperties.range}
          </span>
        );
      const displayElementalDamage =
        !!item.calculatedProperties.cold_damage_min ||
        !!item.calculatedProperties.cold_damage_max ||
        !!item.calculatedProperties.lightning_damage_min ||
        !!item.calculatedProperties.lightning_damage_max ||
        !!item.calculatedProperties.fire_damage_min ||
        !!item.calculatedProperties.fire_damage_max;
      const eleDmg: any[] = [];
      if (
        !!item.calculatedProperties.fire_damage_min ||
        !!item.calculatedProperties.fire_damage_max
      ) {
        eleDmg.push(
          <span className="value fire" key={"fire"}>
            {item.calculatedProperties.fire_damage_min}-
            {item.calculatedProperties.fire_damage_max}
          </span>
        );
      }
      if (
        !!item.calculatedProperties.cold_damage_min ||
        !!item.calculatedProperties.cold_damage_max
      ) {
        eleDmg.push(
          <span className="value cold" key={"cold"}>
            {item.calculatedProperties.cold_damage_min}-
            {item.calculatedProperties.cold_damage_max}
          </span>
        );
      }
      if (
        !!item.calculatedProperties.lightning_damage_min ||
        !!item.calculatedProperties.lightning_damage_max
      ) {
        eleDmg.push(
          <span className="value lightning" key={"lightning"}>
            {item.calculatedProperties.lightning_damage_min}-
            {item.calculatedProperties.lightning_damage_max}
          </span>
        );
      }

      return (
        <div className="stats">
          <p>{item.baseItem.item_class}</p>
          {item.quality > 0 && (
            <p>
              Quality: <span className="value augmented">{item.quality}%</span>
            </p>
          )}
          {!!item.baseItem.properties.physical_damage_max && (
            <p> Physical Damage: {physicalDamage}</p>
          )}
          {displayElementalDamage && (
            <p>
              {" "}
              Elemental Damage:{" "}
              {eleDmg.map(t => t).reduce((prev, curr) => [prev, ", ", curr])}
            </p>
          )}
          {(!!item.calculatedProperties.chaos_damage_min ||
            !!item.calculatedProperties.chaos_damage_max) && (
            <p>
              {" "}
              Chaos Damage:{" "}
              <span className="value chaos">
                {item.calculatedProperties.chaos_damage_min}-
                {item.calculatedProperties.chaos_damage_max}
              </span>{" "}
            </p>
          )}
          {item.baseItem.properties.critical_strike_chance && (
            <p> Critical Strike Chance: {criticalStrikeChance}</p>
          )}
          {item.baseItem.properties.attack_time && (
            <p> Attacks Per Second: {attackTime}</p>
          )}
          {item.baseItem.properties.range && (
            <p> Weapon Range: {weaponRange}</p>
          )}
          <div className={`separator ${item.rarity}`}></div>
        </div>
      );
    } else return;
  };

  // ------------- Requirements -------------
  const statRequirements = () => {
    if (
      item.baseItem.requirements &&
      (item.baseItem.requirements.level > 1 ||
        item.baseItem.requirements.strength > 0 ||
        item.baseItem.requirements.dexterity > 0 ||
        item.baseItem.requirements.intelligence > 0)
    ) {
      const requirements: any[] = [];
      if (item.baseItem.requirements.level > 1) {
        requirements.push(
          <span key={"level"}>
            {" "}
            Level{" "}
            <span className="value">{item.baseItem.requirements.level}</span>
          </span>
        );
      }
      if (!!item.baseItem.requirements.strength) {
        item.baseItem.requirements.strength ===
        item.calculatedProperties.strength
          ? requirements.push(
              <span key={"strength"}>
                <span className="value">
                  {item.baseItem.requirements.strength}
                </span>{" "}
                Str
              </span>
            )
          : requirements.push(
              <span key={"strength"}>
                <span className="value augmented">
                  {item.calculatedProperties.strength.toFixed(0)}
                </span>{" "}
                Str
              </span>
            );
      }
      if (!!item.baseItem.requirements.dexterity) {
        item.baseItem.requirements.dexterity ===
        item.calculatedProperties.dexterity
          ? requirements.push(
              <span key={"dexterity"}>
                <span className="value">
                  {item.baseItem.requirements.dexterity}
                </span>{" "}
                Dex
              </span>
            )
          : requirements.push(
              <span key={"dexterity"}>
                <span className="value augmented">
                  {item.calculatedProperties.dexterity.toFixed(0)}
                </span>{" "}
                Dex
              </span>
            );
      }
      if (!!item.baseItem.requirements.intelligence) {
        item.baseItem.requirements.intelligence ===
        item.calculatedProperties.intelligence
          ? requirements.push(
              <span key={"intelligence"}>
                <span className="value">
                  {item.baseItem.requirements.intelligence}
                </span>{" "}
                Int
              </span>
            )
          : requirements.push(
              <span key={"intelligence"}>
                <span className="value augmented">
                  {item.calculatedProperties.intelligence.toFixed(0)}
                </span>{" "}
                Int
              </span>
            );
      }
      return (
        <span className="statRequirements">
          <br />
          Requires {requirements.reduce((prev, curr) => [prev, ", ", curr])}
        </span>
      );
    } else return;
  };

  let requirements = (
    <div className="requirements">
      <span className="itemLevel">
        Item Level: <span className="value">{item.itemLevel}</span>
      </span>
      {statRequirements()}
    </div>
  );
  const implicits = () => {
    if (item.implicitTranslations.length > 0) {
      return (
        <div className="implicit">
          <div className={`separator ${item.rarity}`}></div>
          {item.implicitTranslations.map(implicit => (
            <p
              key={implicit.translation}
              title={implicit.modId}
              className="value augmented"
            >
              {implicit.translation}
            </p>
          ))}
        </div>
      );
    }
  };

  const affixes = () => {
    if (item.modTranslations.length === 0) {
      return;
    }
    return (
      <div className="affixes">
        <div className={`separator ${item.rarity}`}></div>
        {item.modTranslations.map(mod => (
          <>
            {showAdvancedDetails && mod.displayAdvancedDetails && (
              <p className="value detail">{mod.advancedDetails}</p>
            )}
            <p
              className="value augmented"
              title={`t${getModTier(item.baseItem.item_class, mod.modId)} id: ${
                mod.modId
              }`}
              key={mod.translation}
            >
              {mod.translation}
            </p>
          </>
        ))}
      </div>
    );
  };

  // -------------------------------------
  return (
    <>
      <div className="topWrapper">
        {itemHeader()}
        <div className="itemContent">
          {typeRelatedStats()}
          {requirements}

          {implicits()}
          {affixes()}
          {item.corrupted && <p className="value corrupted">Corrupted</p>}
          <div className={`separator ${item.rarity}`}></div>
        </div>
      </div>
      <div className="bottomWrapper">
        <img
          className="image scale"
          src={getImgUrlFromBaseItem(item.baseItem, item.itemType)}
          alt={item.name}
        />
      </div>
    </>
  );
}

ItemPresentation.prototype = {
  item: PropTypes.object
};
export default ItemPresentation;
