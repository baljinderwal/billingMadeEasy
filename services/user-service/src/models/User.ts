import mongoose, { Schema } from 'mongoose';
import { IUser } from '@billing/types';

const AddressSchema = new Schema({
  type: { type: String, enum: ['home', 'work', 'other'], required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  addressLine1: { type: String, required: true },
  addressLine2: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
  isDefault: { type: Boolean, default: false }
}, { timestamps: true });

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true, lowercase: true },
  phone: { type: String, unique: true, sparse: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  avatar: { type: String },
  role: { type: String, enum: ['customer', 'admin', 'vendor', 'support'], default: 'customer' },
  isEmailVerified: { type: Boolean, default: false },
  isPhoneVerified: { type: Boolean, default: false },
  addresses: [AddressSchema],
  loyaltyPoints: { type: Number, default: 0 },
  walletBalance: { type: Number, default: 0 },
  preferences: {
    language: { type: String, default: 'en' },
    currency: { type: String, default: 'INR' },
    notifications: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: true },
      push: { type: Boolean, default: true }
    }
  },
  lastLogin: { type: Date }
}, { timestamps: true });

UserSchema.index({ email: 1 });
UserSchema.index({ phone: 1 });
UserSchema.index({ role: 1 });

export default mongoose.model<IUser>('User', UserSchema);
