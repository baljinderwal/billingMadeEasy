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
exports.UserLoyalty = exports.LoyaltyProgram = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const loyaltyProgramSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    tiers: [{
            name: { type: String, required: true },
            minPoints: { type: Number, required: true },
            benefits: {
                discountPercentage: { type: Number },
                freeShipping: { type: Boolean, default: false },
                earlyAccess: { type: Boolean, default: false },
                specialSupport: { type: Boolean, default: false }
            }
        }],
    pointsConfig: {
        earnRate: { type: Number, required: true },
        redemptionRate: { type: Number, required: true },
        expiryDays: { type: Number }
    },
    rules: {
        minOrderValue: { type: Number },
        maxPointsPerOrder: { type: Number },
        excludedCategories: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Category' }]
    }
}, {
    timestamps: true
});
const userLoyaltySchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    programId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'LoyaltyProgram', required: true },
    points: { type: Number, default: 0 },
    tier: { type: String, required: true },
    totalEarned: { type: Number, default: 0 },
    totalRedeemed: { type: Number, default: 0 },
    transactions: [{
            type: { type: String, enum: ['earned', 'redeemed', 'expired'], required: true },
            points: { type: Number, required: true },
            orderId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Order' },
            description: { type: String, required: true },
            date: { type: Date, default: Date.now }
        }]
}, {
    timestamps: true
});
userLoyaltySchema.index({ userId: 1, programId: 1 }, { unique: true });
exports.LoyaltyProgram = mongoose_1.default.model('LoyaltyProgram', loyaltyProgramSchema);
exports.UserLoyalty = mongoose_1.default.model('UserLoyalty', userLoyaltySchema);
//# sourceMappingURL=LoyaltyProgram.js.map