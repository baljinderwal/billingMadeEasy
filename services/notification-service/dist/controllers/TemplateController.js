"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateController = void 0;
const utils_1 = require("@billing/utils");
const middleware_1 = require("@billing/middleware");
class TemplateController {
}
exports.TemplateController = TemplateController;
_a = TemplateController;
TemplateController.getTemplates = (0, middleware_1.asyncHandler)(async (req, res) => {
    const templates = [
        {
            id: 'order-confirmation',
            name: 'Order Confirmation',
            type: 'email',
            subject: 'Order Confirmation - {{orderNumber}}',
            content: 'Thank you for your order {{orderNumber}}. Your order total is {{total}}.',
            variables: ['orderNumber', 'total', 'customerName']
        },
        {
            id: 'shipping-notification',
            name: 'Shipping Notification',
            type: 'sms',
            content: 'Your order {{orderNumber}} has been shipped. Track: {{trackingNumber}}',
            variables: ['orderNumber', 'trackingNumber']
        },
        {
            id: 'welcome-email',
            name: 'Welcome Email',
            type: 'email',
            subject: 'Welcome to billingMadeEasy!',
            content: 'Welcome {{customerName}}! Thank you for joining our platform.',
            variables: ['customerName']
        }
    ];
    res.json(utils_1.ResponseUtils.success(templates, 'Templates retrieved successfully'));
});
TemplateController.getTemplateById = (0, middleware_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const template = {
        id,
        name: 'Sample Template',
        type: 'email',
        subject: 'Sample Subject',
        content: 'Sample content with {{variable}}',
        variables: ['variable']
    };
    res.json(utils_1.ResponseUtils.success(template, 'Template retrieved successfully'));
});
TemplateController.createTemplate = (0, middleware_1.asyncHandler)(async (req, res) => {
    const templateData = req.body;
    const template = {
        id: `template-${Date.now()}`,
        ...templateData,
        createdAt: new Date()
    };
    res.status(201).json(utils_1.ResponseUtils.success(template, 'Template created successfully'));
});
TemplateController.updateTemplate = (0, middleware_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const template = {
        id,
        ...updates,
        updatedAt: new Date()
    };
    res.json(utils_1.ResponseUtils.success(template, 'Template updated successfully'));
});
TemplateController.deleteTemplate = (0, middleware_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    res.json(utils_1.ResponseUtils.success(null, 'Template deleted successfully'));
});
TemplateController.previewTemplate = (0, middleware_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const { variables } = req.body;
    const preview = {
        subject: 'Preview Subject',
        content: 'Preview content with replaced variables',
        renderedAt: new Date()
    };
    res.json(utils_1.ResponseUtils.success(preview, 'Template preview generated successfully'));
});
//# sourceMappingURL=TemplateController.js.map