"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ApplicationController_1 = require("../controllers/ApplicationController");
const middleware_1 = require("@billing/middleware");
const router = express_1.default.Router();
router.use(middleware_1.authenticate);
router.get('/', (0, middleware_1.authorize)(['admin']), ApplicationController_1.ApplicationController.getApplications);
router.get('/:id', ApplicationController_1.ApplicationController.getApplicationById);
router.post('/', ApplicationController_1.ApplicationController.createApplication);
router.put('/:id/review', (0, middleware_1.authorize)(['admin']), ApplicationController_1.ApplicationController.reviewApplication);
router.put('/:id/approve', (0, middleware_1.authorize)(['admin']), ApplicationController_1.ApplicationController.approveApplication);
router.put('/:id/reject', (0, middleware_1.authorize)(['admin']), ApplicationController_1.ApplicationController.rejectApplication);
exports.default = router;
//# sourceMappingURL=applications.js.map