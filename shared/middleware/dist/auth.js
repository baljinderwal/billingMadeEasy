"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireCustomer = exports.requireVendor = exports.requireAdmin = exports.requireRole = exports.optionalAuth = exports.authenticateToken = void 0;
const utils_1 = require("@billing/utils");
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json(utils_1.ResponseUtils.error('Access token required'));
    }
    try {
        const decoded = utils_1.AuthUtils.verifyToken(token);
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(403).json(utils_1.ResponseUtils.error('Invalid or expired token'));
    }
};
exports.authenticateToken = authenticateToken;
const optionalAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (token) {
        try {
            const decoded = utils_1.AuthUtils.verifyToken(token);
            req.user = decoded;
        }
        catch (error) {
        }
    }
    next();
};
exports.optionalAuth = optionalAuth;
const requireRole = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json(utils_1.ResponseUtils.error('Authentication required'));
        }
        if (!roles.includes(req.user.role)) {
            return res.status(403).json(utils_1.ResponseUtils.error('Insufficient permissions'));
        }
        next();
    };
};
exports.requireRole = requireRole;
exports.requireAdmin = (0, exports.requireRole)(['admin']);
exports.requireVendor = (0, exports.requireRole)(['admin', 'vendor']);
exports.requireCustomer = (0, exports.requireRole)(['admin', 'customer']);
//# sourceMappingURL=auth.js.map