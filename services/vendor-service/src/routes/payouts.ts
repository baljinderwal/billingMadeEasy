import express from 'express';
import { PayoutController } from '../controllers/PayoutController';
import { authenticate, authorize } from '../../../../shared/middleware/dist/index.js';

const router = express.Router();

router.use(authenticate);

router.get('/', PayoutController.getPayouts);
router.get('/my-payouts', PayoutController.getMyPayouts);
router.get('/:id', PayoutController.getPayoutById);
router.post('/', authorize(['admin']), PayoutController.createPayout);
router.put('/:id/process', authorize(['admin']), PayoutController.processPayout);
router.put('/:id/complete', authorize(['admin']), PayoutController.completePayout);

export default router;
