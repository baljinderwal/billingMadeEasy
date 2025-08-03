import mongoose, { Schema } from 'mongoose';
import { IAnalytics } from '@billing/types';

const analyticsSchema = new Schema<IAnalytics>({
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
    of: Schema.Types.Mixed,
    default: {}
  }
}, {
  timestamps: true
});

analyticsSchema.index({ type: 1, period: 1, date: 1 });
analyticsSchema.index({ date: -1 });

export default mongoose.model<IAnalytics>('Analytics', analyticsSchema);
