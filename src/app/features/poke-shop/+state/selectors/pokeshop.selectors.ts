import { createSelector } from "@ngrx/store";
import * as fromReducers from "../reducers";

export const selectPokeShopState = createSelector(
  fromReducers.selectPokeShopFeatureState,
  state => state.shop
);

export const selectPokeShopIsLoading = createSelector(
  selectPokeShopState,
  fromReducers.getIsLoading
);

export const selectPokeShopError = createSelector(
  selectPokeShopState,
  fromReducers.getError
);

export const selectPokemonEntities = createSelector(
  selectPokeShopState,
  fromReducers.getPokemonEntities
);

export const selectPokemons = createSelector(
  selectPokeShopState,
  fromReducers.getPokemons
);

export const selectPokemonById = (id: string) =>
  createSelector(
    selectPokemonEntities,
    entities => (!!id && !!entities && entities[id]) || null
  ); // TODO : select by Router State
