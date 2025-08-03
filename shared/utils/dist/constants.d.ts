export declare const ORDER_STATUS: {
    readonly PENDING: "pending";
    readonly CONFIRMED: "confirmed";
    readonly PROCESSING: "processing";
    readonly SHIPPED: "shipped";
    readonly DELIVERED: "delivered";
    readonly CANCELLED: "cancelled";
    readonly REFUNDED: "refunded";
};
export declare const PAYMENT_STATUS: {
    readonly PENDING: "pending";
    readonly PAID: "paid";
    readonly FAILED: "failed";
    readonly REFUNDED: "refunded";
    readonly PARTIALLY_REFUNDED: "partially_refunded";
};
export declare const FULFILLMENT_STATUS: {
    readonly UNFULFILLED: "unfulfilled";
    readonly PARTIAL: "partial";
    readonly FULFILLED: "fulfilled";
};
export declare const PRODUCT_STATUS: {
    readonly ACTIVE: "active";
    readonly DRAFT: "draft";
    readonly ARCHIVED: "archived";
};
export declare const USER_ROLES: {
    readonly CUSTOMER: "customer";
    readonly ADMIN: "admin";
    readonly VENDOR: "vendor";
    readonly SUPPORT: "support";
};
export declare const PAYMENT_GATEWAYS: {
    readonly RAZORPAY: "razorpay";
    readonly STRIPE: "stripe";
    readonly PAYPAL: "paypal";
};
export declare const PAYMENT_METHODS: {
    readonly CARD: "card";
    readonly UPI: "upi";
    readonly NETBANKING: "netbanking";
    readonly WALLET: "wallet";
    readonly BNPL: "bnpl";
};
export declare const CURRENCIES: {
    readonly INR: "INR";
    readonly USD: "USD";
    readonly EUR: "EUR";
    readonly GBP: "GBP";
};
export declare const DEFAULT_PAGINATION: {
    readonly PAGE: 1;
    readonly LIMIT: 20;
    readonly MAX_LIMIT: 100;
};
export declare const CACHE_KEYS: {
    readonly PRODUCTS: "products";
    readonly CATEGORIES: "categories";
    readonly USER_CART: "user_cart";
    readonly USER_SESSION: "user_session";
};
export declare const CACHE_TTL: {
    readonly SHORT: 300;
    readonly MEDIUM: 1800;
    readonly LONG: 3600;
    readonly VERY_LONG: 86400;
};
//# sourceMappingURL=constants.d.ts.map