"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayoutController = void 0;
const utils_1 = require("@billing/utils");
const middleware_1 = require("@billing/middleware");
class PayoutController {
}
exports.PayoutController = PayoutController;
_a = PayoutController;
PayoutController.getPayouts = (0, middleware_1.asyncHandler)(async (req, res) => {
    const { page = 1, limit = 20, vendorId, status } = req.query;
    const payouts = [
        {
            id: 'payout-1',
            vendorId: 'vendor-1',
            amount: 500.00,
            status: 'pending',
            requestedAt: new Date(),
            processedAt: null,
            completedAt: null
        }
    ];
    res.json(utils_1.ResponseUtils.paginated(payouts, Number(page), Number(limit), 1, 'Payouts retrieved successfully'));
});
PayoutController.getMyPayouts = (0, middleware_1.asyncHandler)(async (req, res) => {
    const userId = req.user?.userId;
    const { page = 1, limit = 20 } = req.query;
    const payouts = [
        {
            id: 'payout-1',
            amount: 500.00,
            status: 'pending',
            requestedAt: new Date(),
            processedAt: null,
            completedAt: null
        }
    ];
    res.json(utils_1.ResponseUtils.paginated(payouts, Number(page), Number(limit), 1, 'My payouts retrieved successfully'));
});
PayoutController.getPayoutById = (0, middleware_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const payout = {
        id,
        vendorId: 'vendor-1',
        amount: 500.00,
        status: 'pending',
        requestedAt: new Date()
    };
    res.json(utils_1.ResponseUtils.success(payout, 'Payout retrieved successfully'));
});
PayoutController.createPayout = (0, middleware_1.asyncHandler)(async (req, res) => {
    const payoutData = req.body;
    const payout = {
        id: `payout-${Date.now()}`,
        ...payoutData,
        status: 'pending',
        requestedAt: new Date()
    };
    res.status(201).json(utils_1.ResponseUtils.success(payout, 'Payout created successfully'));
});
PayoutController.processPayout = (0, middleware_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const payout = {
        id,
        status: 'processing',
        processedAt: new Date()
    };
    res.json(utils_1.ResponseUtils.success(payout, 'Payout processing initiated'));
});
PayoutController.completePayout = (0, middleware_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const { transactionId } = req.body;
    const payout = {
        id,
        status: 'completed',
        transactionId,
        completedAt: new Date()
    };
    res.json(utils_1.ResponseUtils.success(payout, 'Payout completed successfully'));
});
//# sourceMappingURL=PayoutController.js.map