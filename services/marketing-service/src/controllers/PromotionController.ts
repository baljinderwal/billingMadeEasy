import { Request, Response } from 'express';
import { ResponseUtils, DatabaseUtils } from '@billing/utils';
import { asyncHandler } from '@billing/middleware';
import { MarketingQuery } from '@billing/types';
import Promotion from '../models/Promotion';

export class PromotionController {
  static getPromotions = asyncHandler(async (req: Request, res: Response) => {
    const query = req.query as MarketingQuery;
    const { page = 1, limit = 20, sort = 'createdAt', order = 'desc' } = query;

    const filter: any = {};
    
    if (query.type) filter.type = query.type;
    if (query.status) filter.status = query.status;

    const sortOrder = order === 'asc' ? 1 : -1;
    const skip = (page - 1) * limit;
    
    const [promotions, total] = await Promise.all([
      Promotion.find(filter)
        .populate('createdBy', 'firstName lastName email')
        .sort({ [sort]: sortOrder })
        .skip(skip)
        .limit(limit)
        .lean(),
      Promotion.countDocuments(filter)
    ]);

    res.json(ResponseUtils.paginated(promotions, page, limit, total, 'Promotions retrieved successfully'));
  });

  static getActivePromotions = asyncHandler(async (req: Request, res: Response) => {
    const now = new Date();
    
    const promotions = await Promotion.find({
      status: 'active',
      'schedule.startDate': { $lte: now },
      'schedule.endDate': { $gte: now }
    })
    .sort({ priority: -1 })
    .lean();

    res.json(ResponseUtils.success(promotions, 'Active promotions retrieved successfully'));
  });

  static getPromotionById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!DatabaseUtils.isValidObjectId(id)) {
      return res.status(400).json(ResponseUtils.error('Invalid promotion ID'));
    }

    const promotion = await Promotion.findById(id)
      .populate('createdBy', 'firstName lastName email')
      .lean();

    if (!promotion) {
      return res.status(404).json(ResponseUtils.error('Promotion not found'));
    }

    res.json(ResponseUtils.success(promotion, 'Promotion retrieved successfully'));
  });

  static createPromotion = asyncHandler(async (req: Request, res: Response) => {
    const promotionData = req.body;
    const userId = req.user?.userId;

    promotionData.createdBy = userId;

    const promotion = new Promotion(promotionData);
    await promotion.save();

    const populatedPromotion = await Promotion.findById(promotion._id)
      .populate('createdBy', 'firstName lastName email')
      .lean();

    res.status(201).json(ResponseUtils.success(populatedPromotion, 'Promotion created successfully'));
  });

  static updatePromotion = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updates = req.body;

    if (!DatabaseUtils.isValidObjectId(id)) {
      return res.status(400).json(ResponseUtils.error('Invalid promotion ID'));
    }

    const promotion = await Promotion.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    ).populate('createdBy', 'firstName lastName email');

    if (!promotion) {
      return res.status(404).json(ResponseUtils.error('Promotion not found'));
    }

    res.json(ResponseUtils.success(promotion, 'Promotion updated successfully'));
  });

  static deletePromotion = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!DatabaseUtils.isValidObjectId(id)) {
      return res.status(400).json(ResponseUtils.error('Invalid promotion ID'));
    }

    const promotion = await Promotion.findByIdAndDelete(id);

    if (!promotion) {
      return res.status(404).json(ResponseUtils.error('Promotion not found'));
    }

    res.json(ResponseUtils.success(null, 'Promotion deleted successfully'));
  });

  static activatePromotion = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!DatabaseUtils.isValidObjectId(id)) {
      return res.status(400).json(ResponseUtils.error('Invalid promotion ID'));
    }

    const promotion = await Promotion.findByIdAndUpdate(
      id,
      { status: 'active' },
      { new: true }
    );

    if (!promotion) {
      return res.status(404).json(ResponseUtils.error('Promotion not found'));
    }

    res.json(ResponseUtils.success(promotion, 'Promotion activated successfully'));
  });

  static deactivatePromotion = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!DatabaseUtils.isValidObjectId(id)) {
      return res.status(400).json(ResponseUtils.error('Invalid promotion ID'));
    }

    const promotion = await Promotion.findByIdAndUpdate(
      id,
      { status: 'inactive' },
      { new: true }
    );

    if (!promotion) {
      return res.status(404).json(ResponseUtils.error('Promotion not found'));
    }

    res.json(ResponseUtils.success(promotion, 'Promotion deactivated successfully'));
  });
}
