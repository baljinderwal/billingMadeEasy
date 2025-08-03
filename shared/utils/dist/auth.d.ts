import { JWTPayload } from '../../types/dist/index';
export declare class AuthUtils {
    static hashPassword(password: string): Promise<string>;
    static comparePassword(password: string, hashedPassword: string): Promise<boolean>;
    static generateToken(payload: Omit<JWTPayload, 'iat' | 'exp'>, expiresIn?: string): string;
    static generateRefreshToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string;
    static verifyToken(token: string): JWTPayload;
    static verifyRefreshToken(token: string): JWTPayload;
    static generateOTP(): string;
    static generateSessionId(): string;
}
//# sourceMappingURL=auth.d.ts.map