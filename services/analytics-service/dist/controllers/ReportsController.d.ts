import { Request, Response } from 'express';
export declare class ReportsController {
    static getReports: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static getSalesReport: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static getInventoryReport: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static getCustomerReport: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static getVendorReport: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static generateReport: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static downloadReport: (req: Request, res: Response, next: import("express").NextFunction) => void;
}
//# sourceMappingURL=ReportsController.d.ts.map