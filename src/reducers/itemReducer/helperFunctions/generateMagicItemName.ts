import { EntityStateMeta } from "../../../Common/Crafting/interfaces";

export const generateMagicItemName = (stateMeta: EntityStateMeta) => {
  const prefix = stateMeta.affixesWithValues.find(
    mod => mod.mod.generation_type === "prefix"
  );
  const prefixName = prefix ? prefix.mod.name : "";
  const suffix = stateMeta.affixesWithValues.find(
    mod => mod.mod.generation_type === "suffix"
  );
  const suffixName = suffix ? suffix.mod.name : "";
  const name = `${prefixName} ${stateMeta.state.baseItem.name} ${suffixName}`;

  return name;
};
