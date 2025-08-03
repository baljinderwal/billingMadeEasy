import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
export declare const validateBody: (schema: Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const validateQuery: (schema: Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const validateParams: (schema: Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const paginationSchema: Joi.ObjectSchema<any>;
export declare const idParamSchema: Joi.ObjectSchema<any>;
//# sourceMappingURL=validation.d.ts.map