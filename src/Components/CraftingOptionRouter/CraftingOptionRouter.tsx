import PropTypes from "prop-types";
import React from "react";
import DebouncedAvailableAffixes from "../AvailableAffixes/debouncedAvailableAffixes";
import BaseItemSelection from "../BaseItemSelection";
import CurrencyCrafting from "../CurrencyCrafting";

function CraftingOption({ option }) {
  switch (option) {
    case "baseItem":
      return <BaseItemSelection />;
    case "currencyCrafting":
      return <CurrencyCrafting />;
    case "fossilCrafting":
      return (
        <div className="craftingArea currencyCraft">
          <div className="craftingMaterials">FOSSILS</div>
          <div className="stats">STATS</div>
        </div>
      );
    case "bestiaryCrafting":
      return (
        <div className="craftingArea currencyCraft">
          <div className="craftingMaterials">BEAST CRAFTS</div>
          <div className="stats">STATS</div>
        </div>
      );
    case "availableAffixes":
      return <DebouncedAvailableAffixes />;
    default:
      return null;
  }
}
CraftingOption.propTypes = {
  option: PropTypes.oneOf([
    "baseItem",
    "currencyCrafting",
    "availableAffixes",
    "fossilCrafting",
    "bestiaryCrafting"
  ])
};

export default CraftingOption;
