/**
 * All product categories hold products which are of type 'Product', only missing the deviceClasses property
 * (because those are custom to a shop, see respective clientConfigs)
 */


// SMARTPHONES
const smartphones = {
    bapple_x: {
        id: "97d1eb7c-fe0e-4b95-96dc-ec44709aca7d",
        name: "Bapple X",
        image: "https://cdn.idealo.com/folder/Product/6765/2/6765263/s1_produktbild_max/apple-iphone-11-128gb-black.jpg",
        manufacturer: "FlashyPhones Inc.",
        attributes: [
            "ohne Tasten",
            "ohne Charger",
            "ohne Aux",
            "Internet 2.0 made by Bapple"
        ],
        variants: [
            {
                id: "FlHa3000P64GB",
                name: "64 GB",
                price: 80000
            },
            {
                id: "FlHa3000P128GB",
                name: "128 GB",
                price: 90000
            },
            {
                id: "FlHa3000P256GB",
                name: "256 GB",
                price: 120000
            }
        ]
    },
    flash_handy_se: {
        id: "11d07d82-86a8-40aa-86b9-462c66f3daa7",
        name: "Flash Handy SE",
        image: "https://bilder.pcwelt.de/3433472_620x310_r.jpg",
        manufacturer: "FlashyPhones Inc.",
        attributes: [
            "echtere Tasten",
            "bessere Antenne",
            "Lautsprecher",
            "Das Internet"
        ],
        variants: [
            {
                id: "FlHaSE64GB",
                name: "64 GB",
                price: 73000
            },
            {
                id: "FlHaSE128GB",
                name: "128 GB",
                price: 82000
            },
            {
                id: "FlHaSE256GB",
                name: "256 GB",
                price: 180000
            }
        ]
    }
}


// BIKES
const bikes = {
    mega_bike_3000_pro: {
        id: "427f4e92-e67c-4885-861a-612f2c8cbeca",
        name: "Mega Bike 3000 Pro",
        image: "https://cdn.pixabay.com/photo/2013/07/13/13/43/racing-bicycle-161449_1280.png",
        manufacturer: "Mega Bikes Inc.",
        attributes: [
            "Reifen",
            "Bremse",
            "ohne Gepäckträger",
            "Kettenschaltung"
        ],
        variants: [
            {
                id: "Mebi3000P7G",
                name: "7 Gang",
                price: 80000
            },
            {
                id: "Mebi3000P14G",
                name: "14 Gang",
                price: 100000
            },
            {
                id: "Mebi3000P21G",
                name: "21 Gang",
                price: 130000
            }
        ]
    },
    e_bike_super5: {
        id: "32fafe80-2e86-47d3-9122-844dd22fd8e1",
        name: "E-Bike Super 5",
        image: "https://cdn.pixabay.com/photo/2016/07/20/20/46/electric-bicycle-1531261_1280.jpg",
        manufacturer: "Mega Bikes Inc.",
        attributes: [
            "Reifen",
            "Bremse",
            "ohne Gepäckträger",
            "Elektromotor"
        ],
        variants: [
            {
                id: "MeEBi3000P7G",
                name: "7 Gang",
                price: 180000
            },
            {
                id: "MeEbi3000P14G",
                name: "14 Gang",
                price: 350000
            },
            {
                id: "MeEBi3000P21G",
                name: "21 Gang",
                price: 460000
            }
        ]
    }
}

// ELECTRONICS
const electronics = {
    lg_c9_oled: {
        id: "6f0b2bf6-c507-11ea-a054-cf2d1d418205",
        name: "LG C9 OLED",
        image: "https://cdn.preisvergleich.check24.de/content/bilder/fernseher/lg-oled65c97la-165-cm-65-zoll-oled-technologie-ultra-hd-hdr-hd-triple-tuner-sat-antenne-kabel-smart-tv-modelljahr-2019-energieklasse-a/lg-oled65c97la-165-cm-65-zoll-oled-technologie-ultra-hd-hdr-hd-triple-tuner-sat-antenne-kabel-smart-tv-modelljahr-2019-energieklasse-a_600x600.jpg?width=600&height=600",
        manufacturer: "LG",
        attributes: [
            "Ultra HD (3.840 x 2.160)",
            "OLED-Technologie",
            "Smart-TV-Funktionen",
            "2x HD-Triple-Tuner (Sat, Antenne, Kabel)"
        ],
        variants: [
            {
                id: "LGC945",
                name: "45 Zoll",
                price: 99900
            },
            {
                id: "LGC955",
                name: "55 Zoll",
                price: 144900
            },
            {
                id: "LGC965",
                name: "65 Zoll",
                price: 219900
            },
            {
                id: "LGC975",
                name: "75 Zoll",
                price: 300000
            }
        ]
    }
}


export const products = {
    smartphones: smartphones,
    bikes: bikes,
    electronics: electronics
}