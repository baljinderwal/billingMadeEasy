"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PromotionController_1 = require("../controllers/PromotionController");
const middleware_1 = require("@billing/middleware");
const router = express_1.default.Router();
router.use(middleware_1.authenticate);
router.get('/', PromotionController_1.PromotionController.getPromotions);
router.get('/active', PromotionController_1.PromotionController.getActivePromotions);
router.get('/:id', PromotionController_1.PromotionController.getPromotionById);
router.post('/', (0, middleware_1.authorize)(['admin', 'marketing']), PromotionController_1.PromotionController.createPromotion);
router.put('/:id', (0, middleware_1.authorize)(['admin', 'marketing']), PromotionController_1.PromotionController.updatePromotion);
router.delete('/:id', (0, middleware_1.authorize)(['admin', 'marketing']), PromotionController_1.PromotionController.deletePromotion);
router.post('/:id/activate', (0, middleware_1.authorize)(['admin', 'marketing']), PromotionController_1.PromotionController.activatePromotion);
router.post('/:id/deactivate', (0, middleware_1.authorize)(['admin', 'marketing']), PromotionController_1.PromotionController.deactivatePromotion);
exports.default = router;
//# sourceMappingURL=promotions.js.map