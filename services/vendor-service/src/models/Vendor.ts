import mongoose, { Schema } from 'mongoose';
import { IVendor } from '@billing/types';

const vendorSchema = new Schema<IVendor>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
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
      categoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
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

export default mongoose.model<IVendor>('Vendor', vendorSchema);
