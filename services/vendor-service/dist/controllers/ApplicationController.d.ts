import { Request, Response } from 'express';
export declare class ApplicationController {
    static getApplications: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static getApplicationById: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static createApplication: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static reviewApplication: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static approveApplication: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static rejectApplication: (req: Request, res: Response, next: import("express").NextFunction) => void;
}
//# sourceMappingURL=ApplicationController.d.ts.map