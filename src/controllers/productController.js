const COMPONENT_RATING = process.env.COMPONENT_RATING;
const BIFROST_URI_FOR_FE_COMPONENTS = process.env.BIFROST_URI_FOR_FE_COMPONENTS || process.env.BIFROST_URI;
const _ = require('lodash');

exports.showProduct = function showProduct(req, res, next) {
    const productId = req.params.productId;
    const product = _.find(req.clientConfig.shopProducts, product => product.id === productId);
    if (!product) {
        return next(new Error("Could not find product with id: " + productId));
    }
    let selectedVariant;
    const variantId = req.query.variantId;
    if (!variantId) {
        selectedVariant = product.variants[0];
    } else {
        selectedVariant = _.find(product.variants, variant => variant.id === variantId) || product.variants[0];

    }
    return res.render("dummyProduct", {
        product: product,
        selectedVariant: selectedVariant,
        bifrostUriForFEComponents: BIFROST_URI_FOR_FE_COMPONENTS,
        ratingComponentUri: COMPONENT_RATING,
    });
};

exports.showShopIndex = function showShopIndex(req, res) {
    res.render("productList", {
        products: req.clientConfig.shopProducts
    });
};

exports.redirectToIndex = function redirectToIndex(req, res) {
    res.redirect("/products");
};