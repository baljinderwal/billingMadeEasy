import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import { JWTPayload } from '../../types/dist/index';

export class AuthUtils {
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return bcrypt.hash(password, saltRounds);
  }

  static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  static generateToken(payload: Omit<JWTPayload, 'iat' | 'exp'>, expiresIn: string = '24h'): string {
    const secret = process.env.JWT_SECRET || 'your-super-secret-jwt-key';
    return jwt.sign(payload as object, secret, { expiresIn: expiresIn as any });
  }

  static generateRefreshToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
    const secret = process.env.JWT_REFRESH_SECRET || 'your-super-secret-refresh-key';
    return jwt.sign(payload as object, secret, { expiresIn: '7d' as any });
  }

  static verifyToken(token: string): JWTPayload {
    const secret = process.env.JWT_SECRET || 'your-super-secret-jwt-key';
    return jwt.verify(token, secret) as JWTPayload;
  }

  static verifyRefreshToken(token: string): JWTPayload {
    const secret = process.env.JWT_REFRESH_SECRET || 'your-super-secret-refresh-key';
    return jwt.verify(token, secret) as JWTPayload;
  }

  static generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  static generateSessionId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
}
