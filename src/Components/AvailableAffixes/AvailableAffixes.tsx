import { cloneDeep } from "lodash";
import React, { useEffect, useState } from "react";
import {
  generate_spawnable_mod_list,
  MODLIST,
} from "../../Common/Crafting/CraftingUtil";
import {
  EntityStateMeta,
  Mod,
  ItemTypes,
} from "../../Common/Crafting/interfaces";
import { getModDescription } from "../../Common/Crafting/Translation";
import {
  generateGroupedModList,
  GroupedMods,
  ModTypes,
} from "../../reducers/itemReducer/helperFunctions/generateGroupedModList";
import { getAffixGroups } from "../../reducers/itemReducer/helperFunctions/getAffixGroups";
import { getRequiredLevel } from "../../reducers/itemReducer/helperFunctions/getRequiredLevel";
import { getInfluenceTag } from "../../reducers/itemReducer/helperFunctions/updateTagList";
import AffixList from "./AffixList";
import "./AvailableAffixes.css";
import SearchBar from "./searchBar";
import { notImplementedString } from "../../Common/Utilities";
import debounceRender from "react-debounce-render";

interface Props {
  entityStateMeta: EntityStateMeta;
}

const AvailableAffixes1: React.FunctionComponent<Props> = ({
  entityStateMeta,
}) => {
  const [affixes, setAffixes] = useState<Mod[]>([]);
  const [groupedAffixes, setGroupedAffixes] = useState<GroupedMods>({});
  const [filteredAffixes, setFilteredAffixes] = useState<GroupedMods>({});
  const [searchString, setSearchString] = useState<string>("");
  const [filters, setFilters] = useState<Filters>({
    Unavailable: false,
    Prefixes: true,
    Suffixes: true,
    BaseItem: true,
    Shaper: true,
    Elder: true,
    Crusader: true,
    Adjudicator: true,
    Basilisk: true,
    Eyrie: true,
    Delve: false,
    Essence: false,
    Master: false,
  });

  useEffect(() => {
    // Generate affix list
    let baseItemTags: string[] = [];
    if (entityStateMeta.state.baseItem) {
      baseItemTags = cloneDeep(entityStateMeta.state.baseItem.tags);
      const elderTag = getInfluenceTag(
        entityStateMeta.state.baseItem.item_class,
        ItemTypes.Elder
      );
      const shaperTag = getInfluenceTag(
        entityStateMeta.state.baseItem.item_class,
        ItemTypes.Shaper
      );
      const crusaderTag = getInfluenceTag(
        entityStateMeta.state.baseItem.item_class,
        ItemTypes.Crusader
      );
      const hunterTag = getInfluenceTag(
        entityStateMeta.state.baseItem.item_class,
        ItemTypes.Hunter
      );
      const warlordTag = getInfluenceTag(
        entityStateMeta.state.baseItem.item_class,
        ItemTypes.Warlord
      );
      const redeemerTag = getInfluenceTag(
        entityStateMeta.state.baseItem.item_class,
        ItemTypes.Redeemer
      );
      // add all include tags to be able to show unavailable affixes
      if (elderTag) {
        baseItemTags.unshift(elderTag);
      }
      if (shaperTag) {
        baseItemTags.unshift(shaperTag);
      }
      if (crusaderTag) {
        baseItemTags.unshift(crusaderTag);
      }
      if (hunterTag) {
        baseItemTags.unshift(hunterTag);
      }
      if (warlordTag) {
        baseItemTags.unshift(warlordTag);
      }
      if (redeemerTag) {
        baseItemTags.unshift(redeemerTag);
      }
    }

    const affixList = generate_spawnable_mod_list(
      MODLIST,
      "item",
      ["suffix", "prefix"],
      100,
      baseItemTags,
      getAffixGroups(entityStateMeta)
    );

    setAffixes(affixList);
    // TODO: figure out how to optimize
  }, [entityStateMeta]);

  useEffect(() => {
    // filter and group affixes
    const generationTypes: string[] =
      filters.Prefixes && filters.Suffixes
        ? ["suffix", "prefix"]
        : filters.Prefixes
        ? ["prefix"]
        : filters.Suffixes
        ? ["suffix"]
        : [];

    const tags = entityStateMeta.state.tags;
    const modTypesToInclude: ModTypes[] = [];
    if (filters.BaseItem) {
      modTypesToInclude.push(ModTypes.BASE_ITEM);
    }
    if (filters.Elder) {
      modTypesToInclude.push(ModTypes.Elder);
    }
    if (filters.Shaper) {
      modTypesToInclude.push(ModTypes.Shaper);
    }
    if (filters.Crusader) {
      modTypesToInclude.push(ModTypes.Crusader);
    }
    if (filters.Adjudicator) {
      modTypesToInclude.push(ModTypes.Adjudicator);
    }
    if (filters.Basilisk) {
      modTypesToInclude.push(ModTypes.Basilisk);
    }
    if (filters.Eyrie) {
      modTypesToInclude.push(ModTypes.Eyrie);
    }
    const groupedAffixes: GroupedMods = generateGroupedModList(
      entityStateMeta,
      {
        mod_list: affixes,
        generation_type: generationTypes,
        level: getRequiredLevel(entityStateMeta),
        tags,
        includeModTypes: modTypesToInclude,
        includeUnavailableGroups: filters.Unavailable,
      }
    );

    setGroupedAffixes(groupedAffixes);
    // -Note: the affix list is only generated when the item changes, filtering and grouping is done whenever theres a change in filter
    // eslint-disable-next-line
  }, [affixes, filters]);

  useEffect(() => {
    // filter based on search string
    if (!searchString) {
      setFilteredAffixes(groupedAffixes);
      return;
    }

    const searchFilteredGroups: GroupedMods = {};
    for (const groupName in groupedAffixes) {
      const group = groupedAffixes[groupName];

      const modGroupDescription = getModDescription(group.mods[0].mod)
        .filter((e) => !!e)
        .join(" / ");

      // filter based on search string
      if (!!searchString.trim()) {
        const filter = searchString.toLowerCase();
        if (modGroupDescription.toLowerCase().indexOf(filter) !== -1) {
          searchFilteredGroups[groupName] = group;
        }
      }
    }

    setFilteredAffixes(searchFilteredGroups);
  }, [groupedAffixes, searchString]);
  const onFilterChange = (filter: string) => {
    setFilters({ ...filters, [filter]: !filters[filter] });
  };
  return (
    <div className="craftingArea AvailableAffixes">
      <div className="topBar">
        <div className="dropdown">
          <button className="dropDownButton">Filters </button>
          <div className="dropdownContent">
            <label>
              Unavailable{" "}
              <input
                type="checkbox"
                onChange={() => onFilterChange("Unavailable")}
                defaultChecked={filters.Unavailable}
              />
            </label>
            <div className={`separator`} />
            <label>
              Prefixes{" "}
              <input
                type="checkbox"
                onChange={() => onFilterChange("Prefixes")}
                defaultChecked={filters.Prefixes}
              />
            </label>
            <label>
              Suffixes{" "}
              <input
                type="checkbox"
                onChange={() => onFilterChange("Suffixes")}
                defaultChecked={filters.Suffixes}
              />
            </label>
            <div className={`separator`} />
            <label>
              Base Item{" "}
              <input
                type="checkbox"
                onChange={() => onFilterChange("BaseItem")}
                defaultChecked={filters.BaseItem}
              />
            </label>
            <label>
              Shaper{" "}
              <input
                type="checkbox"
                onChange={() => onFilterChange("Shaper")}
                defaultChecked={filters.Shaper}
              />
            </label>
            <label>
              Elder{" "}
              <input
                type="checkbox"
                onChange={() => onFilterChange("Elder")}
                defaultChecked={filters.Elder}
              />
            </label>
            <label>
              Crusader{" "}
              <input
                type="checkbox"
                onChange={() => onFilterChange("Crusader")}
                defaultChecked={filters.Shaper}
              />
            </label>
            <label>
              Warlord{" "}
              <input
                type="checkbox"
                onChange={() => onFilterChange("Adjudicator")}
                defaultChecked={filters.Elder}
              />
            </label>
            <label>
              Hunter{" "}
              <input
                type="checkbox"
                onChange={() => onFilterChange("Basilisk")}
                defaultChecked={filters.Shaper}
              />
            </label>
            <label>
              Redeemer{" "}
              <input
                type="checkbox"
                onChange={() => onFilterChange("Eyrie")}
                defaultChecked={filters.Elder}
              />
              <div className={`separator`} />
            </label>
            <label className="disabled" title={notImplementedString}>
              Delve{" "}
              <input
                disabled={true}
                type="checkbox"
                onChange={() => onFilterChange("Delve")}
                defaultChecked={filters.Delve}
              />
            </label>
            <label className="disabled" title={notImplementedString}>
              Essence{" "}
              <input
                disabled={true}
                type="checkbox"
                onChange={() => onFilterChange("Essence")}
                defaultChecked={filters.Essence}
              />
            </label>
            <label className="disabled" title={notImplementedString}>
              Master{" "}
              <input
                disabled={true}
                type="checkbox"
                onChange={() => onFilterChange("Master")}
                defaultChecked={filters.Master}
              />
            </label>
          </div>
        </div>
        <SearchBar setSearchString={setSearchString} />
      </div>
      <AffixList groupedAffixes={filteredAffixes} />
    </div>
  );
};

interface Filters {
  Unavailable: boolean;
  Prefixes: boolean;
  Suffixes: boolean;
  BaseItem: boolean;
  Shaper: boolean;
  Elder: boolean;
  Crusader: boolean;
  Adjudicator: boolean;
  Basilisk: boolean;
  Eyrie: boolean;
  Delve: boolean;
  Essence: boolean;
  Master: boolean;
}
const AvailableAffixes = debounceRender(AvailableAffixes1, 300, {
  leading: true,
});
export default AvailableAffixes;
