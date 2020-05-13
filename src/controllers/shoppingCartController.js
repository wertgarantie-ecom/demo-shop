const COMPONENT_SELECTION_POP_UP = process.env.COMPONENT_SELECTION_POP_UP;
const COMPONENT_CONFIRMATION = process.env.COMPONENT_CONFIRMATION;
const COMPONENT_RATING = process.env.COMPONENT_RATING;
const BIFROST_URI_FOR_FE_COMPONENTS = process.env.BIFROST_URI_FOR_FE_COMPONENTS || process.env.BIFROST_URI;

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
    const newOrderItem = {
        orderItemId: uuid(),
        productName: req.body.productName,
        productPrice: parseInt(req.body.productPrice)
    };
    dummyshopCookie.products.push(newOrderItem);
    res.cookie('dummyshop', dummyshopCookie);
    res.redirect('/shoppingCart?orderItemId=' + newOrderItem.orderItemId);
};