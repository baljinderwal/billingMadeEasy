import { Request, Response } from 'express';
import { AuthUtils, ResponseUtils, DatabaseUtils } from '@billing/utils';
import { asyncHandler } from '@billing/middleware';
import User from '../models/User';

export class AuthController {
  static register = asyncHandler(async (req: Request, res: Response) => {
    const { email, password, firstName, lastName, phone } = req.body;

    const existingUser = await User.findOne({ 
      $or: [{ email }, ...(phone ? [{ phone }] : [])]
    });

    if (existingUser) {
      return res.status(409).json(ResponseUtils.error('User already exists with this email or phone'));
    }

    const hashedPassword = await AuthUtils.hashPassword(password);

    const user = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phone
    });

    await user.save();

    const token = AuthUtils.generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role
    });

    const refreshToken = AuthUtils.generateRefreshToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role
    });

    const userResponse = {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
      createdAt: user.createdAt
    };

    res.status(201).json(ResponseUtils.success({
      user: userResponse,
      token,
      refreshToken
    }, 'User registered successfully'));
  });

  static login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json(ResponseUtils.error('Invalid credentials'));
    }

    const isPasswordValid = await AuthUtils.comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json(ResponseUtils.error('Invalid credentials'));
    }

    user.lastLogin = new Date();
    await user.save();

    const token = AuthUtils.generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role
    });

    const refreshToken = AuthUtils.generateRefreshToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role
    });

    const userResponse = {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
      lastLogin: user.lastLogin
    };

    res.json(ResponseUtils.success({
      user: userResponse,
      token,
      refreshToken
    }, 'Login successful'));
  });

  static refreshToken = asyncHandler(async (req: Request, res: Response) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json(ResponseUtils.error('Refresh token required'));
    }

    try {
      const decoded = AuthUtils.verifyRefreshToken(refreshToken);
      const user = await User.findById(decoded.userId);

      if (!user) {
        return res.status(401).json(ResponseUtils.error('Invalid refresh token'));
      }

      const newToken = AuthUtils.generateToken({
        userId: user._id.toString(),
        email: user.email,
        role: user.role
      });

      const newRefreshToken = AuthUtils.generateRefreshToken({
        userId: user._id.toString(),
        email: user.email,
        role: user.role
      });

      res.json(ResponseUtils.success({
        token: newToken,
        refreshToken: newRefreshToken
      }, 'Token refreshed successfully'));
    } catch (error) {
      return res.status(401).json(ResponseUtils.error('Invalid refresh token'));
    }
  });

  static logout = asyncHandler(async (req: Request, res: Response) => {
    res.json(ResponseUtils.success(null, 'Logout successful'));
  });

  static forgotPassword = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json(ResponseUtils.success(null, 'If the email exists, a reset link has been sent'));
    }

    res.json(ResponseUtils.success(null, 'Password reset email sent'));
  });

  static resetPassword = asyncHandler(async (req: Request, res: Response) => {
    const { token, password } = req.body;

    res.json(ResponseUtils.success(null, 'Password reset successful'));
  });

  static verifyEmail = asyncHandler(async (req: Request, res: Response) => {
    const { token } = req.body;

    res.json(ResponseUtils.success(null, 'Email verified successfully'));
  });

  static resendVerification = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;

    res.json(ResponseUtils.success(null, 'Verification email sent'));
  });
}
