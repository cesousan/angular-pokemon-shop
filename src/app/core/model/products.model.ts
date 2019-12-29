export enum ProductsType {
  POKEMON = "POKEMON"
}

export interface BasketItem {
  itemName: string;
  productType: ProductsType;
  quantity?: number;
}
