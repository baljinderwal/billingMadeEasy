import { Request, Response } from 'express';
import { ResponseUtils, DatabaseUtils } from '../../../../shared/utils/dist/index.js';
import { asyncHandler } from '../../../../shared/middleware/dist/index.js';
import User from '../models/User';

export class AddressController {
  static getAddresses = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.userId;

    const user = await User.findById(userId).select('addresses');
    if (!user) {
      return res.status(404).json(ResponseUtils.error('User not found'));
    }

    res.json(ResponseUtils.success(user.addresses, 'Addresses retrieved successfully'));
  });

  static createAddress = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.userId;
    const addressData = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json(ResponseUtils.error('User not found'));
    }

    if (addressData.isDefault) {
      user.addresses.forEach(addr => addr.isDefault = false);
    }

    user.addresses.push(addressData);
    await user.save();

    const newAddress = user.addresses[user.addresses.length - 1];
    res.status(201).json(ResponseUtils.success(newAddress, 'Address created successfully'));
  });

  static updateAddress = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.userId;
    const { id } = req.params;
    const updates = req.body;

    if (!DatabaseUtils.isValidObjectId(id)) {
      return res.status(400).json(ResponseUtils.error('Invalid address ID'));
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json(ResponseUtils.error('User not found'));
    }

    const address = user.addresses.id(id);
    if (!address) {
      return res.status(404).json(ResponseUtils.error('Address not found'));
    }

    if (updates.isDefault) {
      user.addresses.forEach(addr => addr.isDefault = false);
    }

    Object.assign(address, updates);
    await user.save();

    res.json(ResponseUtils.success(address, 'Address updated successfully'));
  });

  static deleteAddress = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.userId;
    const { id } = req.params;

    if (!DatabaseUtils.isValidObjectId(id)) {
      return res.status(400).json(ResponseUtils.error('Invalid address ID'));
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json(ResponseUtils.error('User not found'));
    }

    const address = user.addresses.id(id);
    if (!address) {
      return res.status(404).json(ResponseUtils.error('Address not found'));
    }

    user.addresses.pull(id);
    await user.save();

    res.json(ResponseUtils.success(null, 'Address deleted successfully'));
  });

  static setDefaultAddress = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.userId;
    const { id } = req.params;

    if (!DatabaseUtils.isValidObjectId(id)) {
      return res.status(400).json(ResponseUtils.error('Invalid address ID'));
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json(ResponseUtils.error('User not found'));
    }

    const address = user.addresses.id(id);
    if (!address) {
      return res.status(404).json(ResponseUtils.error('Address not found'));
    }

    user.addresses.forEach(addr => addr.isDefault = false);
    address.isDefault = true;
    await user.save();

    res.json(ResponseUtils.success(address, 'Default address updated successfully'));
  });
}
