const uuid = require('uuid');
const _ = require('lodash');

exports.showShoppingCart = function showShoppingCart(req, res) {
    const shoppingCartData = req.cookies.dummyshop;

    const confirmationCompData = [];
    if (shoppingCartData) {
        confirmationCompData.push(...shoppingCartData.products.map(product => {
            return {
                price: product.selectedVariant.devicePrice,
                manufacturer: product.manufacturer,
                deviceClasses: product.deviceClasses,
                name: product.productName,
                orderItemId: product.orderItemId
            }
        }));
    }
    res.render("shoppingCart", {
        cart: shoppingCartData,
        publicClientId: req.clientConfig.clientId,
        stage: process.env.NODE_ENV,
        componentLoader: process.env.COMPONENT_LOADER
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