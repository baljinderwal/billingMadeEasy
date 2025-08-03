"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CampaignController_1 = require("../controllers/CampaignController");
const middleware_1 = require("@billing/middleware");
const router = express_1.default.Router();
router.use(middleware_1.authenticate);
router.get('/', CampaignController_1.CampaignController.getCampaigns);
router.get('/:id', CampaignController_1.CampaignController.getCampaignById);
router.post('/', (0, middleware_1.authorize)(['admin', 'marketing']), CampaignController_1.CampaignController.createCampaign);
router.put('/:id', (0, middleware_1.authorize)(['admin', 'marketing']), CampaignController_1.CampaignController.updateCampaign);
router.delete('/:id', (0, middleware_1.authorize)(['admin', 'marketing']), CampaignController_1.CampaignController.deleteCampaign);
router.post('/:id/launch', (0, middleware_1.authorize)(['admin', 'marketing']), CampaignController_1.CampaignController.launchCampaign);
router.post('/:id/pause', (0, middleware_1.authorize)(['admin', 'marketing']), CampaignController_1.CampaignController.pauseCampaign);
router.get('/:id/metrics', CampaignController_1.CampaignController.getCampaignMetrics);
exports.default = router;
//# sourceMappingURL=campaigns.js.map