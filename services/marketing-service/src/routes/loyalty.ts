import express from 'express';
import { LoyaltyController } from '../controllers/LoyaltyController';
import { authenticate, authorize } from '../../../../shared/middleware/dist/index.js';

const router = express.Router();

router.use(authenticate);

router.get('/programs', LoyaltyController.getPrograms);
router.get('/my-loyalty', LoyaltyController.getMyLoyalty);
router.post('/programs', authorize(['admin']), LoyaltyController.createProgram);
router.put('/programs/:id', authorize(['admin']), LoyaltyController.updateProgram);
router.post('/earn', LoyaltyController.earnPoints);
router.post('/redeem', LoyaltyController.redeemPoints);
router.get('/transactions', LoyaltyController.getLoyaltyTransactions);

export default router;
