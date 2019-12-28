import { Action } from "@ngrx/store";

import { Pokemon } from "../../models";

export enum ActionsTypes {
  LOAD_POKEMONS = "[Pokemon List Screen] Load Pokemons",
  LOAD_POKEMONS_SUCCESS = "[Pokemon API] Load Pokemons Success",
  LOAD_POKEMONS_FAIL = "[Pokemon API] Load Pokemons Fail",
  LOAD_ONE_POKEMON = "[Pokemon Feature] Load Pokemon by name or id",
  LOAD_ONE_POKEMON_SUCCESS = "[Pokemon API] Load Pokemon by name or id Success",
  LOAD_ONE_POKEMON_FAIL = "[Pokemon API] Load Pokemon by name or id Fail"
}

export class LoadPokemons implements Action {
  public readonly type = ActionsTypes.LOAD_POKEMONS;
  constructor(public payload?: { page: number }) {}
}

export class LoadPokemonsSuccess implements Action {
  public readonly type = ActionsTypes.LOAD_POKEMONS_SUCCESS;
  constructor(public payload: { pokemons: Pokemon[] }) {}
}

export class LoadPokemonsFail implements Action {
  public readonly type = ActionsTypes.LOAD_POKEMONS_FAIL;
  constructor(public payload: { error: any }) {}
}

export class LoadOnePokemon implements Action {
  public readonly type = ActionsTypes.LOAD_ONE_POKEMON;
  constructor(public payload: { name?: string; id?: number }) {}
}
export class LoadOnePokemonSuccess implements Action {
  public readonly type = ActionsTypes.LOAD_ONE_POKEMON_SUCCESS;
  constructor(public payload: { pokemon: Pokemon }) {}
}

export class LoadOnePokemonFail implements Action {
  public readonly type = ActionsTypes.LOAD_ONE_POKEMON_FAIL;
  constructor(public payload: { error: any }) {}
}

export type Actions =
  | LoadPokemons
  | LoadPokemonsSuccess
  | LoadPokemonsFail
  | LoadOnePokemon
  | LoadOnePokemonSuccess
  | LoadOnePokemonFail;
