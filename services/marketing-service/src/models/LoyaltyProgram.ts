import mongoose, { Schema } from 'mongoose';
import { ILoyaltyProgram, IUserLoyalty } from '@billing/types';

const loyaltyProgramSchema = new Schema<ILoyaltyProgram>({
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
    excludedCategories: [{ type: Schema.Types.ObjectId, ref: 'Category' }]
  }
}, {
  timestamps: true
});

const userLoyaltySchema = new Schema<IUserLoyalty>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  programId: { type: Schema.Types.ObjectId, ref: 'LoyaltyProgram', required: true },
  points: { type: Number, default: 0 },
  tier: { type: String, required: true },
  totalEarned: { type: Number, default: 0 },
  totalRedeemed: { type: Number, default: 0 },
  transactions: [{
    type: { type: String, enum: ['earned', 'redeemed', 'expired'], required: true },
    points: { type: Number, required: true },
    orderId: { type: Schema.Types.ObjectId, ref: 'Order' },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now }
  }]
}, {
  timestamps: true
});

userLoyaltySchema.index({ userId: 1, programId: 1 }, { unique: true });

export const LoyaltyProgram = mongoose.model<ILoyaltyProgram>('LoyaltyProgram', loyaltyProgramSchema);
export const UserLoyalty = mongoose.model<IUserLoyalty>('UserLoyalty', userLoyaltySchema);
