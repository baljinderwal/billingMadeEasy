import Joi from 'joi';

export const userValidation = {
  register: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    phone: Joi.string().pattern(/^[+]?[1-9][\d]{0,15}$/).optional(),
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),

  updateProfile: Joi.object({
    firstName: Joi.string().min(2).max(50).optional(),
    lastName: Joi.string().min(2).max(50).optional(),
    phone: Joi.string().pattern(/^[+]?[1-9][\d]{0,15}$/).optional(),
    avatar: Joi.string().uri().optional(),
  }),
};

export const productValidation = {
  create: Joi.object({
    name: Joi.string().min(2).max(200).required(),
    description: Joi.string().min(10).max(5000).required(),
    shortDescription: Joi.string().max(500).optional(),
    sku: Joi.string().min(2).max(50).required(),
    barcode: Joi.string().optional(),
    category: Joi.string().hex().length(24).required(),
    brand: Joi.string().max(100).optional(),
    type: Joi.string().valid('physical', 'digital').required(),
    basePrice: Joi.number().min(0).required(),
    compareAtPrice: Joi.number().min(0).optional(),
    weight: Joi.number().min(0).optional(),
    tags: Joi.array().items(Joi.string()).optional(),
  }),

  update: Joi.object({
    name: Joi.string().min(2).max(200).optional(),
    description: Joi.string().min(10).max(5000).optional(),
    shortDescription: Joi.string().max(500).optional(),
    basePrice: Joi.number().min(0).optional(),
    compareAtPrice: Joi.number().min(0).optional(),
    status: Joi.string().valid('active', 'draft', 'archived').optional(),
    tags: Joi.array().items(Joi.string()).optional(),
  }),
};

export const cartValidation = {
  addItem: Joi.object({
    productId: Joi.string().hex().length(24).required(),
    variantId: Joi.string().hex().length(24).optional(),
    quantity: Joi.number().integer().min(1).required(),
  }),

  updateItem: Joi.object({
    quantity: Joi.number().integer().min(0).required(),
  }),
};

export const orderValidation = {
  create: Joi.object({
    items: Joi.array().items(
      Joi.object({
        productId: Joi.string().hex().length(24).required(),
        variantId: Joi.string().hex().length(24).optional(),
        quantity: Joi.number().integer().min(1).required(),
      })
    ).min(1).required(),
    shippingAddress: Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      phone: Joi.string().required(),
      addressLine1: Joi.string().required(),
      addressLine2: Joi.string().optional(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      postalCode: Joi.string().required(),
      country: Joi.string().required(),
    }).required(),
    billingAddress: Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      phone: Joi.string().required(),
      addressLine1: Joi.string().required(),
      addressLine2: Joi.string().optional(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      postalCode: Joi.string().required(),
      country: Joi.string().required(),
    }).optional(),
    couponCode: Joi.string().optional(),
  }),
};

export const addressValidation = {
  create: Joi.object({
    type: Joi.string().valid('home', 'work', 'other').required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phone: Joi.string().required(),
    addressLine1: Joi.string().required(),
    addressLine2: Joi.string().optional(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    postalCode: Joi.string().required(),
    country: Joi.string().required(),
    isDefault: Joi.boolean().optional(),
  }),
};
