"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const LoyaltyController_1 = require("../controllers/LoyaltyController");
const middleware_1 = require("@billing/middleware");
const router = express_1.default.Router();
router.use(middleware_1.authenticate);
router.get('/programs', LoyaltyController_1.LoyaltyController.getPrograms);
router.get('/my-loyalty', LoyaltyController_1.LoyaltyController.getMyLoyalty);
router.post('/programs', (0, middleware_1.authorize)(['admin']), LoyaltyController_1.LoyaltyController.createProgram);
router.put('/programs/:id', (0, middleware_1.authorize)(['admin']), LoyaltyController_1.LoyaltyController.updateProgram);
router.post('/earn', LoyaltyController_1.LoyaltyController.earnPoints);
router.post('/redeem', LoyaltyController_1.LoyaltyController.redeemPoints);
router.get('/transactions', LoyaltyController_1.LoyaltyController.getLoyaltyTransactions);
exports.default = router;
//# sourceMappingURL=loyalty.js.map