"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignController = void 0;
const utils_1 = require("@billing/utils");
const middleware_1 = require("@billing/middleware");
class CampaignController {
}
exports.CampaignController = CampaignController;
_a = CampaignController;
CampaignController.getCampaigns = (0, middleware_1.asyncHandler)(async (req, res) => {
    const campaigns = [
        {
            id: 'campaign-1',
            name: 'Welcome Series',
            type: 'email',
            status: 'active',
            recipients: 1250,
            sent: 1200,
            opened: 850,
            clicked: 120,
            createdAt: new Date()
        },
        {
            id: 'campaign-2',
            name: 'Flash Sale Alert',
            type: 'sms',
            status: 'completed',
            recipients: 5000,
            sent: 4950,
            opened: 4800,
            clicked: 1200,
            createdAt: new Date()
        }
    ];
    res.json(utils_1.ResponseUtils.success(campaigns, 'Campaigns retrieved successfully'));
});
CampaignController.getCampaignById = (0, middleware_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const campaign = {
        id,
        name: 'Sample Campaign',
        type: 'email',
        status: 'active',
        recipients: 1000,
        sent: 950,
        opened: 700,
        clicked: 150,
        createdAt: new Date()
    };
    res.json(utils_1.ResponseUtils.success(campaign, 'Campaign retrieved successfully'));
});
CampaignController.createCampaign = (0, middleware_1.asyncHandler)(async (req, res) => {
    const campaignData = req.body;
    const campaign = {
        id: `campaign-${Date.now()}`,
        ...campaignData,
        status: 'draft',
        createdAt: new Date()
    };
    res.status(201).json(utils_1.ResponseUtils.success(campaign, 'Campaign created successfully'));
});
CampaignController.updateCampaign = (0, middleware_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const campaign = {
        id,
        ...updates,
        updatedAt: new Date()
    };
    res.json(utils_1.ResponseUtils.success(campaign, 'Campaign updated successfully'));
});
CampaignController.deleteCampaign = (0, middleware_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    res.json(utils_1.ResponseUtils.success(null, 'Campaign deleted successfully'));
});
CampaignController.sendCampaign = (0, middleware_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const result = {
        campaignId: id,
        status: 'sending',
        estimatedCompletion: new Date(Date.now() + 300000),
        recipients: 1000
    };
    res.json(utils_1.ResponseUtils.success(result, 'Campaign sending initiated'));
});
CampaignController.getCampaignStats = (0, middleware_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const stats = {
        campaignId: id,
        recipients: 1000,
        sent: 950,
        delivered: 920,
        opened: 700,
        clicked: 150,
        unsubscribed: 5,
        bounced: 30,
        openRate: 76.1,
        clickRate: 21.4,
        unsubscribeRate: 0.5
    };
    res.json(utils_1.ResponseUtils.success(stats, 'Campaign stats retrieved successfully'));
});
//# sourceMappingURL=CampaignController.js.map