import { Request, Response } from 'express';
export declare class PromotionController {
    static getPromotions: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static getActivePromotions: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static getPromotionById: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static createPromotion: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static updatePromotion: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static deletePromotion: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static activatePromotion: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static deactivatePromotion: (req: Request, res: Response, next: import("express").NextFunction) => void;
}
//# sourceMappingURL=PromotionController.d.ts.map