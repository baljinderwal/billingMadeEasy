"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const VendorController_1 = require("../controllers/VendorController");
const middleware_1 = require("@billing/middleware");
const router = express_1.default.Router();
router.use(middleware_1.authenticate);
router.get('/', VendorController_1.VendorController.getVendors);
router.get('/my-vendor', VendorController_1.VendorController.getMyVendor);
router.get('/:id', VendorController_1.VendorController.getVendorById);
router.post('/', VendorController_1.VendorController.createVendor);
router.put('/:id', VendorController_1.VendorController.updateVendor);
router.put('/:id/kyc-status', (0, middleware_1.authorize)(['admin']), VendorController_1.VendorController.updateKycStatus);
router.put('/:id/status', (0, middleware_1.authorize)(['admin']), VendorController_1.VendorController.updateStatus);
router.get('/:id/analytics', VendorController_1.VendorController.getVendorAnalytics);
router.get('/:id/products', VendorController_1.VendorController.getVendorProducts);
router.get('/:id/orders', VendorController_1.VendorController.getVendorOrders);
exports.default = router;
//# sourceMappingURL=vendors.js.map