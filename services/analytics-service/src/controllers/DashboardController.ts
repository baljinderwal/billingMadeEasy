import { Request, Response } from 'express';
import { ResponseUtils } from '@billing/utils';
import { asyncHandler } from '@billing/middleware';
import Analytics from '../models/Analytics';

export class DashboardController {
  static getOverview = asyncHandler(async (req: Request, res: Response) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const [todaySales, yesterdaySales, todayTraffic, yesterdayTraffic] = await Promise.all([
      Analytics.findOne({
        type: 'sales',
        period: 'daily',
        date: {
          $gte: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
          $lt: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
        }
      }),
      Analytics.findOne({
        type: 'sales',
        period: 'daily',
        date: {
          $gte: new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate()),
          $lt: new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate() + 1)
        }
      }),
      Analytics.findOne({
        type: 'traffic',
        period: 'daily',
        date: {
          $gte: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
          $lt: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
        }
      }),
      Analytics.findOne({
        type: 'traffic',
        period: 'daily',
        date: {
          $gte: new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate()),
          $lt: new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate() + 1)
        }
      })
    ]);

    const overview = {
      sales: {
        today: todaySales?.metrics.get('revenue') || 0,
        yesterday: yesterdaySales?.metrics.get('revenue') || 0,
        change: 0
      },
      orders: {
        today: todaySales?.metrics.get('orders') || 0,
        yesterday: yesterdaySales?.metrics.get('orders') || 0,
        change: 0
      },
      visitors: {
        today: todayTraffic?.metrics.get('visitors') || 0,
        yesterday: yesterdayTraffic?.metrics.get('visitors') || 0,
        change: 0
      },
      conversion: {
        today: 0,
        yesterday: 0,
        change: 0
      }
    };

    if (overview.sales.yesterday > 0) {
      overview.sales.change = ((overview.sales.today - overview.sales.yesterday) / overview.sales.yesterday) * 100;
    }

    if (overview.orders.yesterday > 0) {
      overview.orders.change = ((overview.orders.today - overview.orders.yesterday) / overview.orders.yesterday) * 100;
    }

    if (overview.visitors.yesterday > 0) {
      overview.visitors.change = ((overview.visitors.today - overview.visitors.yesterday) / overview.visitors.yesterday) * 100;
    }

    res.json(ResponseUtils.success(overview, 'Dashboard overview retrieved successfully'));
  });

  static getKPIs = asyncHandler(async (req: Request, res: Response) => {
    const { period = 'daily', days = 30 } = req.query;
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - Number(days));

    const analytics = await Analytics.find({
      period,
      date: {
        $gte: startDate,
        $lte: endDate
      }
    }).lean();

    const kpis = {
      totalRevenue: 0,
      totalOrders: 0,
      totalVisitors: 0,
      averageOrderValue: 0,
      conversionRate: 0,
      customerAcquisitionCost: 0
    };

    analytics.forEach(item => {
      if (item.type === 'sales') {
        kpis.totalRevenue += item.metrics.get('revenue') || 0;
        kpis.totalOrders += item.metrics.get('orders') || 0;
      }
      if (item.type === 'traffic') {
        kpis.totalVisitors += item.metrics.get('visitors') || 0;
      }
    });

    if (kpis.totalOrders > 0) {
      kpis.averageOrderValue = kpis.totalRevenue / kpis.totalOrders;
    }

    if (kpis.totalVisitors > 0) {
      kpis.conversionRate = (kpis.totalOrders / kpis.totalVisitors) * 100;
    }

    res.json(ResponseUtils.success(kpis, 'KPIs retrieved successfully'));
  });

  static getChartData = asyncHandler(async (req: Request, res: Response) => {
    const { type, period = 'daily', days = 30 } = req.query;
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - Number(days));

    const analytics = await Analytics.find({
      type,
      period,
      date: {
        $gte: startDate,
        $lte: endDate
      }
    }).sort({ date: 1 }).lean();

    const chartData = analytics.map(item => ({
      date: item.date,
      ...Object.fromEntries(item.metrics)
    }));

    res.json(ResponseUtils.success(chartData, 'Chart data retrieved successfully'));
  });

  static getWidgets = asyncHandler(async (req: Request, res: Response) => {
    const widgets = [
      {
        id: 'sales-overview',
        title: 'Sales Overview',
        type: 'chart',
        config: { chartType: 'line', dataSource: 'sales' }
      },
      {
        id: 'traffic-overview',
        title: 'Traffic Overview',
        type: 'chart',
        config: { chartType: 'area', dataSource: 'traffic' }
      },
      {
        id: 'top-products',
        title: 'Top Products',
        type: 'table',
        config: { dataSource: 'products', limit: 10 }
      },
      {
        id: 'conversion-funnel',
        title: 'Conversion Funnel',
        type: 'funnel',
        config: { dataSource: 'conversion' }
      }
    ];

    res.json(ResponseUtils.success(widgets, 'Widgets retrieved successfully'));
  });

  static createWidget = asyncHandler(async (req: Request, res: Response) => {
    const widgetData = req.body;
    res.status(201).json(ResponseUtils.success(widgetData, 'Widget created successfully'));
  });

  static updateWidget = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updates = req.body;
    res.json(ResponseUtils.success({ id, ...updates }, 'Widget updated successfully'));
  });

  static deleteWidget = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    res.json(ResponseUtils.success(null, 'Widget deleted successfully'));
  });
}
