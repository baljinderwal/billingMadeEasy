import express from 'express';
import { ReferralController } from '../controllers/ReferralController';
import { authenticate, authorize } from '@billing/middleware';

const router = express.Router();

router.use(authenticate);

router.get('/', ReferralController.getReferrals);
router.get('/my-referrals', ReferralController.getMyReferrals);
router.get('/:code/validate', ReferralController.validateReferralCode);
router.post('/generate', ReferralController.generateReferralCode);
router.post('/:code/apply', ReferralController.applyReferralCode);

export default router;
