import { Request, Response } from 'express';
import { ResponseUtils, DatabaseUtils } from '../../../../shared/utils/dist/index.js';
import { asyncHandler } from '../../../../shared/middleware/dist/index.js';
import { VendorQuery } from '../../../../shared/types/dist/index.js';
import Vendor from '../models/Vendor';

export class VendorController {
  static getVendors = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const query = req.query as VendorQuery;
    const { page = 1, limit = 20, sort = 'createdAt', order = 'desc' } = query;

    const filter: any = {};
    
    if (query.status) filter.status = query.status;
    if (query.kycStatus) filter.kycStatus = query.kycStatus;
    if (query.businessType) filter.businessType = query.businessType;

    const sortOrder = order === 'asc' ? 1 : -1;
    const skip = (Number(page) - 1) * Number(limit);
    
    const [vendors, total] = await Promise.all([
      Vendor.find(filter)
        .populate('userId', 'firstName lastName email')
        .sort({ [sort]: sortOrder })
        .skip(skip)
        .limit(Number(limit))
        .lean(),
      Vendor.countDocuments(filter)
    ]);

    res.json(ResponseUtils.paginated(vendors, Number(page), Number(limit), total, 'Vendors retrieved successfully'));
  });

  static getMyVendor = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.userId;

    const vendor = await Vendor.findOne({ userId })
      .populate('userId', 'firstName lastName email')
      .lean();

    if (!vendor) {
      res.status(404).json(ResponseUtils.error('Vendor profile not found'));
      return;
    }

    res.json(ResponseUtils.success(vendor, 'Vendor profile retrieved successfully'));
  });

  static getVendorById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!DatabaseUtils.isValidObjectId(id)) {
      res.status(400).json(ResponseUtils.error('Invalid vendor ID'));
      return;
    }

    const vendor = await Vendor.findById(id)
      .populate('userId', 'firstName lastName email')
      .lean();

    if (!vendor) {
      res.status(404).json(ResponseUtils.error('Vendor not found'));
      return;
    }

    res.json(ResponseUtils.success(vendor, 'Vendor retrieved successfully'));
  });

  static createVendor = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const vendorData = req.body;
    const userId = req.user?.userId;

    const existingVendor = await Vendor.findOne({ userId });
    if (existingVendor) {
      res.status(400).json(ResponseUtils.error('Vendor profile already exists'));
      return;
    }

    vendorData.userId = userId;

    const vendor = new Vendor(vendorData);
    await vendor.save();

    const populatedVendor = await Vendor.findById(vendor._id)
      .populate('userId', 'firstName lastName email')
      .lean();

    res.status(201).json(ResponseUtils.success(populatedVendor, 'Vendor created successfully'));
  });

  static updateVendor = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updates = req.body;
    const userId = req.user?.userId;

    if (!DatabaseUtils.isValidObjectId(id)) {
      res.status(400).json(ResponseUtils.error('Invalid vendor ID'));
      return;
    }

    const vendor = await Vendor.findOne({ _id: id, userId });
    if (!vendor) {
      res.status(404).json(ResponseUtils.error('Vendor not found or unauthorized'));
      return;
    }

    Object.assign(vendor, updates);
    await vendor.save();

    const populatedVendor = await Vendor.findById(vendor._id)
      .populate('userId', 'firstName lastName email')
      .lean();

    res.json(ResponseUtils.success(populatedVendor, 'Vendor updated successfully'));
  });

  static updateKycStatus = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { kycStatus, notes } = req.body;

    if (!DatabaseUtils.isValidObjectId(id)) {
      res.status(400).json(ResponseUtils.error('Invalid vendor ID'));
      return;
    }

    const vendor = await Vendor.findByIdAndUpdate(
      id,
      { kycStatus },
      { new: true }
    ).populate('userId', 'firstName lastName email');

    if (!vendor) {
      res.status(404).json(ResponseUtils.error('Vendor not found'));
      return;
    }

    res.json(ResponseUtils.success(vendor, 'KYC status updated successfully'));
  });

  static updateStatus = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { status } = req.body;

    if (!DatabaseUtils.isValidObjectId(id)) {
      res.status(400).json(ResponseUtils.error('Invalid vendor ID'));
      return;
    }

    const vendor = await Vendor.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate('userId', 'firstName lastName email');

    if (!vendor) {
      res.status(404).json(ResponseUtils.error('Vendor not found'));
      return;
    }

    res.json(ResponseUtils.success(vendor, 'Vendor status updated successfully'));
  });

  static getVendorAnalytics = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!DatabaseUtils.isValidObjectId(id)) {
      res.status(400).json(ResponseUtils.error('Invalid vendor ID'));
      return;
    }

    const vendor = await Vendor.findById(id);
    if (!vendor) {
      res.status(404).json(ResponseUtils.error('Vendor not found'));
      return;
    }

    const analytics = {
      totalSales: vendor.totalSales,
      totalOrders: vendor.totalOrders,
      averageOrderValue: vendor.totalOrders > 0 ? vendor.totalSales / vendor.totalOrders : 0,
      rating: vendor.ratings.average,
      totalReviews: vendor.ratings.count,
      commissionEarned: vendor.totalSales * (vendor.commission.value / 100)
    };

    res.json(ResponseUtils.success(analytics, 'Vendor analytics retrieved successfully'));
  });

  static getVendorProducts = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { page = 1, limit = 20 } = req.query;

    if (!DatabaseUtils.isValidObjectId(id)) {
      res.status(400).json(ResponseUtils.error('Invalid vendor ID'));
      return;
    }

    const products: any[] = [];

    res.json(ResponseUtils.paginated(products, Number(page), Number(limit), 0, 'Vendor products retrieved successfully'));
  });

  static getVendorOrders = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { page = 1, limit = 20 } = req.query;

    if (!DatabaseUtils.isValidObjectId(id)) {
      res.status(400).json(ResponseUtils.error('Invalid vendor ID'));
      return;
    }

    const orders: any[] = [];

    res.json(ResponseUtils.paginated(orders, Number(page), Number(limit), 0, 'Vendor orders retrieved successfully'));
  });
}
