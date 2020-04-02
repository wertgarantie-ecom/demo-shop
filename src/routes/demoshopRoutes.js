var express = require('express');
var router = express.Router();
var demoShopController = require('../controllers/demoShopController.js');

router.get("/demoshop", demoShopController.redirectToIndex);
router.get("/", demoShopController.showShopIndex);
router.get("/shoppingCart", demoShopController.showShoppingCart);
router.get("/shoppingCartCookie", demoShopController.showShoppingCartCookie);
router.post("/addToShoppingCart", demoShopController.addProductToShoppingCart);
router.get("/newShoppingCartItem", demoShopController.newShoppingCartItem);
router.post("/checkout", demoShopController.checkout);
router.get("/insurances", demoShopController.insurances);
router.get("/clientConfig", demoShopController.showClientConfigPage);

module.exports = router;