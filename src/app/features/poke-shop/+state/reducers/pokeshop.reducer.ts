import { arrayToEntities, entitiesToArray } from "src/app/shared/utils";
import { Pokemon } from "../../models";
import { Actions, ActionsTypes } from "../actions";

export interface State {
  pokemonEntities: { [name: string]: Pokemon };
  pagination: { previous: string; next: string };
  isLoading: boolean;
  error: any; // TODO : type the errors;
}

export const initialState: State = {
  pokemonEntities: {},
  pagination: { previous: null, next: null },
  isLoading: false,
  error: null
};

export function pokeShopReducer(state = initialState, action: Actions): State {
  switch (action.type) {
    //Sync cases
    case ActionsTypes.SET_PAGINATION_INFO: {
      const { pagination } = action.payload;
      return {
        ...state,
        pagination
      };
    }
    // Request cases
    case ActionsTypes.LOAD_POKEMONS:
    case ActionsTypes.LOAD_ONE_POKEMON: {
      return {
        ...state,
        error: null,
        isLoading: true
      };
    }

    // Error cases
    case ActionsTypes.LOAD_POKEMONS_FAIL:
    case ActionsTypes.LOAD_ONE_POKEMON_FAIL: {
      return {
        ...state,
        error: action.payload.error,
        isLoading: false
      };
    }

    // Success cases
    case ActionsTypes.LOAD_POKEMONS_SUCCESS: {
      const { pokemons = [] } = action.payload;
      return {
        ...state,
        // store pokemons by name because no id initially provided on load all.
        pokemonEntities: {
          ...state.pokemonEntities,
          ...arrayToEntities(pokemons, "name")
        },
        error: null,
        isLoading: false
      };
    }
    case ActionsTypes.LOAD_ONE_POKEMON_SUCCESS: {
      const { pokemon } = action.payload;
      const pokemonEntities = {
        ...state.pokemonEntities,
        [pokemon.name]: pokemon
      };
      return {
        ...state,
        pokemonEntities,
        error: null,
        isLoading: false
      };
    }

    // default case
    default: {
      return state;
    }
  }
}

// getters

export const getError = (state: State) => state.error;
export const getIsLoading = (state: State) => state.isLoading;
export const getPokemonEntities = (state: State) => state.pokemonEntities;
export const getPokemons = (state: State) =>
  entitiesToArray(getPokemonEntities(state)); // TODO : keep order received by adding an ids collection to state;
export const getPaginationInfo = (state: State) => state.pagination;
