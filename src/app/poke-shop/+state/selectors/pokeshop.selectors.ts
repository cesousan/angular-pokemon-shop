import { createSelector } from "@ngrx/store";
import * as fromReducers from "../reducers";

export const selectPokeShopIsLoading = createSelector(
  fromReducers.selectPokeShopState,
  fromReducers.getIsLoading
);

export const selectPokeShopError = createSelector(
  fromReducers.selectPokeShopState,
  fromReducers.getError
);

export const selectPokeShopPokemonEntities = createSelector(
  fromReducers.selectPokeShopState,
  fromReducers.getPokemonEntities
);

export const selectPokeShopPokemons = createSelector(
  fromReducers.selectPokeShopState,
  fromReducers.getPokemons
);
