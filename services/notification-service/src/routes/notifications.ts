import express from 'express';
import { NotificationController } from '../controllers/NotificationController';
import { authenticate, authorize } from '@billing/middleware';

const router = express.Router();

router.use(authenticate);

router.get('/', NotificationController.getNotifications);
router.get('/my-notifications', NotificationController.getMyNotifications);
router.get('/:id', NotificationController.getNotificationById);
router.post('/', authorize(['admin', 'system']), NotificationController.createNotification);
router.post('/send', authorize(['admin', 'system']), NotificationController.sendNotification);
router.put('/:id/read', NotificationController.markAsRead);
router.put('/:id/status', authorize(['admin', 'system']), NotificationController.updateStatus);
router.delete('/:id', authorize(['admin']), NotificationController.deleteNotification);

export default router;
