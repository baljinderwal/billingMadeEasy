"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createError = exports.asyncHandler = exports.notFoundHandler = exports.errorHandler = void 0;
const utils_1 = require("@billing/utils");
const errorHandler = (error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    console.error(`Error ${statusCode}: ${message}`, {
        stack: error.stack,
        url: req.url,
        method: req.method,
        body: req.body,
        params: req.params,
        query: req.query,
    });
    if (error.name === 'ValidationError') {
        return res.status(400).json(utils_1.ResponseUtils.error('Validation Error', error.message));
    }
    if (error.name === 'CastError') {
        return res.status(400).json(utils_1.ResponseUtils.error('Invalid ID format'));
    }
    if (error.name === 'MongoServerError' && error.code === 11000) {
        return res.status(409).json(utils_1.ResponseUtils.error('Duplicate entry'));
    }
    if (error.name === 'JsonWebTokenError') {
        return res.status(401).json(utils_1.ResponseUtils.error('Invalid token'));
    }
    if (error.name === 'TokenExpiredError') {
        return res.status(401).json(utils_1.ResponseUtils.error('Token expired'));
    }
    res.status(statusCode).json(utils_1.ResponseUtils.error(message));
};
exports.errorHandler = errorHandler;
const notFoundHandler = (req, res) => {
    res.status(404).json(utils_1.ResponseUtils.error(`Route ${req.originalUrl} not found`));
};
exports.notFoundHandler = notFoundHandler;
const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
exports.asyncHandler = asyncHandler;
const createError = (message, statusCode = 500) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    error.isOperational = true;
    return error;
};
exports.createError = createError;
//# sourceMappingURL=error.js.map