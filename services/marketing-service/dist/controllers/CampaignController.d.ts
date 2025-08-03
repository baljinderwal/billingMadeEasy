import { Request, Response } from 'express';
export declare class CampaignController {
    static getCampaigns: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static getCampaignById: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static createCampaign: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static updateCampaign: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static deleteCampaign: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static launchCampaign: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static pauseCampaign: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static getCampaignMetrics: (req: Request, res: Response, next: import("express").NextFunction) => void;
}
//# sourceMappingURL=CampaignController.d.ts.map