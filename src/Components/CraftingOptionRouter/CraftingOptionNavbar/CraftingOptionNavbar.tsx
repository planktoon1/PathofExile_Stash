import "./CraftingOptionNavnbar.css";
import React from "react";
import CraftingOptionNavbarTab from "./CraftingOptionNavbarTab";

export default function CraftingOptionNavbar({
  craftingOption,
  setCraftingOption
}) {
  return (
    <div id="optionsBar" className="optionsBar">
      <CraftingOptionNavbarTab
        setCraftingOption={setCraftingOption}
        currentCraftingOption={craftingOption}
        craftingOption="baseItem"
        name="Base Item"
      />
      <CraftingOptionNavbarTab
        setCraftingOption={setCraftingOption}
        craftingOption="currencyCrafting"
        currentCraftingOption={craftingOption}
        name="Currency"
      />
      <CraftingOptionNavbarTab
        setCraftingOption={setCraftingOption}
        currentCraftingOption={craftingOption}
        craftingOption="availableAffixes"
        name="Manual Affixes"
      />
      <CraftingOptionNavbarTab
        setCraftingOption={setCraftingOption}
        craftingOption="fossilCrafting"
        currentCraftingOption={craftingOption}
        name="Fossils"
        disabled={true}
      />
      <CraftingOptionNavbarTab
        setCraftingOption={setCraftingOption}
        craftingOption="bestiaryCrafting"
        currentCraftingOption={craftingOption}
        name="Masters"
        disabled={true}
      />
    </div>
  );
}
