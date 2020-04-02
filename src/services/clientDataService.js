const clientConfig = require('../config/clientConfig');

exports.getClientSelectionData = function getClientSelectionData() {
  return Object.entries(clientConfig).map(([key, value]) => {
      return {
          clientId: key,
          name: value.name
      };
  });
};