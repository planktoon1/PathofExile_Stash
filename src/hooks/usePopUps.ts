import { useContext } from "react";
import { useSnackbar } from "notistack";
import { CraftingContext } from "../contexts/ItemContext";
import { clearPopUps } from "../reducers/itemReducer/actions/clearPopUps";

/** Checks the item context for popups and enqueues snackbars with the popups if present. Then it clears the popups */
export const usePopUps = () => {
  const { dispatch, entityStateMeta } = useContext(CraftingContext);
  const { enqueueSnackbar } = useSnackbar();
  const popUps = entityStateMeta.popUps;

  if (popUps.length === 0) {
    return;
  }
  dispatch(clearPopUps());
  for (const popUp of popUps) {
    enqueueSnackbar(popUp.message, {
      variant: popUp.variant
    });
  }
};
