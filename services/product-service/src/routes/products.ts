import express from 'express';
import { ProductController } from '../controllers/ProductController';
import { authenticateToken, optionalAuth, validateBody, validateQuery, validateParams, idParamSchema, paginationSchema } from '@billing/middleware';
import { productValidation } from '@billing/utils';

const router = express.Router();

router.get('/', validateQuery(paginationSchema), ProductController.getProducts);
router.get('/search', validateQuery(paginationSchema), ProductController.searchProducts);
router.get('/:id', validateParams(idParamSchema), ProductController.getProductById);
router.get('/slug/:slug', ProductController.getProductBySlug);

router.post('/', authenticateToken, validateBody(productValidation.create), ProductController.createProduct);
router.put('/:id', authenticateToken, validateParams(idParamSchema), validateBody(productValidation.update), ProductController.updateProduct);
router.delete('/:id', authenticateToken, validateParams(idParamSchema), ProductController.deleteProduct);

router.post('/:id/images', authenticateToken, validateParams(idParamSchema), ProductController.uploadImages);
router.delete('/:id/images/:imageId', authenticateToken, validateParams(idParamSchema), ProductController.deleteImage);

router.post('/:id/variants', authenticateToken, validateParams(idParamSchema), ProductController.addVariant);
router.put('/:id/variants/:variantId', authenticateToken, validateParams(idParamSchema), ProductController.updateVariant);
router.delete('/:id/variants/:variantId', authenticateToken, validateParams(idParamSchema), ProductController.deleteVariant);

export default router;
