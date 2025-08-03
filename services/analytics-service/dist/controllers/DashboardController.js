"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const utils_1 = require("@billing/utils");
const middleware_1 = require("@billing/middleware");
const Analytics_1 = __importDefault(require("../models/Analytics"));
class DashboardController {
}
exports.DashboardController = DashboardController;
_a = DashboardController;
DashboardController.getOverview = (0, middleware_1.asyncHandler)(async (req, res) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const [todaySales, yesterdaySales, todayTraffic, yesterdayTraffic] = await Promise.all([
        Analytics_1.default.findOne({
            type: 'sales',
            period: 'daily',
            date: {
                $gte: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
                $lt: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
            }
        }),
        Analytics_1.default.findOne({
            type: 'sales',
            period: 'daily',
            date: {
                $gte: new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate()),
                $lt: new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate() + 1)
            }
        }),
        Analytics_1.default.findOne({
            type: 'traffic',
            period: 'daily',
            date: {
                $gte: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
                $lt: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
            }
        }),
        Analytics_1.default.findOne({
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
            today: todaySales?.metrics?.revenue || 0,
            yesterday: yesterdaySales?.metrics?.revenue || 0,
            change: 0
        },
        orders: {
            today: todaySales?.metrics?.orders || 0,
            yesterday: yesterdaySales?.metrics?.orders || 0,
            change: 0
        },
        visitors: {
            today: todayTraffic?.metrics?.visitors || 0,
            yesterday: yesterdayTraffic?.metrics?.visitors || 0,
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
    res.json(utils_1.ResponseUtils.success(overview, 'Dashboard overview retrieved successfully'));
});
DashboardController.getKPIs = (0, middleware_1.asyncHandler)(async (req, res) => {
    const { period = 'daily', days = 30 } = req.query;
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - Number(days));
    const analytics = await Analytics_1.default.find({
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
            kpis.totalRevenue += item.metrics?.revenue || 0;
            kpis.totalOrders += item.metrics?.orders || 0;
        }
        if (item.type === 'traffic') {
            kpis.totalVisitors += item.metrics?.visitors || 0;
        }
    });
    if (kpis.totalOrders > 0) {
        kpis.averageOrderValue = kpis.totalRevenue / kpis.totalOrders;
    }
    if (kpis.totalVisitors > 0) {
        kpis.conversionRate = (kpis.totalOrders / kpis.totalVisitors) * 100;
    }
    res.json(utils_1.ResponseUtils.success(kpis, 'KPIs retrieved successfully'));
});
DashboardController.getChartData = (0, middleware_1.asyncHandler)(async (req, res) => {
    const { type, period = 'daily', days = 30 } = req.query;
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - Number(days));
    const analytics = await Analytics_1.default.find({
        type,
        period,
        date: {
            $gte: startDate,
            $lte: endDate
        }
    }).sort({ date: 1 }).lean();
    const chartData = analytics.map(item => ({
        date: item.date,
        ...item.metrics
    }));
    res.json(utils_1.ResponseUtils.success(chartData, 'Chart data retrieved successfully'));
});
DashboardController.getWidgets = (0, middleware_1.asyncHandler)(async (req, res) => {
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
    res.json(utils_1.ResponseUtils.success(widgets, 'Widgets retrieved successfully'));
});
DashboardController.createWidget = (0, middleware_1.asyncHandler)(async (req, res) => {
    const widgetData = req.body;
    res.status(201).json(utils_1.ResponseUtils.success(widgetData, 'Widget created successfully'));
});
DashboardController.updateWidget = (0, middleware_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    res.json(utils_1.ResponseUtils.success({ id, ...updates }, 'Widget updated successfully'));
});
DashboardController.deleteWidget = (0, middleware_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    res.json(utils_1.ResponseUtils.success(null, 'Widget deleted successfully'));
});
//# sourceMappingURL=DashboardController.js.map