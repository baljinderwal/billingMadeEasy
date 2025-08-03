"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferralController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const utils_1 = require("@billing/utils");
const middleware_1 = require("@billing/middleware");
const Referral_1 = __importDefault(require("../models/Referral"));
class ReferralController {
}
exports.ReferralController = ReferralController;
_a = ReferralController;
ReferralController.getReferrals = (0, middleware_1.asyncHandler)(async (req, res) => {
    const { page = 1, limit = 20 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const [referrals, total] = await Promise.all([
        Referral_1.default.find()
            .populate('referrerId', 'firstName lastName email')
            .populate('refereeId', 'firstName lastName email')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit))
            .lean(),
        Referral_1.default.countDocuments()
    ]);
    res.json(utils_1.ResponseUtils.paginated(referrals, Number(page), Number(limit), total, 'Referrals retrieved successfully'));
});
ReferralController.getMyReferrals = (0, middleware_1.asyncHandler)(async (req, res) => {
    const userId = req.user?.userId;
    const { page = 1, limit = 20 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const [referrals, total] = await Promise.all([
        Referral_1.default.find({ referrerId: userId })
            .populate('refereeId', 'firstName lastName email')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit))
            .lean(),
        Referral_1.default.countDocuments({ referrerId: userId })
    ]);
    res.json(utils_1.ResponseUtils.paginated(referrals, Number(page), Number(limit), total, 'My referrals retrieved successfully'));
});
ReferralController.generateReferralCode = (0, middleware_1.asyncHandler)(async (req, res) => {
    const userId = req.user?.userId;
    const existingReferral = await Referral_1.default.findOne({
        referrerId: userId,
        status: 'pending',
        expiresAt: { $gt: new Date() }
    });
    if (existingReferral) {
        res.json(utils_1.ResponseUtils.success(existingReferral, 'Active referral code found'));
        return;
    }
    const code = utils_1.HelperUtils.generateReferralCode();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);
    const referral = new Referral_1.default({
        referrerId: userId,
        code,
        reward: {
            referrerReward: { type: 'fixed', value: 100 },
            refereeReward: { type: 'percentage', value: 10 }
        },
        expiresAt
    });
    await referral.save();
    res.status(201).json(utils_1.ResponseUtils.success(referral, 'Referral code generated successfully'));
});
ReferralController.validateReferralCode = (0, middleware_1.asyncHandler)(async (req, res) => {
    const { code } = req.params;
    const referral = await Referral_1.default.findOne({
        code,
        status: 'pending',
        expiresAt: { $gt: new Date() }
    }).populate('referrerId', 'firstName lastName');
    if (!referral) {
        res.status(404).json(utils_1.ResponseUtils.error('Invalid or expired referral code'));
        return;
    }
    res.json(utils_1.ResponseUtils.success({
        code: referral.code,
        referrer: referral.referrerId,
        reward: referral.reward.refereeReward
    }, 'Referral code is valid'));
});
ReferralController.applyReferralCode = (0, middleware_1.asyncHandler)(async (req, res) => {
    const { code } = req.params;
    const { orderId } = req.body;
    const userId = req.user?.userId;
    const referral = await Referral_1.default.findOne({
        code,
        status: 'pending',
        expiresAt: { $gt: new Date() }
    });
    if (!referral) {
        res.status(404).json(utils_1.ResponseUtils.error('Invalid or expired referral code'));
        return;
    }
    if (referral.referrerId.toString() === userId) {
        res.status(400).json(utils_1.ResponseUtils.error('Cannot use your own referral code'));
        return;
    }
    referral.refereeId = new mongoose_1.default.Types.ObjectId(userId);
    referral.orderId = orderId;
    referral.status = 'completed';
    referral.completedAt = new Date();
    await referral.save();
    res.json(utils_1.ResponseUtils.success(referral, 'Referral code applied successfully'));
});
//# sourceMappingURL=ReferralController.js.map