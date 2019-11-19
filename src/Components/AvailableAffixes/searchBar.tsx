import { debounce } from "lodash";
import React, { useRef, useState } from "react";
import "./AffixList.css";

interface Props {
  setSearchString: (searchString: string) => void;
  debounceTime?: number;
}

const SearchBar: React.FunctionComponent<Props> = ({
  setSearchString,
  debounceTime = 300
}) => {
  const searchInputRef = useRef("");
  const [searchInput, setsearchInput] = useState("");

  const callSetSearchString = () => {
    setSearchString(searchInputRef.current);
  };
  const debounceSetsearchInput = debounce(callSetSearchString, debounceTime);
  const onSearchInput = e => {
    setsearchInput(e.target.value);
    searchInputRef.current = e.target.value;
    debounceSetsearchInput();
  };

  return (
    <input
      className="searchBar"
      type="text"
      placeholder="Search.."
      onChange={onSearchInput}
      value={searchInput}
    />
  );
};

export default SearchBar;
