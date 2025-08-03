import mongoose, { Schema } from 'mongoose';
import { ICategory } from '../../../../shared/types/dist/index.js';

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  description: { type: String },
  slug: { type: String, required: true, unique: true },
  parent: { type: Schema.Types.ObjectId, ref: 'Category' },
  image: { type: String },
  icon: { type: String },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  sortOrder: { type: Number, default: 0 },
  seo: {
    title: { type: String },
    description: { type: String },
    keywords: [{ type: String }]
  }
}, { timestamps: true });

CategorySchema.index({ slug: 1 });
CategorySchema.index({ parent: 1 });
CategorySchema.index({ status: 1 });
CategorySchema.index({ sortOrder: 1 });

export default mongoose.model<ICategory>('Category', CategorySchema);
