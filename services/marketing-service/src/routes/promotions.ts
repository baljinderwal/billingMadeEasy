import express from 'express';
import { PromotionController } from '../controllers/PromotionController';
import { authenticate, authorize } from '@billing/middleware';

const router = express.Router();

router.use(authenticate);

router.get('/', PromotionController.getPromotions);
router.get('/active', PromotionController.getActivePromotions);
router.get('/:id', PromotionController.getPromotionById);
router.post('/', authorize(['admin', 'marketing']), PromotionController.createPromotion);
router.put('/:id', authorize(['admin', 'marketing']), PromotionController.updatePromotion);
router.delete('/:id', authorize(['admin', 'marketing']), PromotionController.deletePromotion);
router.post('/:id/activate', authorize(['admin', 'marketing']), PromotionController.activatePromotion);
router.post('/:id/deactivate', authorize(['admin', 'marketing']), PromotionController.deactivatePromotion);

export default router;
