import { Request, Response } from 'express';
import { ResponseUtils, DatabaseUtils, HelperUtils } from '@billing/utils';
import { asyncHandler } from '@billing/middleware';
import { ProductQuery } from '@billing/types';
import Product from '../models/Product';
import Category from '../models/Category';

export class ProductController {
  static getProducts = asyncHandler(async (req: Request, res: Response) => {
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

  static searchProducts = asyncHandler(async (req: Request, res: Response) => {
    const { search, page = 1, limit = 20 } = req.query;
    
    if (!search) {
      return res.status(400).json(ResponseUtils.error('Search query is required'));
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

  static getProductById = asyncHandler(async (req: Request, res: Response) => {
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

  static getProductBySlug = asyncHandler(async (req: Request, res: Response) => {
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

  static createProduct = asyncHandler(async (req: Request, res: Response) => {
    const productData = req.body;
    const userId = req.user?.userId;

    const category = await Category.findById(productData.category);
    if (!category) {
      return res.status(400).json(ResponseUtils.error('Invalid category'));
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

  static updateProduct = asyncHandler(async (req: Request, res: Response) => {
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

  static deleteProduct = asyncHandler(async (req: Request, res: Response) => {
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

  static uploadImages = asyncHandler(async (req: Request, res: Response) => {
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

  static deleteImage = asyncHandler(async (req: Request, res: Response) => {
    const { id, imageId } = req.params;

    if (!DatabaseUtils.isValidObjectId(id) || !DatabaseUtils.isValidObjectId(imageId)) {
      return res.status(400).json(ResponseUtils.error('Invalid ID'));
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json(ResponseUtils.error('Product not found'));
    }

    product.images.pull(imageId);
    await product.save();

    res.json(ResponseUtils.success(null, 'Image deleted successfully'));
  });

  static addVariant = asyncHandler(async (req: Request, res: Response) => {
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

  static updateVariant = asyncHandler(async (req: Request, res: Response) => {
    const { id, variantId } = req.params;
    const updates = req.body;

    if (!DatabaseUtils.isValidObjectId(id) || !DatabaseUtils.isValidObjectId(variantId)) {
      return res.status(400).json(ResponseUtils.error('Invalid ID'));
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json(ResponseUtils.error('Product not found'));
    }

    const variant = product.variants.id(variantId);
    if (!variant) {
      return res.status(404).json(ResponseUtils.error('Variant not found'));
    }

    Object.assign(variant, updates);
    await product.save();

    res.json(ResponseUtils.success(variant, 'Variant updated successfully'));
  });

  static deleteVariant = asyncHandler(async (req: Request, res: Response) => {
    const { id, variantId } = req.params;

    if (!DatabaseUtils.isValidObjectId(id) || !DatabaseUtils.isValidObjectId(variantId)) {
      return res.status(400).json(ResponseUtils.error('Invalid ID'));
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json(ResponseUtils.error('Product not found'));
    }

    product.variants.pull(variantId);
    await product.save();

    res.json(ResponseUtils.success(null, 'Variant deleted successfully'));
  });
}
