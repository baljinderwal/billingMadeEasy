import express from 'express';
import { CartController } from '../controllers/CartController';
import { authenticateToken, optionalAuth, validateBody, validateParams, idParamSchema } from '../../../shared/middleware/dist/index.js';

const router = express.Router();

router.get('/', optionalAuth, CartController.getCart);
router.post('/items', optionalAuth, CartController.addItem);
router.put('/items/:itemId', optionalAuth, validateParams(idParamSchema), CartController.updateItem);
router.delete('/items/:itemId', optionalAuth, validateParams(idParamSchema), CartController.removeItem);
router.delete('/clear', optionalAuth, CartController.clearCart);

router.post('/apply-coupon', optionalAuth, CartController.applyCoupon);
router.delete('/remove-coupon', optionalAuth, CartController.removeCoupon);

router.post('/save-for-later/:itemId', authenticateToken, validateParams(idParamSchema), CartController.saveForLater);
router.post('/move-to-cart/:itemId', authenticateToken, validateParams(idParamSchema), CartController.moveToCart);

router.post('/merge', authenticateToken, CartController.mergeGuestCart);

export default router;
