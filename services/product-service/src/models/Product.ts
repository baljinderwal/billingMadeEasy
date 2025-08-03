import mongoose, { Schema } from 'mongoose';
import { IProduct } from '../../../../shared/types/dist/index.js';

const ProductImageSchema = new Schema({
  url: { type: String, required: true },
  altText: { type: String },
  position: { type: Number, required: true },
  isMain: { type: Boolean, default: false }
});

const VariantOptionSchema = new Schema({
  name: { type: String, required: true },
  value: { type: String, required: true }
});

const ProductVariantSchema = new Schema({
  name: { type: String, required: true },
  options: [VariantOptionSchema],
  sku: { type: String, required: true },
  barcode: { type: String },
  price: { type: Number, required: true },
  compareAtPrice: { type: Number },
  inventory: {
    quantity: { type: Number, default: 0 },
    reserved: { type: Number, default: 0 }
  },
  image: { type: String }
});

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  shortDescription: { type: String },
  sku: { type: String, required: true, unique: true },
  barcode: { type: String },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  subcategory: { type: String },
  brand: { type: String },
  type: { type: String, enum: ['physical', 'digital'], required: true },
  status: { type: String, enum: ['active', 'draft', 'archived'], default: 'draft' },
  images: [ProductImageSchema],
  variants: [ProductVariantSchema],
  basePrice: { type: Number, required: true },
  compareAtPrice: { type: Number },
  costPrice: { type: Number },
  taxClass: { type: String },
  weight: { type: Number },
  dimensions: {
    length: { type: Number },
    width: { type: Number },
    height: { type: Number },
    unit: { type: String, enum: ['cm', 'in'], default: 'cm' }
  },
  inventory: {
    trackQuantity: { type: Boolean, default: true },
    quantity: { type: Number, default: 0 },
    lowStockThreshold: { type: Number, default: 5 },
    allowBackorder: { type: Boolean, default: false }
  },
  seo: {
    title: { type: String },
    description: { type: String },
    keywords: [{ type: String }],
    slug: { type: String, required: true, unique: true }
  },
  tags: [{ type: String }],
  vendor: { type: Schema.Types.ObjectId, ref: 'User' },
  ratings: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  }
}, { timestamps: true });

ProductSchema.index({ sku: 1 });
ProductSchema.index({ name: 'text', description: 'text' });
ProductSchema.index({ category: 1 });
ProductSchema.index({ status: 1 });
ProductSchema.index({ 'seo.slug': 1 });
ProductSchema.index({ tags: 1 });
ProductSchema.index({ brand: 1 });

export default mongoose.model<IProduct>('Product', ProductSchema);
