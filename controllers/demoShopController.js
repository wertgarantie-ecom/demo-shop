const uuid = require('uuid');
const axios = require('axios');

const publicClientId = "5209d6ea-1a6e-11ea-9f8d-778f0ad9137f";
const COMPONENT_SELECTION_POP_UP = process.env.COMPONENT_SELECTION_POP_UP;
const COMPONENT_CONFIRMATION = process.env.COMPONENT_CONFIRMATION;
const COMPONENT_RATING = process.env.COMPONENT_RATING;
const BIFROST_URI = process.env.BIFROST_URI;

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
    res.render("dummyProduct");
};

exports.showShoppingCart = function showShoppingCart(req, res) {
    const shoppingCartData = req.cookies.dummyshop;
    res.render("shoppingCart", {
        cart: shoppingCartData,
        publicClientId: publicClientId,
        bifrostUri: BIFROST_URI,
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
    res.redirect('/demoShop/newShoppingCartItem');
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
            deviceClass: "6bdd2d93-45d0-49e1-8a0c-98eb80342222",
            model: product.productName,
        });
    });

    const wertgarantieCheckoutData = {
        purchasedProducts: purchasedShopProducts,
        customer: customerData,
        secretClientId: "bikesecret1",
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
    } catch (e) {
        console.error(JSON.stringify(e.response.data, null, 2));
        next(e);
    }


    res.render('purchaseComplete', {
        orderedProducts: shopProducts,
        orderId: newOrderId,
        wertgarantieResponse: JSON.stringify(checkoutResult.data, null, 2)
    })
};

exports.newShoppingCartItem = function newShoppingCartItem(req, res) {
    res.cookie('insurable', true);
    res.render('newShoppingCartItem', {
        deviceClass: "6bdd2d93-45d0-49e1-8a0c-98eb80342222",
        devicePrice: 139999,
        productName: "E-Mountainbike Premium 3000",
        publicClientId: publicClientId,
        bifrostUri: BIFROST_URI,
        popupComponentUri: COMPONENT_SELECTION_POP_UP,
        ratingComponentUri: COMPONENT_RATING
    })
};