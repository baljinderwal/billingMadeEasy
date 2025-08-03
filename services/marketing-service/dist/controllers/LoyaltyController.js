"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoyaltyController = void 0;
const utils_1 = require("@billing/utils");
const middleware_1 = require("@billing/middleware");
const LoyaltyProgram_1 = require("../models/LoyaltyProgram");
class LoyaltyController {
}
exports.LoyaltyController = LoyaltyController;
_a = LoyaltyController;
LoyaltyController.getPrograms = (0, middleware_1.asyncHandler)(async (req, res) => {
    const programs = await LoyaltyProgram_1.LoyaltyProgram.find({ status: 'active' }).lean();
    res.json(utils_1.ResponseUtils.success(programs, 'Loyalty programs retrieved successfully'));
});
LoyaltyController.getMyLoyalty = (0, middleware_1.asyncHandler)(async (req, res) => {
    const userId = req.user?.userId;
    const loyalty = await LoyaltyProgram_1.UserLoyalty.findOne({ userId })
        .populate('programId', 'name description tiers pointsConfig')
        .lean();
    if (!loyalty) {
        res.status(404).json(utils_1.ResponseUtils.error('No loyalty program found'));
        return;
    }
    res.json(utils_1.ResponseUtils.success(loyalty, 'Loyalty information retrieved successfully'));
});
LoyaltyController.createProgram = (0, middleware_1.asyncHandler)(async (req, res) => {
    const programData = req.body;
    const program = new LoyaltyProgram_1.LoyaltyProgram(programData);
    await program.save();
    res.status(201).json(utils_1.ResponseUtils.success(program, 'Loyalty program created successfully'));
});
LoyaltyController.updateProgram = (0, middleware_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    if (!utils_1.DatabaseUtils.isValidObjectId(id)) {
        res.status(400).json(utils_1.ResponseUtils.error('Invalid program ID'));
        return;
    }
    const program = await LoyaltyProgram_1.LoyaltyProgram.findByIdAndUpdate(id, { $set: updates }, { new: true, runValidators: true });
    if (!program) {
        res.status(404).json(utils_1.ResponseUtils.error('Loyalty program not found'));
        return;
    }
    res.json(utils_1.ResponseUtils.success(program, 'Loyalty program updated successfully'));
});
LoyaltyController.earnPoints = (0, middleware_1.asyncHandler)(async (req, res) => {
    const { points, orderId, description } = req.body;
    const userId = req.user?.userId;
    const loyalty = await LoyaltyProgram_1.UserLoyalty.findOne({ userId });
    if (!loyalty) {
        res.status(404).json(utils_1.ResponseUtils.error('No loyalty program found'));
        return;
    }
    loyalty.points += points;
    loyalty.totalEarned += points;
    loyalty.transactions.push({
        type: 'earned',
        points,
        orderId,
        description,
        date: new Date()
    });
    await loyalty.save();
    res.json(utils_1.ResponseUtils.success(loyalty, 'Points earned successfully'));
});
LoyaltyController.redeemPoints = (0, middleware_1.asyncHandler)(async (req, res) => {
    const { points, description } = req.body;
    const userId = req.user?.userId;
    const loyalty = await LoyaltyProgram_1.UserLoyalty.findOne({ userId });
    if (!loyalty) {
        res.status(404).json(utils_1.ResponseUtils.error('No loyalty program found'));
        return;
    }
    if (loyalty.points < points) {
        res.status(400).json(utils_1.ResponseUtils.error('Insufficient points'));
        return;
    }
    loyalty.points -= points;
    loyalty.totalRedeemed += points;
    loyalty.transactions.push({
        type: 'redeemed',
        points: -points,
        description,
        date: new Date()
    });
    await loyalty.save();
    res.json(utils_1.ResponseUtils.success(loyalty, 'Points redeemed successfully'));
});
LoyaltyController.getLoyaltyTransactions = (0, middleware_1.asyncHandler)(async (req, res) => {
    const userId = req.user?.userId;
    const { page = 1, limit = 20 } = req.query;
    const loyalty = await LoyaltyProgram_1.UserLoyalty.findOne({ userId });
    if (!loyalty) {
        res.status(404).json(utils_1.ResponseUtils.error('No loyalty program found'));
        return;
    }
    const skip = (Number(page) - 1) * Number(limit);
    const transactions = loyalty.transactions
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .slice(skip, skip + Number(limit));
    res.json(utils_1.ResponseUtils.success({
        transactions,
        total: loyalty.transactions.length,
        currentPoints: loyalty.points
    }, 'Loyalty transactions retrieved successfully'));
});
//# sourceMappingURL=LoyaltyController.js.map