"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.idParamSchema = exports.paginationSchema = exports.validateParams = exports.validateQuery = exports.validateBody = void 0;
const joi_1 = __importDefault(require("joi"));
const utils_1 = require("@billing/utils");
const validateBody = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const errorMessage = error.details.map(detail => detail.message).join(', ');
            return res.status(400).json(utils_1.ResponseUtils.error('Validation Error', errorMessage));
        }
        req.body = value;
        next();
    };
};
exports.validateBody = validateBody;
const validateQuery = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.query, { abortEarly: false });
        if (error) {
            const errorMessage = error.details.map(detail => detail.message).join(', ');
            return res.status(400).json(utils_1.ResponseUtils.error('Validation Error', errorMessage));
        }
        req.query = value;
        next();
    };
};
exports.validateQuery = validateQuery;
const validateParams = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.params, { abortEarly: false });
        if (error) {
            const errorMessage = error.details.map(detail => detail.message).join(', ');
            return res.status(400).json(utils_1.ResponseUtils.error('Validation Error', errorMessage));
        }
        req.params = value;
        next();
    };
};
exports.validateParams = validateParams;
exports.paginationSchema = joi_1.default.object({
    page: joi_1.default.number().integer().min(1).default(1),
    limit: joi_1.default.number().integer().min(1).max(100).default(20),
    sort: joi_1.default.string().optional(),
    order: joi_1.default.string().valid('asc', 'desc').default('desc'),
});
exports.idParamSchema = joi_1.default.object({
    id: joi_1.default.string().hex().length(24).required(),
});
//# sourceMappingURL=validation.js.map