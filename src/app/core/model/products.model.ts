export enum ProductsType {
  POKEMON = "POKEMON"
}

export interface BasketItem {
  itemName: string;
  productType: ProductsType;
  itemPrice: number;
  quantity?: number;
}
