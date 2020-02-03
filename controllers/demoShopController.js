const uuid = require('uuid');
const axios = require('axios');

const publicClientId = process.env.PUBLIC_CLIENT_ID;
const COMPONENT_SELECTION_POP_UP = process.env.COMPONENT_SELECTION_POP_UP;
const COMPONENT_CONFIRMATION = process.env.COMPONENT_CONFIRMATION;
const COMPONENT_RATING = process.env.COMPONENT_RATING;
const BIFROST_URI = process.env.BIFROST_URI;
const BIFROST_URI_FOR_FE_COMPONENTS = process.env.BIFROST_URI_FOR_FE_COMPONENTS || process.env.BIFROST_URI;

const customerData = {
    company: 'INNOQ',
    salutation: 'Herr',
    firstname: 'Max',
    lastname: 'Mustermann',
    street: 'Unter den Linden',
    zip: '52345',
    city: 'Köln',
    country: 'Deutschland',
    email: 'max.mustermann1234@test.com'
};

exports.showShopIndex = function showShopIndex(req, res) {
    res.render("dummyProduct", {
        bifrostUriForFEComponents: BIFROST_URI_FOR_FE_COMPONENTS,
        ratingComponentUri: COMPONENT_RATING
    });
};

exports.redirectToIndex = function redirectToIndex(req, res) {
    res.redirect("/");
};

exports.showShoppingCart = function showShoppingCart(req, res) {
    const shoppingCartData = req.cookies.dummyshop;
    res.render("shoppingCart", {
        cart: shoppingCartData,
        publicClientId: publicClientId,
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
        });
    res.cookie('dummyshop', dummyshopCookie);
    res.redirect('/newShoppingCartItem');
};

exports.checkout = async function checkout(req, res, next) {
    const wertgarantieCookieData = req.body['wertgarantie-cookie-data'];
    var dummyshopCookie = req.cookies.dummyshop;
    const shopProducts = dummyshopCookie ? dummyshopCookie.products : [];
    const purchasedShopProducts = [];
    shopProducts.forEach(product => {
        purchasedShopProducts.push({
            price: product.productPrice * 100,
            manufacturer: "XXXBike Inc.",
            deviceClass: process.env.DEVICE_CLASS,
            model: product.productName,
        });
    });

    const wertgarantieCheckoutData = {
        purchasedProducts: purchasedShopProducts,
        customer: customerData,
        secretClientId: process.env.SECRET,
        wertgarantieShoppingCart: wertgarantieCookieData
    };

    // 1: checkout in shop
    const newOrderId = uuid();
    res.clearCookie('dummyshop');

    // 2: call bifrost for wertgarantie checkout
    var checkoutResult;
    try {
        checkoutResult = await axios({
            method: 'post',
            url: BIFROST_URI + '/shoppingCarts/current/checkout',
            data: wertgarantieCheckoutData
        });
        console.log("Bifrost response: " + JSON.stringify(checkoutResult.data, null, 2));
        res.render('purchaseComplete', {
            orderedProducts: shopProducts,
            orderId: newOrderId,
            wertgarantieResponse: JSON.stringify(checkoutResult.data, null, 2)
        })
    } catch (e) {
        if (e.response) {
            console.error(`bifrost responded with status ${e.response.status} and message ${JSON.stringify(e.response.data, null, 2)}`);
        } else {
            console.error(`could not connect to bifrost: ${e.message}`);
        }
        next(e);
    }

};

exports.newShoppingCartItem = function newShoppingCartItem(req, res) {
    res.cookie('insurable', true);
    res.render('newShoppingCartItem', {
        deviceClass: process.env.DEVICE_CLASS,
        devicePrice: process.env.DEVICE_PRICE,
        productName: process.env.PRODUCT_NAME,
        clientId: publicClientId,
        bifrostUriForFEComponents: BIFROST_URI_FOR_FE_COMPONENTS,
        popupComponentUri: COMPONENT_SELECTION_POP_UP,
        ratingComponentUri: COMPONENT_RATING
    })
};