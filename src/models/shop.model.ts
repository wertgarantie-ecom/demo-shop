import { Product } from "./product.model";

export interface Shop {
    name: string,
    id: string,
    secret: string,
    image?: string,
    products: Product[]
}