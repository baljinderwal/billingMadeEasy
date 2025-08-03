"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ReferralController_1 = require("../controllers/ReferralController");
const middleware_1 = require("@billing/middleware");
const router = express_1.default.Router();
router.use(middleware_1.authenticate);
router.get('/', ReferralController_1.ReferralController.getReferrals);
router.get('/my-referrals', ReferralController_1.ReferralController.getMyReferrals);
router.get('/:code/validate', ReferralController_1.ReferralController.validateReferralCode);
router.post('/generate', ReferralController_1.ReferralController.generateReferralCode);
router.post('/:code/apply', ReferralController_1.ReferralController.applyReferralCode);
exports.default = router;
//# sourceMappingURL=referrals.js.map