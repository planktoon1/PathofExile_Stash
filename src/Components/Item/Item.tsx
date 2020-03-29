import React, { useContext } from "react";
import { CraftingContext } from "../../contexts/ItemContext";
import ItemPresentation from "./ItemPresentation";

function Item() {
  const { entityStateMeta, showAdvancedDetails } = useContext(CraftingContext);
  const item = entityStateMeta.state;
  return (
    <div id="itemWrapper" className="itemWrapper">
      {item.baseItem && (
        <ItemPresentation
          item={entityStateMeta.state}
          showAdvancedDetails={showAdvancedDetails}
        />
      )}
    </div>
  );
}

export default Item;
