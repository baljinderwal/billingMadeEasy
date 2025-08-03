import express from 'express';
import { AnalyticsController } from '../controllers/AnalyticsController';
import { authenticate, authorize } from '../../../../shared/middleware/dist/index.js';

const router = express.Router();

router.use(authenticate);

router.get('/', AnalyticsController.getAnalytics);
router.get('/sales', AnalyticsController.getSalesAnalytics);
router.get('/traffic', AnalyticsController.getTrafficAnalytics);
router.get('/conversion', AnalyticsController.getConversionAnalytics);
router.get('/products', AnalyticsController.getProductAnalytics);
router.get('/customers', AnalyticsController.getCustomerAnalytics);
router.post('/track', AnalyticsController.trackEvent);

export default router;
