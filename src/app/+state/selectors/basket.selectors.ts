import { createSelector } from "@ngrx/store";
import * as fromReducers from "../reducers";

export const selectBasketState = createSelector(
  fromReducers.reducers.basket,
  state => state
);

export const selectBasketEntities = createSelector(
  selectBasketState,
  state => state.basketEntities
);

export const selectBasketCount = createSelector(
  selectBasketEntities,
  entities =>
    Object.keys(entities)
      .map(name => entities[name].quantity)
      .filter(count => !!count)
      .reduce((acc, curr) => acc + curr, 0)
);

export const selectBasketEntity = (name: string) =>
  createSelector(
    selectBasketEntities,
    entities => (!!entities && entities[name]) || null
  );
