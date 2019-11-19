import "./CraftingOptionNavbarTab.css";
import React from "react";
import { notImplementedString } from "../../../Common/Utilities";

interface Props {
  setCraftingOption: (option: string) => void;
  craftingOption: string;
  currentCraftingOption: string;
  name: string;
  disabled?: boolean;
}

export default function CraftingOptionNavbarTab({
  currentCraftingOption,
  setCraftingOption,
  craftingOption,
  name,
  disabled = false
}: Props) {
  return (
    <button
      title={disabled ? notImplementedString : ""}
      className={currentCraftingOption === craftingOption ? "active" : ""}
      disabled={disabled}
      onClick={() => setCraftingOption(craftingOption)}
    >
      {name}
    </button>
  );
}
