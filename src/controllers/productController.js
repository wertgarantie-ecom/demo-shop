const COMPONENT_RATING = process.env.COMPONENT_RATING;
const BIFROST_URI_FOR_FE_COMPONENTS = process.env.BIFROST_URI_FOR_FE_COMPONENTS || process.env.BIFROST_URI;

exports.showProduct = function showProduct(req, res) {
    const productId = req.params.productId;
    res.render("dummyProd")
};

exports.showShopIndex = function showShopIndex(req, res) {
    res.render("productList", {
        bifrostUriForFEComponents: BIFROST_URI_FOR_FE_COMPONENTS,
        ratingComponentUri: COMPONENT_RATING,
        products: req.clientConfig.shopProducts
    });
};

exports.redirectToIndex = function redirectToIndex(req, res) {
    res.redirect("/");
};