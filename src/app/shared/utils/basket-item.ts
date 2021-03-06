import { BasketItem, ProductsType } from 'src/app/core/model/products.model';

export function buildItem<T extends HasName & HasPrice>(item: T, productType: ProductsType, quantity = 0): BasketItem {
    const {
        name: itemName = null,
        price: itemPrice = 0
    } = item;

    return {
        itemName,
        productType,
        quantity,
        itemPrice
    }
}

export interface HasName {
    name: string;
}
export interface HasPrice {
    price: number;
}