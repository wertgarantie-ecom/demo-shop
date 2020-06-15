const service = require('../../src/shop-configuration/shopConfigurationService');
const defaultShopProducts = require('../../src/config/defaultShopProducts');

test('should create demo shop configs for all bifrost client configs', async () => {
    const result = await service.updateShopConfigurations('http://localhost:3000/wertgarantie', 'bifrost', 'bifrost');
    console.log(JSON.stringify(result, null, 2));
})

test("should retrieve client configs from bifrost", async () => {
    await service.queryConfigurationFromBifrost('http://localhost:3000/wertgarantie', 'bifrost', 'bifrost');
    expect(true).toEqual(true);
});

test('should create proper shop configuration form bifrost client config', () => {
    clientConfig = {
        "name": "TODO NAME",
        "backends": {
            "webservices": {
                "productOffersConfigurations": [
                    {
                        "deviceClasses": [
                            {
                                "objectCode": "9025"
                            },
                            {
                                "objectCode": "73"
                            }
                        ],
                    },
                    {
                        "deviceClasses": [
                            {
                                "objectCode": "9025"
                            },
                            {
                                "objectCode": "73"
                            }
                        ]
                    }
                ]
            }
        },
        "secrets": [
            "secret:3be1bca1-9c95-4d12-8a7a-4da44a93d9a5"
        ],
        "publicClientIds": [
            "public:e466c731-db35-4190-afda-c2667e9162af"
        ]
    }

    const shopConfiguration = service.bifrostClientConfigToDemoShopConfiguration(clientConfig);
    expect(shopConfiguration).toEqual({
        name: clientConfig.name,
        clientId: clientConfig.publicClientIds[0],
        secret: clientConfig.secrets[0],
        shopProducts: defaultShopProducts.smartphone
    })
})

test('should extract device classes from product offers configuration', () => {
    const productOffersConfiguration = [
        {
            "deviceClasses": [
                {
                    "objectCode": "9025"
                },
                {
                    "objectCode": "73"
                }
            ],
        },
        {
            "deviceClasses": [
                {
                    "objectCode": "9025"
                },
                {
                    "objectCode": "73"
                }
            ]
        },
        {
            "deviceClasses": [
                {
                    "objectCode": "1234"
                },
                {
                    "objectCode": "73"
                }
            ]
        }
    ]
    const deviceClasses = service.extractDeviceClassesFromProductOffersConfiguration(productOffersConfiguration)
    expect(deviceClasses).toEqual(['9025', '73', '1234']);
})

