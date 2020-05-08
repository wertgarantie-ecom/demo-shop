const uuid = require('uuid');
const CryptoJS = require('crypto-js');
const clientDataService = require('../services/clientConfigService');

const CUSTOMER_EMAIL = process.env.CUSTOMER_EMAIL || 'max.mustermann1234@test.com';
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

exports.showClientConfigPage = function showClientConfigPage(req, res, next) {
    const currentClientConfig = req.clientConfig;
    res.render("clientConfig", {
        clientSelection: clientDataService.getClientSelectionData(),
        currentClientName: currentClientConfig.name
    });
};

exports.showShopIndex = function showShopIndex(req, res) {
    res.render("dummyProduct", {
        bifrostUriForFEComponents: BIFROST_URI_FOR_FE_COMPONENTS,
        ratingComponentUri: COMPONENT_RATING,
        productName: req.clientConfig.productName,
        productImage: req.clientConfig.productImage,
        productAttributes: req.clientConfig.productAttributes,
        devicePrice: parseInt(req.clientConfig.devicePrice)
    });
};

exports.redirectToIndex = function redirectToIndex(req, res) {
    res.redirect("/");
};

exports.showShoppingCart = function showShoppingCart(req, res) {
    const shoppingCartData = req.cookies.dummyshop;
    const clientConfig = req.clientConfig;
    let showPopUp = false;
    let popUpData;
    if (req.query.newItem === "true") {
        showPopUp = true;
        popUpData = {
            deviceClass: clientConfig.deviceClass,
            devicePrice: clientConfig.devicePrice,
            productName: clientConfig.productName,
            clientId: clientConfig.clientId,
            bifrostUriForFEComponents: BIFROST_URI_FOR_FE_COMPONENTS,
            popupComponentUri: COMPONENT_SELECTION_POP_UP,
            ratingComponentUri: COMPONENT_RATING
        }
    }
    res.render("shoppingCart", {
        cart: shoppingCartData,
        showPopUp: showPopUp,
        popUpData: popUpData,
        publicClientId: req.clientConfig.clientId,
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
            productPrice: parseInt(req.body.productPrice),
            deviceOS: "android"
        });
    res.cookie('dummyshop', dummyshopCookie);
    res.redirect('/shoppingCart?newItem=true');
};

function createWertgarantieCheckoutData(sessionId, shopProducts, clientConfig) {
    if (!sessionId) {
        return undefined
    }
    const encryptedSessionId = CryptoJS.HmacSHA256(sessionId, clientConfig.secret).toString();

    const purchasedShopProducts = [];
    shopProducts.forEach(product => {
        purchasedShopProducts.push({
            price: product.productPrice,
            manufacturer: "XXXPhones Inc.",
            deviceClass: clientConfig.deviceClass,
            model: product.productName,
            deviceOS: product.deviceOS,
            orderId: uuid()
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
    const wertgarantieCheckoutData = createWertgarantieCheckoutData(sessionId, shopProducts, req.clientConfig);

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
    const clientConfig = req.clientConfig;
    res.render('newShoppingCartItem', {
        deviceClass: clientConfig.deviceClass,
        devicePrice: clientConfig.devicePrice,
        productName: clientConfig.productName,
        productImage: clientConfig.productImage,
        clientId: clientConfig.clientId,
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