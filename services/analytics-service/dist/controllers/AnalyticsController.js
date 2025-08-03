"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsController = void 0;
const utils_1 = require("@billing/utils");
const middleware_1 = require("@billing/middleware");
const Analytics_1 = __importDefault(require("../models/Analytics"));
class AnalyticsController {
}
exports.AnalyticsController = AnalyticsController;
_a = AnalyticsController;
AnalyticsController.getAnalytics = (0, middleware_1.asyncHandler)(async (req, res) => {
    const query = req.query;
    const { type, period, startDate, endDate, dimensions } = query;
    const filter = {
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
    const analytics = await Analytics_1.default.find(filter)
        .sort({ date: -1 })
        .lean();
    res.json(utils_1.ResponseUtils.success(analytics, 'Analytics data retrieved successfully'));
});
AnalyticsController.getSalesAnalytics = (0, middleware_1.asyncHandler)(async (req, res) => {
    const { startDate, endDate, period = 'daily' } = req.query;
    const analytics = await Analytics_1.default.find({
        type: 'sales',
        period,
        date: {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
        }
    }).sort({ date: 1 }).lean();
    const summary = {
        totalRevenue: analytics.reduce((sum, item) => sum + (item.metrics?.revenue || 0), 0),
        totalOrders: analytics.reduce((sum, item) => sum + (item.metrics?.orders || 0), 0),
        averageOrderValue: 0,
        data: analytics
    };
    if (summary.totalOrders > 0) {
        summary.averageOrderValue = summary.totalRevenue / summary.totalOrders;
    }
    res.json(utils_1.ResponseUtils.success(summary, 'Sales analytics retrieved successfully'));
});
AnalyticsController.getTrafficAnalytics = (0, middleware_1.asyncHandler)(async (req, res) => {
    const { startDate, endDate, period = 'daily' } = req.query;
    const analytics = await Analytics_1.default.find({
        type: 'traffic',
        period,
        date: {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
        }
    }).sort({ date: 1 }).lean();
    const summary = {
        totalVisitors: analytics.reduce((sum, item) => sum + (item.metrics?.visitors || 0), 0),
        totalPageViews: analytics.reduce((sum, item) => sum + (item.metrics?.pageViews || 0), 0),
        bounceRate: 0,
        data: analytics
    };
    res.json(utils_1.ResponseUtils.success(summary, 'Traffic analytics retrieved successfully'));
});
AnalyticsController.getConversionAnalytics = (0, middleware_1.asyncHandler)(async (req, res) => {
    const { startDate, endDate, period = 'daily' } = req.query;
    const analytics = await Analytics_1.default.find({
        type: 'conversion',
        period,
        date: {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
        }
    }).sort({ date: 1 }).lean();
    res.json(utils_1.ResponseUtils.success(analytics, 'Conversion analytics retrieved successfully'));
});
AnalyticsController.getProductAnalytics = (0, middleware_1.asyncHandler)(async (req, res) => {
    const { startDate, endDate, period = 'daily' } = req.query;
    const analytics = await Analytics_1.default.find({
        type: 'product',
        period,
        date: {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
        }
    }).sort({ date: 1 }).lean();
    res.json(utils_1.ResponseUtils.success(analytics, 'Product analytics retrieved successfully'));
});
AnalyticsController.getCustomerAnalytics = (0, middleware_1.asyncHandler)(async (req, res) => {
    const { startDate, endDate, period = 'daily' } = req.query;
    const analytics = await Analytics_1.default.find({
        type: 'customer',
        period,
        date: {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
        }
    }).sort({ date: 1 }).lean();
    res.json(utils_1.ResponseUtils.success(analytics, 'Customer analytics retrieved successfully'));
});
AnalyticsController.trackEvent = (0, middleware_1.asyncHandler)(async (req, res) => {
    const { type, period, metrics, dimensions } = req.body;
    const date = new Date();
    const existingAnalytics = await Analytics_1.default.findOne({
        type,
        period,
        date: {
            $gte: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
            $lt: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
        }
    });
    if (existingAnalytics) {
        Object.keys(metrics).forEach(key => {
            const currentValue = existingAnalytics.metrics.get(key) || 0;
            existingAnalytics.metrics.set(key, currentValue + metrics[key]);
        });
        if (dimensions) {
            Object.keys(dimensions).forEach(key => {
                existingAnalytics.dimensions.set(key, dimensions[key]);
            });
        }
        await existingAnalytics.save();
        res.json(utils_1.ResponseUtils.success(existingAnalytics, 'Analytics updated successfully'));
        return;
    }
    const analytics = new Analytics_1.default({
        type,
        period,
        date,
        metrics: new Map(Object.entries(metrics)),
        dimensions: new Map(Object.entries(dimensions || {}))
    });
    await analytics.save();
    res.status(201).json(utils_1.ResponseUtils.success(analytics, 'Analytics tracked successfully'));
});
//# sourceMappingURL=AnalyticsController.js.map