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
const vendorSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    businessName: { type: String, required: true },
    businessType: {
        type: String,
        enum: ['individual', 'company', 'partnership'],
        required: true
    },
    contactPerson: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true }
    },
    businessAddress: {
        type: { type: String, enum: ['home', 'work', 'other'], default: 'work' },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        phone: { type: String, required: true },
        addressLine1: { type: String, required: true },
        addressLine2: { type: String },
        city: { type: String, required: true },
        state: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
        isDefault: { type: Boolean, default: true }
    },
    documents: {
        gst: { type: String },
        pan: { type: String },
        bankAccount: {
            accountNumber: { type: String, required: true },
            ifscCode: { type: String, required: true },
            accountHolderName: { type: String, required: true },
            bankName: { type: String, required: true }
        },
        businessLicense: { type: String }
    },
    kycStatus: {
        type: String,
        enum: ['pending', 'under_review', 'approved', 'rejected'],
        default: 'pending'
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'suspended'],
        default: 'inactive'
    },
    commission: {
        type: { type: String, enum: ['percentage', 'fixed'], default: 'percentage' },
        value: { type: Number, required: true },
        categoryOverrides: [{
                categoryId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Category' },
                value: { type: Number }
            }]
    },
    storeInfo: {
        name: { type: String, required: true },
        description: { type: String },
        logo: { type: String },
        banner: { type: String },
        slug: { type: String, required: true, unique: true }
    },
    ratings: {
        average: { type: Number, default: 0 },
        count: { type: Number, default: 0 }
    },
    totalSales: { type: Number, default: 0 },
    totalOrders: { type: Number, default: 0 }
}, {
    timestamps: true
});
vendorSchema.index({ userId: 1 });
vendorSchema.index({ kycStatus: 1, status: 1 });
vendorSchema.index({ 'storeInfo.slug': 1 });
vendorSchema.index({ businessType: 1 });
exports.default = mongoose_1.default.model('Vendor', vendorSchema);
//# sourceMappingURL=Vendor.js.map