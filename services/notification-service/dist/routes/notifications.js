"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const NotificationController_1 = require("../controllers/NotificationController");
const middleware_1 = require("@billing/middleware");
const router = express_1.default.Router();
router.use(middleware_1.authenticate);
router.get('/', NotificationController_1.NotificationController.getNotifications);
router.get('/my-notifications', NotificationController_1.NotificationController.getMyNotifications);
router.get('/:id', NotificationController_1.NotificationController.getNotificationById);
router.post('/', (0, middleware_1.authorize)(['admin', 'system']), NotificationController_1.NotificationController.createNotification);
router.post('/send', (0, middleware_1.authorize)(['admin', 'system']), NotificationController_1.NotificationController.sendNotification);
router.put('/:id/read', NotificationController_1.NotificationController.markAsRead);
router.put('/:id/status', (0, middleware_1.authorize)(['admin', 'system']), NotificationController_1.NotificationController.updateStatus);
router.delete('/:id', (0, middleware_1.authorize)(['admin']), NotificationController_1.NotificationController.deleteNotification);
exports.default = router;
//# sourceMappingURL=notifications.js.map