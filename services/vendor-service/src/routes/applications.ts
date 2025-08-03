import express from 'express';
import { ApplicationController } from '../controllers/ApplicationController';
import { authenticate, authorize } from '@billing/middleware';

const router = express.Router();

router.use(authenticate);

router.get('/', authorize(['admin']), ApplicationController.getApplications);
router.get('/:id', ApplicationController.getApplicationById);
router.post('/', ApplicationController.createApplication);
router.put('/:id/review', authorize(['admin']), ApplicationController.reviewApplication);
router.put('/:id/approve', authorize(['admin']), ApplicationController.approveApplication);
router.put('/:id/reject', authorize(['admin']), ApplicationController.rejectApplication);

export default router;
