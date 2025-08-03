import express from 'express';
import { PaymentController } from '../controllers/PaymentController';
import { authenticateToken, validateBody, validateQuery, validateParams, idParamSchema, paginationSchema } from '@billing/middleware';

const router = express.Router();

router.get('/', authenticateToken, validateQuery(paginationSchema), PaymentController.getPayments);
router.get('/:id', authenticateToken, validateParams(idParamSchema), PaymentController.getPaymentById);

router.post('/create', authenticateToken, PaymentController.createPayment);
router.post('/verify', PaymentController.verifyPayment);
router.post('/webhook/razorpay', PaymentController.razorpayWebhook);
router.post('/webhook/stripe', PaymentController.stripeWebhook);

router.post('/:id/refund', authenticateToken, validateParams(idParamSchema), PaymentController.initiateRefund);
router.get('/:id/status', PaymentController.getPaymentStatus);

router.get('/methods/available', PaymentController.getAvailablePaymentMethods);

export default router;
