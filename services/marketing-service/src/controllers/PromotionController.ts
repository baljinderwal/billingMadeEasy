import { Request, Response } from 'express';
import { ResponseUtils, DatabaseUtils } from '../../../../shared/utils/dist/index.js';
import { asyncHandler } from '../../../../shared/middleware/dist/index.js';
import { MarketingQuery } from '../../../../shared/types/dist/index.js';
import Promotion from '../models/Promotion';

export class PromotionController {
  static getPromotions = asyncHandler(async (req: Request, res: Response): Promise<void> => {
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

  static getActivePromotions = asyncHandler(async (req: Request, res: Response): Promise<void> => {
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

  static getPromotionById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!DatabaseUtils.isValidObjectId(id)) {
      res.status(400).json(ResponseUtils.error('Invalid promotion ID'));
      return;
    }

    const promotion = await Promotion.findById(id)
      .populate('createdBy', 'firstName lastName email')
      .lean();

    if (!promotion) {
      res.status(404).json(ResponseUtils.error('Promotion not found'));
      return;
    }

    res.json(ResponseUtils.success(promotion, 'Promotion retrieved successfully'));
  });

  static createPromotion = asyncHandler(async (req: Request, res: Response): Promise<void> => {
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

  static updatePromotion = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updates = req.body;

    if (!DatabaseUtils.isValidObjectId(id)) {
      res.status(400).json(ResponseUtils.error('Invalid promotion ID'));
      return;
    }

    const promotion = await Promotion.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    ).populate('createdBy', 'firstName lastName email');

    if (!promotion) {
      res.status(404).json(ResponseUtils.error('Promotion not found'));
      return;
    }

    res.json(ResponseUtils.success(promotion, 'Promotion updated successfully'));
  });

  static deletePromotion = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!DatabaseUtils.isValidObjectId(id)) {
      res.status(400).json(ResponseUtils.error('Invalid promotion ID'));
      return;
    }

    const promotion = await Promotion.findByIdAndDelete(id);

    if (!promotion) {
      res.status(404).json(ResponseUtils.error('Promotion not found'));
      return;
    }

    res.json(ResponseUtils.success(null, 'Promotion deleted successfully'));
  });

  static activatePromotion = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!DatabaseUtils.isValidObjectId(id)) {
      res.status(400).json(ResponseUtils.error('Invalid promotion ID'));
      return;
    }

    const promotion = await Promotion.findByIdAndUpdate(
      id,
      { status: 'active' },
      { new: true }
    );

    if (!promotion) {
      res.status(404).json(ResponseUtils.error('Promotion not found'));
      return;
    }

    res.json(ResponseUtils.success(promotion, 'Promotion activated successfully'));
  });

  static deactivatePromotion = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!DatabaseUtils.isValidObjectId(id)) {
      res.status(400).json(ResponseUtils.error('Invalid promotion ID'));
      return;
    }

    const promotion = await Promotion.findByIdAndUpdate(
      id,
      { status: 'inactive' },
      { new: true }
    );

    if (!promotion) {
      res.status(404).json(ResponseUtils.error('Promotion not found'));
      return;
    }

    res.json(ResponseUtils.success(promotion, 'Promotion deactivated successfully'));
  });
}
