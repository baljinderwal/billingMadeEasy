"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionController = void 0;
const utils_1 = require("@billing/utils");
const middleware_1 = require("@billing/middleware");
const Promotion_1 = __importDefault(require("../models/Promotion"));
class PromotionController {
}
exports.PromotionController = PromotionController;
_a = PromotionController;
PromotionController.getPromotions = (0, middleware_1.asyncHandler)(async (req, res) => {
    const query = req.query;
    const { page = 1, limit = 20, sort = 'createdAt', order = 'desc' } = query;
    const filter = {};
    if (query.type)
        filter.type = query.type;
    if (query.status)
        filter.status = query.status;
    const sortOrder = order === 'asc' ? 1 : -1;
    const skip = (page - 1) * limit;
    const [promotions, total] = await Promise.all([
        Promotion_1.default.find(filter)
            .populate('createdBy', 'firstName lastName email')
            .sort({ [sort]: sortOrder })
            .skip(skip)
            .limit(limit)
            .lean(),
        Promotion_1.default.countDocuments(filter)
    ]);
    res.json(utils_1.ResponseUtils.paginated(promotions, page, limit, total, 'Promotions retrieved successfully'));
});
PromotionController.getActivePromotions = (0, middleware_1.asyncHandler)(async (req, res) => {
    const now = new Date();
    const promotions = await Promotion_1.default.find({
        status: 'active',
        'schedule.startDate': { $lte: now },
        'schedule.endDate': { $gte: now }
    })
        .sort({ priority: -1 })
        .lean();
    res.json(utils_1.ResponseUtils.success(promotions, 'Active promotions retrieved successfully'));
});
PromotionController.getPromotionById = (0, middleware_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    if (!utils_1.DatabaseUtils.isValidObjectId(id)) {
        res.status(400).json(utils_1.ResponseUtils.error('Invalid promotion ID'));
        return;
    }
    const promotion = await Promotion_1.default.findById(id)
        .populate('createdBy', 'firstName lastName email')
        .lean();
    if (!promotion) {
        res.status(404).json(utils_1.ResponseUtils.error('Promotion not found'));
        return;
    }
    res.json(utils_1.ResponseUtils.success(promotion, 'Promotion retrieved successfully'));
});
PromotionController.createPromotion = (0, middleware_1.asyncHandler)(async (req, res) => {
    const promotionData = req.body;
    const userId = req.user?.userId;
    promotionData.createdBy = userId;
    const promotion = new Promotion_1.default(promotionData);
    await promotion.save();
    const populatedPromotion = await Promotion_1.default.findById(promotion._id)
        .populate('createdBy', 'firstName lastName email')
        .lean();
    res.status(201).json(utils_1.ResponseUtils.success(populatedPromotion, 'Promotion created successfully'));
});
PromotionController.updatePromotion = (0, middleware_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    if (!utils_1.DatabaseUtils.isValidObjectId(id)) {
        res.status(400).json(utils_1.ResponseUtils.error('Invalid promotion ID'));
        return;
    }
    const promotion = await Promotion_1.default.findByIdAndUpdate(id, { $set: updates }, { new: true, runValidators: true }).populate('createdBy', 'firstName lastName email');
    if (!promotion) {
        res.status(404).json(utils_1.ResponseUtils.error('Promotion not found'));
        return;
    }
    res.json(utils_1.ResponseUtils.success(promotion, 'Promotion updated successfully'));
});
PromotionController.deletePromotion = (0, middleware_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    if (!utils_1.DatabaseUtils.isValidObjectId(id)) {
        res.status(400).json(utils_1.ResponseUtils.error('Invalid promotion ID'));
        return;
    }
    const promotion = await Promotion_1.default.findByIdAndDelete(id);
    if (!promotion) {
        res.status(404).json(utils_1.ResponseUtils.error('Promotion not found'));
        return;
    }
    res.json(utils_1.ResponseUtils.success(null, 'Promotion deleted successfully'));
});
PromotionController.activatePromotion = (0, middleware_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    if (!utils_1.DatabaseUtils.isValidObjectId(id)) {
        res.status(400).json(utils_1.ResponseUtils.error('Invalid promotion ID'));
        return;
    }
    const promotion = await Promotion_1.default.findByIdAndUpdate(id, { status: 'active' }, { new: true });
    if (!promotion) {
        res.status(404).json(utils_1.ResponseUtils.error('Promotion not found'));
        return;
    }
    res.json(utils_1.ResponseUtils.success(promotion, 'Promotion activated successfully'));
});
PromotionController.deactivatePromotion = (0, middleware_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    if (!utils_1.DatabaseUtils.isValidObjectId(id)) {
        res.status(400).json(utils_1.ResponseUtils.error('Invalid promotion ID'));
        return;
    }
    const promotion = await Promotion_1.default.findByIdAndUpdate(id, { status: 'inactive' }, { new: true });
    if (!promotion) {
        res.status(404).json(utils_1.ResponseUtils.error('Promotion not found'));
        return;
    }
    res.json(utils_1.ResponseUtils.success(promotion, 'Promotion deactivated successfully'));
});
//# sourceMappingURL=PromotionController.js.map