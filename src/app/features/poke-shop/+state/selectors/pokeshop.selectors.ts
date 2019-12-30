import { createSelector } from "@ngrx/store";

import { PokemonItem } from '../../models';
import { BasketItem } from "src/app/core/model/products.model";

import * as fromRootSelectors from "src/app/+state/selectors";
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

export const selectPokemonsWithQuantities = createSelector(
  selectPokemons,
  fromRootSelectors.selectBasketEntities,
  (pokemons, basketEntities) =>
    pokemons.map(pokemon => {
      const pokemonInBasket =
        !!basketEntities && basketEntities[pokemon.name] || ({} as BasketItem);
      const { quantity = 0 } = pokemonInBasket;
      return { ...pokemon, quantity } as PokemonItem;
    })
);

export const selectPokemonById = (id: string) =>
  createSelector(
    selectPokemonEntities,
    entities => (!!id && !!entities && entities[id]) || null
  ); // TODO : select by Router State
