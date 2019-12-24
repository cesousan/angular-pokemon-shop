import { arrayToEntities, entitiesToArray } from "src/app/utils";
import { Pokemon } from "src/app/poke-shop/models";
import { Actions, ActionsTypes } from "src/app/poke-shop/+state/actions";

export interface State {
  pokemonEntities: { [id: string]: Pokemon };
  isLoading: boolean;
  error: any; // TODO : type the errors;
}

export const initialState: State = {
  pokemonEntities: {},
  isLoading: false,
  error: null
};

export function pokeShopReducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionsTypes.LOAD_POKEMONS: {
      return {
        ...state,
        error: null,
        isLoading: true
      };
    }
    case ActionsTypes.LOAD_POKEMONS_SUCCESS: {
      const { pokemons = [] } = action.payload;
      return {
        ...state,
        pokemonEntities: arrayToEntities(pokemons),
        error: null,
        isLoading: false
      };
    }
    case ActionsTypes.LOAD_POKEMONS_FAIL: {
      return {
        ...state,
        error: action.payload.error,
        isLoading: false
      };
    }
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
