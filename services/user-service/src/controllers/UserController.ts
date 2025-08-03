import { Request, Response } from 'express';
import { ResponseUtils, DatabaseUtils } from '../../../../shared/utils/dist/index.js';
import { asyncHandler } from '../../../../shared/middleware/dist/index.js';
import User from '../models/User';

export class UserController {
  static getProfile = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.userId;

    const user = await User.findById(userId).select('-password');
    if (!user) {
      res.status(404).json(ResponseUtils.error('User not found'));
      return;
    }

    res.json(ResponseUtils.success(user, 'Profile retrieved successfully'));
  });

  static updateProfile = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.userId;
    const updates = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      res.status(404).json(ResponseUtils.error('User not found'));
      return;
    }

    res.json(ResponseUtils.success(user, 'Profile updated successfully'));
  });

  static deleteAccount = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.userId;

    await User.findByIdAndDelete(userId);

    res.json(ResponseUtils.success(null, 'Account deleted successfully'));
  });

  static getUserById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!DatabaseUtils.isValidObjectId(id)) {
      res.status(400).json(ResponseUtils.error('Invalid user ID'));
      return;
    }

    const user = await User.findById(id).select('-password -addresses');
    if (!user) {
      res.status(404).json(ResponseUtils.error('User not found'));
      return;
    }

    res.json(ResponseUtils.success(user, 'User retrieved successfully'));
  });
}
