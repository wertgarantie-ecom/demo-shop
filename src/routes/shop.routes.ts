import express from "express";
import _shop from '../services/shop.service';
import _cart from '../services/cart.service';
import { getDashboard } from "../services/dashboard.service"

const router = express.Router();

// Shop and product
router.get('/', _shop.getShops);
router.get('/shop/:clientId', _shop.getShopById);
router.get('/shop/:clientId/:productId/:variantId?', _shop.getProductById);

// Cart
router.get('/cart', _cart.getShoppingCart);
router.post('/cart', _cart.addItemToShoppingCart);
router.post('/cart/delete', _cart.deleteItemFromShoppingCart);

// Checkout
router.post('/checkout', _cart.checkout);

// dashboard
router.get('/dashboard', getDashboard)

export default router;