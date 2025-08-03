import { Request, Response, NextFunction } from 'express';
import { AuthUtils, ResponseUtils } from '@billing/utils';
import { JWTPayload } from '@billing/types';

declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json(ResponseUtils.error('Access token required'));
  }

  try {
    const decoded = AuthUtils.verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json(ResponseUtils.error('Invalid or expired token'));
  }
};

export const optionalAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    try {
      const decoded = AuthUtils.verifyToken(token);
      req.user = decoded;
    } catch (error) {
    }
  }

  next();
};

export const requireRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json(ResponseUtils.error('Authentication required'));
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json(ResponseUtils.error('Insufficient permissions'));
    }

    next();
  };
};

export const requireAdmin = requireRole(['admin']);
export const requireVendor = requireRole(['admin', 'vendor']);
export const requireCustomer = requireRole(['admin', 'customer']);
