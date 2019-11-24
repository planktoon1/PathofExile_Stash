import { withSnackbar } from "notistack";
import React, { useContext, useEffect, useState } from "react";
import CraftingOption from "../../Components/CraftingOptionRouter";
import CraftingOptionNavbar from "../../Components/CraftingOptionRouter/CraftingOptionNavbar/CraftingOptionNavbar";
import CursorCurrency from "../../Components/CursorCurrency/index.js";
import Item from "../../Components/Item";
import SelectedCurrency from "../../Components/SelectedCurrency";
import { CraftingContext } from "../../contexts/ItemContext";
import { usePopUps } from "../../hooks/usePopUps";
import { applyCurrency } from "../../reducers/itemReducer/actions/applyCurrency";
import { changeBaseItem } from "../../reducers/itemReducer/actions/changeBaseItem";
import "./Frontpage.css";
import { BrowserView } from "react-device-detect";
import { debounce } from "lodash";
import ItemStats from "../../Components/ItemStats";
import { scrollToElement } from "../../Common/Utilities";

function Frontpage() {
  const {
    dispatch,
    deselectCurrency,
    selectedCurrency,
    currencyLocked
  } = useContext(CraftingContext);
  const [craftingOption, setCraftingOption] = useState("currencyCrafting");
  useShiftKeyCurrencyLockToggle();
  usePopUps();

  useEffect(() => {
    dispatch(changeBaseItem("Maraketh Bow"));
  }, [dispatch]);

  const onSetCraftingOption = (option: string) => {
    setCraftingOption(option);
    const craftingArea = document.getElementsByClassName("craftingArea")[0];
    if (craftingArea) {
      scrollToElement(craftingArea);
    }
  };

  const handleClick = e => {
    if (!selectedCurrency.selectedCurrency) {
      return;
    }
    dispatch(applyCurrency(selectedCurrency.selectedCurrency));

    if (!currencyLocked) deselectCurrency();
  };
  return (
    <div className="frontpage">
      <CraftingOptionNavbar
        craftingOption={craftingOption}
        setCraftingOption={onSetCraftingOption}
      />
      <div className="stash">
        <div className="itemInspect" onClick={handleClick}>
          <Item />
        </div>
        <ItemStats />
        <CraftingOption option={craftingOption} />

        {selectedCurrency.selectedCurrency && <SelectedCurrency />}
      </div>
      <BrowserView>
        <CursorCurrency selectedCurrency={selectedCurrency} />
      </BrowserView>
    </div>
  );
}

export default withSnackbar(Frontpage);

function useShiftKeyCurrencyLockToggle() {
  const { currencyLocked, setCurrencyLocked } = useContext(CraftingContext);
  useEffect(() => {
    const downHandler = e => {
      if (e.keyCode === 16) setCurrencyLocked(!currencyLocked);
    };
    const debounced = debounce(downHandler, 100, { maxWait: 300 });
    document.addEventListener("keydown", debounced);
    // Remove event listeners on cleanup
    return () => {
      document.removeEventListener("keydown", debounced);
    };
  }, [currencyLocked, setCurrencyLocked]);
}
