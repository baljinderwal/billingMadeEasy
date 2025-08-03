"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ReportsController_1 = require("../controllers/ReportsController");
const middleware_1 = require("@billing/middleware");
const router = express_1.default.Router();
router.use(middleware_1.authenticate);
router.get('/', ReportsController_1.ReportsController.getReports);
router.get('/sales', ReportsController_1.ReportsController.getSalesReport);
router.get('/inventory', ReportsController_1.ReportsController.getInventoryReport);
router.get('/customers', ReportsController_1.ReportsController.getCustomerReport);
router.get('/vendors', ReportsController_1.ReportsController.getVendorReport);
router.post('/generate', (0, middleware_1.authorize)(['admin', 'manager']), ReportsController_1.ReportsController.generateReport);
router.get('/:id/download', ReportsController_1.ReportsController.downloadReport);
exports.default = router;
//# sourceMappingURL=reports.js.map