const uuid = require('uuid');
const CryptoJS = require('crypto-js');

const CUSTOMER_EMAIL = process.env.CUSTOMER_EMAIL || 'max.mustermann1234@test.com';
const PUBLIC_CLIENT_ID = process.env.PUBLIC_CLIENT_ID;
const COMPONENT_SELECTION_POP_UP = process.env.COMPONENT_SELECTION_POP_UP;
const COMPONENT_CONFIRMATION = process.env.COMPONENT_CONFIRMATION;
const COMPONENT_RATING = process.env.COMPONENT_RATING;
const BIFROST_URI_FOR_FE_COMPONENTS = process.env.BIFROST_URI_FOR_FE_COMPONENTS || process.env.BIFROST_URI;

const customerData = {
    company: 'INNOQ',
    salutation: 'Herr',
    firstname: 'Max',
    lastname: 'Mustermann',
    street: 'Unter den Linden 9',
    zip: '52345',
    city: 'Köln',
    country: 'Deutschland',
    email: CUSTOMER_EMAIL
};

exports.showShopIndex = function showShopIndex(req, res) {
    res.render("dummyProduct", {
        bifrostUriForFEComponents: BIFROST_URI_FOR_FE_COMPONENTS,
        ratingComponentUri: COMPONENT_RATING,
        productName: process.env.PRODUCT_NAME
    });
};

exports.redirectToIndex = function redirectToIndex(req, res) {
    res.redirect("/");
};

exports.showShoppingCart = function showShoppingCart(req, res) {
    const shoppingCartData = req.cookies.dummyshop;
    res.render("shoppingCart", {
        cart: shoppingCartData,
        publicClientId: PUBLIC_CLIENT_ID,
        bifrostUriForFEComponents: BIFROST_URI_FOR_FE_COMPONENTS,
        confirmationComponentUri: COMPONENT_CONFIRMATION
    });
};

exports.showShoppingCartCookie = function showShoppingCartCookie(req, res) {
    res.send(req.cookies['dummyshop']);
};

exports.addProductToShoppingCart = function addProductToShoppingCart(req, res) {
    var dummyshopCookie = req.cookies['dummyshop'] ? req.cookies['dummyshop'] : {products: []};
    dummyshopCookie.products.push(
        {
            productName: req.body.productName,
            productPrice: req.body.productPrice,
            deviceOS: "android"
        });
    res.cookie('dummyshop', dummyshopCookie);
    res.redirect('/newShoppingCartItem');
};

function createWertgarantieCheckoutData(sessionId, shopProducts) {
    if (!sessionId) {
        return undefined
    }
    const encryptedSessionId = CryptoJS.HmacSHA256(sessionId, process.env.SECRET).toString();

    const purchasedShopProducts = [];
    shopProducts.forEach(product => {
        purchasedShopProducts.push({
            price: product.productPrice * 100,
            manufacturer: "XXXPhones Inc.",
            deviceClass: process.env.DEVICE_CLASS,
            model: product.productName,
            deviceOS: product.deviceOS
        });
    });

    const wertgarantieCheckoutDataBuffer = Buffer.from(JSON.stringify({
        purchasedProducts: purchasedShopProducts,
        customer: customerData,
        encryptedSessionId: encryptedSessionId
    }));

    return wertgarantieCheckoutDataBuffer.toString('base64');
}

exports.checkout = async function checkout(req, res, next) {
    // 1: checkout in shop
    const newOrderId = uuid();
    res.clearCookie('dummyshop');

    const sessionId = req.cookies['wertgarantie-session-id'];
    var dummyshopCookie = req.cookies.dummyshop;
    const shopProducts = dummyshopCookie ? dummyshopCookie.products : [];
    const wertgarantieCheckoutData = createWertgarantieCheckoutData(sessionId, shopProducts);

    // 2: render new page with data for after sales component checkout
    res.render('purchaseComplete', {
        orderedProducts: shopProducts,
        orderId: newOrderId,
        bifrostUriForFEComponents: BIFROST_URI_FOR_FE_COMPONENTS,
        afterSalesComponentUri: process.env.COMPONENT_AFTER_SALES,
        wertgarantieCheckoutData: wertgarantieCheckoutData
    });
};

exports.newShoppingCartItem = function newShoppingCartItem(req, res) {
    res.cookie('insurable', true);
    res.render('newShoppingCartItem', {
        deviceClass: process.env.DEVICE_CLASS,
        devicePrice: process.env.DEVICE_PRICE,
        productName: process.env.PRODUCT_NAME,
        clientId: PUBLIC_CLIENT_ID,
        bifrostUriForFEComponents: BIFROST_URI_FOR_FE_COMPONENTS,
        popupComponentUri: COMPONENT_SELECTION_POP_UP,
        ratingComponentUri: COMPONENT_RATING
    })
};

exports.insurances = function insurances(req, res) {
    res.render('insurances', {
        bifrostUriForFEComponents: BIFROST_URI_FOR_FE_COMPONENTS,
        landingPageComponentUri: process.env.COMPONENT_LANDING_PAGE
    })
};