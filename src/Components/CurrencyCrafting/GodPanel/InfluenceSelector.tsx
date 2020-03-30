import React, { useState } from "react";
import styled from "styled-components";

interface Props {}

const Button = styled.button`
  background: palevioletred;
  border-radius: 3px;
  border: none;
  color: white;
`;

const InfluenceSelector: React.FunctionComponent<Props> = ({}) => {
  const [influences, setInfluences] = useState<string[]>([]);
  const onSelect = (option: string) => {};
  const displayText = !!influences[0] ? "" : "None";
  return (
    <div className="dropdown">
      <button className="dropDownButton">{displayText} </button>
      <div className="dropdownContent">
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
      </div>
    </div>
  );
};

export default InfluenceSelector;
