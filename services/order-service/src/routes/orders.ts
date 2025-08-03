import express from 'express';
import { OrderController } from '../controllers/OrderController';
import { authenticateToken, validateBody, validateQuery, validateParams, idParamSchema, paginationSchema } from '@billing/middleware';

const router = express.Router();

router.get('/', authenticateToken, validateQuery(paginationSchema), OrderController.getOrders);
router.get('/:id', authenticateToken, validateParams(idParamSchema), OrderController.getOrderById);
router.get('/number/:orderNumber', authenticateToken, OrderController.getOrderByNumber);

router.post('/', authenticateToken, OrderController.createOrder);
router.put('/:id/status', authenticateToken, validateParams(idParamSchema), OrderController.updateOrderStatus);
router.put('/:id/shipping', authenticateToken, validateParams(idParamSchema), OrderController.updateShipping);

router.post('/:id/refund', authenticateToken, validateParams(idParamSchema), OrderController.requestRefund);
router.put('/:id/refund/:refundId', authenticateToken, validateParams(idParamSchema), OrderController.processRefund);

router.get('/:id/invoice', authenticateToken, validateParams(idParamSchema), OrderController.generateInvoice);
router.get('/:id/tracking', OrderController.getTrackingInfo);

export default router;
