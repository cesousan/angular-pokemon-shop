import { Action } from "@ngrx/store";

import { BasketItem } from "src/app/core/model/products.model";

export enum ActionTypes {
  ADD_ITEM = "[Basket] Add Item to basket",
  REMOVE_ITEM = "[Basket] Remove Item from basket"
}

export class AddItem implements Action {
  public readonly type = ActionTypes.ADD_ITEM;
  constructor(public payload: { item: BasketItem }) {}
}

export class RemoveItem implements Action {
  public readonly type = ActionTypes.REMOVE_ITEM;
  constructor(public payload: { item: BasketItem }) {}
}

export type Actions = AddItem | RemoveItem;
