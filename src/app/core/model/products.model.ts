export enum ProductsType {
  POKEMON = "POKEMON"
}

export interface BasketItem {
  itemName: string;
  productType: ProductsType;
  price: number;
  quantity?: number;
}
