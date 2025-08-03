import { Request, Response } from 'express';
import { ResponseUtils } from '../../../../shared/utils/dist/index.js';
import { asyncHandler } from '../../../../shared/middleware/dist/index.js';
import { AnalyticsQuery } from '../../../../shared/types/dist/index.js';
import Analytics from '../models/Analytics';

export class AnalyticsController {
  static getAnalytics = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const query = req.query as unknown as AnalyticsQuery;
    const { type, period, startDate, endDate, dimensions } = query;

    const filter: any = {
      type,
      period,
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    };

    if (dimensions && dimensions.length > 0) {
      dimensions.forEach(dim => {
        filter[`dimensions.${dim}`] = { $exists: true };
      });
    }

    const analytics = await Analytics.find(filter)
      .sort({ date: -1 })
      .lean();

    res.json(ResponseUtils.success(analytics, 'Analytics data retrieved successfully'));
  });

  static getSalesAnalytics = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { startDate, endDate, period = 'daily' } = req.query;

    const analytics = await Analytics.find({
      type: 'sales',
      period,
      date: {
        $gte: new Date(startDate as string),
        $lte: new Date(endDate as string)
      }
    }).sort({ date: 1 }).lean();

    const summary = {
      totalRevenue: analytics.reduce((sum, item) => sum + ((item.metrics as any)?.revenue || 0), 0),
      totalOrders: analytics.reduce((sum, item) => sum + ((item.metrics as any)?.orders || 0), 0),
      averageOrderValue: 0,
      data: analytics
    };

    if (summary.totalOrders > 0) {
      summary.averageOrderValue = summary.totalRevenue / summary.totalOrders;
    }

    res.json(ResponseUtils.success(summary, 'Sales analytics retrieved successfully'));
  });

  static getTrafficAnalytics = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { startDate, endDate, period = 'daily' } = req.query;

    const analytics = await Analytics.find({
      type: 'traffic',
      period,
      date: {
        $gte: new Date(startDate as string),
        $lte: new Date(endDate as string)
      }
    }).sort({ date: 1 }).lean();

    const summary = {
      totalVisitors: analytics.reduce((sum, item) => sum + ((item.metrics as any)?.visitors || 0), 0),
      totalPageViews: analytics.reduce((sum, item) => sum + ((item.metrics as any)?.pageViews || 0), 0),
      bounceRate: 0,
      data: analytics
    };

    res.json(ResponseUtils.success(summary, 'Traffic analytics retrieved successfully'));
  });

  static getConversionAnalytics = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { startDate, endDate, period = 'daily' } = req.query;

    const analytics = await Analytics.find({
      type: 'conversion',
      period,
      date: {
        $gte: new Date(startDate as string),
        $lte: new Date(endDate as string)
      }
    }).sort({ date: 1 }).lean();

    res.json(ResponseUtils.success(analytics, 'Conversion analytics retrieved successfully'));
  });

  static getProductAnalytics = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { startDate, endDate, period = 'daily' } = req.query;

    const analytics = await Analytics.find({
      type: 'product',
      period,
      date: {
        $gte: new Date(startDate as string),
        $lte: new Date(endDate as string)
      }
    }).sort({ date: 1 }).lean();

    res.json(ResponseUtils.success(analytics, 'Product analytics retrieved successfully'));
  });

  static getCustomerAnalytics = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { startDate, endDate, period = 'daily' } = req.query;

    const analytics = await Analytics.find({
      type: 'customer',
      period,
      date: {
        $gte: new Date(startDate as string),
        $lte: new Date(endDate as string)
      }
    }).sort({ date: 1 }).lean();

    res.json(ResponseUtils.success(analytics, 'Customer analytics retrieved successfully'));
  });

  static trackEvent = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { type, period, metrics, dimensions } = req.body;
    const date = new Date();

    const existingAnalytics = await Analytics.findOne({
      type,
      period,
      date: {
        $gte: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
        $lt: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
      }
    });

    if (existingAnalytics) {
      Object.keys(metrics).forEach(key => {
        const currentValue = (existingAnalytics.metrics as any).get(key) || 0;
        (existingAnalytics.metrics as any).set(key, currentValue + metrics[key]);
      });
      
      if (dimensions) {
        Object.keys(dimensions).forEach(key => {
          (existingAnalytics.dimensions as any).set(key, dimensions[key]);
        });
      }

      await existingAnalytics.save();
      res.json(ResponseUtils.success(existingAnalytics, 'Analytics updated successfully'));
      return;
    }

    const analytics = new Analytics({
      type,
      period,
      date,
      metrics: new Map(Object.entries(metrics)),
      dimensions: new Map(Object.entries(dimensions || {}))
    });

    await analytics.save();
    res.status(201).json(ResponseUtils.success(analytics, 'Analytics tracked successfully'));
  });
}
