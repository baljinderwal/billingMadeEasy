import mongoose, { Schema } from 'mongoose';
import { IReferral } from '../../../../shared/types/dist/index.js';

const referralSchema = new Schema<IReferral>({
  referrerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  refereeId: { type: Schema.Types.ObjectId, ref: 'User' },
  code: { type: String, required: true, unique: true },
  status: { 
    type: String, 
    enum: ['pending', 'completed', 'expired'], 
    default: 'pending' 
  },
  reward: {
    referrerReward: {
      type: { type: String, enum: ['percentage', 'fixed', 'points'], required: true },
      value: { type: Number, required: true }
    },
    refereeReward: {
      type: { type: String, enum: ['percentage', 'fixed', 'points'], required: true },
      value: { type: Number, required: true }
    }
  },
  orderId: { type: Schema.Types.ObjectId, ref: 'Order' },
  completedAt: { type: Date },
  expiresAt: { type: Date, required: true }
}, {
  timestamps: true
});

referralSchema.index({ code: 1 });
referralSchema.index({ referrerId: 1 });
referralSchema.index({ status: 1 });
referralSchema.index({ expiresAt: 1 });

export default mongoose.model<IReferral>('Referral', referralSchema);
