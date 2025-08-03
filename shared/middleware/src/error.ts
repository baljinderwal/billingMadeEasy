import { Request, Response, NextFunction } from 'express';
import { ResponseUtils } from '../../utils/dist/index';

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export const errorHandler = (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';

  console.error(`Error ${statusCode}: ${message}`, {
    stack: error.stack,
    url: req.url,
    method: req.method,
    body: req.body,
    params: req.params,
    query: req.query,
  });

  if (error.name === 'ValidationError') {
    return res.status(400).json(ResponseUtils.error('Validation Error', error.message));
  }

  if (error.name === 'CastError') {
    return res.status(400).json(ResponseUtils.error('Invalid ID format'));
  }

  if (error.name === 'MongoServerError' && (error as any).code === 11000) {
    return res.status(409).json(ResponseUtils.error('Duplicate entry'));
  }

  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json(ResponseUtils.error('Invalid token'));
  }

  if (error.name === 'TokenExpiredError') {
    return res.status(401).json(ResponseUtils.error('Token expired'));
  }

  res.status(statusCode).json(ResponseUtils.error(message));
};

export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json(ResponseUtils.error(`Route ${req.originalUrl} not found`));
};

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export const createError = (message: string, statusCode: number = 500): AppError => {
  const error: AppError = new Error(message);
  error.statusCode = statusCode;
  error.isOperational = true;
  return error;
};
