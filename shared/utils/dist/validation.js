"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressValidation = exports.orderValidation = exports.cartValidation = exports.productValidation = exports.userValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.userValidation = {
    register: joi_1.default.object({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(8).required(),
        firstName: joi_1.default.string().min(2).max(50).required(),
        lastName: joi_1.default.string().min(2).max(50).required(),
        phone: joi_1.default.string().pattern(/^[+]?[1-9][\d]{0,15}$/).optional(),
    }),
    login: joi_1.default.object({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required(),
    }),
    updateProfile: joi_1.default.object({
        firstName: joi_1.default.string().min(2).max(50).optional(),
        lastName: joi_1.default.string().min(2).max(50).optional(),
        phone: joi_1.default.string().pattern(/^[+]?[1-9][\d]{0,15}$/).optional(),
        avatar: joi_1.default.string().uri().optional(),
    }),
};
exports.productValidation = {
    create: joi_1.default.object({
        name: joi_1.default.string().min(2).max(200).required(),
        description: joi_1.default.string().min(10).max(5000).required(),
        shortDescription: joi_1.default.string().max(500).optional(),
        sku: joi_1.default.string().min(2).max(50).required(),
        barcode: joi_1.default.string().optional(),
        category: joi_1.default.string().hex().length(24).required(),
        brand: joi_1.default.string().max(100).optional(),
        type: joi_1.default.string().valid('physical', 'digital').required(),
        basePrice: joi_1.default.number().min(0).required(),
        compareAtPrice: joi_1.default.number().min(0).optional(),
        weight: joi_1.default.number().min(0).optional(),
        tags: joi_1.default.array().items(joi_1.default.string()).optional(),
    }),
    update: joi_1.default.object({
        name: joi_1.default.string().min(2).max(200).optional(),
        description: joi_1.default.string().min(10).max(5000).optional(),
        shortDescription: joi_1.default.string().max(500).optional(),
        basePrice: joi_1.default.number().min(0).optional(),
        compareAtPrice: joi_1.default.number().min(0).optional(),
        status: joi_1.default.string().valid('active', 'draft', 'archived').optional(),
        tags: joi_1.default.array().items(joi_1.default.string()).optional(),
    }),
};
exports.cartValidation = {
    addItem: joi_1.default.object({
        productId: joi_1.default.string().hex().length(24).required(),
        variantId: joi_1.default.string().hex().length(24).optional(),
        quantity: joi_1.default.number().integer().min(1).required(),
    }),
    updateItem: joi_1.default.object({
        quantity: joi_1.default.number().integer().min(0).required(),
    }),
};
exports.orderValidation = {
    create: joi_1.default.object({
        items: joi_1.default.array().items(joi_1.default.object({
            productId: joi_1.default.string().hex().length(24).required(),
            variantId: joi_1.default.string().hex().length(24).optional(),
            quantity: joi_1.default.number().integer().min(1).required(),
        })).min(1).required(),
        shippingAddress: joi_1.default.object({
            firstName: joi_1.default.string().required(),
            lastName: joi_1.default.string().required(),
            phone: joi_1.default.string().required(),
            addressLine1: joi_1.default.string().required(),
            addressLine2: joi_1.default.string().optional(),
            city: joi_1.default.string().required(),
            state: joi_1.default.string().required(),
            postalCode: joi_1.default.string().required(),
            country: joi_1.default.string().required(),
        }).required(),
        billingAddress: joi_1.default.object({
            firstName: joi_1.default.string().required(),
            lastName: joi_1.default.string().required(),
            phone: joi_1.default.string().required(),
            addressLine1: joi_1.default.string().required(),
            addressLine2: joi_1.default.string().optional(),
            city: joi_1.default.string().required(),
            state: joi_1.default.string().required(),
            postalCode: joi_1.default.string().required(),
            country: joi_1.default.string().required(),
        }).optional(),
        couponCode: joi_1.default.string().optional(),
    }),
};
exports.addressValidation = {
    create: joi_1.default.object({
        type: joi_1.default.string().valid('home', 'work', 'other').required(),
        firstName: joi_1.default.string().required(),
        lastName: joi_1.default.string().required(),
        phone: joi_1.default.string().required(),
        addressLine1: joi_1.default.string().required(),
        addressLine2: joi_1.default.string().optional(),
        city: joi_1.default.string().required(),
        state: joi_1.default.string().required(),
        postalCode: joi_1.default.string().required(),
        country: joi_1.default.string().required(),
        isDefault: joi_1.default.boolean().optional(),
    }),
};
//# sourceMappingURL=validation.js.map