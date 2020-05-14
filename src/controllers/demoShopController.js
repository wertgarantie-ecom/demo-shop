const clientDataService = require('../services/clientConfigService');

const BIFROST_URI_FOR_FE_COMPONENTS = process.env.BIFROST_URI_FOR_FE_COMPONENTS || process.env.BIFROST_URI;

exports.showClientConfigPage = function showClientConfigPage(req, res, next) {
    const currentClientConfig = req.clientConfig;
    res.render("clientConfig", {
        clientSelection: clientDataService.getClientSelectionData(),
        currentClientName: currentClientConfig.name
    });
};

exports.insurances = function insurances(req, res) {
    res.render('insurances', {
        bifrostUriForFEComponents: BIFROST_URI_FOR_FE_COMPONENTS,
        landingPageComponentUri: process.env.COMPONENT_LANDING_PAGE
    })
};

/*
* not needed in the current version of the shop, since selection pop up moved to shopping cart
* maybe in the future we will make this showing of the page between product page and shopping cart configurable.
*/

// exports.newShoppingCartItem = function newShoppingCartItem(req, res) {
//     res.cookie('insurable', true);
//     const clientConfig = req.clientConfig;
//     res.render('newShoppingCartItem', {
//         deviceClass: clientConfig.deviceClass,
//         devicePrice: clientConfig.devicePrice,
//         productName: clientConfig.productName,
//         productImage: clientConfig.productImage,
//         clientId: clientConfig.clientId,
//         bifrostUriForFEComponents: BIFROST_URI_FOR_FE_COMPONENTS,
//         popupComponentUri: COMPONENT_SELECTION_POP_UP,
//         ratingComponentUri: COMPONENT_RATING
//     })
// };
