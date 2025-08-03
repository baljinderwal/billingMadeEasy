import { Request, Response } from 'express';
import { ResponseUtils, DatabaseUtils, HelperUtils } from '@billing/utils';
import { asyncHandler } from '@billing/middleware';
import Referral from '../models/Referral';

export class ReferralController {
  static getReferrals = asyncHandler(async (req: Request, res: Response) => {
    const { page = 1, limit = 20 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const [referrals, total] = await Promise.all([
      Referral.find()
        .populate('referrerId', 'firstName lastName email')
        .populate('refereeId', 'firstName lastName email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .lean(),
      Referral.countDocuments()
    ]);

    res.json(ResponseUtils.paginated(referrals, Number(page), Number(limit), total, 'Referrals retrieved successfully'));
  });

  static getMyReferrals = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    const { page = 1, limit = 20 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const [referrals, total] = await Promise.all([
      Referral.find({ referrerId: userId })
        .populate('refereeId', 'firstName lastName email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .lean(),
      Referral.countDocuments({ referrerId: userId })
    ]);

    res.json(ResponseUtils.paginated(referrals, Number(page), Number(limit), total, 'My referrals retrieved successfully'));
  });

  static generateReferralCode = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    
    const existingReferral = await Referral.findOne({ 
      referrerId: userId, 
      status: 'pending',
      expiresAt: { $gt: new Date() }
    });

    if (existingReferral) {
      return res.json(ResponseUtils.success(existingReferral, 'Active referral code found'));
    }

    const code = HelperUtils.generateReferralCode();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    const referral = new Referral({
      referrerId: userId,
      code,
      reward: {
        referrerReward: { type: 'fixed', value: 100 },
        refereeReward: { type: 'percentage', value: 10 }
      },
      expiresAt
    });

    await referral.save();

    res.status(201).json(ResponseUtils.success(referral, 'Referral code generated successfully'));
  });

  static validateReferralCode = asyncHandler(async (req: Request, res: Response) => {
    const { code } = req.params;

    const referral = await Referral.findOne({ 
      code,
      status: 'pending',
      expiresAt: { $gt: new Date() }
    }).populate('referrerId', 'firstName lastName');

    if (!referral) {
      return res.status(404).json(ResponseUtils.error('Invalid or expired referral code'));
    }

    res.json(ResponseUtils.success({
      code: referral.code,
      referrer: referral.referrerId,
      reward: referral.reward.refereeReward
    }, 'Referral code is valid'));
  });

  static applyReferralCode = asyncHandler(async (req: Request, res: Response) => {
    const { code } = req.params;
    const { orderId } = req.body;
    const userId = req.user?.userId;

    const referral = await Referral.findOne({ 
      code,
      status: 'pending',
      expiresAt: { $gt: new Date() }
    });

    if (!referral) {
      return res.status(404).json(ResponseUtils.error('Invalid or expired referral code'));
    }

    if (referral.referrerId.toString() === userId) {
      return res.status(400).json(ResponseUtils.error('Cannot use your own referral code'));
    }

    referral.refereeId = userId;
    referral.orderId = orderId;
    referral.status = 'completed';
    referral.completedAt = new Date();

    await referral.save();

    res.json(ResponseUtils.success(referral, 'Referral code applied successfully'));
  });
}
