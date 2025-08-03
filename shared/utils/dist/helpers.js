"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelperUtils = void 0;
class HelperUtils {
    static generateSKU(name, category) {
        const cleanName = name.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().substring(0, 6);
        const cleanCategory = category.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().substring(0, 3);
        const timestamp = Date.now().toString().slice(-6);
        return `${cleanCategory}-${cleanName}-${timestamp}`;
    }
    static generateOrderNumber() {
        const prefix = 'ORD';
        const timestamp = Date.now().toString();
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `${prefix}-${timestamp}-${random}`;
    }
    static generateSlug(text) {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-+|-+$/g, '');
    }
    static calculateTax(amount, taxRate) {
        return Math.round((amount * taxRate / 100) * 100) / 100;
    }
    static calculateDiscount(originalPrice, discountPercent) {
        return Math.round((originalPrice * discountPercent / 100) * 100) / 100;
    }
    static formatCurrency(amount, currency = 'INR') {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency,
        }).format(amount);
    }
    static formatDate(date, locale = 'en-IN') {
        return new Intl.DateTimeFormat(locale, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(date);
    }
    static isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    static isValidPhone(phone) {
        const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone);
    }
    static sanitizeString(str) {
        return str.trim().replace(/[<>]/g, '');
    }
    static generateRandomString(length) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
    static debounce(func, wait) {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }
    static throttle(func, limit) {
        let inThrottle;
        return (...args) => {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => (inThrottle = false), limit);
            }
        };
    }
}
exports.HelperUtils = HelperUtils;
//# sourceMappingURL=helpers.js.map