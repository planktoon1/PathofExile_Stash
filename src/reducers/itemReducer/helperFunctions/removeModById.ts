import { EntityStateMeta } from "../../../Common/Crafting/interfaces";
import { updateTagList } from "./updateTagList";

export const removeModById = (stateMeta: EntityStateMeta, modId: string) => {
  // remove mod from affixesWithValues
  stateMeta.affixesWithValues = stateMeta.affixesWithValues.filter(
    (val, i, arr) => val.mod.key !== modId
  );

  // remove mod from modTranslations
  stateMeta.state.modTranslations = stateMeta.state.modTranslations.filter(
    (val, i, arr) => val.modId !== modId
  );
  updateTagList(stateMeta);
};
