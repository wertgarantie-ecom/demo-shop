import { products } from "./shopProducts";
import { Shop } from "../models/shop.model";

const shops: Shop[] = [
    {
        name: "Test Shop Handy",
        id: "public:5209d6ea-1a6e-11ea-9f8d-778f0ad9137f",
        secret: "secret:test-phone-secret",
        products: [
            { ...products.smartphones.bapple_x, deviceClasses: 'Smartphone' },
            { ...products.smartphones.flash_handy_se, deviceClasses: 'Smartphone,Mobilfunk' },
        ],
    },
    {
        name: "B.O.C.",
        id: "public:5a576bd2-1953-4d20-80de-4de00d65fdc7",
        secret: "secret:test-bike-secret",
        image: "https://www.boc24.de/1368410b715a88a5afd2885bb489ab27b03d77f1/assets/boc/images/logo.png",
        products: [
            { ...products.bikes.mega_bike_3000_pro, deviceClasses: 'Bike,Fahrrad' },
            { ...products.bikes.e_bike_super5, deviceClasses: 'Premium,E-Bike,Pedelecs' },
        ],
    },
    {
        name: "Test Shop",
        id: "public:b9f303d0-74e1-11ea-b9e9-034d1bd36e8d",
        secret: "secret:test-handyflash-secret",
        products: [
            { ...products.smartphones.bapple_x, deviceClasses: 'Smartphone' },
            { ...products.smartphones.flash_handy_se, deviceClasses: 'Smartphone,Mobilfunk' },
            { ...products.bikes.mega_bike_3000_pro, deviceClasses: 'Bike,Fahrrad' },
            { ...products.bikes.e_bike_super5, deviceClasses: 'Premium,E-Bike,Pedelecs' },
            { ...products.electronics.lg_c9_oled, deviceClasses: '332,5080,4983' }
        ],
    },
    {
        name: "Clevertronic",
        id: "public:76b31bb2-c4f7-11ea-9487-6fcbeb12db26",
        secret: "secret:test-ce-secret",
        image: 'https://www.clevertronic.de/img/xlogo.png.pagespeed.ic.Z641NjDGpa.webp',
        products: [
            { ...products.smartphones.bapple_x, deviceClasses: '332,460' },
            { ...products.smartphones.flash_handy_se, deviceClasses: '332,460' },
            { ...products.electronics.lg_c9_oled, deviceClasses: '332,5080,4983' }
        ],
    },
];


export default shops