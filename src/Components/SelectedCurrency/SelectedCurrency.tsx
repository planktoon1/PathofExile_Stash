import { faLock, faLockOpen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { CraftingContext } from "../../contexts/ItemContext";
import "./SelectedCurrency.css";

const SelectedCurrency = () => {
  const {
    selectedCurrency,
    deselectCurrency,
    currencyLocked,
    setCurrencyLocked,
    entityStateMeta
  } = useContext(CraftingContext);
  const onLock = e => {
    setCurrencyLocked(!currencyLocked);
  };
  const onTrash = e => {
    setCurrencyLocked(false);
    deselectCurrency();
  };
  const selectedCurrencyString = selectedCurrency.selectedCurrency
    ? selectedCurrency.selectedCurrency
    : "";
  return (
    <div className="selectedCurrency">
      <div className="currencyName">
        {selectedCurrency.selectedCurrency
          ? selectedCurrency.selectedCurrency
          : ""}
      </div>
      <div className="buttons">
        <button className="lockCurrency" onClick={onLock}>
          <FontAwesomeIcon icon={currencyLocked ? faLock : faLockOpen} />
        </button>
        <button className="trashCurrency" onClick={onTrash}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
      <div
        className="image"
        data-count={
          entityStateMeta.statistics[selectedCurrencyString]
            ? entityStateMeta.statistics[selectedCurrencyString].count
            : undefined
        }
      >
        <img
          className="currency"
          alt=""
          src={
            selectedCurrency.selectedCurrencyImg
              ? selectedCurrency.selectedCurrencyImg
              : ""
          }
        />
      </div>
    </div>
  );
};

export default SelectedCurrency;
