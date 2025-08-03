import { Request, Response } from 'express';
import { ResponseUtils, DatabaseUtils } from '@billing/utils';
import { asyncHandler } from '@billing/middleware';

export class TemplateController {
  static getTemplates = asyncHandler(async (req: Request, res: Response) => {
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

    res.json(ResponseUtils.success(templates, 'Templates retrieved successfully'));
  });

  static getTemplateById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    
    const template = {
      id,
      name: 'Sample Template',
      type: 'email',
      subject: 'Sample Subject',
      content: 'Sample content with {{variable}}',
      variables: ['variable']
    };

    res.json(ResponseUtils.success(template, 'Template retrieved successfully'));
  });

  static createTemplate = asyncHandler(async (req: Request, res: Response) => {
    const templateData = req.body;
    
    const template = {
      id: `template-${Date.now()}`,
      ...templateData,
      createdAt: new Date()
    };

    res.status(201).json(ResponseUtils.success(template, 'Template created successfully'));
  });

  static updateTemplate = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updates = req.body;
    
    const template = {
      id,
      ...updates,
      updatedAt: new Date()
    };

    res.json(ResponseUtils.success(template, 'Template updated successfully'));
  });

  static deleteTemplate = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    
    res.json(ResponseUtils.success(null, 'Template deleted successfully'));
  });

  static previewTemplate = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { variables } = req.body;
    
    const preview = {
      subject: 'Preview Subject',
      content: 'Preview content with replaced variables',
      renderedAt: new Date()
    };

    res.json(ResponseUtils.success(preview, 'Template preview generated successfully'));
  });
}
