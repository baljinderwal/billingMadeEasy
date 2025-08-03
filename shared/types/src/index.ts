import { Document, Types } from 'mongoose';

export interface IUser extends Document {
  _id: Types.ObjectId;
  email: string;
  phone?: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: 'customer' | 'admin' | 'vendor' | 'support';
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  addresses: IAddress[];
  loyaltyPoints: number;
  walletBalance: number;
  preferences: {
    language: string;
    currency: string;
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
  };
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAddress {
  _id?: Types.ObjectId;
  type: 'home' | 'work' | 'other';
  firstName: string;
  lastName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export interface IProduct extends Document {
  _id: Types.ObjectId;
  name: string;
  description: string;
  shortDescription?: string;
  sku: string;
  barcode?: string;
  category: Types.ObjectId;
  subcategory?: string;
  brand?: string;
  type: 'physical' | 'digital';
  status: 'active' | 'draft' | 'archived';
  images: IProductImage[];
  variants: IProductVariant[];
  basePrice: number;
  compareAtPrice?: number;
  costPrice?: number;
  taxClass?: string;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
    unit: 'cm' | 'in';
  };
  inventory: {
    trackQuantity: boolean;
    quantity: number;
    lowStockThreshold: number;
    allowBackorder: boolean;
  };
  seo: {
    title?: string;
    description?: string;
    keywords?: string[];
    slug: string;
  };
  tags: string[];
  vendor?: Types.ObjectId;
  ratings: {
    average: number;
    count: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface IProductImage {
  _id?: Types.ObjectId;
  url: string;
  altText?: string;
  position: number;
  isMain: boolean;
}

export interface IProductVariant {
  _id?: Types.ObjectId;
  name: string;
  options: IVariantOption[];
  sku: string;
  barcode?: string;
  price: number;
  compareAtPrice?: number;
  inventory: {
    quantity: number;
    reserved: number;
  };
  image?: string;
}

export interface IVariantOption {
  name: string;
  value: string;
}

export interface ICategory extends Document {
  _id: Types.ObjectId;
  name: string;
  description?: string;
  slug: string;
  parent?: Types.ObjectId;
  image?: string;
  icon?: string;
  status: 'active' | 'inactive';
  sortOrder: number;
  seo: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface ICart extends Document {
  _id: Types.ObjectId;
  userId?: Types.ObjectId;
  sessionId?: string;
  items: ICartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  currency: string;
  appliedCoupons: string[];
  shippingAddress?: IAddress;
  billingAddress?: IAddress;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICartItem {
  _id?: Types.ObjectId;
  productId: Types.ObjectId;
  variantId?: Types.ObjectId;
  quantity: number;
  price: number;
  originalPrice: number;
  discount: number;
  tax: number;
  total: number;
}

export interface IOrder extends Document {
  _id: Types.ObjectId;
  orderNumber: string;
  userId?: Types.ObjectId;
  guestEmail?: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded' | 'partially_refunded';
  fulfillmentStatus: 'unfulfilled' | 'partial' | 'fulfilled';
  items: IOrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  currency: string;
  shippingAddress: IAddress;
  billingAddress: IAddress;
  shippingMethod: {
    name: string;
    carrier: string;
    service: string;
    estimatedDelivery?: Date;
    trackingNumber?: string;
  };
  appliedCoupons: ICouponApplication[];
  notes?: string;
  timeline: IOrderTimeline[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrderItem {
  _id?: Types.ObjectId;
  productId: Types.ObjectId;
  variantId?: Types.ObjectId;
  name: string;
  sku: string;
  image?: string;
  quantity: number;
  price: number;
  originalPrice: number;
  discount: number;
  tax: number;
  total: number;
  fulfillmentStatus: 'unfulfilled' | 'fulfilled' | 'returned';
}

export interface IOrderTimeline {
  status: string;
  timestamp: Date;
  note?: string;
  updatedBy?: Types.ObjectId;
}

export interface ICouponApplication {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
}

export interface IPayment extends Document {
  _id: Types.ObjectId;
  orderId: Types.ObjectId;
  paymentId: string;
  gateway: 'razorpay' | 'stripe' | 'paypal';
  method: 'card' | 'upi' | 'netbanking' | 'wallet' | 'bnpl';
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled' | 'refunded';
  amount: number;
  currency: string;
  gatewayResponse: any;
  refunds: IRefund[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IRefund {
  _id?: Types.ObjectId;
  refundId: string;
  amount: number;
  reason: string;
  status: 'pending' | 'completed' | 'failed';
  processedAt?: Date;
}

export interface ICoupon extends Document {
  _id: Types.ObjectId;
  code: string;
  name: string;
  description?: string;
  type: 'percentage' | 'fixed' | 'bogo' | 'shipping';
  value: number;
  minimumAmount?: number;
  maximumDiscount?: number;
  usageLimit?: number;
  usageCount: number;
  userLimit?: number;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'inactive' | 'expired';
  applicableProducts?: Types.ObjectId[];
  applicableCategories?: Types.ObjectId[];
  excludedProducts?: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IReview extends Document {
  _id: Types.ObjectId;
  productId: Types.ObjectId;
  userId: Types.ObjectId;
  orderId: Types.ObjectId;
  rating: number;
  title?: string;
  comment?: string;
  images?: string[];
  verified: boolean;
  helpful: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface ProductQuery extends PaginationQuery {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  status?: string;
  inStock?: boolean;
}

export interface OrderQuery extends PaginationQuery {
  status?: string;
  paymentStatus?: string;
  fulfillmentStatus?: string;
  startDate?: string;
  endDate?: string;
  userId?: string;
}

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export interface ServiceResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  statusCode?: number;
}
