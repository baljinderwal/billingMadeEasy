"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.securityLogger = exports.requestLogger = void 0;
const requestLogger = (req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        const logData = {
            method: req.method,
            url: req.url,
            statusCode: res.statusCode,
            duration: `${duration}ms`,
            userAgent: req.get('User-Agent'),
            ip: req.ip,
            timestamp: new Date().toISOString(),
        };
        console.log(JSON.stringify(logData));
    });
    next();
};
exports.requestLogger = requestLogger;
const securityLogger = (req, res, next) => {
    const suspiciousPatterns = [
        /script/i,
        /javascript/i,
        /vbscript/i,
        /onload/i,
        /onerror/i,
        /<.*>/,
        /union.*select/i,
        /drop.*table/i,
    ];
    const checkSuspicious = (value) => {
        return suspiciousPatterns.some(pattern => pattern.test(value));
    };
    const checkObject = (obj) => {
        if (typeof obj === 'string') {
            return checkSuspicious(obj);
        }
        if (typeof obj === 'object' && obj !== null) {
            return Object.values(obj).some(checkObject);
        }
        return false;
    };
    if (checkObject(req.body) || checkObject(req.query) || checkObject(req.params)) {
        console.warn('Suspicious request detected:', {
            method: req.method,
            url: req.url,
            ip: req.ip,
            userAgent: req.get('User-Agent'),
            body: req.body,
            query: req.query,
            params: req.params,
            timestamp: new Date().toISOString(),
        });
    }
    next();
};
exports.securityLogger = securityLogger;
//# sourceMappingURL=logging.js.map