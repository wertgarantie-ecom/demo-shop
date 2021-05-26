export interface Product {
    id: string,
    name: string,
    image: string,
    manufacturer: string,
    attributes: string[],
    deviceClasses: string,
    variants: Variant[],
    condition?: string
}

export interface Variant {
    id: string;
    name: string;
    price: number;
}