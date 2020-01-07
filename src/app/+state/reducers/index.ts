import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import * as fromRouter from "@ngrx/router-store";

import {
  Params,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from "@angular/router";

import { environment } from "src/environments/environment";

import * as fromBasket from "./basket.reducer";

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
  data?: any;
}

export interface State {
  router: fromRouter.RouterReducerState<RouterStateUrl>;
  basket: fromBasket.State;
}

export const reducers: ActionReducerMap<State> = {
  router: fromRouter.routerReducer,
  basket: fromBasket.basketReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];

export class CustomSerializer
  implements fromRouter.RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let { url } = routerState;
    url = !!url ? url : "/"; // Default value added to fix ngrx bug. TODO: remove

    const { queryParams } = routerState.root;
    let state: ActivatedRouteSnapshot = routerState.root;
    while (state.firstChild) {
      state = state.firstChild;
    }
    const { params, data } = state;
    return { url, queryParams, params, data };
  }
}

export * from './basket.reducer';  