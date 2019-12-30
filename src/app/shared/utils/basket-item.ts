import { BasketItem, ProductsType } from 'src/app/core/model/products.model';

export function buildItem<T extends HasName>(item: T, productType: ProductsType, quantity = 0): BasketItem {
    return {
        itemName: item.name,
        productType,
        quantity
    }
}

export interface HasName {
    name: string;
}