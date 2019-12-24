import { State } from "./pokeshop.reducer";
import { MemoizedSelector, createFeatureSelector } from "@ngrx/store";

export const POKESHOP_FEATURE_KEY: string = "pokeshop";

export const selectPokeShopState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>(POKESHOP_FEATURE_KEY);

export * from "./pokeshop.reducer";
