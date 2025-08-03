import mongoose, { Schema, Document } from 'mongoose';
import { Cart, CartItem } from '@billing/types';

const CartItemSchema = new Schema<CartItem>({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  variantId: { type: Schema.Types.ObjectId },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  addedAt: { type: Date, default: Date.now }
});

const CartSchema = new Schema<Cart>({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  sessionId: { type: String },
  items: [CartItemSchema],
  subtotal: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
  shipping: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  currency: { type: String, default: 'INR' },
  couponCode: { type: String },
  couponDiscount: { type: Number, default: 0 },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  notes: { type: String },
  expiresAt: { type: Date, default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

CartSchema.index({ userId: 1 });
CartSchema.index({ sessionId: 1 });
CartSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

CartSchema.methods.calculateTotals = function() {
  this.subtotal = this.items.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0);
  this.total = this.subtotal - this.discount - this.couponDiscount + this.tax + this.shipping;
  return this;
};

CartSchema.pre('save', function(next) {
  this.calculateTotals();
  next();
});

export default mongoose.model<Cart & Document>('Cart', CartSchema);
