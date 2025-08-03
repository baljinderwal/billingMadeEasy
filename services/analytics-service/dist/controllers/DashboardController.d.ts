import { Request, Response } from 'express';
export declare class DashboardController {
    static getOverview: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static getKPIs: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static getChartData: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static getWidgets: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static createWidget: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static updateWidget: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static deleteWidget: (req: Request, res: Response, next: import("express").NextFunction) => void;
}
//# sourceMappingURL=DashboardController.d.ts.map