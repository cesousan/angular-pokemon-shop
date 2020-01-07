import { createSelector } from "@ngrx/store";

import { entitiesToArray } from "src/app/shared/utils";
import * as fromReducers from "../reducers";

export const selectBasketState = (state: fromReducers.State) => state.basket;

export const selectBasketEntities = createSelector(
  selectBasketState,
  state => state.basketEntities
);

export const selectBasketItems = createSelector(
  selectBasketEntities,
  entities =>
    !!entities &&
    entitiesToArray(entities)
)

export const selectBasketCount = createSelector(
  selectBasketEntities,
  entities =>
    Object.keys(entities)
      .map(name => entities[name].quantity)
      .filter(count => !!count)
      .reduce((acc, curr) => acc + curr, 0)
);

export const selectBasketTotalPrice = createSelector(
  selectBasketItems,
  items => items
      .filter(item => !!item && !!item.itemPrice && !!item.quantity)
      .reduce((acc, curr) => acc + curr.itemPrice * curr.quantity, 0)
);

export const selectBasketEntity = (name: string) =>
  createSelector(
    selectBasketEntities,
    entities => (!!entities && entities[name]) || null
  );
