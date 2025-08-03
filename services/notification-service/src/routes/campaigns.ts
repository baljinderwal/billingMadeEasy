import express from 'express';
import { CampaignController } from '../controllers/CampaignController';
import { authenticate, authorize } from '@billing/middleware';

const router = express.Router();

router.use(authenticate);

router.get('/', CampaignController.getCampaigns);
router.get('/:id', CampaignController.getCampaignById);
router.post('/', authorize(['admin', 'marketing']), CampaignController.createCampaign);
router.put('/:id', authorize(['admin', 'marketing']), CampaignController.updateCampaign);
router.delete('/:id', authorize(['admin', 'marketing']), CampaignController.deleteCampaign);
router.post('/:id/send', authorize(['admin', 'marketing']), CampaignController.sendCampaign);
router.get('/:id/stats', CampaignController.getCampaignStats);

export default router;
