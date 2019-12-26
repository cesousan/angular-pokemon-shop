export interface PokemonAPI {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: PokeAPIAbility[];
  forms: PokeAPIForm[];
  game_indices: PokeAPIGameIndice[];
  held_items: PokeAPIHeldItem[];
  location_area_encounters: any[];
  moves: any[];
  species: NameUrlIdentifier;
  sprites: { [k: string]: string };
  stats: PokeAPIStat[];
  types: PokeAPIType[];
}

export interface PokeAPIAbility {
  is_hidden: boolean;
  slot: number;
  ability: {
    name: string;
    url: string;
  };
}

export interface PokeAPIForm {
  name: string;
  url: string;
}

export interface PokeAPIGameIndice {
  game_index: number;
  version: NameUrlIdentifier;
}

export interface NameUrlIdentifier {
  name: string;
  url: string;
}

export interface PokeAPIHeldItem {
  item: NameUrlIdentifier;
  version_details: {
    rarity: number;
    version: NameUrlIdentifier;
  }[];
}

export interface PokeAPIStat {
  base_stat: number;
  effort: number;
  stat: NameUrlIdentifier;
}

export interface PokeAPIType {
  slot: number;
  type: NameUrlIdentifier;
}
