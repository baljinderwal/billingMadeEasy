import { Request, Response } from 'express';
import { ResponseUtils, DatabaseUtils } from '@billing/utils';
import { asyncHandler } from '@billing/middleware';
import Notification from '../models/Notification';

export class NotificationController {
  static getNotifications = asyncHandler(async (req: Request, res: Response) => {
    const { page = 1, limit = 20, type, status, channel } = req.query;
    
    const filter: any = {};
    if (type) filter.type = type;
    if (status) filter.status = status;
    if (channel) filter.channel = channel;

    const skip = (Number(page) - 1) * Number(limit);
    
    const [notifications, total] = await Promise.all([
      Notification.find(filter)
        .populate('userId', 'firstName lastName email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .lean(),
      Notification.countDocuments(filter)
    ]);

    res.json(ResponseUtils.paginated(notifications, Number(page), Number(limit), total, 'Notifications retrieved successfully'));
  });

  static getMyNotifications = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    const { page = 1, limit = 20, status } = req.query;
    
    const filter: any = { userId };
    if (status) filter.status = status;

    const skip = (Number(page) - 1) * Number(limit);
    
    const [notifications, total] = await Promise.all([
      Notification.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .lean(),
      Notification.countDocuments(filter)
    ]);

    res.json(ResponseUtils.paginated(notifications, Number(page), Number(limit), total, 'My notifications retrieved successfully'));
  });

  static getNotificationById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!DatabaseUtils.isValidObjectId(id)) {
      return res.status(400).json(ResponseUtils.error('Invalid notification ID'));
    }

    const notification = await Notification.findById(id)
      .populate('userId', 'firstName lastName email')
      .lean();

    if (!notification) {
      return res.status(404).json(ResponseUtils.error('Notification not found'));
    }

    res.json(ResponseUtils.success(notification, 'Notification retrieved successfully'));
  });

  static createNotification = asyncHandler(async (req: Request, res: Response) => {
    const notificationData = req.body;

    const notification = new Notification(notificationData);
    await notification.save();

    const populatedNotification = await Notification.findById(notification._id)
      .populate('userId', 'firstName lastName email')
      .lean();

    res.status(201).json(ResponseUtils.success(populatedNotification, 'Notification created successfully'));
  });

  static sendNotification = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.body;

    if (!DatabaseUtils.isValidObjectId(id)) {
      return res.status(400).json(ResponseUtils.error('Invalid notification ID'));
    }

    const notification = await Notification.findByIdAndUpdate(
      id,
      { 
        status: 'sent',
        sentAt: new Date()
      },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json(ResponseUtils.error('Notification not found'));
    }

    res.json(ResponseUtils.success(notification, 'Notification sent successfully'));
  });

  static markAsRead = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user?.userId;

    if (!DatabaseUtils.isValidObjectId(id)) {
      return res.status(400).json(ResponseUtils.error('Invalid notification ID'));
    }

    const notification = await Notification.findOneAndUpdate(
      { _id: id, userId },
      { 
        status: 'read',
        readAt: new Date()
      },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json(ResponseUtils.error('Notification not found'));
    }

    res.json(ResponseUtils.success(notification, 'Notification marked as read'));
  });

  static updateStatus = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!DatabaseUtils.isValidObjectId(id)) {
      return res.status(400).json(ResponseUtils.error('Invalid notification ID'));
    }

    const notification = await Notification.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json(ResponseUtils.error('Notification not found'));
    }

    res.json(ResponseUtils.success(notification, 'Notification status updated successfully'));
  });

  static deleteNotification = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!DatabaseUtils.isValidObjectId(id)) {
      return res.status(400).json(ResponseUtils.error('Invalid notification ID'));
    }

    const notification = await Notification.findByIdAndDelete(id);

    if (!notification) {
      return res.status(404).json(ResponseUtils.error('Notification not found'));
    }

    res.json(ResponseUtils.success(null, 'Notification deleted successfully'));
  });
}
