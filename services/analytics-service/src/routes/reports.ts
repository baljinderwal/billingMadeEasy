import express from 'express';
import { ReportsController } from '../controllers/ReportsController';
import { authenticate, authorize } from '@billing/middleware';

const router = express.Router();

router.use(authenticate);

router.get('/', ReportsController.getReports);
router.get('/sales', ReportsController.getSalesReport);
router.get('/inventory', ReportsController.getInventoryReport);
router.get('/customers', ReportsController.getCustomerReport);
router.get('/vendors', ReportsController.getVendorReport);
router.post('/generate', authorize(['admin', 'manager']), ReportsController.generateReport);
router.get('/:id/download', ReportsController.downloadReport);

export default router;
