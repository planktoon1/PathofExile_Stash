import React, { useContext } from "react";
import Debounce from "react-debounce-component";
import { CraftingContext } from "../../contexts/ItemContext";
import AvailableAffixes from "./AvailableAffixes";

interface Props {}

const DebouncedAvailableAffixes: React.FunctionComponent<Props> = () => {
  const { entityStateMeta } = useContext(CraftingContext);

  return (
    <Debounce ms={320}>
      <AvailableAffixes entityStateMeta={entityStateMeta} />
    </Debounce>
  );
};

export default DebouncedAvailableAffixes;
