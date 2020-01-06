import { BasketItem } from "src/app/core/model/products.model";

export interface PaginatedPokemonsResponse {
  count: number;
  previous: string;
  next: string;
  pokemons: Pokemon[];
}

export interface PokemonItem extends Pokemon, Partial<BasketItem> {}

export interface Pokemon extends PokemonBase, Partial<PokemonDetail> {}

export interface PokemonBase {
  id: number;
  name: string;
  lastViewedAt: Date;
  price: number;
}

export interface PokemonDetail {
  imgURL: string;
  speciesName: string;
  formsNames: string[];
  baseXP: number;
  height: number;
  weight: number;
  stats: PokemonStat[];
  types: string[];
}

export interface PokemonStat {
  name: string;
  base: number;
  effort: number;
}
