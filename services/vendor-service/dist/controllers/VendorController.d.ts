import { Request, Response } from 'express';
export declare class VendorController {
    static getVendors: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static getMyVendor: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static getVendorById: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static createVendor: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static updateVendor: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static updateKycStatus: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static updateStatus: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static getVendorAnalytics: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static getVendorProducts: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static getVendorOrders: (req: Request, res: Response, next: import("express").NextFunction) => void;
}
//# sourceMappingURL=VendorController.d.ts.map