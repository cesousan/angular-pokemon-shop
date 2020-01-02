import { Action } from "@ngrx/store";

import { Pokemon } from "../../models";

export enum ActionsTypes {
  LOAD_POKEMONS = "[Pokemon List Screen] Load Pokemons",
  LOAD_POKEMONS_SUCCESS = "[Pokemon API] Load Pokemons Success",
  LOAD_POKEMONS_FAIL = "[Pokemon API] Load Pokemons Fail",
  LOAD_ONE_POKEMON = "[Pokemon Feature] Load Pokemon by name",
  LOAD_ONE_POKEMON_SUCCESS = "[Pokemon API] Load Pokemon by name Success",
  LOAD_ONE_POKEMON_FAIL = "[Pokemon API] Load Pokemon by name Fail",
  ADD_POKEMON_TO_BASKET = "[Pokemon Feature] Add Pokemon to basket",
  REMOVE_POKEMON_FROM_BASKET = "[Pokemon Feature] Remove Pokemon from basket",
  SET_PAGINATION_INFO = "[Pokemon List] Set Pagination Info"
}

export class LoadPokemons implements Action {
  public readonly type = ActionsTypes.LOAD_POKEMONS;
  constructor(public payload?: { directUrl: string }) {}
}

export class LoadPokemonsSuccess implements Action {
  public readonly type = ActionsTypes.LOAD_POKEMONS_SUCCESS;
  constructor(
    public payload: {
      pokemons: Pokemon[];
      previous?: string;
      next?: string;
      count?: number;
    }
  ) {}
}

export class LoadPokemonsFail implements Action {
  public readonly type = ActionsTypes.LOAD_POKEMONS_FAIL;
  constructor(public payload: { error: any }) {}
}

export class LoadOnePokemon implements Action {
  public readonly type = ActionsTypes.LOAD_ONE_POKEMON;
  constructor(public payload: { name: string; bypassCache?: boolean }) {}
}
export class LoadOnePokemonSuccess implements Action {
  public readonly type = ActionsTypes.LOAD_ONE_POKEMON_SUCCESS;
  constructor(public payload: { pokemon: Pokemon }) {}
}

export class LoadOnePokemonFail implements Action {
  public readonly type = ActionsTypes.LOAD_ONE_POKEMON_FAIL;
  constructor(public payload: { error: any }) {}
}

export class AddPokemonToBasket implements Action {
  public readonly type = ActionsTypes.ADD_POKEMON_TO_BASKET;
  constructor(public payload: { pokemon: Pokemon }) {}
}

export class RemovePokemonFromBasket implements Action {
  public readonly type = ActionsTypes.REMOVE_POKEMON_FROM_BASKET;
  constructor(public payload: { pokemon: Pokemon }) {}
}

export class SetPaginationInfo implements Action {
  public readonly type = ActionsTypes.SET_PAGINATION_INFO;
  constructor(
    public payload: { pagination: { previous: string; next: string } }
  ) {}
}

export type Actions =
  | LoadPokemons
  | LoadPokemonsSuccess
  | LoadPokemonsFail
  | LoadOnePokemon
  | LoadOnePokemonSuccess
  | LoadOnePokemonFail
  | AddPokemonToBasket
  | RemovePokemonFromBasket
  | SetPaginationInfo;
