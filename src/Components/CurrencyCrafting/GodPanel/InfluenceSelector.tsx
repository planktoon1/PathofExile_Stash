import React from "react";
import styled from "styled-components";
import { ItemTypes } from "../../../Common/Crafting/interfaces";
// ######## Props ########
interface Props {
  onSelectItemInfluence: (types: ItemTypes[]) => void;
  itemTypes: ItemTypes[];
}
// ######## Styling ########
const DropDown = styled.div`
  position: relative;
  display: inline-block;
  margin: 0 0 0 0.2rem;
  width: 100%;
`;

const DropDownButton = styled.div`
  color: white;
  background-color: #1e2124;
  height: 2.3rem;
  padding: 0.4rem;
  font-size: 0.9rem;
  text-align-last: center;
  border: 1px solid #444;
  box-sizing: border-box;
  position: relative;
  width: 100%;
`;

const DropdownContent = styled.div`
  display: none;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid bisque;
  flex-direction: column;
  position: absolute;
  right: 0;
  background-color: #1e2124;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 1;
  ${DropDown}:hover & {
    display: flex;
  }
  & input[type="checkbox"] {
    width: min-content;
    margin: 0;
    cursor: pointer;
    margin-top: auto;
  }
  label {
    display: flex;
    cursor: pointer;
    justify-content: space-between;
  }
`;
// ######## Component ########
const InfluenceSelector: React.FunctionComponent<Props> = ({
  onSelectItemInfluence,
  itemTypes,
}) => {
  const maxInfluenceSelected = itemTypes.length < 2 ? false : true;
  const onSelect = (option: ItemTypes) => {
    const i = itemTypes.findIndex((e) => e === option);
    if (i !== -1) {
      const tempInfluences = itemTypes.slice(0);
      tempInfluences.splice(i, 1);
      onSelectItemInfluence(tempInfluences);
    } else if (!maxInfluenceSelected) {
      onSelectItemInfluence(itemTypes.concat(option));
    }
  };
  const displayText = !!itemTypes[0] ? itemTypes.join(" & ") : "None";

  return (
    <DropDown>
      <DropDownButton>{displayText} </DropDownButton>
      <DropdownContent>
        <InfluenceOption
          id="Crusader"
          influences={itemTypes}
          maxInfluenceSelected={maxInfluenceSelected}
          onSelect={onSelect}
        />
        <InfluenceOption
          id="Warlord"
          influences={itemTypes}
          maxInfluenceSelected={maxInfluenceSelected}
          onSelect={onSelect}
        />
        <InfluenceOption
          id="Redeemer"
          influences={itemTypes}
          maxInfluenceSelected={maxInfluenceSelected}
          onSelect={onSelect}
        />
        <InfluenceOption
          id="Hunter"
          influences={itemTypes}
          maxInfluenceSelected={maxInfluenceSelected}
          onSelect={onSelect}
        />
        <InfluenceOption
          id="Shaper"
          influences={itemTypes}
          maxInfluenceSelected={maxInfluenceSelected}
          onSelect={onSelect}
        />
        <InfluenceOption
          id="Elder"
          influences={itemTypes}
          maxInfluenceSelected={maxInfluenceSelected}
          onSelect={onSelect}
        />
      </DropdownContent>
    </DropDown>
  );
};

interface InfluenceOptionProp {
  id: string;
  onSelect: (option: ItemTypes) => void;
  maxInfluenceSelected: boolean;
  influences: string[];
}
const InfluenceOption: React.FunctionComponent<InfluenceOptionProp> = ({
  id,
  onSelect,
  maxInfluenceSelected,
  influences,
}) => {
  return (
    <label>
      {id + " "}
      <input
        disabled={maxInfluenceSelected && !influences.find((e) => e === id)}
        type="checkbox"
        checked={!!influences.find((e) => e === id)}
        onChange={() => onSelect(ItemTypes[id])}
      />
    </label>
  );
};

export default InfluenceSelector;
