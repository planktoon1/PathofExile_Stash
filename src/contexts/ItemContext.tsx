import React, { createContext, useReducer, Dispatch, useState } from "react";
import {
  ItemReducer,
  ItemReducerAction,
  entityStateMetaInitValue
} from "../reducers/itemReducer/itemReducer";
import { EntityStateMeta } from "../Common/Crafting/interfaces";

interface Props {}

interface CraftingContextI {
  entityStateMeta: EntityStateMeta;
  dispatch: Dispatch<ItemReducerAction>;
  selectedCurrency: {
    selectedCurrency: null | string;
    selectedCurrencyImg: null | string;
  };
  selectCurrency: (e: any) => void;
  deselectCurrency: () => void;
  currencyLocked: boolean;
  setCurrencyLocked: (value: boolean) => void;
  showAdvancedDetails: boolean;
  setShowAdvancedDetails: (value: boolean) => void;
}

export const CraftingContext = createContext<CraftingContextI>({
  entityStateMeta: entityStateMetaInitValue,
  dispatch: () => {},
  selectedCurrency: {
    selectedCurrency: null,
    selectedCurrencyImg: null
  },
  selectCurrency: e => {},
  deselectCurrency: () => {},
  currencyLocked: false,
  setCurrencyLocked: () => {},
  showAdvancedDetails: true,
  setShowAdvancedDetails: () => {}
});

const ItemContextProvider: React.FC<Props> = props => {
  const [currencyLocked, setCurrencyLocked] = useState(false);
  const [showAdvancedDetails, setShowAdvancedDetails] = useState(true);
  const [entityStateMeta, dispatch] = useReducer(
    ItemReducer,
    entityStateMetaInitValue
  );
  const [selectedCurrency, setSelectedCurrency] = useState<{
    selectedCurrency: null | string;
    selectedCurrencyImg: null | string;
  }>({
    selectedCurrency: null,
    selectedCurrencyImg: null
  });

  const selectCurrency = e => {
    setSelectedCurrency({
      ...selectedCurrency,
      selectedCurrency: e.currentTarget.children[0].title,
      selectedCurrencyImg: e.currentTarget.children[0].src
    });
    if (e.type === "contextmenu") {
      e.preventDefault();
    }
  };

  const deselectCurrency = () => {
    setSelectedCurrency({
      ...selectedCurrency,
      selectedCurrency: null,
      selectedCurrencyImg: null
    });
  };

  return (
    <CraftingContext.Provider
      value={{
        entityStateMeta,
        dispatch,
        selectedCurrency,
        selectCurrency,
        deselectCurrency,
        currencyLocked,
        setCurrencyLocked,
        showAdvancedDetails,
        setShowAdvancedDetails
      }}
    >
      {props.children}
    </CraftingContext.Provider>
  );
};

export default ItemContextProvider;
