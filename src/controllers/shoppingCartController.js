const uuid = require('uuid');
const COMPONENT_SELECTION_POP_UP = process.env.COMPONENT_SELECTION_POP_UP;
const COMPONENT_CONFIRMATION = process.env.COMPONENT_CONFIRMATION;
const COMPONENT_RATING = process.env.COMPONENT_RATING;
const BIFROST_URI_FOR_FE_COMPONENTS = process.env.BIFROST_URI_FOR_FE_COMPONENTS || process.env.BIFROST_URI;
const _ = require('lodash');

exports.showShoppingCart = function showShoppingCart(req, res) {
    const shoppingCartData = req.cookies.dummyshop;
    const clientConfig = req.clientConfig;
    let showPopUp = false;
    let popUpData;
    const newShoppingCartItem = req.cookies["newItem"];
    if (newShoppingCartItem) {
        showPopUp = true;
        popUpData = {
            orderItemId: newShoppingCartItem.orderItemId,
            deviceClass: newShoppingCartItem.product.deviceClass,
            devicePrice: newShoppingCartItem.selectedVariant.devicePrice,
            productName: newShoppingCartItem.productName,
            clientId: clientConfig.clientId,
            bifrostUriForFEComponents: BIFROST_URI_FOR_FE_COMPONENTS,
            popupComponentUri: COMPONENT_SELECTION_POP_UP,
            ratingComponentUri: COMPONENT_RATING
        };
        res.clearCookie("newItem")
    }

    const confirmationCompData = [];
    if (shoppingCartData) {
        confirmationCompData.push(...shoppingCartData.products.map(product => {
            return {
                price: product.selectedVariant.devicePrice,
                manufacturer: product.manufacturer,
                deviceClass: product.deviceClass,
                name: product.productName,
                orderItemId: product.orderItemId
            }
        }));
    }
    res.render("shoppingCart", {
        cart: shoppingCartData,
        showPopUp: showPopUp,
        popUpData: popUpData,
        publicClientId: req.clientConfig.clientId,
        bifrostUriForFEComponents: BIFROST_URI_FOR_FE_COMPONENTS,
        confirmationComponentUri: COMPONENT_CONFIRMATION,
        confirmationShopOrderBase64: Buffer.from(JSON.stringify(confirmationCompData)).toString('base64')
    });
};

exports.showShoppingCartCookie = function showShoppingCartCookie(req, res) {
    res.send(req.cookies['dummyshop']);
};

exports.addProductToShoppingCart = function addProductToShoppingCart(req, res) {
    const product = _.find(req.clientConfig.shopProducts, product => product.id === req.body.productId);
    const variant = _.find(product.variants, variant => variant.id === req.body.variantId);
    var dummyshopCookie = req.cookies.dummyshop || {products: []};
    const newOrderItem = {
        orderItemId: uuid(),
        product: product,
        productName: product.name + " " + variant.name,
        selectedVariant: variant
    };
    dummyshopCookie.products.push(newOrderItem);
    res.cookie('dummyshop', dummyshopCookie);
    res.cookie('newItem', newOrderItem);
    res.redirect('/shoppingCart');
};

exports.changeVariant = function changeVariant(req, res) {
    const orderItemIdToChange = req.body.orderItemId;
    const product = _.find(req.clientConfig.shopProducts, product => product.id === req.body.productId);
    const newVariant = _.find(product.variants, variant => variant.id === req.body.variantId);
    const shoppingCart = req.cookies.dummyshop;
    shoppingCart.products.forEach(cartProduct => {
        if (cartProduct.orderItemId === orderItemIdToChange) {
            cartProduct.selectedVariant = newVariant;
            cartProduct.productName = product.name + " " + newVariant.name;
        }
    });

    res.cookie('dummyshop', shoppingCart);
    res.redirect('/shoppingCart');
};