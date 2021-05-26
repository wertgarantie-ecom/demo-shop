import { products } from './config.products';
import { Shop } from "../models/shop.model"
import { COLORS } from './config.colors';


/**
 * README
 * All shops are applicable to all environments. 
 * If a shop has no ID and SECRET in the environments respective .ENV-File it is not loaded for that environment.
 * Therefore if you need a shop e.g. only for local, append it to the list and add ID+SECRET to the local.env
 */

const shops: Shop[] = [
    {
        name: "B.O.C.",
        id: process.env.BOC_ID || '',
        secret: process.env.BOC_SECRET || '',
        image: "https://www.boc24.de/1368410b715a88a5afd2885bb489ab27b03d77f1/assets/boc/images/logo.png",
        colors: COLORS.boc,
        products: [
            { ...products.bikes.mega_bike_3000_pro, deviceClasses: 'Bike' },
            { ...products.bikes.e_bike_super5, deviceClasses: 'E-Bike' }
        ],
    },
    {
        name: "WeCycle",
        id: process.env.WECYCLE_ID || '',
        secret: process.env.WECYCLE_SECRET || '',
        image: "https://www.wecycle.de/out/wecycle/img/logo.png",
        colors: COLORS.wecycle,
        products: [
            { ...products.bikes.mega_bike_3000_pro, deviceClasses: 'Bike' },
            { ...products.bikes.e_bike_super5, deviceClasses: 'E-Bike' }
        ],
    },
    {
        name: "Radhaus Ingolstadt",
        id: process.env.RADHAUS_INGOLSTADT_ID || '',
        secret: process.env.RADHAUS_INGOLSTADT_SECRET || '',
        image: "https://radhaus.de/pub/media/logo/stores/1/logo.png",
        colors: COLORS.radhaus_ingolstadt,
        products: [
            { ...products.bikes.mega_bike_3000_pro, deviceClasses: 'Bike' },
            { ...products.bikes.e_bike_super5, deviceClasses: 'E-Bike' }
        ],
    },
    {
        name: "Clevertronic",
        id: process.env.CLEVERTRONIC_ID || '',
        secret: process.env.CLEVERTRONIC_SECRET || '',
        image: "https://www.clevertronic.de/img/xlogo.png.pagespeed.ic.Z641NjDGpa.webp",
        colors: COLORS.clevertronic,
        products: [
            { ...products.smartphones.bapple_x, deviceClasses: 'Smartphone', condition: "0" },
            { ...products.smartphones.flash_handy_se, deviceClasses: 'Smartphone,Mobilfunk', condition: "11" },
            { ...products.electronics.lg_c9_oled, deviceClasses: '332,5080,4983', condition: "0" }
        ]
    },
    {
        name: "cwmobile",
        id: process.env.CWMOBILE_ID || '',
        secret: process.env.CWMOBILE_SECRET || '',
        colors: COLORS.cwmobile,
        products: [
            {...products.smartphones.bapple_x, deviceClasses: '9025'},
            {...products.smartphones.flash_handy_se, deviceClasses: '9025'}
        ]
    },
    {
        name: "bikemarket24",
        id: process.env.BIKEMARKET24_ID || '',
        secret: process.env.BIKEMARKET24_SECRET || '',
        image: "https://www.bikemarket24.de/pub/media/logo/stores/1/logo_bm.png",
        colors: COLORS.bikemarket24,
        products: [
            {...products.bikes.mega_bike_3000_pro, deviceClasses: 'Bike,Fahrrad'},
            {...products.bikes.e_bike_super5, deviceClasses: 'Premium,E-Bike,Pedelecs'}
        ]
    },
]

export default shops;