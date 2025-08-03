import { Request, Response } from 'express';
import { ResponseUtils, DatabaseUtils } from '@billing/utils';
import { asyncHandler } from '@billing/middleware';
import { LoyaltyProgram, UserLoyalty } from '../models/LoyaltyProgram';

export class LoyaltyController {
  static getPrograms = asyncHandler(async (req: Request, res: Response) => {
    const programs = await LoyaltyProgram.find({ status: 'active' }).lean();
    res.json(ResponseUtils.success(programs, 'Loyalty programs retrieved successfully'));
  });

  static getMyLoyalty = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.userId;

    const loyalty = await UserLoyalty.findOne({ userId })
      .populate('programId', 'name description tiers pointsConfig')
      .lean();

    if (!loyalty) {
      return res.status(404).json(ResponseUtils.error('No loyalty program found'));
    }

    res.json(ResponseUtils.success(loyalty, 'Loyalty information retrieved successfully'));
  });

  static createProgram = asyncHandler(async (req: Request, res: Response) => {
    const programData = req.body;

    const program = new LoyaltyProgram(programData);
    await program.save();

    res.status(201).json(ResponseUtils.success(program, 'Loyalty program created successfully'));
  });

  static updateProgram = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updates = req.body;

    if (!DatabaseUtils.isValidObjectId(id)) {
      return res.status(400).json(ResponseUtils.error('Invalid program ID'));
    }

    const program = await LoyaltyProgram.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!program) {
      return res.status(404).json(ResponseUtils.error('Loyalty program not found'));
    }

    res.json(ResponseUtils.success(program, 'Loyalty program updated successfully'));
  });

  static earnPoints = asyncHandler(async (req: Request, res: Response) => {
    const { points, orderId, description } = req.body;
    const userId = req.user?.userId;

    const loyalty = await UserLoyalty.findOne({ userId });
    if (!loyalty) {
      return res.status(404).json(ResponseUtils.error('No loyalty program found'));
    }

    loyalty.points += points;
    loyalty.totalEarned += points;
    loyalty.transactions.push({
      type: 'earned',
      points,
      orderId,
      description,
      date: new Date()
    });

    await loyalty.save();

    res.json(ResponseUtils.success(loyalty, 'Points earned successfully'));
  });

  static redeemPoints = asyncHandler(async (req: Request, res: Response) => {
    const { points, description } = req.body;
    const userId = req.user?.userId;

    const loyalty = await UserLoyalty.findOne({ userId });
    if (!loyalty) {
      return res.status(404).json(ResponseUtils.error('No loyalty program found'));
    }

    if (loyalty.points < points) {
      return res.status(400).json(ResponseUtils.error('Insufficient points'));
    }

    loyalty.points -= points;
    loyalty.totalRedeemed += points;
    loyalty.transactions.push({
      type: 'redeemed',
      points: -points,
      description,
      date: new Date()
    });

    await loyalty.save();

    res.json(ResponseUtils.success(loyalty, 'Points redeemed successfully'));
  });

  static getLoyaltyTransactions = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    const { page = 1, limit = 20 } = req.query;

    const loyalty = await UserLoyalty.findOne({ userId });
    if (!loyalty) {
      return res.status(404).json(ResponseUtils.error('No loyalty program found'));
    }

    const skip = (Number(page) - 1) * Number(limit);
    const transactions = loyalty.transactions
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(skip, skip + Number(limit));

    res.json(ResponseUtils.success({
      transactions,
      total: loyalty.transactions.length,
      currentPoints: loyalty.points
    }, 'Loyalty transactions retrieved successfully'));
  });
}
