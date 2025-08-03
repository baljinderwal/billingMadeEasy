import mongoose, { Schema, Document } from 'mongoose';
import { Payment, PaymentMethod, PaymentStatus } from '@billing/types';

const PaymentSchema = new Schema<Payment>({
  paymentId: { type: String, required: true, unique: true },
  orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  
  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  
  method: { 
    type: String, 
    enum: ['card', 'upi', 'netbanking', 'wallet', 'emi', 'bnpl', 'cod'],
    required: true 
  },
  
  gateway: { 
    type: String, 
    enum: ['razorpay', 'stripe', 'paypal', 'payu'],
    required: true 
  },
  
  status: { 
    type: String, 
    enum: ['pending', 'processing', 'completed', 'failed', 'cancelled', 'refunded'],
    default: 'pending'
  },
  
  gatewayPaymentId: { type: String },
  gatewayOrderId: { type: String },
  transactionId: { type: String },
  
  gatewayResponse: { type: Schema.Types.Mixed },
  failureReason: { type: String },
  
  refunds: [{
    refundId: { type: String, required: true },
    amount: { type: Number, required: true },
    reason: { type: String },
    status: { type: String, enum: ['pending', 'processing', 'completed', 'failed'], default: 'pending' },
    gatewayRefundId: { type: String },
    processedAt: { type: Date },
    createdAt: { type: Date, default: Date.now }
  }],
  
  metadata: { type: Schema.Types.Mixed },
  
  processedAt: { type: Date },
  expiresAt: { type: Date }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

PaymentSchema.index({ paymentId: 1 });
PaymentSchema.index({ orderId: 1 });
PaymentSchema.index({ userId: 1 });
PaymentSchema.index({ status: 1 });
PaymentSchema.index({ gateway: 1 });
PaymentSchema.index({ createdAt: -1 });

PaymentSchema.pre('save', function(next) {
  if (this.isNew && !this.paymentId) {
    this.paymentId = `PAY-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  }
  
  if (this.status === 'completed' && !this.processedAt) {
    this.processedAt = new Date();
  }
  
  next();
});

export default mongoose.model<Payment & Document>('Payment', PaymentSchema);
