"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TemplateController_1 = require("../controllers/TemplateController");
const middleware_1 = require("@billing/middleware");
const router = express_1.default.Router();
router.use(middleware_1.authenticate);
router.get('/', TemplateController_1.TemplateController.getTemplates);
router.get('/:id', TemplateController_1.TemplateController.getTemplateById);
router.post('/', (0, middleware_1.authorize)(['admin']), TemplateController_1.TemplateController.createTemplate);
router.put('/:id', (0, middleware_1.authorize)(['admin']), TemplateController_1.TemplateController.updateTemplate);
router.delete('/:id', (0, middleware_1.authorize)(['admin']), TemplateController_1.TemplateController.deleteTemplate);
router.post('/:id/preview', TemplateController_1.TemplateController.previewTemplate);
exports.default = router;
//# sourceMappingURL=templates.js.map