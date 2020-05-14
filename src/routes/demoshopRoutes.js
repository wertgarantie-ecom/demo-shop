var express = require('express');
var router = express.Router();
var demoShopController = require('../controllers/demoShopController');
var productController = require('../controllers/productController');
var checkoutController = require('../controllers/checkoutController');
var shoppingCartController = require('../controllers/shoppingCartController');

router.get("/demoshop", productController.redirectToIndex);
router.get("/", productController.redirectToIndex);
router.get("/products", productController.showShopIndex);
router.get("/products/:productId", productController.showProduct);
router.get("/shoppingCart", shoppingCartController.showShoppingCart);
router.get("/shoppingCartCookie", shoppingCartController.showShoppingCartCookie);
router.post("/addToShoppingCart", shoppingCartController.addProductToShoppingCart);
router.post("/changeVariant", shoppingCartController.changeVariant);
//router.get("/newShoppingCartItem", demoShopController.newShoppingCartItem); // currently not used
router.post("/checkout", checkoutController.checkout);
router.get("/insurances", demoShopController.insurances);
router.get("/clientConfig", demoShopController.showClientConfigPage);

module.exports = router;