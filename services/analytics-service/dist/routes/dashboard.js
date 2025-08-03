"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DashboardController_1 = require("../controllers/DashboardController");
const middleware_1 = require("@billing/middleware");
const router = express_1.default.Router();
router.use(middleware_1.authenticate);
router.get('/overview', DashboardController_1.DashboardController.getOverview);
router.get('/kpis', DashboardController_1.DashboardController.getKPIs);
router.get('/charts', DashboardController_1.DashboardController.getChartData);
router.get('/widgets', DashboardController_1.DashboardController.getWidgets);
router.post('/widgets', (0, middleware_1.authorize)(['admin']), DashboardController_1.DashboardController.createWidget);
router.put('/widgets/:id', (0, middleware_1.authorize)(['admin']), DashboardController_1.DashboardController.updateWidget);
router.delete('/widgets/:id', (0, middleware_1.authorize)(['admin']), DashboardController_1.DashboardController.deleteWidget);
exports.default = router;
//# sourceMappingURL=dashboard.js.map