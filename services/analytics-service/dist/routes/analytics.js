"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AnalyticsController_1 = require("../controllers/AnalyticsController");
const middleware_1 = require("@billing/middleware");
const router = express_1.default.Router();
router.use(middleware_1.authenticate);
router.get('/', AnalyticsController_1.AnalyticsController.getAnalytics);
router.get('/sales', AnalyticsController_1.AnalyticsController.getSalesAnalytics);
router.get('/traffic', AnalyticsController_1.AnalyticsController.getTrafficAnalytics);
router.get('/conversion', AnalyticsController_1.AnalyticsController.getConversionAnalytics);
router.get('/products', AnalyticsController_1.AnalyticsController.getProductAnalytics);
router.get('/customers', AnalyticsController_1.AnalyticsController.getCustomerAnalytics);
router.post('/track', AnalyticsController_1.AnalyticsController.trackEvent);
exports.default = router;
//# sourceMappingURL=analytics.js.map