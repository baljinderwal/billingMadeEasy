import express from 'express';
import { AuthController } from '../controllers/AuthController';
import { validateBody, authLimiter } from '@billing/middleware';
import { userValidation } from '@billing/utils';

const router = express.Router();

router.post('/register', authLimiter, validateBody(userValidation.register), AuthController.register);
router.post('/login', authLimiter, validateBody(userValidation.login), AuthController.login);
router.post('/refresh', AuthController.refreshToken);
router.post('/logout', AuthController.logout);
router.post('/forgot-password', authLimiter, AuthController.forgotPassword);
router.post('/reset-password', authLimiter, AuthController.resetPassword);
router.post('/verify-email', AuthController.verifyEmail);
router.post('/resend-verification', authLimiter, AuthController.resendVerification);

export default router;
