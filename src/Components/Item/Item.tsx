import React, { useContext } from "react";
import { CraftingContext } from "../../contexts/ItemContext";
import ItemPresentation from "./ItemPresentation";

function Item() {
  const { entityStateMeta } = useContext(CraftingContext);
  const item = entityStateMeta.state;
  return (
    <div className="itemWrapper">
      {item.baseItem && <ItemPresentation item={entityStateMeta.state} />}
    </div>
  );
}

export default Item;
