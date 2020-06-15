module.exports.dummyProductsByType = {
    "bike": [
        {
            "id": "427f4e92-e67c-4885-861a-612f2c8cbeca",
            "name": "Mega Bike 3000 Pro",
            "image": "https://cdn.pixabay.com/photo/2013/07/13/13/43/racing-bicycle-161449_1280.png",
            "manufacturer": "Mega Bikes Inc.",
            "attributes": [
                "Reifen",
                "Bremse",
                "ohne Gepäckträger",
                "Kettenschaltung"
            ],
            "deviceClass": "Bike",
            "variants": [
                {
                    "id": "Mebi3000P7G",
                    "name": "7 Gänge",
                    "devicePrice": 80000
                },
                {
                    "id": "Mebi3000P14G",
                    "name": "14 Gänge",
                    "devicePrice": 100000
                },
                {
                    "id": "Mebi3000P21G",
                    "name": "21 Gänge",
                    "devicePrice": 130000
                }
            ]
        },
        {
            "id": "32fafe80-2e86-47d3-9122-844dd22fd8e1",
            "name": "Mega E-Bike 3000 Pro",
            "image": "https://cdn.pixabay.com/photo/2016/07/20/20/46/electric-bicycle-1531261_1280.jpg",
            "manufacturer": "Mega Bikes Inc.",
            "attributes": [
                "Reifen",
                "Bremse",
                "ohne Gepäckträger",
                "Elektromotor"
            ],
            "deviceClass": "E-Bike",
            "variants": [
                {
                    "id": "MeEBi3000P7G",
                    "name": "7 Gänge",
                    "devicePrice": 180000
                },
                {
                    "id": "MeEbi3000P14G",
                    "name": "14 Gänge",
                    "devicePrice": 350000
                },
                {
                    "id": "MeEBi3000P21G",
                    "name": "21 Gänge",
                    "devicePrice": 460000
                }
            ]
        }
    ],
    "smartphone": [
        {
            "id": "97d1eb7c-fe0e-4b95-96dc-ec44709aca7d",
            "name": "Flash Handy 3000 Pro",
            "image": "https://bilder.pcwelt.de/3433472_620x310_r.jpg",
            "manufacturer": "FlashyPhones Inc.",
            "attributes": [
                "echte Tasten",
                "Antenne",
                "Lautsprecher",
                "Das Internet"
            ],
            "deviceClass": "Smartphone",
            "variants": [
                {
                    "id": "FlHa3000P64GB",
                    "name": "64 GB",
                    "devicePrice": 29900
                },
                {
                    "id": "FlHa3000P128GB",
                    "name": "128 GB",
                    "devicePrice": 40000
                },
                {
                    "id": "FlHa3000P256GB",
                    "name": "256 GB",
                    "devicePrice": 55000
                }
            ]
        },
        {
            "id": "11d07d82-86a8-40aa-86b9-462c66f3daa7",
            "name": "Flash Handy SE",
            "image": "https://bilder.pcwelt.de/3433472_620x310_r.jpg",
            "manufacturer": "FlashyPhones Inc.",
            "attributes": [
                "echtere Tasten",
                "bessere Antenne",
                "Lautsprecher",
                "Das Internet"
            ],
            "deviceClass": "Smartphone",
            "variants": [
                {
                    "id": "FlHaSE64GB",
                    "name": "64 GB",
                    "devicePrice": 73000
                },
                {
                    "id": "FlHaSE128GB",
                    "name": "128 GB",
                    "devicePrice": 82000
                },
                {
                    "id": "FlHaSE256GB",
                    "name": "256 GB",
                    "devicePrice": 180000
                }
            ]
        }
    ]
}

module.exports.objectCodeToDummyProductType = {
    "9025": "smartphone",
    "73": "smartphone",
    "270009": "bike",
    "27": "bike"
}