import { Action } from "@ngrx/store";

import { Pokemon } from "../../models";

export enum ActionsTypes {
  LOAD_POKEMONS = "[Pokemon List Screen] Load Pokemons",
  LOAD_POKEMONS_SUCCESS = "[Pokemon API] Load Pokemons Success",
  LOAD_POKEMONS_FAIL = "[Pokemon API] Load Pokemons Fail"
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

export type Actions = LoadPokemons | LoadPokemonsSuccess | LoadPokemonsFail;
