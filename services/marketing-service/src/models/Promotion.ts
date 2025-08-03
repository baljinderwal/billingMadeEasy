import mongoose, { Schema } from 'mongoose';
import { IPromotion } from '../../../../shared/types/dist/index.js';

const promotionSchema = new Schema<IPromotion>({
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
    applicableProducts: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    applicableCategories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    excludedProducts: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
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
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

promotionSchema.index({ status: 1, type: 1 });
promotionSchema.index({ 'schedule.startDate': 1, 'schedule.endDate': 1 });
promotionSchema.index({ priority: -1 });

export default mongoose.model<IPromotion>('Promotion', promotionSchema);
