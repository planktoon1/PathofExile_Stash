export interface TranslationEntry {
  condition: {
    min?: number;
    max?: number;
  }[];
  format: string[];
  index_handlers: string[][];
  string: string;
}

export interface EntityStateCalculatedProperties {
  // Weapon properties
  attack_time: number;
  critical_strike_chance: number;
  physical_damage_max: number;
  physical_damage_min: number;
  range: number;
  cold_damage_max: number;
  cold_damage_min: number;
  fire_damage_max: number;
  fire_damage_min: number;
  lightning_damage_max: number;
  lightning_damage_min: number;
  chaos_damage_min: number;
  chaos_damage_max: number;
  // Off hand properties
  block: number;
  // Armour properties
  armour: number;
  evasion: number;
  energy_shield: number;
  movement_speed: number;
  // Requirements
  dexterity: number;
  intelligence: number;
  level: number;
  strength: number;
}

export interface EntityState {
  baseItem: BaseItem;
  itemType: ItemTypes;
  itemLevel: number;
  corrupted: boolean;
  calculatedProperties: EntityStateCalculatedProperties;
  name: string;
  rarity: string;
  totalSpawnWeight: number;
  quality: number;
  tags: string[];
  implicitTranslations: ModTranslation[];
  modTranslations: ModTranslation[];
}

export enum ItemTypes {
  Normal = "Normal",
  Shaper = "Shaper",
  Elder = "Elder"
}

export interface Statistics {
  [currency: string]: { count: number };
}

export interface EntityStateMeta {
  affixesWithValues: ModWithStatValues[];
  implicitsWithValues: ModWithStatValues[];
  state: EntityState;
  popUps: PopUp[];
  statistics: Statistics;
}

export interface ModTranslation {
  modId: string;
  translation: string;
}

export interface Entity {
  affixesWithValues: ModWithStatValues[];
  implicitsWithValues: ModWithStatValues[];
  popUps: PopUp[];
  state: EntityState;
  [val: string]: any;
}

export interface PopUp {
  variant: PopUpVariant; // TODO: should be enum
  message: string;
}

export enum PopUpVariant {
  ERROR = "error",
  INFO = "info"
}

export interface ModWithStatValues {
  mod: Mod;
  statValues: IdValueDict;
}

export interface Translation {
  English: TranslationEntry[];
  ids: string[];
}

export interface ItemClasses {
  Armor: string[];
  "One Handed Weapon": string[];
  "Two Handed Weapon": string[];
  // Offhand: string[];
  Accessory: string[];
}

export interface BaseItem {
  key?: string;
  dps?: number;
  domain: string;
  drop_level: number;
  implicits: string[];
  inventory_height: number;
  inventory_width: number;
  item_class: string;
  name: string;
  properties: {
    // Weapon properties
    attack_time?: number;
    critical_strike_chance?: number;
    physical_damage_max?: number;
    physical_damage_min?: number;
    cold_damage_max?: number;
    cold_damage_min?: number;
    fire_damage_max?: number;
    fire_damage_min?: number;
    lightning_damage_max?: number;
    lightning_damage_min?: number;
    range?: number;
    // Off hand properties
    block?: number;
    // Armour properties
    armour?: number;
    evasion?: number;
    energy_shield?: number;
    movement_speed?: number;
  };
  release_state: string;
  requirements: {
    dexterity: number;
    intelligence: number;
    level: number;
    strength: number;
  };
  tags: string[];
  visual_identity: {
    dds_file: string;
    id: string;
  };
}

export interface Mod {
  key: string;
  description: string;
  description_only_values: string;
  adds_tags: string[];
  domain: string;
  generation_type: string;
  generation_weights: {
    tag: string;
    weight: number;
  }[];
  grants_buff: {
    id: string;
    range: number;
  };
  grants_effects: {
    granted_effect_id: string;
    level: number;
  }[];
  group: string;
  is_essence_only: false;
  name: string;
  required_level: number;
  spawn_weights: {
    tag: string;
    weight: number;
  }[];
  stats: {
    id: string;
    max: number;
    min: number;
  }[];
  type: string;
}

export interface ModOutput {
  adds_tags: string[];
  domain: string;
  generation_type: string;
  generation_weights: {
    tag: string;
    weight: number;
  }[];
  grants_buff: {
    id: string;
    range: number;
  };
  grants_effects: {
    granted_effect_id: string;
    level: number;
  }[];
  group: string;
  is_essence_only: false;
  name: string;
  required_level: number;
  spawn_weights: {
    tag: string;
    weight: number;
  }[];
  stats: {
    id: string;
    max: number;
    min: number;
  }[];
  type: string;
}

export interface TranslationDict {
  [id: string]: Translation[];
}

export interface ModDict {
  [id: string]: Mod;
}

export interface ModOutputDict {
  [id: string]: ModOutput;
}

export interface BaseItemDict {
  [id: string]: BaseItem;
}

export interface ItemClassDict {
  [id: string]: ItemClass;
}

export interface ItemClass {
  crusader_tag: null | string;
  elder_tag: null | string;
  hunter_tag: null | string;
  name: string;
  redeemer_tag: null | string;
  shaper_tag: null | string;
  warlord_tag: null | string;
}

export interface IdValueDict {
  [index: string]: number;
}

export interface IdAvrMinMaxDict {
  [index: string]: { avr: number; min: number; max: number };
}

export interface ItemClassDict {
  [id: string]: ItemClass;
}
export interface ItemClass {
  elder_tag: string | null;
  name: string;
  shaper_tag: string | null;
}
