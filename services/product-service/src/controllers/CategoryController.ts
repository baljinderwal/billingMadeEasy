import { Request, Response } from 'express';
import { ResponseUtils, DatabaseUtils, HelperUtils } from '../../../../shared/utils/dist/index.js';
import { asyncHandler } from '../../../../shared/middleware/dist/index.js';
import Category from '../models/Category';

export class CategoryController {
  static getCategories = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { page = 1, limit = 50, parent } = req.query;

    const filter: any = { status: 'active' };
    if (parent) {
      filter.parent = parent;
    }

    const skip = (Number(page) - 1) * Number(limit);
    
    const [categories, total] = await Promise.all([
      Category.find(filter)
        .populate('parent', 'name slug')
        .sort({ sortOrder: 1, name: 1 })
        .skip(skip)
        .limit(Number(limit))
        .lean(),
      Category.countDocuments(filter)
    ]);

    res.json(ResponseUtils.paginated(categories, Number(page), Number(limit), total, 'Categories retrieved successfully'));
  });

  static getCategoryById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!DatabaseUtils.isValidObjectId(id)) {
      return res.status(400).json(ResponseUtils.error('Invalid category ID'));
    }

    const category = await Category.findById(id)
      .populate('parent', 'name slug')
      .lean();

    if (!category) {
      return res.status(404).json(ResponseUtils.error('Category not found'));
    }

    res.json(ResponseUtils.success(category, 'Category retrieved successfully'));
  });

  static getCategoryBySlug = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { slug } = req.params;

    const category = await Category.findOne({ slug, status: 'active' })
      .populate('parent', 'name slug')
      .lean();

    if (!category) {
      return res.status(404).json(ResponseUtils.error('Category not found'));
    }

    res.json(ResponseUtils.success(category, 'Category retrieved successfully'));
  });

  static createCategory = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const categoryData = req.body;

    if (!categoryData.slug) {
      categoryData.slug = HelperUtils.generateSlug(categoryData.name);
    }

    if (categoryData.parent && !DatabaseUtils.isValidObjectId(categoryData.parent)) {
      res.status(400).json(ResponseUtils.error('Invalid parent category ID'));
      return;
    }

    const category = new Category(categoryData);
    await category.save();

    const populatedCategory = await Category.findById(category._id)
      .populate('parent', 'name slug')
      .lean();

    res.status(201).json(ResponseUtils.success(populatedCategory, 'Category created successfully'));
  });

  static updateCategory = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updates = req.body;

    if (!DatabaseUtils.isValidObjectId(id)) {
      return res.status(400).json(ResponseUtils.error('Invalid category ID'));
    }

    if (updates.parent && !DatabaseUtils.isValidObjectId(updates.parent)) {
      res.status(400).json(ResponseUtils.error('Invalid parent category ID'));
      return;
    }

    const category = await Category.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    ).populate('parent', 'name slug');

    if (!category) {
      return res.status(404).json(ResponseUtils.error('Category not found'));
    }

    res.json(ResponseUtils.success(category, 'Category updated successfully'));
  });

  static deleteCategory = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!DatabaseUtils.isValidObjectId(id)) {
      return res.status(400).json(ResponseUtils.error('Invalid category ID'));
    }

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json(ResponseUtils.error('Category not found'));
    }

    res.json(ResponseUtils.success(null, 'Category deleted successfully'));
  });
}
