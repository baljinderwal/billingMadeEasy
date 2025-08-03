"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUtils = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthUtils {
    static async hashPassword(password) {
        const saltRounds = 12;
        return bcryptjs_1.default.hash(password, saltRounds);
    }
    static async comparePassword(password, hashedPassword) {
        return bcryptjs_1.default.compare(password, hashedPassword);
    }
    static generateToken(payload, expiresIn = '24h') {
        const secret = process.env.JWT_SECRET || 'your-super-secret-jwt-key';
        return jsonwebtoken_1.default.sign(payload, secret, { expiresIn: expiresIn });
    }
    static generateRefreshToken(payload) {
        const secret = process.env.JWT_REFRESH_SECRET || 'your-super-secret-refresh-key';
        return jsonwebtoken_1.default.sign(payload, secret, { expiresIn: '7d' });
    }
    static verifyToken(token) {
        const secret = process.env.JWT_SECRET || 'your-super-secret-jwt-key';
        return jsonwebtoken_1.default.verify(token, secret);
    }
    static verifyRefreshToken(token) {
        const secret = process.env.JWT_REFRESH_SECRET || 'your-super-secret-refresh-key';
        return jsonwebtoken_1.default.verify(token, secret);
    }
    static generateOTP() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
    static generateSessionId() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
}
exports.AuthUtils = AuthUtils;
//# sourceMappingURL=auth.js.map