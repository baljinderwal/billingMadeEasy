import express from 'express';
import { CommissionController } from '../controllers/CommissionController';
import { authenticate, authorize } from '@billing/middleware';

const router = express.Router();

router.use(authenticate);

router.get('/', CommissionController.getCommissions);
router.get('/my-commissions', CommissionController.getMyCommissions);
router.get('/:id', CommissionController.getCommissionById);
router.post('/calculate', CommissionController.calculateCommission);
router.put('/:id/status', authorize(['admin']), CommissionController.updateCommissionStatus);

export default router;
