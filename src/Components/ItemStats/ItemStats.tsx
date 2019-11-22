import React, { useContext } from "react";
import { CraftingContext } from "../../contexts/ItemContext";
import "./ItemStats.css";

const ItemStats = () => {
  const { entityStateMeta } = useContext(CraftingContext);

  return <div className="itemStats">{entityStateMeta.state.name}</div>;
};

export default ItemStats;
