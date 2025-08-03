"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const notificationSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    type: {
        type: String,
        enum: ['order', 'payment', 'shipping', 'marketing', 'system'],
        required: true
    },
    channel: {
        type: String,
        enum: ['email', 'sms', 'push', 'in_app'],
        required: true
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    data: { type: mongoose_1.Schema.Types.Mixed },
    status: {
        type: String,
        enum: ['pending', 'sent', 'delivered', 'failed', 'read'],
        default: 'pending'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'urgent'],
        default: 'medium'
    },
    scheduledAt: { type: Date },
    sentAt: { type: Date },
    readAt: { type: Date },
    metadata: {
        campaignId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Campaign' },
        orderId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Order' },
        templateId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Template' }
    }
}, {
    timestamps: true
});
notificationSchema.index({ userId: 1, status: 1 });
notificationSchema.index({ type: 1, channel: 1 });
notificationSchema.index({ scheduledAt: 1 });
notificationSchema.index({ priority: 1, status: 1 });
exports.default = mongoose_1.default.model('Notification', notificationSchema);
//# sourceMappingURL=Notification.js.map