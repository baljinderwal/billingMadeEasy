"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommissionController = void 0;
const utils_1 = require("@billing/utils");
const middleware_1 = require("@billing/middleware");
class CommissionController {
}
exports.CommissionController = CommissionController;
_a = CommissionController;
CommissionController.getCommissions = (0, middleware_1.asyncHandler)(async (req, res) => {
    const { page = 1, limit = 20, vendorId, status } = req.query;
    const commissions = [
        {
            id: 'comm-1',
            vendorId: 'vendor-1',
            orderId: 'order-1',
            amount: 50.00,
            rate: 10,
            status: 'pending',
            createdAt: new Date()
        }
    ];
    res.json(utils_1.ResponseUtils.paginated(commissions, Number(page), Number(limit), 1, 'Commissions retrieved successfully'));
});
CommissionController.getMyCommissions = (0, middleware_1.asyncHandler)(async (req, res) => {
    const userId = req.user?.userId;
    const { page = 1, limit = 20 } = req.query;
    const commissions = [
        {
            id: 'comm-1',
            orderId: 'order-1',
            amount: 50.00,
            rate: 10,
            status: 'pending',
            createdAt: new Date()
        }
    ];
    res.json(utils_1.ResponseUtils.paginated(commissions, Number(page), Number(limit), 1, 'My commissions retrieved successfully'));
});
CommissionController.getCommissionById = (0, middleware_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const commission = {
        id,
        vendorId: 'vendor-1',
        orderId: 'order-1',
        amount: 50.00,
        rate: 10,
        status: 'pending',
        createdAt: new Date()
    };
    res.json(utils_1.ResponseUtils.success(commission, 'Commission retrieved successfully'));
});
CommissionController.calculateCommission = (0, middleware_1.asyncHandler)(async (req, res) => {
    const { orderAmount, vendorId, categoryId } = req.body;
    const commissionRate = 10;
    const commissionAmount = (orderAmount * commissionRate) / 100;
    const calculation = {
        orderAmount,
        commissionRate,
        commissionAmount,
        netAmount: orderAmount - commissionAmount
    };
    res.json(utils_1.ResponseUtils.success(calculation, 'Commission calculated successfully'));
});
CommissionController.updateCommissionStatus = (0, middleware_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const commission = {
        id,
        status,
        updatedAt: new Date()
    };
    res.json(utils_1.ResponseUtils.success(commission, 'Commission status updated successfully'));
});
//# sourceMappingURL=CommissionController.js.map