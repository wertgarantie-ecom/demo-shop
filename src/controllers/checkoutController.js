const uuid = require('uuid');
const CryptoJS = require('crypto-js');

const BIFROST_URI_FOR_FE_COMPONENTS = process.env.BIFROST_URI_FOR_FE_COMPONENTS || process.env.BIFROST_URI;

const CUSTOMER_FIRST_NAME = process.env.CUSTOMER_FIRST_NAME || 'Max';
const CUSTOMER_LAST_NAME = process.env.CUSTOMER_LAST_NAME || 'Mustermann';
const CUSTOMER_EMAIL = process.env.CUSTOMER_EMAIL || 'max.mustermann1234@test.com';

const customerData = {
    company: 'INNOQ',
    salutation: 'Herr',
    firstname: CUSTOMER_FIRST_NAME,
    lastname: CUSTOMER_LAST_NAME,
    street: 'Unter den Linden 9',
    zip: '52345',
    city: 'Köln',
    country: 'Deutschland',
    email: CUSTOMER_EMAIL
};

function createWertgarantieCheckoutData(sessionId, shopProducts, clientConfig) {
    if (!sessionId) {
        return undefined
    }
    const encryptedSessionId = CryptoJS.HmacSHA256(sessionId, clientConfig.secret).toString();

    const cartProducts = shopProducts.map(cartProduct => {
        return {
            sku: cartProduct.orderItemId,
            name: cartProduct.productName,
            deviceClasses: cartProduct.product.deviceClasses || undefined,
            price: cartProduct.selectedVariant.devicePrice,
            manufacturer: cartProduct.product.manufacturer
        };
    });

    return {
        id: clientConfig.clientId,
        stage: process.env.NODE_ENV,
        cartProducts: cartProducts,
        customer: customerData,
        encryptedSessionId: encryptedSessionId
    };
}

exports.checkout = async function checkout(req, res, next) {
    // 1: checkout in shop
    const newOrderId = uuid();
    res.clearCookie('dummyshop');

    const sessionId = req.cookies['wertgarantie-session-id'];
    var dummyshopCookie = req.cookies.dummyshop;
    const shopProducts = dummyshopCookie ? dummyshopCookie.products : [];
    const clientConfig = req.clientConfig;
    const wertgarantieCheckoutData = createWertgarantieCheckoutData(sessionId, shopProducts, clientConfig);

    // 2: render new page with data for after sales component checkout
    res.render('purchaseComplete', {
        orderedProducts: shopProducts,
        orderId: newOrderId,
        bifrostUriForFEComponents: BIFROST_URI_FOR_FE_COMPONENTS,
        afterSalesComponentUri: process.env.COMPONENT_AFTER_SALES,
        wertgarantieCheckoutData: wertgarantieCheckoutData,
        publicClientId: clientConfig.clientId
    });
};