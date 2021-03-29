import { products } from './shopProducts';
import { Shop } from '../models/shop.model';

const shops: Shop[] = [
    // {
    //     name: 'B.O.C.',
    //     id: 'public:da569354-1f28-4bc6-935e-26b7c0ee1aac',
    //     secret: process.env.SECRET_BOC || '',
    //     image: 'https://www.boc24.de/1368410b715a88a5afd2885bb489ab27b03d77f1/assets/boc/images/logo.png',
    //     products: [
    //         { ...products.bikes.mega_bike_3000_pro, deviceClasses: 'Bike,Fahrrad' },
    //         { ...products.bikes.e_bike_super5, deviceClasses: 'Premium,E-Bike,Pedelecs' }
    //     ] 
    // },
    // {
    //     name: 'bikemarket24',
    //     id: 'public:667e5763-1059-4cc0-8973-16f6aa3e0570',
    //     secret: process.env.SECRET_BIKEMARKET24 || '',
    //     image: 'https://www.bikemarket24.de/pub/media/logo/stores/1/logo_bm.png',
    //     products: [
    //         { ...products.bikes.mega_bike_3000_pro, deviceClasses: 'Bike,Fahrrad' },
    //         { ...products.bikes.e_bike_super5, deviceClasses: 'Premium,E-Bike,Pedelecs' }
    //     ]
    // },
    // {
    //     name: 'Lucky Bike',
    //     id: 'public:0d735b7d-dcce-46a7-9238-54540b699339',
    //     secret: process.env.LUCKYBIKE || '',
    //     image: 'https://www.lucky-bike.de/out/rocket/img/LUC_Logo_zweizeilig_RGB.svg',
    //     products: [
    //         { ...products.bikes.mega_bike_3000_pro, deviceClasses: 'Bike,Fahrrad' },
    //         { ...products.bikes.e_bike_super5, deviceClasses: 'Premium,E-Bike,Pedelecs' }
    //     ]
    // },
    {
        name: 'Test Shop',
        id: 'public:b7751ffa-07bc-4947-b856-c7e7f68967e2',
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
    //     name: 'cwmobile',
    //     id: 'public:c537d6b8-a108-4d37-a836-98d8dd55b728',
    //     secret: process.env.SECRET_CWMOBILE || '',
    //     products: [
    //         { ...products.smartphones.bapple_x, deviceClasses: 'Smartphone' },
    //         { ...products.smartphones.flash_handy_se, deviceClasses: 'Smartphone,Mobilfunk' }
    //     ]
    // },
    // {
    //     name: 'Clevertronic',
    //     id: 'public:49c8c947-08d2-45fe-bbeb-6d72ecefab60',
    //     image: 'https://www.clevertronic.de/img/xlogo.png.pagespeed.ic.Z641NjDGpa.webp',
    //     secret: process.env.SECRET_CLEVERTRONIC || '',
    //     products: [
    //         { ...products.smartphones.bapple_x, deviceClasses: 'Smartphone' },
    //         { ...products.smartphones.flash_handy_se, deviceClasses: 'Smartphone,Mobilfunk' },
    //         { ...products.electronics.lg_c9_oled, deviceClasses: '332,5080,4983' }
    //     ]
    // }
];

export default shops;