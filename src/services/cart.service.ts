import { NextFunction, Request, Response } from "express";
import { Product } from "../models/product.model";
import { Shop } from "../models/shop.model";
import { Cart, CartItem } from "../models/cart.model";
import { v4 } from 'uuid';
import { fetchProductById, fetchShopDataById } from "./data.service";
import CryptoJS from "crypto-js";

// customer dummy data
const customer = {
    company: 'INNOQ',
    salutation: 'Herr',
    firstname: process.env.CUSTOMER_FIRST_NAME || 'Max',
    lastname: process.env.CUSTOMER_LAST_NAME || 'Mustermann',
    street: 'Unter den Linden 9',
    zip: '52345',
    city: 'Köln',
    country: 'Deutschland',
    email: process.env.CUSTOMER_EMAIL || 'max.mustermann1234@test.com'
};


/**
 * Add to shopping cart
 */
const addItemToShoppingCart = async (req: Request, res: Response, next: NextFunction): Promise<any> => {

    const clientId = req.body.clientId as string;
    const productId = req.body.productId as string;
    const variant = req.body.variant as string;

    // get product
    const product = await fetchProductById(clientId, productId).catch((error: Error) => next(error)) as Product;

    // get variant
    const selectedVariant = product.variants.filter(v => v.id === variant)[0]

    // get cookie
    const demoShopCartCookie: Cart = req.cookies.demoShopCart || { products: [] };

    // build cart item
    const cartItem: CartItem = {
        orderItemId: v4(),
        product: product,
        selectedVariant: selectedVariant
    };

    demoShopCartCookie.products.push(cartItem);
    demoShopCartCookie.clientId = clientId;

    res.cookie('demoShopCart', demoShopCartCookie);
    res.redirect(`/shop/${clientId}/${product.id}`);
}


/**
 * Get and display shopping cart
 */
const getShoppingCart = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const cart = req.cookies.demoShopCart as Cart || {};

        if (!cart.clientId?.length) throw new Error('No Shop ID specified');

        // get shop (for navigation only)
        const shop = await fetchShopDataById(cart.clientId) as Shop;

        // calc price sum
        let sum = 0;
        if (cart?.products?.length) {
            cart.products.forEach((item: CartItem) => {
                sum = sum + item.selectedVariant.price
            });
        }
        cart.sum = parseFloat((sum / 100).toFixed(2));

        // build navigation
        const navigation: any = {};
        if (shop) navigation.shop = { id: shop.id, name: shop.name };
        if (cart.products?.length) navigation.cartCount = cart.products.length;

        // render page
        res.render('pages/cart', {
            pageTitle: 'Warenkorb',
            cart: cart,
            clientId: shop.id,
            stage: process.env.NODE_ENV,
            componentLoader: process.env.COMPONENT_LOADER,
            navigation: { ...navigation }
        });

    } catch (error) {
        next(error)
    }

}


/**
 * Delete an item from the shopping cart
 */
const deleteItemFromShoppingCart = async (req: Request, res: Response, next: NextFunction) => {

    const cart = req.cookies.demoShopCart as Cart;
    const orderItemId = req.body.orderItemId as string;

    // filter out deleted item
    cart.products = [...cart?.products?.filter(product => product.orderItemId !== orderItemId)]

    // overwrite cookie and redirect
    res.cookie('demoShopCart', cart);
    res.redirect('/cart')
}


/**
 * Proceed to checkout
 */
const checkout = async (req: Request, res: Response, next: NextFunction) => {

    const cart = req.cookies.demoShopCart as Cart;
    const cartProducts: CartItem[] = cart.products || [];

    if (!cart.clientId?.length) throw new Error('No Shop ID specified');

    const shop = await fetchShopDataById(cart.clientId) as Shop;
    
    // TODO Delete cookie? Or leave it for testing?
    // res.clearCookie('demoShopCart');

    const sessionId: string = req.cookies['wertgarantie-session-id'];
    const wertgarantieLoaderConfig = createWertgarantieLoaderConfigurationData(sessionId, cartProducts, shop);

    console.log(cartProducts)

    // render page
    res.render('pages/checkout', {
        pageTitle: 'Checkout',
        orderedProducts: cartProducts,
        orderId: v4(),
        wertgarantieLoaderConfig: wertgarantieLoaderConfig,
        componentLoader: process.env.COMPONENT_LOADER
    });
}


/**
 * Generate loader configuration data
 * @param {string} sessionId from backend 
 * @param {CartItem} shopProducts items in the shopping ccart
 * @param {Shop} clientConfig shop config
 * @returns component-loader configuration data
 */
function createWertgarantieLoaderConfigurationData(sessionId: string, shopProducts: CartItem[], clientConfig: Shop) {

    if (!sessionId?.length) return undefined;

    const encryptedSessionId: string = CryptoJS.HmacSHA256(sessionId, clientConfig.secret).toString();

    const cartProducts = shopProducts.map(cartProduct => {
        return {
            sku: cartProduct.orderItemId,
            name: cartProduct.product.name,
            deviceClasses: cartProduct.product.deviceClasses || undefined,
            price: cartProduct.selectedVariant.price,
            manufacturer: cartProduct.product.manufacturer
        };
    });

    return {
        id: clientConfig.id,
        stage: process.env.NODE_ENV,
        cartProducts: cartProducts,
        orderId: v4(),
        customer: customer,
        encryptedSessionId: encryptedSessionId
    };
}

export default {
    addItemToShoppingCart: addItemToShoppingCart,
    getShoppingCart: getShoppingCart,
    deleteItemFromShoppingCart: deleteItemFromShoppingCart,
    checkout: checkout
}