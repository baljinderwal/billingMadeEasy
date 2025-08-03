import { Request, Response } from 'express';
import { ResponseUtils, DatabaseUtils, HelperUtils } from '../../../../shared/utils/dist/index.js';
import { asyncHandler } from '../../../../shared/middleware/dist/index.js';
import { ProductQuery } from '../../../../shared/types/dist/index.js';
import Product from '../models/Product';
import Category from '../models/Category';

export class ProductController {
  static getProducts = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const query = req.query as ProductQuery;
    const { page = 1, limit = 20, sort = 'createdAt', order = 'desc' } = query;

    const filter: any = {};
    
    if (query.category) {
      filter.category = query.category;
    }
    
    if (query.brand) {
      filter.brand = query.brand;
    }
    
    if (query.status) {
      filter.status = query.status;
    } else {
      filter.status = 'active';
    }
    
    if (query.minPrice || query.maxPrice) {
      filter.basePrice = {};
      if (query.minPrice) filter.basePrice.$gte = query.minPrice;
      if (query.maxPrice) filter.basePrice.$lte = query.maxPrice;
    }
    
    if (query.inStock) {
      filter['inventory.quantity'] = { $gt: 0 };
    }

    const sortOrder = order === 'asc' ? 1 : -1;
    const sortObj: any = { [sort]: sortOrder };

    const skip = (page - 1) * limit;
    
    const [products, total] = await Promise.all([
      Product.find(filter)
        .populate('category', 'name slug')
        .sort(sortObj)
        .skip(skip)
        .limit(limit)
        .lean(),
      Product.countDocuments(filter)
    ]);

    res.json(ResponseUtils.paginated(products, page, limit, total, 'Products retrieved successfully'));
  });

  static searchProducts = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { search, page = 1, limit = 20 } = req.query;
    
    if (!search) {
      res.status(400).json(ResponseUtils.error('Search query is required'));
      return;
    }

    const filter = {
      $and: [
        { status: 'active' },
        {
          $or: [
            { $text: { $search: search as string } },
            { name: { $regex: search, $options: 'i' } },
            { tags: { $in: [new RegExp(search as string, 'i')] } }
          ]
        }
      ]
    };

    const skip = (Number(page) - 1) * Number(limit);
    
    const [products, total] = await Promise.all([
      Product.find(filter)
        .populate('category', 'name slug')
        .sort({ score: { $meta: 'textScore' } })
        .skip(skip)
        .limit(Number(limit))
        .lean(),
      Product.countDocuments(filter)
    ]);

    res.json(ResponseUtils.paginated(products, Number(page), Number(limit), total, 'Search results retrieved successfully'));
  });

  static getProductById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!DatabaseUtils.isValidObjectId(id)) {
      return res.status(400).json(ResponseUtils.error('Invalid product ID'));
    }

    const product = await Product.findById(id)
      .populate('category', 'name slug')
      .populate('vendor', 'firstName lastName email')
      .lean();

    if (!product) {
      return res.status(404).json(ResponseUtils.error('Product not found'));
    }

    res.json(ResponseUtils.success(product, 'Product retrieved successfully'));
  });

  static getProductBySlug = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { slug } = req.params;

    const product = await Product.findOne({ 'seo.slug': slug })
      .populate('category', 'name slug')
      .populate('vendor', 'firstName lastName email')
      .lean();

    if (!product) {
      return res.status(404).json(ResponseUtils.error('Product not found'));
    }

    res.json(ResponseUtils.success(product, 'Product retrieved successfully'));
  });

  static createProduct = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const productData = req.body;
    const userId = req.user?.userId;

    const category = await Category.findById(productData.category);
    if (!category) {
      res.status(400).json(ResponseUtils.error('Invalid category'));
      return;
    }

    if (!productData.sku) {
      productData.sku = HelperUtils.generateSKU(productData.name, category.name);
    }

    if (!productData.seo?.slug) {
      productData.seo = {
        ...productData.seo,
        slug: HelperUtils.generateSlug(productData.name)
      };
    }

    if (req.user?.role === 'vendor') {
      productData.vendor = userId;
    }

    const product = new Product(productData);
    await product.save();

    const populatedProduct = await Product.findById(product._id)
      .populate('category', 'name slug')
      .lean();

    res.status(201).json(ResponseUtils.success(populatedProduct, 'Product created successfully'));
  });

  static updateProduct = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updates = req.body;
    const userId = req.user?.userId;

    if (!DatabaseUtils.isValidObjectId(id)) {
      return res.status(400).json(ResponseUtils.error('Invalid product ID'));
    }

    const filter: any = { _id: id };
    if (req.user?.role === 'vendor') {
      filter.vendor = userId;
    }

    const product = await Product.findOneAndUpdate(
      filter,
      { $set: updates },
      { new: true, runValidators: true }
    ).populate('category', 'name slug');

    if (!product) {
      return res.status(404).json(ResponseUtils.error('Product not found or access denied'));
    }

    res.json(ResponseUtils.success(product, 'Product updated successfully'));
  });

  static deleteProduct = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const userId = req.user?.userId;

    if (!DatabaseUtils.isValidObjectId(id)) {
      return res.status(400).json(ResponseUtils.error('Invalid product ID'));
    }

    const filter: any = { _id: id };
    if (req.user?.role === 'vendor') {
      filter.vendor = userId;
    }

    const product = await Product.findOneAndDelete(filter);

    if (!product) {
      return res.status(404).json(ResponseUtils.error('Product not found or access denied'));
    }

    res.json(ResponseUtils.success(null, 'Product deleted successfully'));
  });

  static uploadImages = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { images } = req.body;

    if (!DatabaseUtils.isValidObjectId(id)) {
      return res.status(400).json(ResponseUtils.error('Invalid product ID'));
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json(ResponseUtils.error('Product not found'));
    }

    if (images && Array.isArray(images)) {
      product.images.push(...images);
      await product.save();
    }

    res.json(ResponseUtils.success(product.images, 'Images uploaded successfully'));
  });

  static deleteImage = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id, imageId } = req.params;

    if (!DatabaseUtils.isValidObjectId(id) || !DatabaseUtils.isValidObjectId(imageId)) {
      return res.status(400).json(ResponseUtils.error('Invalid ID'));
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json(ResponseUtils.error('Product not found'));
    }

    product.images = product.images.filter(img => img._id?.toString() !== imageId);
    await product.save();

    res.json(ResponseUtils.success(null, 'Image deleted successfully'));
  });

  static addVariant = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const variantData = req.body;

    if (!DatabaseUtils.isValidObjectId(id)) {
      return res.status(400).json(ResponseUtils.error('Invalid product ID'));
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json(ResponseUtils.error('Product not found'));
    }

    product.variants.push(variantData);
    await product.save();

    const newVariant = product.variants[product.variants.length - 1];
    res.status(201).json(ResponseUtils.success(newVariant, 'Variant added successfully'));
  });

  static updateVariant = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id, variantId } = req.params;
    const updates = req.body;

    if (!DatabaseUtils.isValidObjectId(id) || !DatabaseUtils.isValidObjectId(variantId)) {
      return res.status(400).json(ResponseUtils.error('Invalid ID'));
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json(ResponseUtils.error('Product not found'));
    }

    const variant = product.variants.find(v => v._id?.toString() === variantId);
    if (!variant) {
      res.status(404).json(ResponseUtils.error('Variant not found'));
      return;
    }

    Object.assign(variant, updates);
    await product.save();

    res.json(ResponseUtils.success(variant, 'Variant updated successfully'));
  });

  static deleteVariant = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id, variantId } = req.params;

    if (!DatabaseUtils.isValidObjectId(id) || !DatabaseUtils.isValidObjectId(variantId)) {
      return res.status(400).json(ResponseUtils.error('Invalid ID'));
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json(ResponseUtils.error('Product not found'));
    }

    product.variants = product.variants.filter(v => v._id?.toString() !== variantId);
    await product.save();

    res.json(ResponseUtils.success(null, 'Variant deleted successfully'));
  });
}
