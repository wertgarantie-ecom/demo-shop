const shopConfigHolder = require('../shop-configuration/shopConfigurationHolder');

exports.getClientSelectionData = function getClientSelectionData() {
    return Object.entries(shopConfigHolder.getCurrentConfiguration()).map(([key, value]) => {
        return {
            clientId: key,
            name: value.name
        };
    });
};

