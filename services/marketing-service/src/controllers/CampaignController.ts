import { Request, Response } from 'express';
import { ResponseUtils, DatabaseUtils } from '../../../../shared/utils/dist/index.js';
import { asyncHandler } from '../../../../shared/middleware/dist/index.js';
import { MarketingQuery } from '../../../../shared/types/dist/index.js';
import Campaign from '../models/Campaign';

export class CampaignController {
  static getCampaigns = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const query = req.query as MarketingQuery;
    const { page = 1, limit = 20, sort = 'createdAt', order = 'desc' } = query;

    const filter: any = {};
    
    if (query.type) filter.type = query.type;
    if (query.status) filter.status = query.status;
    
    if (query.startDate || query.endDate) {
      filter['schedule.startDate'] = {};
      if (query.startDate) filter['schedule.startDate'].$gte = new Date(query.startDate);
      if (query.endDate) filter['schedule.startDate'].$lte = new Date(query.endDate);
    }

    const sortOrder = order === 'asc' ? 1 : -1;
    const skip = (page - 1) * limit;
    
    const [campaigns, total] = await Promise.all([
      Campaign.find(filter)
        .populate('createdBy', 'firstName lastName email')
        .sort({ [sort]: sortOrder })
        .skip(skip)
        .limit(limit)
        .lean(),
      Campaign.countDocuments(filter)
    ]);

    res.json(ResponseUtils.paginated(campaigns, page, limit, total, 'Campaigns retrieved successfully'));
  });

  static getCampaignById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!DatabaseUtils.isValidObjectId(id)) {
      res.status(400).json(ResponseUtils.error('Invalid campaign ID'));
      return;
    }

    const campaign = await Campaign.findById(id)
      .populate('createdBy', 'firstName lastName email')
      .lean();

    if (!campaign) {
      res.status(404).json(ResponseUtils.error('Campaign not found'));
      return;
    }

    res.json(ResponseUtils.success(campaign, 'Campaign retrieved successfully'));
  });

  static createCampaign = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const campaignData = req.body;
    const userId = req.user?.userId;

    campaignData.createdBy = userId;

    const campaign = new Campaign(campaignData);
    await campaign.save();

    const populatedCampaign = await Campaign.findById(campaign._id)
      .populate('createdBy', 'firstName lastName email')
      .lean();

    res.status(201).json(ResponseUtils.success(populatedCampaign, 'Campaign created successfully'));
  });

  static updateCampaign = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updates = req.body;

    if (!DatabaseUtils.isValidObjectId(id)) {
      res.status(400).json(ResponseUtils.error('Invalid campaign ID'));
      return;
    }

    const campaign = await Campaign.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    ).populate('createdBy', 'firstName lastName email');

    if (!campaign) {
      res.status(404).json(ResponseUtils.error('Campaign not found'));
      return;
    }

    res.json(ResponseUtils.success(campaign, 'Campaign updated successfully'));
  });

  static deleteCampaign = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!DatabaseUtils.isValidObjectId(id)) {
      res.status(400).json(ResponseUtils.error('Invalid campaign ID'));
      return;
    }

    const campaign = await Campaign.findByIdAndDelete(id);

    if (!campaign) {
      res.status(404).json(ResponseUtils.error('Campaign not found'));
      return;
    }

    res.json(ResponseUtils.success(null, 'Campaign deleted successfully'));
  });

  static launchCampaign = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!DatabaseUtils.isValidObjectId(id)) {
      res.status(400).json(ResponseUtils.error('Invalid campaign ID'));
      return;
    }

    const campaign = await Campaign.findByIdAndUpdate(
      id,
      { status: 'active' },
      { new: true }
    );

    if (!campaign) {
      res.status(404).json(ResponseUtils.error('Campaign not found'));
      return;
    }

    res.json(ResponseUtils.success(campaign, 'Campaign launched successfully'));
  });

  static pauseCampaign = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!DatabaseUtils.isValidObjectId(id)) {
      res.status(400).json(ResponseUtils.error('Invalid campaign ID'));
      return;
    }

    const campaign = await Campaign.findByIdAndUpdate(
      id,
      { status: 'paused' },
      { new: true }
    );

    if (!campaign) {
      res.status(404).json(ResponseUtils.error('Campaign not found'));
      return;
    }

    res.json(ResponseUtils.success(campaign, 'Campaign paused successfully'));
  });

  static getCampaignMetrics = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!DatabaseUtils.isValidObjectId(id)) {
      res.status(400).json(ResponseUtils.error('Invalid campaign ID'));
      return;
    }

    const campaign = await Campaign.findById(id).select('metrics').lean();

    if (!campaign) {
      res.status(404).json(ResponseUtils.error('Campaign not found'));
      return;
    }

    res.json(ResponseUtils.success(campaign.metrics, 'Campaign metrics retrieved successfully'));
  });
}
