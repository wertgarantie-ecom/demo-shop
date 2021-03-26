import { Product } from "../models/product.model";
import { Shop } from "../models/shop.model";

/**
 * Loads and returns dummy shopdata
 */
export const fetchAllShopData = async (): Promise<Shop[]> => {
    const NODE_ENV = process.env.NODE_ENV;

    switch (NODE_ENV) {
        case 'staging':
            return (await import("../config/clientConfigStaging")).default
        case 'production':
            return (await import("../config/clientConfigProduction")).default
        default:
            return (await import("../config/clientConfigLocalDev")).default
    }
}

/**
 * Fetch data of a specific shop
 * @param {string} shopId 
 */
export const fetchShopDataById = async (shopId: string): Promise<Shop> => {

    // get shop data
    const shops: Shop[] = await fetchAllShopData()
        .catch((error: Error) => { throw error });

    if (!shops.length) throw new Error('No shops found');

    // get shop by id
    const shop: Shop = shops.filter(shop => shop.id === shopId)[0];

    if (!shop) throw new Error(`Could not load shop with id: ${shopId}`);

    return shop;
}

/**
 * Fetch a product of a specific shop
 * @param {string} shopId 
 * @param {string} productId 
 */
export const fetchProductById = async (shopId: string, productId: string): Promise<Product> => {

    // fetch shop
    const shop: Shop = await fetchShopDataById(shopId).catch((error: Error) => { throw error });

    // get product
    const product: Product = shop.products.filter(product => product.id === productId)[0];

    if (!product) throw new Error(`Product not found`);

    return product;
}