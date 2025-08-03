"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CACHE_TTL = exports.CACHE_KEYS = exports.DEFAULT_PAGINATION = exports.CURRENCIES = exports.PAYMENT_METHODS = exports.PAYMENT_GATEWAYS = exports.USER_ROLES = exports.PRODUCT_STATUS = exports.FULFILLMENT_STATUS = exports.PAYMENT_STATUS = exports.ORDER_STATUS = void 0;
exports.ORDER_STATUS = {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    PROCESSING: 'processing',
    SHIPPED: 'shipped',
    DELIVERED: 'delivered',
    CANCELLED: 'cancelled',
    REFUNDED: 'refunded',
};
exports.PAYMENT_STATUS = {
    PENDING: 'pending',
    PAID: 'paid',
    FAILED: 'failed',
    REFUNDED: 'refunded',
    PARTIALLY_REFUNDED: 'partially_refunded',
};
exports.FULFILLMENT_STATUS = {
    UNFULFILLED: 'unfulfilled',
    PARTIAL: 'partial',
    FULFILLED: 'fulfilled',
};
exports.PRODUCT_STATUS = {
    ACTIVE: 'active',
    DRAFT: 'draft',
    ARCHIVED: 'archived',
};
exports.USER_ROLES = {
    CUSTOMER: 'customer',
    ADMIN: 'admin',
    VENDOR: 'vendor',
    SUPPORT: 'support',
};
exports.PAYMENT_GATEWAYS = {
    RAZORPAY: 'razorpay',
    STRIPE: 'stripe',
    PAYPAL: 'paypal',
};
exports.PAYMENT_METHODS = {
    CARD: 'card',
    UPI: 'upi',
    NETBANKING: 'netbanking',
    WALLET: 'wallet',
    BNPL: 'bnpl',
};
exports.CURRENCIES = {
    INR: 'INR',
    USD: 'USD',
    EUR: 'EUR',
    GBP: 'GBP',
};
exports.DEFAULT_PAGINATION = {
    PAGE: 1,
    LIMIT: 20,
    MAX_LIMIT: 100,
};
exports.CACHE_KEYS = {
    PRODUCTS: 'products',
    CATEGORIES: 'categories',
    USER_CART: 'user_cart',
    USER_SESSION: 'user_session',
};
exports.CACHE_TTL = {
    SHORT: 300, // 5 minutes
    MEDIUM: 1800, // 30 minutes
    LONG: 3600, // 1 hour
    VERY_LONG: 86400, // 24 hours
};
//# sourceMappingURL=constants.js.map