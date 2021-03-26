const clientConfig = getEnvironmentClientConfig(process.env.NODE_ENV);

exports.getClientSelectionData = function getClientSelectionData() {
    return Object.entries(clientConfig).map(([key, value]) => {
        return {
            clientId: key,
            name: value.name
        };
    });
};

function getEnvironmentClientConfig(nodeEnv) {
    switch (nodeEnv) {
        case 'staging':
            return require('../config/clientConfigStaging');
        case 'production':
            return require('../config/clientConfigProduction');
        default:
            return require('../config/clientConfigLocalDev');
    }
}



exports.clientConfig = clientConfig;