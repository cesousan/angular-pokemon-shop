import { BasketItem } from "src/app/core/model/products.model";
import { Actions, ActionTypes } from "../actions/basket.actions";
import { entitiesToArray } from "src/app/shared/utils";

export interface State {
  basketEntities: { [name: string]: BasketItem };
}
export const initialState: State = {
  basketEntities: {}
};

export function basketReducer(state = initialState, action: Actions) {
  switch (action.type) {
    case ActionTypes.ADD_ITEM: {
      const { item } = action.payload;
      const originalEntity = state.basketEntities[item.itemName];
      const entity = !!originalEntity
        ? originalEntity
        : { itemName: item.itemName, quantity: 0 };
      const quantity = !!entity.quantity ? entity.quantity + 1 : 1;
      return {
        ...state,
        basketEntities: {
          ...state.basketEntities,
          [item.itemName]: {
            ...entity,
            quantity
          } as BasketItem
        }
      };
    }
    case ActionTypes.REMOVE_ITEM: {
      const { item } = action.payload;
      const originalEntity = state.basketEntities[item.itemName];
      const entity = !!originalEntity
        ? originalEntity
        : { itemName: item.itemName, quantity: 0 };
      const quantity = !!entity.quantity ? entity.quantity - 1 : 0;
      return {
        ...state,
        basketEntities: {
          ...state.basketEntities,
          [item.itemName]: {
            ...entity,
            quantity
          } as BasketItem
        }
      };
    }
    default: {
      return state;
    }
  }
}

// default getter
export const getBasketEntities = (state: State) => state.basketEntities;
export const getBasketArray = (state: State) =>
  entitiesToArray(state.basketEntities);
export const getItemsInBasket = (state: State) =>
  getBasketArray(state).length || 0;
