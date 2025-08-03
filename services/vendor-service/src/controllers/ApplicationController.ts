import { Request, Response } from 'express';
import { ResponseUtils, DatabaseUtils } from '@billing/utils';
import { asyncHandler } from '@billing/middleware';

export class ApplicationController {
  static getApplications = asyncHandler(async (req: Request, res: Response) => {
    const { page = 1, limit = 20, status } = req.query;
    
    const applications = [
      {
        id: 'app-1',
        businessName: 'Tech Solutions Inc',
        businessType: 'company',
        contactPerson: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@techsolutions.com',
          phone: '+1234567890'
        },
        status: 'pending',
        submittedAt: new Date(),
        reviewedAt: null,
        notes: null
      }
    ];

    res.json(ResponseUtils.paginated(applications, Number(page), Number(limit), 1, 'Applications retrieved successfully'));
  });

  static getApplicationById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    
    const application = {
      id,
      businessName: 'Tech Solutions Inc',
      businessType: 'company',
      status: 'pending',
      submittedAt: new Date()
    };

    res.json(ResponseUtils.success(application, 'Application retrieved successfully'));
  });

  static createApplication = asyncHandler(async (req: Request, res: Response) => {
    const applicationData = req.body;
    const userId = req.user?.userId;
    
    const application = {
      id: `app-${Date.now()}`,
      ...applicationData,
      userId,
      status: 'pending',
      submittedAt: new Date()
    };

    res.status(201).json(ResponseUtils.success(application, 'Application submitted successfully'));
  });

  static reviewApplication = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { notes } = req.body;
    
    const application = {
      id,
      status: 'under_review',
      notes,
      reviewedAt: new Date()
    };

    res.json(ResponseUtils.success(application, 'Application reviewed successfully'));
  });

  static approveApplication = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    
    const application = {
      id,
      status: 'approved',
      approvedAt: new Date()
    };

    res.json(ResponseUtils.success(application, 'Application approved successfully'));
  });

  static rejectApplication = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { reason } = req.body;
    
    const application = {
      id,
      status: 'rejected',
      rejectionReason: reason,
      rejectedAt: new Date()
    };

    res.json(ResponseUtils.success(application, 'Application rejected successfully'));
  });
}
