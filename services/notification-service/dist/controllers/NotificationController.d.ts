import { Request, Response } from 'express';
export declare class NotificationController {
    static getNotifications: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static getMyNotifications: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static getNotificationById: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static createNotification: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static sendNotification: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static markAsRead: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static updateStatus: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static deleteNotification: (req: Request, res: Response, next: import("express").NextFunction) => void;
}
//# sourceMappingURL=NotificationController.d.ts.map