import { products } from './shopProducts';
import {Shop} from "../models/shop.model"

const shops: Shop[] = [
    // {
    //     name: "B.O.C.",
    //     id: "public:571277d9-aee8-4abd-89f5-b41fdf7264a4",
    //     secret: process.env.SECRET_BOC || '',
    //     image: "https://www.boc24.de/1368410b715a88a5afd2885bb489ab27b03d77f1/assets/boc/images/logo.png",
    //     products: [
    //         {...products.bikes.mega_bike_3000_pro, deviceClasses: 'Bike,Fahrrad'},
    //         {...products.bikes.e_bike_super5, deviceClasses: 'Premium,E-Bike,Pedelecs'}
    //     ]
    // },
    {
        name: "B.O.C. (Demoshop)",
        id: "public:7f5183d4-99cb-47d5-9b0e-5576e0a6ef8e",
        secret: process.env.SECRET_BOC_DEMO || '',
        image: "https://www.boc24.de/1368410b715a88a5afd2885bb489ab27b03d77f1/assets/boc/images/logo.png",
        products: [
            {...products.bikes.mega_bike_3000_pro, deviceClasses: 'Bike,Fahrrad'},
            {...products.bikes.e_bike_super5, deviceClasses: 'Premium,E-Bike,Pedelecs'}
        ]
    },
    {
        name: "WeCycle (Demoshop)",
        id: "public:e9314854-4811-4237-aa8b-bd91144d01f2",
        secret: process.env.SECRET_BOC_DEMO || '',
        image: "https://www.wecycle.de/out/wecycle/img/logo.png",
        products: [
            {...products.bikes.mega_bike_3000_pro, deviceClasses: 'Bike,Fahrrad'},
            {...products.bikes.e_bike_super5, deviceClasses: 'Premium,E-Bike,Pedelecs'}
        ]
    },
    // {
    //     name: "bikemarket24",
    //     id: "public:3addd4b4-dca5-45c7-b8a9-64b9cfbd95cd",
    //     secret: process.env.SECRET_BIKEMARKET24 || '',
    //     image: "https://www.bikemarket24.de/pub/media/logo/stores/1/logo_bm.png",
    //     products: [
    //         {...products.bikes.mega_bike_3000_pro, deviceClasses: 'Bike,Fahrrad'},
    //         {...products.bikes.e_bike_super5, deviceClasses: 'Premium,E-Bike,Pedelecs'}
    //     ]
    // },
    // {
    //     name: "Lucky Bike",
    //     id: "public:0d735b7d-dcce-46a7-9238-54540b699339",
    //     secret: process.env.SECRET_LUCKYBIKE || '',
    //     image: "https://www.lucky-bike.de/out/rocket/img/LUC_Logo_zweizeilig_RGB.svg",
    //     products: [
    //         {...products.bikes.mega_bike_3000_pro, deviceClasses: 'Bike,Fahrrad'},
    //         {...products.bikes.e_bike_super5, deviceClasses: 'Premium,E-Bike,Pedelecs'}
    //     ]
    // },
    {
        name: "Test Shop",
        id: "public:9fc8764e-75a3-11ea-a64e-0b231b5109b9",
        secret: process.env.SECRET_TESTSHOP || '',
        products: [
            {...products.bikes.mega_bike_3000_pro, deviceClasses: 'Bike,Fahrrad'},
            {...products.bikes.e_bike_super5, deviceClasses: 'Premium,E-Bike,Pedelecs'},
            {...products.electronics.lg_c9_oled, deviceClasses: 'Smartphone,TV'},
            {...products.smartphones.bapple_x, deviceClasses: 'Smartphone'},
            {...products.smartphones.flash_handy_se, deviceClasses: 'Smartphone,Mobilfunk'}
        ]
    },
    // {
    //     name: "cwmobile",
    //     id: "public:b87b6806-ae3b-4402-b5f4-65ea322f8df6",
    //     secret: process.env.SECRET_CWMOBILE || '',
    //     products: [
    //         {...products.smartphones.bapple_x, deviceClasses: 'Smartphone'},
    //         {...products.smartphones.flash_handy_se, deviceClasses: 'Smartphone,Mobilfunk'}
    //     ]
    // },
    // {
    //     name: "Clevertronic",
    //     id: "public:ef9d6d7a-00c7-4209-8582-a2106ed8d0e3",
    //     secret: process.env.SECRET_CLEVERTRONIC || '',
    //     image: "https://www.clevertronic.de/img/xlogo.png.pagespeed.ic.Z641NjDGpa.webp",
    //     products: [
    //         {...products.smartphones.bapple_x, deviceClasses: 'Smartphone'},
    //         {...products.smartphones.flash_handy_se, deviceClasses: 'Smartphone,Mobilfunk'},
    //         {...products.electronics.lg_c9_oled, deviceClasses: '332,5080,4983'}
    //     ]
    // }
]

export default shops;