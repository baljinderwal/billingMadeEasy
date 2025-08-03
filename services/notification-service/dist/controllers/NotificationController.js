"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationController = void 0;
const utils_1 = require("@billing/utils");
const middleware_1 = require("@billing/middleware");
const Notification_1 = __importDefault(require("../models/Notification"));
class NotificationController {
}
exports.NotificationController = NotificationController;
_a = NotificationController;
NotificationController.getNotifications = (0, middleware_1.asyncHandler)(async (req, res) => {
    const { page = 1, limit = 20, type, status, channel } = req.query;
    const filter = {};
    if (type)
        filter.type = type;
    if (status)
        filter.status = status;
    if (channel)
        filter.channel = channel;
    const skip = (Number(page) - 1) * Number(limit);
    const [notifications, total] = await Promise.all([
        Notification_1.default.find(filter)
            .populate('userId', 'firstName lastName email')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit))
            .lean(),
        Notification_1.default.countDocuments(filter)
    ]);
    res.json(utils_1.ResponseUtils.paginated(notifications, Number(page), Number(limit), total, 'Notifications retrieved successfully'));
});
NotificationController.getMyNotifications = (0, middleware_1.asyncHandler)(async (req, res) => {
    const userId = req.user?.userId;
    const { page = 1, limit = 20, status } = req.query;
    const filter = { userId };
    if (status)
        filter.status = status;
    const skip = (Number(page) - 1) * Number(limit);
    const [notifications, total] = await Promise.all([
        Notification_1.default.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit))
            .lean(),
        Notification_1.default.countDocuments(filter)
    ]);
    res.json(utils_1.ResponseUtils.paginated(notifications, Number(page), Number(limit), total, 'My notifications retrieved successfully'));
});
NotificationController.getNotificationById = (0, middleware_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    if (!utils_1.DatabaseUtils.isValidObjectId(id)) {
        res.status(400).json(utils_1.ResponseUtils.error('Invalid notification ID'));
        return;
    }
    const notification = await Notification_1.default.findById(id)
        .populate('userId', 'firstName lastName email')
        .lean();
    if (!notification) {
        res.status(404).json(utils_1.ResponseUtils.error('Notification not found'));
        return;
    }
    res.json(utils_1.ResponseUtils.success(notification, 'Notification retrieved successfully'));
});
NotificationController.createNotification = (0, middleware_1.asyncHandler)(async (req, res) => {
    const notificationData = req.body;
    const notification = new Notification_1.default(notificationData);
    await notification.save();
    const populatedNotification = await Notification_1.default.findById(notification._id)
        .populate('userId', 'firstName lastName email')
        .lean();
    res.status(201).json(utils_1.ResponseUtils.success(populatedNotification, 'Notification created successfully'));
});
NotificationController.sendNotification = (0, middleware_1.asyncHandler)(async (req, res) => {
    const { id } = req.body;
    if (!utils_1.DatabaseUtils.isValidObjectId(id)) {
        res.status(400).json(utils_1.ResponseUtils.error('Invalid notification ID'));
        return;
    }
    const notification = await Notification_1.default.findByIdAndUpdate(id, {
        status: 'sent',
        sentAt: new Date()
    }, { new: true });
    if (!notification) {
        res.status(404).json(utils_1.ResponseUtils.error('Notification not found'));
        return;
    }
    res.json(utils_1.ResponseUtils.success(notification, 'Notification sent successfully'));
});
NotificationController.markAsRead = (0, middleware_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const userId = req.user?.userId;
    if (!utils_1.DatabaseUtils.isValidObjectId(id)) {
        res.status(400).json(utils_1.ResponseUtils.error('Invalid notification ID'));
        return;
    }
    const notification = await Notification_1.default.findOneAndUpdate({ _id: id, userId }, {
        status: 'read',
        readAt: new Date()
    }, { new: true });
    if (!notification) {
        res.status(404).json(utils_1.ResponseUtils.error('Notification not found'));
        return;
    }
    res.json(utils_1.ResponseUtils.success(notification, 'Notification marked as read'));
});
NotificationController.updateStatus = (0, middleware_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    if (!utils_1.DatabaseUtils.isValidObjectId(id)) {
        res.status(400).json(utils_1.ResponseUtils.error('Invalid notification ID'));
        return;
    }
    const notification = await Notification_1.default.findByIdAndUpdate(id, { status }, { new: true });
    if (!notification) {
        res.status(404).json(utils_1.ResponseUtils.error('Notification not found'));
        return;
    }
    res.json(utils_1.ResponseUtils.success(notification, 'Notification status updated successfully'));
});
NotificationController.deleteNotification = (0, middleware_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    if (!utils_1.DatabaseUtils.isValidObjectId(id)) {
        res.status(400).json(utils_1.ResponseUtils.error('Invalid notification ID'));
        return;
    }
    const notification = await Notification_1.default.findByIdAndDelete(id);
    if (!notification) {
        res.status(404).json(utils_1.ResponseUtils.error('Notification not found'));
        return;
    }
    res.json(utils_1.ResponseUtils.success(null, 'Notification deleted successfully'));
});
//# sourceMappingURL=NotificationController.js.map