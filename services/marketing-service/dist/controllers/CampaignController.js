"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignController = void 0;
const utils_1 = require("@billing/utils");
const middleware_1 = require("@billing/middleware");
const Campaign_1 = __importDefault(require("../models/Campaign"));
class CampaignController {
}
exports.CampaignController = CampaignController;
_a = CampaignController;
CampaignController.getCampaigns = (0, middleware_1.asyncHandler)(async (req, res) => {
    const query = req.query;
    const { page = 1, limit = 20, sort = 'createdAt', order = 'desc' } = query;
    const filter = {};
    if (query.type)
        filter.type = query.type;
    if (query.status)
        filter.status = query.status;
    if (query.startDate || query.endDate) {
        filter['schedule.startDate'] = {};
        if (query.startDate)
            filter['schedule.startDate'].$gte = new Date(query.startDate);
        if (query.endDate)
            filter['schedule.startDate'].$lte = new Date(query.endDate);
    }
    const sortOrder = order === 'asc' ? 1 : -1;
    const skip = (page - 1) * limit;
    const [campaigns, total] = await Promise.all([
        Campaign_1.default.find(filter)
            .populate('createdBy', 'firstName lastName email')
            .sort({ [sort]: sortOrder })
            .skip(skip)
            .limit(limit)
            .lean(),
        Campaign_1.default.countDocuments(filter)
    ]);
    res.json(utils_1.ResponseUtils.paginated(campaigns, page, limit, total, 'Campaigns retrieved successfully'));
});
CampaignController.getCampaignById = (0, middleware_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    if (!utils_1.DatabaseUtils.isValidObjectId(id)) {
        res.status(400).json(utils_1.ResponseUtils.error('Invalid campaign ID'));
        return;
    }
    const campaign = await Campaign_1.default.findById(id)
        .populate('createdBy', 'firstName lastName email')
        .lean();
    if (!campaign) {
        res.status(404).json(utils_1.ResponseUtils.error('Campaign not found'));
        return;
    }
    res.json(utils_1.ResponseUtils.success(campaign, 'Campaign retrieved successfully'));
});
CampaignController.createCampaign = (0, middleware_1.asyncHandler)(async (req, res) => {
    const campaignData = req.body;
    const userId = req.user?.userId;
    campaignData.createdBy = userId;
    const campaign = new Campaign_1.default(campaignData);
    await campaign.save();
    const populatedCampaign = await Campaign_1.default.findById(campaign._id)
        .populate('createdBy', 'firstName lastName email')
        .lean();
    res.status(201).json(utils_1.ResponseUtils.success(populatedCampaign, 'Campaign created successfully'));
});
CampaignController.updateCampaign = (0, middleware_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    if (!utils_1.DatabaseUtils.isValidObjectId(id)) {
        res.status(400).json(utils_1.ResponseUtils.error('Invalid campaign ID'));
        return;
    }
    const campaign = await Campaign_1.default.findByIdAndUpdate(id, { $set: updates }, { new: true, runValidators: true }).populate('createdBy', 'firstName lastName email');
    if (!campaign) {
        res.status(404).json(utils_1.ResponseUtils.error('Campaign not found'));
        return;
    }
    res.json(utils_1.ResponseUtils.success(campaign, 'Campaign updated successfully'));
});
CampaignController.deleteCampaign = (0, middleware_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    if (!utils_1.DatabaseUtils.isValidObjectId(id)) {
        res.status(400).json(utils_1.ResponseUtils.error('Invalid campaign ID'));
        return;
    }
    const campaign = await Campaign_1.default.findByIdAndDelete(id);
    if (!campaign) {
        res.status(404).json(utils_1.ResponseUtils.error('Campaign not found'));
        return;
    }
    res.json(utils_1.ResponseUtils.success(null, 'Campaign deleted successfully'));
});
CampaignController.launchCampaign = (0, middleware_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    if (!utils_1.DatabaseUtils.isValidObjectId(id)) {
        res.status(400).json(utils_1.ResponseUtils.error('Invalid campaign ID'));
        return;
    }
    const campaign = await Campaign_1.default.findByIdAndUpdate(id, { status: 'active' }, { new: true });
    if (!campaign) {
        res.status(404).json(utils_1.ResponseUtils.error('Campaign not found'));
        return;
    }
    res.json(utils_1.ResponseUtils.success(campaign, 'Campaign launched successfully'));
});
CampaignController.pauseCampaign = (0, middleware_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    if (!utils_1.DatabaseUtils.isValidObjectId(id)) {
        res.status(400).json(utils_1.ResponseUtils.error('Invalid campaign ID'));
        return;
    }
    const campaign = await Campaign_1.default.findByIdAndUpdate(id, { status: 'paused' }, { new: true });
    if (!campaign) {
        res.status(404).json(utils_1.ResponseUtils.error('Campaign not found'));
        return;
    }
    res.json(utils_1.ResponseUtils.success(campaign, 'Campaign paused successfully'));
});
CampaignController.getCampaignMetrics = (0, middleware_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    if (!utils_1.DatabaseUtils.isValidObjectId(id)) {
        res.status(400).json(utils_1.ResponseUtils.error('Invalid campaign ID'));
        return;
    }
    const campaign = await Campaign_1.default.findById(id).select('metrics').lean();
    if (!campaign) {
        res.status(404).json(utils_1.ResponseUtils.error('Campaign not found'));
        return;
    }
    res.json(utils_1.ResponseUtils.success(campaign.metrics, 'Campaign metrics retrieved successfully'));
});
//# sourceMappingURL=CampaignController.js.map