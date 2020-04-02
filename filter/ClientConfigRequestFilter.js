const clientConfig = require('../config/clientConfig');

exports.loadClientConfig = function loadClientConfig(req, res, next) {
    const clientId = req.cookies["clientId"] || process.env.PUBLIC_CLIENT_ID;
    req.clientConfig = clientConfig[clientId];
    return next();
};
