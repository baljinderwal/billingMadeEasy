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
const promotionSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String },
    type: {
        type: String,
        enum: ['discount', 'bogo', 'flash_sale', 'bundle', 'shipping'],
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'scheduled', 'expired'],
        default: 'inactive'
    },
    rules: {
        discountType: { type: String, enum: ['percentage', 'fixed'] },
        discountValue: { type: Number },
        minimumAmount: { type: Number },
        maximumDiscount: { type: Number },
        buyQuantity: { type: Number },
        getQuantity: { type: Number },
        applicableProducts: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Product' }],
        applicableCategories: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Category' }],
        excludedProducts: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Product' }]
    },
    schedule: {
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        timezone: { type: String, default: 'UTC' }
    },
    usage: {
        totalLimit: { type: Number },
        userLimit: { type: Number },
        usedCount: { type: Number, default: 0 }
    },
    priority: { type: Number, default: 0 },
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true }
}, {
    timestamps: true
});
promotionSchema.index({ status: 1, type: 1 });
promotionSchema.index({ 'schedule.startDate': 1, 'schedule.endDate': 1 });
promotionSchema.index({ priority: -1 });
exports.default = mongoose_1.default.model('Promotion', promotionSchema);
//# sourceMappingURL=Promotion.js.map