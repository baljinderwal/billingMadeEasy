export declare class HelperUtils {
    static generateSKU(name: string, category: string): string;
    static generateOrderNumber(): string;
    static generateSlug(text: string): string;
    static calculateTax(amount: number, taxRate: number): number;
    static calculateDiscount(originalPrice: number, discountPercent: number): number;
    static formatCurrency(amount: number, currency?: string): string;
    static formatDate(date: Date, locale?: string): string;
    static isValidEmail(email: string): boolean;
    static isValidPhone(phone: string): boolean;
    static sanitizeString(str: string): string;
    static generateReferralCode(): string;
    static generateRandomString(length: number): string;
    static debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void;
    static throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void;
}
//# sourceMappingURL=helpers.d.ts.map