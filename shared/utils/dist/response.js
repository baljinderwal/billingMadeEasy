"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseUtils = void 0;
class ResponseUtils {
    static success(data, message) {
        return {
            success: true,
            data,
            message,
        };
    }
    static error(message, error) {
        return {
            success: false,
            message,
            error,
        };
    }
    static paginated(data, page, limit, total, message) {
        return {
            success: true,
            data,
            message,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        };
    }
    static serviceSuccess(data, message, statusCode = 200) {
        return {
            success: true,
            data,
            message,
            statusCode,
        };
    }
    static serviceError(message, error, statusCode = 500) {
        return {
            success: false,
            message,
            error,
            statusCode,
        };
    }
}
exports.ResponseUtils = ResponseUtils;
//# sourceMappingURL=response.js.map