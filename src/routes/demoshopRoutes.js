var express = require('express');
var router = express.Router();
var demoShopController = require('../controllers/demoShopController');
var productController = require('../controllers/productController');
var checkoutController = require('../controllers/checkoutController');
var shoppingCartController = require('../controllers/shoppingCartController');

router.get("/demoshop", productController.redirectToIndex);
router.get("/", productController.showShopIndex);
router.get("/:productId", productController.showProduct);
router.get("/shoppingCart", shoppingCartController.showShoppingCart);
router.get("/shoppingCartCookie", shoppingCartController.showShoppingCartCookie);
router.post("/addToShoppingCart", shoppingCartController.addProductToShoppingCart);
//router.get("/newShoppingCartItem", demoShopController.newShoppingCartItem); // currently not used
router.post("/checkout", checkoutController.checkout);
router.get("/insurances", demoShopController.insurances);
router.get("/clientConfig", demoShopController.showClientConfigPage);

module.exports = router;