import { Request, Response } from 'express';
export declare class AnalyticsController {
    static getAnalytics: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static getSalesAnalytics: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static getTrafficAnalytics: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static getConversionAnalytics: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static getProductAnalytics: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static getCustomerAnalytics: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static trackEvent: (req: Request, res: Response, next: import("express").NextFunction) => void;
}
//# sourceMappingURL=AnalyticsController.d.ts.map