import express from 'express';
import { TemplateController } from '../controllers/TemplateController';
import { authenticate, authorize } from '@billing/middleware';

const router = express.Router();

router.use(authenticate);

router.get('/', TemplateController.getTemplates);
router.get('/:id', TemplateController.getTemplateById);
router.post('/', authorize(['admin']), TemplateController.createTemplate);
router.put('/:id', authorize(['admin']), TemplateController.updateTemplate);
router.delete('/:id', authorize(['admin']), TemplateController.deleteTemplate);
router.post('/:id/preview', TemplateController.previewTemplate);

export default router;
