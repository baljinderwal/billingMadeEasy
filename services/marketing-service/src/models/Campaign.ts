import mongoose, { Schema } from 'mongoose';
import { ICampaign } from '@billing/types';

const campaignSchema = new Schema<ICampaign>({
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
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
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
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

campaignSchema.index({ status: 1, type: 1 });
campaignSchema.index({ 'schedule.startDate': 1, 'schedule.endDate': 1 });

export default mongoose.model<ICampaign>('Campaign', campaignSchema);
