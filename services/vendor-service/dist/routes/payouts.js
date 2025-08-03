"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PayoutController_1 = require("../controllers/PayoutController");
const middleware_1 = require("@billing/middleware");
const router = express_1.default.Router();
router.use(middleware_1.authenticate);
router.get('/', PayoutController_1.PayoutController.getPayouts);
router.get('/my-payouts', PayoutController_1.PayoutController.getMyPayouts);
router.get('/:id', PayoutController_1.PayoutController.getPayoutById);
router.post('/', (0, middleware_1.authorize)(['admin']), PayoutController_1.PayoutController.createPayout);
router.put('/:id/process', (0, middleware_1.authorize)(['admin']), PayoutController_1.PayoutController.processPayout);
router.put('/:id/complete', (0, middleware_1.authorize)(['admin']), PayoutController_1.PayoutController.completePayout);
exports.default = router;
//# sourceMappingURL=payouts.js.map