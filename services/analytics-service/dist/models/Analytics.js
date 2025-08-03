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
const analyticsSchema = new mongoose_1.Schema({
    type: {
        type: String,
        enum: ['sales', 'traffic', 'conversion', 'product', 'customer'],
        required: true
    },
    period: {
        type: String,
        enum: ['hourly', 'daily', 'weekly', 'monthly'],
        required: true
    },
    date: { type: Date, required: true },
    metrics: {
        type: Map,
        of: Number,
        required: true
    },
    dimensions: {
        type: Map,
        of: mongoose_1.Schema.Types.Mixed,
        default: {}
    }
}, {
    timestamps: true
});
analyticsSchema.index({ type: 1, period: 1, date: 1 });
analyticsSchema.index({ date: -1 });
exports.default = mongoose_1.default.model('Analytics', analyticsSchema);
//# sourceMappingURL=Analytics.js.map