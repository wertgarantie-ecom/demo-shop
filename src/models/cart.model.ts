import { Product, Variant } from "./product.model";

export interface CartItem {
    orderItemId: string,
    product: Product,
    selectedVariant: Variant
}

export interface Cart {
    products: CartItem[],
    sum?: number,
    clientId?: string
}
