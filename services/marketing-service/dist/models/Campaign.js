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
const campaignSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String },
    type: {
        type: String,
        enum: ['email', 'sms', 'push', 'social'],
        required: true
    },
    status: {
        type: String,
        enum: ['draft', 'scheduled', 'active', 'paused', 'completed'],
        default: 'draft'
    },
    targetAudience: {
        userSegments: [{ type: String }],
        categories: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Category' }],
        minOrderValue: { type: Number },
        lastPurchaseDate: { type: Date },
        loyaltyTier: [{ type: String }]
    },
    content: {
        subject: { type: String },
        message: { type: String, required: true },
        template: { type: String },
        images: [{ type: String }],
        cta: {
            text: { type: String },
            url: { type: String }
        }
    },
    schedule: {
        startDate: { type: Date, required: true },
        endDate: { type: Date },
        timezone: { type: String, default: 'UTC' },
        frequency: {
            type: String,
            enum: ['once', 'daily', 'weekly', 'monthly'],
            default: 'once'
        }
    },
    metrics: {
        sent: { type: Number, default: 0 },
        delivered: { type: Number, default: 0 },
        opened: { type: Number, default: 0 },
        clicked: { type: Number, default: 0 },
        converted: { type: Number, default: 0 },
        revenue: { type: Number, default: 0 }
    },
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true }
}, {
    timestamps: true
});
campaignSchema.index({ status: 1, type: 1 });
campaignSchema.index({ 'schedule.startDate': 1, 'schedule.endDate': 1 });
exports.default = mongoose_1.default.model('Campaign', campaignSchema);
//# sourceMappingURL=Campaign.js.map