import express from 'express';
import { VendorController } from '../controllers/VendorController';
import { authenticate, authorize } from '@billing/middleware';

const router = express.Router();

router.use(authenticate);

router.get('/', VendorController.getVendors);
router.get('/my-vendor', VendorController.getMyVendor);
router.get('/:id', VendorController.getVendorById);
router.post('/', VendorController.createVendor);
router.put('/:id', VendorController.updateVendor);
router.put('/:id/kyc-status', authorize(['admin']), VendorController.updateKycStatus);
router.put('/:id/status', authorize(['admin']), VendorController.updateStatus);
router.get('/:id/analytics', VendorController.getVendorAnalytics);
router.get('/:id/products', VendorController.getVendorProducts);
router.get('/:id/orders', VendorController.getVendorOrders);

export default router;
