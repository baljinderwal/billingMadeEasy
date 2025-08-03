"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorController = void 0;
const utils_1 = require("@billing/utils");
const middleware_1 = require("@billing/middleware");
const Vendor_1 = __importDefault(require("../models/Vendor"));
class VendorController {
}
exports.VendorController = VendorController;
_a = VendorController;
VendorController.getVendors = (0, middleware_1.asyncHandler)(async (req, res) => {
    const query = req.query;
    const { page = 1, limit = 20, sort = 'createdAt', order = 'desc' } = query;
    const filter = {};
    if (query.status)
        filter.status = query.status;
    if (query.kycStatus)
        filter.kycStatus = query.kycStatus;
    if (query.businessType)
        filter.businessType = query.businessType;
    const sortOrder = order === 'asc' ? 1 : -1;
    const skip = (Number(page) - 1) * Number(limit);
    const [vendors, total] = await Promise.all([
        Vendor_1.default.find(filter)
            .populate('userId', 'firstName lastName email')
            .sort({ [sort]: sortOrder })
            .skip(skip)
            .limit(Number(limit))
            .lean(),
        Vendor_1.default.countDocuments(filter)
    ]);
    res.json(utils_1.ResponseUtils.paginated(vendors, Number(page), Number(limit), total, 'Vendors retrieved successfully'));
});
VendorController.getMyVendor = (0, middleware_1.asyncHandler)(async (req, res) => {
    const userId = req.user?.userId;
    const vendor = await Vendor_1.default.findOne({ userId })
        .populate('userId', 'firstName lastName email')
        .lean();
    if (!vendor) {
        res.status(404).json(utils_1.ResponseUtils.error('Vendor profile not found'));
        return;
    }
    res.json(utils_1.ResponseUtils.success(vendor, 'Vendor profile retrieved successfully'));
});
VendorController.getVendorById = (0, middleware_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    if (!utils_1.DatabaseUtils.isValidObjectId(id)) {
        res.status(400).json(utils_1.ResponseUtils.error('Invalid vendor ID'));
        return;
    }
    const vendor = await Vendor_1.default.findById(id)
        .populate('userId', 'firstName lastName email')
        .lean();
    if (!vendor) {
        res.status(404).json(utils_1.ResponseUtils.error('Vendor not found'));
        return;
    }
    res.json(utils_1.ResponseUtils.success(vendor, 'Vendor retrieved successfully'));
});
VendorController.createVendor = (0, middleware_1.asyncHandler)(async (req, res) => {
    const vendorData = req.body;
    const userId = req.user?.userId;
    const existingVendor = await Vendor_1.default.findOne({ userId });
    if (existingVendor) {
        res.status(400).json(utils_1.ResponseUtils.error('Vendor profile already exists'));
        return;
    }
    vendorData.userId = userId;
    const vendor = new Vendor_1.default(vendorData);
    await vendor.save();
    const populatedVendor = await Vendor_1.default.findById(vendor._id)
        .populate('userId', 'firstName lastName email')
        .lean();
    res.status(201).json(utils_1.ResponseUtils.success(populatedVendor, 'Vendor created successfully'));
});
VendorController.updateVendor = (0, middleware_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const userId = req.user?.userId;
    if (!utils_1.DatabaseUtils.isValidObjectId(id)) {
        res.status(400).json(utils_1.ResponseUtils.error('Invalid vendor ID'));
        return;
    }
    const vendor = await Vendor_1.default.findOne({ _id: id, userId });
    if (!vendor) {
        res.status(404).json(utils_1.ResponseUtils.error('Vendor not found or unauthorized'));
        return;
    }
    Object.assign(vendor, updates);
    await vendor.save();
    const populatedVendor = await Vendor_1.default.findById(vendor._id)
        .populate('userId', 'firstName lastName email')
        .lean();
    res.json(utils_1.ResponseUtils.success(populatedVendor, 'Vendor updated successfully'));
});
VendorController.updateKycStatus = (0, middleware_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const { kycStatus, notes } = req.body;
    if (!utils_1.DatabaseUtils.isValidObjectId(id)) {
        res.status(400).json(utils_1.ResponseUtils.error('Invalid vendor ID'));
        return;
    }
    const vendor = await Vendor_1.default.findByIdAndUpdate(id, { kycStatus }, { new: true }).populate('userId', 'firstName lastName email');
    if (!vendor) {
        res.status(404).json(utils_1.ResponseUtils.error('Vendor not found'));
        return;
    }
    res.json(utils_1.ResponseUtils.success(vendor, 'KYC status updated successfully'));
});
VendorController.updateStatus = (0, middleware_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    if (!utils_1.DatabaseUtils.isValidObjectId(id)) {
        res.status(400).json(utils_1.ResponseUtils.error('Invalid vendor ID'));
        return;
    }
    const vendor = await Vendor_1.default.findByIdAndUpdate(id, { status }, { new: true }).populate('userId', 'firstName lastName email');
    if (!vendor) {
        res.status(404).json(utils_1.ResponseUtils.error('Vendor not found'));
        return;
    }
    res.json(utils_1.ResponseUtils.success(vendor, 'Vendor status updated successfully'));
});
VendorController.getVendorAnalytics = (0, middleware_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    if (!utils_1.DatabaseUtils.isValidObjectId(id)) {
        res.status(400).json(utils_1.ResponseUtils.error('Invalid vendor ID'));
        return;
    }
    const vendor = await Vendor_1.default.findById(id);
    if (!vendor) {
        res.status(404).json(utils_1.ResponseUtils.error('Vendor not found'));
        return;
    }
    const analytics = {
        totalSales: vendor.totalSales,
        totalOrders: vendor.totalOrders,
        averageOrderValue: vendor.totalOrders > 0 ? vendor.totalSales / vendor.totalOrders : 0,
        rating: vendor.ratings.average,
        totalReviews: vendor.ratings.count,
        commissionEarned: vendor.totalSales * (vendor.commission.value / 100)
    };
    res.json(utils_1.ResponseUtils.success(analytics, 'Vendor analytics retrieved successfully'));
});
VendorController.getVendorProducts = (0, middleware_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const { page = 1, limit = 20 } = req.query;
    if (!utils_1.DatabaseUtils.isValidObjectId(id)) {
        res.status(400).json(utils_1.ResponseUtils.error('Invalid vendor ID'));
        return;
    }
    const products = [];
    res.json(utils_1.ResponseUtils.paginated(products, Number(page), Number(limit), 0, 'Vendor products retrieved successfully'));
});
VendorController.getVendorOrders = (0, middleware_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const { page = 1, limit = 20 } = req.query;
    if (!utils_1.DatabaseUtils.isValidObjectId(id)) {
        res.status(400).json(utils_1.ResponseUtils.error('Invalid vendor ID'));
        return;
    }
    const orders = [];
    res.json(utils_1.ResponseUtils.paginated(orders, Number(page), Number(limit), 0, 'Vendor orders retrieved successfully'));
});
//# sourceMappingURL=VendorController.js.map