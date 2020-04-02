import React, { useState } from "react";
import styled from "styled-components";

interface Props {}

const DropDown = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`;

const DropDownButton = styled.div`
  color: white;
  background-color: #1e2124;
  height: 2.3rem;
  padding: 0 1.2rem;
  text-align-last: center;
  border: 1px solid bisque;
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
  background-color: #1e2124;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 1;
  ${DropDown}:hover & {
    display: flex;
  }
  & input[type="checkbox"] {
    float: right;
  }
`;

const InfluenceSelector: React.FunctionComponent<Props> = ({}) => {
  const [influences, setInfluences] = useState<string[]>([]);
  const onSelect = (option: string) => {};
  const displayText = !!influences[0] ? "" : "None";
  return (
    <DropDown>
      <DropDownButton>{displayText} </DropDownButton>
      <DropdownContent>
        <label>
          Unavailable{" "}
          <input type="checkbox" onChange={() => onSelect("Unavailable")} />
        </label>
        <div className={`separator`} />
        <label>
          Prefixes{" "}
          <input type="checkbox" onChange={() => onSelect("Prefixes")} />
        </label>
        <label>
          Suffixes{" "}
          <input type="checkbox" onChange={() => onSelect("Suffixes")} />
        </label>
        <div className={`separator`} />
        <label>
          Base Item{" "}
          <input type="checkbox" onChange={() => onSelect("BaseItem")} />
        </label>
        <label>
          Shaper <input type="checkbox" onChange={() => onSelect("Shaper")} />
        </label>
        <label>
          Elder <input type="checkbox" onChange={() => onSelect("Elder")} />
        </label>
      </DropdownContent>
    </DropDown>
  );
};

export default InfluenceSelector;
