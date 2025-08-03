import express from 'express';
import { CategoryController } from '../controllers/CategoryController';
import { authenticateToken, validateBody, validateQuery, validateParams, idParamSchema, paginationSchema } from '../../../../shared/middleware/dist/index.js';

const router = express.Router();

router.get('/', validateQuery(paginationSchema), CategoryController.getCategories);
router.get('/:id', validateParams(idParamSchema), CategoryController.getCategoryById);
router.get('/slug/:slug', CategoryController.getCategoryBySlug);

router.post('/', authenticateToken, CategoryController.createCategory);
router.put('/:id', authenticateToken, validateParams(idParamSchema), CategoryController.updateCategory);
router.delete('/:id', authenticateToken, validateParams(idParamSchema), CategoryController.deleteCategory);

export default router;
