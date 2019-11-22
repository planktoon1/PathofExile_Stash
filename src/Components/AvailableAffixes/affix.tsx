import { faInfoCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSnackbar } from "notistack";
import React, { useContext } from "react";
import { ModWithMetaData } from "../../reducers/itemReducer/helperFunctions/generateGroupedModList";
import "./AffixList.css";
import { CraftingContext } from "../../contexts/ItemContext";
import { addMod } from "../../reducers/itemReducer/actions/addMod";

interface Props {
  affixData: ModWithMetaData;
}

const Affix: React.FunctionComponent<Props> = ({ affixData }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { dispatch } = useContext(CraftingContext);
  const onInfo = () => {
    for (const reason of affixData.metaData.availabilityReasons)
      enqueueSnackbar(reason, {
        variant: "info"
      });
  };
  const onAddMod = () => {
    dispatch(addMod(affixData.mod));
  };
  const spawnChance = affixData.metaData.spawnChance * 100;
  // based on affix availability either return an "add" or an "info" button
  const getActionButton = () => {
    if (affixData.metaData.availabilityReasons.length > 0) {
      return (
        <button className="info" title="Info" onClick={onInfo}>
          <FontAwesomeIcon icon={faInfoCircle} />
        </button>
      );
    } else {
      return (
        <button className="addMod" title="Add mod to item" onClick={onAddMod}>
          <FontAwesomeIcon icon={faPlusCircle} />
        </button>
      );
    }
  };

  return (
    <div
      className={affixData.metaData.available ? `affix` : `affix unavailable`}
    >
      <div className="affixitem left">
        <div className="ilvlArea"> ILvl: {affixData.mod.required_level}</div>{" "}
        {affixData.mod.name}
      </div>
      <div
        className="spawnChance"
        title={`Spawn chance ${spawnChance.toFixed(6)}%`}
      >
        {`${spawnChance.toFixed(2)}%`}
      </div>
      <div className="affixitem right">
        {affixData.description.filter(e => !!e).join(" / ")}
        <div className="buttonArea">{getActionButton()}</div>
      </div>
    </div>
  );
};

export default Affix;
