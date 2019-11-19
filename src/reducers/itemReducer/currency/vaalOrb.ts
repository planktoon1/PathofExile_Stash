import {
  EntityStateMeta,
  PopUpVariant
} from "../../../Common/Crafting/interfaces";
import { getRndInteger } from "../../../Common/Utilities";
import { rollAndAddVaalImplicit } from "../helperFunctions/rollAndAddVaalImplicit";
import { orbOfAlchemy } from "./orbOfAlchemy";
import { removeAffixes } from "../helperFunctions/removeAffixes";

export const vaalOrb = (stateMeta: EntityStateMeta) => {
  enum VaalEffects {
    NO_EFFECT,
    WHITE_SOCKETS,
    REROLL_INTO_RARE,
    VAAL_IMPLICIT
  }
  const vaalEffect = VaalEffects[getRndInteger(0, 3)];
  switch (vaalEffect) {
    case "WHITE_SOCKETS":
      stateMeta.popUps.push({
        variant: PopUpVariant.INFO,
        message: `Changed one or more sockets to white sockets. 1/10 chance for each additional white socket`
      });
      break;

    case "VAAL_IMPLICIT":
      stateMeta.state.implicitTranslations = [];
      stateMeta.implicitsWithValues = [];
      rollAndAddVaalImplicit(stateMeta);
      break;

    case "REROLL_INTO_RARE":
      // Reroll item into rare
      // TODO: Diffrent chance of amount of mods than alch orb?? Research and implement
      // TODO: An item with "prefixes cannot be changed" or "suffixes cannot be changed" will retain those mods
      removeAffixes(stateMeta);
      orbOfAlchemy(stateMeta);

      // Reroll sockets and links 1/36 chance of 6l
      break;

    case "NO_EFFECT":
      stateMeta.popUps.push({
        variant: PopUpVariant.INFO,
        message: `No effect (other than adding the corrupted property).`
      });
      break;
    default:
      stateMeta.popUps.push({
        variant: PopUpVariant.INFO,
        message: `No effect (other than adding the corrupted property). (default)`
      });
      break;
  }
  stateMeta.state.corrupted = true;
  return true;
};
