import * as fromPokeShop from "./pokeshop.reducer";
import {
  MemoizedSelector,
  createFeatureSelector,
  ActionReducerMap
} from "@ngrx/store";

export const POKESHOP_FEATURE_KEY: string = "pokeshop";

export interface State {
  shop: fromPokeShop.State;
}

export const reducers: ActionReducerMap<State> = {
  shop: fromPokeShop.pokeShopReducer
};

export const selectPokeShopFeatureState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>(POKESHOP_FEATURE_KEY);

export * from "./pokeshop.reducer";
