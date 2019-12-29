import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from "@ngrx/store";

import { environment } from "src/environments/environment";

import * as fromBasket from "./basket.reducer";

export interface State {
  basket: fromBasket.State;
}

export const reducers: ActionReducerMap<State> = {
  basket: fromBasket.basketReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
