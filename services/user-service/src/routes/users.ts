import express from 'express';
import { UserController } from '../controllers/UserController';
import { authenticateToken, validateBody, validateParams, idParamSchema } from '@billing/middleware';
import { userValidation } from '@billing/utils';

const router = express.Router();

router.get('/profile', authenticateToken, UserController.getProfile);
router.put('/profile', authenticateToken, validateBody(userValidation.updateProfile), UserController.updateProfile);
router.delete('/profile', authenticateToken, UserController.deleteAccount);
router.get('/:id', authenticateToken, validateParams(idParamSchema), UserController.getUserById);

export default router;
