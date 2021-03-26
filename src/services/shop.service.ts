import { NextFunction, Request, Response } from "express";
import { Cart } from "../models/cart.model";
import { Product } from "../models/product.model";
import { Shop } from "../models/shop.model";
import { fetchAllShopData, fetchShopDataById, fetchProductById } from '../util/data.service';


/**
 * Fetch and render shops-overview page
 */
const getShops = async (req: Request, res: Response, next: NextFunction) => {

    // get shop data
    const shops: Shop[] = await fetchAllShopData().catch(error => next(error)) || [];

    // delete shopping cart items
    res.clearCookie('demoShopCart');

    // render page
    res.render('pages/shops', {
        pageTitle: "Shops Übersicht",
        shops: shops
    });
}


/**
 * Fetch and render a specific shop by id
 */
const getShopById = async (req: Request, res: Response, next: NextFunction) => {
    const clientId = req.params.clientId as string;
    const cart = req.cookies.demoShopCart as Cart || {};

    // get shop
    const shop = await fetchShopDataById(clientId).catch(error => next(error)) as Shop;

    // build navigation
    const navigation: any = {};
    if (shop) navigation.shop = { id: shop.id, name: shop.name };
    if (cart.products?.length) navigation.cartCount = cart.products.length;

    // render page
    res.render('pages/shop', {
        pageTitle: shop ? shop.name : 'Dummy Shop',
        shop: shop,
        navigation: { ...navigation },
    });
}


/**
 * Fetch and render a specific product of a shop by shopId and productId
 */
const getProductById = async (req: Request, res: Response, next: NextFunction) => {
    const clientId = req.params.clientId as string;
    const productId = req.params.productId as string;
    let variantId = req.params.variantId as string;

    // get shop
    const shop = await fetchShopDataById(clientId).catch(error => next(error)) as Shop;

    // get product
    const product = await fetchProductById(clientId, productId).catch((error: Error) => next(error)) as Product;

    // if no variant in url specified, take default (first) variant
    if(!variantId) variantId = product.variants[0].id;
    const variant = product.variants.find(el => el.id === variantId);
    
    // build navigation
    const navigation: any = {};
    const cart = req.cookies.demoShopCart as Cart || {};
    if (shop) navigation.shop = { id: shop.id, name: shop.name };
    if (cart.products?.length) navigation.cartCount = cart.products.length;

    // render page
    res.render('pages/product', {
        pageTitle: product ? product.name : 'Dummy Product',
        shop: shop,
        product: product,
        pageVariant: variant,
        stage: process.env.NODE_ENV,
        componentLoader: process.env.COMPONENT_LOADER,
        navigation: { ...navigation },
    });
}


export default {
    getShops: getShops,
    getShopById: getShopById,
    getProductById: getProductById
}