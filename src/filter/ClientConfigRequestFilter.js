const clientConfig = require('../services/clientConfigService').clientConfig;

exports.loadClientConfig = function loadClientConfig(req, res, next) {
    const clientId = req.cookies["clientId"] || process.env.PUBLIC_CLIENT_ID;
    req.clientConfig = clientConfig[clientId];
    res.cookie["clientId"] = clientId;
    return next();
};
