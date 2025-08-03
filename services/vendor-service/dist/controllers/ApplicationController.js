"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationController = void 0;
const utils_1 = require("@billing/utils");
const middleware_1 = require("@billing/middleware");
class ApplicationController {
}
exports.ApplicationController = ApplicationController;
_a = ApplicationController;
ApplicationController.getApplications = (0, middleware_1.asyncHandler)(async (req, res) => {
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
    res.json(utils_1.ResponseUtils.paginated(applications, Number(page), Number(limit), 1, 'Applications retrieved successfully'));
});
ApplicationController.getApplicationById = (0, middleware_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const application = {
        id,
        businessName: 'Tech Solutions Inc',
        businessType: 'company',
        status: 'pending',
        submittedAt: new Date()
    };
    res.json(utils_1.ResponseUtils.success(application, 'Application retrieved successfully'));
});
ApplicationController.createApplication = (0, middleware_1.asyncHandler)(async (req, res) => {
    const applicationData = req.body;
    const userId = req.user?.userId;
    const application = {
        id: `app-${Date.now()}`,
        ...applicationData,
        userId,
        status: 'pending',
        submittedAt: new Date()
    };
    res.status(201).json(utils_1.ResponseUtils.success(application, 'Application submitted successfully'));
});
ApplicationController.reviewApplication = (0, middleware_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const { notes } = req.body;
    const application = {
        id,
        status: 'under_review',
        notes,
        reviewedAt: new Date()
    };
    res.json(utils_1.ResponseUtils.success(application, 'Application reviewed successfully'));
});
ApplicationController.approveApplication = (0, middleware_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const application = {
        id,
        status: 'approved',
        approvedAt: new Date()
    };
    res.json(utils_1.ResponseUtils.success(application, 'Application approved successfully'));
});
ApplicationController.rejectApplication = (0, middleware_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const { reason } = req.body;
    const application = {
        id,
        status: 'rejected',
        rejectionReason: reason,
        rejectedAt: new Date()
    };
    res.json(utils_1.ResponseUtils.success(application, 'Application rejected successfully'));
});
//# sourceMappingURL=ApplicationController.js.map