const axios = require('axios');
const _ = require('lodash');
const dummyShopProducts = require('./dummyShopProducts');
const holder = require('./shopConfigurationHolder');

async function updateShopConfigurations(bifrostBaseUri, username, password, httpClient) {
    const bifrostConfigurations = await queryConfigurationFromBifrost(bifrostBaseUri, username, password, httpClient);
    const demoShopConfigurations = bifrostConfigurations.map(bifrostConfig => bifrostClientConfigToDemoShopConfiguration(bifrostConfig))
        .reduce((acc, current) => {
            acc[current.clientId] = current;
            return acc;
        }, {})
    holder.setCurrentConfiguration(demoShopConfigurations);
    return demoShopConfigurations;
}

async function queryConfigurationFromBifrost(bifrostBaseUri = process.env.BIFROST_URI,
                                             username = process.env.BIFROST_BASIC_AUTH_USER,
                                             password = process.env.BIFROST.BASIC_AUTH_PASSWORD,
                                             httpClient = axios) {
    const result = await axios.get(`${bifrostBaseUri}/clients`, {
        auth: {
            username: username,
            password: password
        }
    });
    return result.data.clients;
}

function bifrostClientConfigToDemoShopConfiguration(clientConfig) {
    const productOffersConfiguration = _.get(clientConfig, 'backends.webservices.productOffersConfigurations');
    const deviceClasses = extractDeviceClassesFromProductOffersConfiguration(productOffersConfiguration);
    const dummyShopProducts = mapDeviceClassesToDummyShopProducts(deviceClasses);

    return {
        name: clientConfig.name,
        clientId: clientConfig.publicClientIds[0],
        secret: clientConfig.secrets[0],
        shopProducts: dummyShopProducts
    }
}

function extractDeviceClassesFromProductOffersConfiguration(productOffersConfiguration) {
    if (!productOffersConfiguration) {
        return [];
    }
    const objectCodes = productOffersConfiguration.flatMap(config => config.deviceClasses.flatMap(deviceclass => deviceclass.objectCode));
    return _.uniq(objectCodes);
}

function mapDeviceClassesToDummyShopProducts(deviceClasses) {
    const dummyProductTypes = deviceClasses.map(deviceClass => dummyShopProducts.objectCodeToDummyProductType[deviceClass]);
    const uniqTypes = _.uniq(dummyProductTypes);
    return uniqTypes.flatMap(type => dummyShopProducts.dummyProductsByType[type]);
}

module.exports.queryConfigurationFromBifrost = queryConfigurationFromBifrost;
module.exports.bifrostClientConfigToDemoShopConfiguration = bifrostClientConfigToDemoShopConfiguration;
module.exports.extractDeviceClassesFromProductOffersConfiguration = extractDeviceClassesFromProductOffersConfiguration;
module.exports.updateShopConfigurations = updateShopConfigurations;
