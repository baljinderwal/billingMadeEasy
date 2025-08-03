"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CommissionController_1 = require("../controllers/CommissionController");
const middleware_1 = require("@billing/middleware");
const router = express_1.default.Router();
router.use(middleware_1.authenticate);
router.get('/', CommissionController_1.CommissionController.getCommissions);
router.get('/my-commissions', CommissionController_1.CommissionController.getMyCommissions);
router.get('/:id', CommissionController_1.CommissionController.getCommissionById);
router.post('/calculate', CommissionController_1.CommissionController.calculateCommission);
router.put('/:id/status', (0, middleware_1.authorize)(['admin']), CommissionController_1.CommissionController.updateCommissionStatus);
exports.default = router;
//# sourceMappingURL=commissions.js.map