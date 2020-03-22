export interface ModDetails {
  reqLevel: number;
  modId: string;
  generationType: string;
}

export interface TierListLookUp {
  [tierGroup: string]: {
    /**modId: mod tier */
    [modId: string]: number;
  };
}
export interface ModDetailsDict {
  [tierType: string]: ModDetails[];
}

export interface TierGroup {
  /** What determines what tier group a specific base item belongs to is the tags on that item,
   * because the tags are ultimately what determines what mods are available to roll */
  tags: string[];
  /** How many base items belong to this tier group  */
  itemCount: number;
  itemClass: string;
  naturalTypes: ModDetailsDict;
  _elder: ModDetailsDict;
  _shaper: ModDetailsDict;
  _crusader: ModDetailsDict;
  _adjudicator: ModDetailsDict;
  _basilisk: ModDetailsDict;
  _eyrie: ModDetailsDict;
}
/** The actual tier lists are stored here under tier groups */
export interface TierList {
  /** A tier group is a tier list that applies to a specific set of base items */
  [tierGroup: string]: TierGroup;
}
