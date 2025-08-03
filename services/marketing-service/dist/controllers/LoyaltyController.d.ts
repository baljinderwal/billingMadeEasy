import { Request, Response } from 'express';
export declare class LoyaltyController {
    static getPrograms: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static getMyLoyalty: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static createProgram: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static updateProgram: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static earnPoints: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static redeemPoints: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static getLoyaltyTransactions: (req: Request, res: Response, next: import("express").NextFunction) => void;
}
//# sourceMappingURL=LoyaltyController.d.ts.map