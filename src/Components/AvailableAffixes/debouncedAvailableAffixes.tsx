import React, { useContext } from "react";
import { CraftingContext } from "../../contexts/ItemContext";
import AvailableAffixes from "./AvailableAffixes";

interface Props {}
// To allow debounceRender function to work the state has to be passed as props, so this hoc makes sure the context is fed to component via props
const DebouncedAvailableAffixes: React.FunctionComponent<Props> = () => {
  const { entityStateMeta } = useContext(CraftingContext);

  return <AvailableAffixes entityStateMeta={entityStateMeta} />;
};

export default DebouncedAvailableAffixes;
