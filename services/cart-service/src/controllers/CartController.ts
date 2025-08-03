import { Request, Response } from 'express';
import { ResponseUtils, DatabaseUtils } from '@billing/utils';
import { asyncHandler } from '@billing/middleware';
import Cart from '../models/Cart';

export class CartController {
  static getCart = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    const sessionId = req.headers['x-session-id'] as string;

    let cart;
    if (userId) {
      cart = await Cart.findOne({ userId }).populate('items.productId', 'name images basePrice status');
    } else if (sessionId) {
      cart = await Cart.findOne({ sessionId }).populate('items.productId', 'name images basePrice status');
    }

    if (!cart) {
      cart = new Cart({
        userId: userId || undefined,
        sessionId: userId ? undefined : sessionId,
        items: []
      });
      await cart.save();
    }

    res.json(ResponseUtils.success(cart, 'Cart retrieved successfully'));
  });

  static addItem = asyncHandler(async (req: Request, res: Response) => {
    const { productId, variantId, quantity, price, originalPrice } = req.body;
    const userId = req.user?.userId;
    const sessionId = req.headers['x-session-id'] as string;

    if (!DatabaseUtils.isValidObjectId(productId)) {
      return res.status(400).json(ResponseUtils.error('Invalid product ID'));
    }

    let cart;
    if (userId) {
      cart = await Cart.findOne({ userId });
    } else if (sessionId) {
      cart = await Cart.findOne({ sessionId });
    }

    if (!cart) {
      cart = new Cart({
        userId: userId || undefined,
        sessionId: userId ? undefined : sessionId,
        items: []
      });
    }

    const existingItemIndex = cart.items.findIndex(item => 
      item.productId.toString() === productId && 
      (!variantId || item.variantId?.toString() === variantId)
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({
        productId,
        variantId: variantId || undefined,
        quantity,
        price,
        originalPrice,
        discount: originalPrice - price,
        addedAt: new Date()
      });
    }

    await cart.save();
    await cart.populate('items.productId', 'name images basePrice status');

    res.json(ResponseUtils.success(cart, 'Item added to cart successfully'));
  });

  static updateItem = asyncHandler(async (req: Request, res: Response) => {
    const { itemId } = req.params;
    const { quantity } = req.body;
    const userId = req.user?.userId;
    const sessionId = req.headers['x-session-id'] as string;

    if (!DatabaseUtils.isValidObjectId(itemId)) {
      return res.status(400).json(ResponseUtils.error('Invalid item ID'));
    }

    let cart;
    if (userId) {
      cart = await Cart.findOne({ userId });
    } else if (sessionId) {
      cart = await Cart.findOne({ sessionId });
    }

    if (!cart) {
      return res.status(404).json(ResponseUtils.error('Cart not found'));
    }

    const item = cart.items.id(itemId);
    if (!item) {
      return res.status(404).json(ResponseUtils.error('Item not found in cart'));
    }

    if (quantity <= 0) {
      cart.items.pull(itemId);
    } else {
      item.quantity = quantity;
    }

    await cart.save();
    await cart.populate('items.productId', 'name images basePrice status');

    res.json(ResponseUtils.success(cart, 'Cart item updated successfully'));
  });

  static removeItem = asyncHandler(async (req: Request, res: Response) => {
    const { itemId } = req.params;
    const userId = req.user?.userId;
    const sessionId = req.headers['x-session-id'] as string;

    if (!DatabaseUtils.isValidObjectId(itemId)) {
      return res.status(400).json(ResponseUtils.error('Invalid item ID'));
    }

    let cart;
    if (userId) {
      cart = await Cart.findOne({ userId });
    } else if (sessionId) {
      cart = await Cart.findOne({ sessionId });
    }

    if (!cart) {
      return res.status(404).json(ResponseUtils.error('Cart not found'));
    }

    cart.items.pull(itemId);
    await cart.save();
    await cart.populate('items.productId', 'name images basePrice status');

    res.json(ResponseUtils.success(cart, 'Item removed from cart successfully'));
  });

  static clearCart = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    const sessionId = req.headers['x-session-id'] as string;

    let cart;
    if (userId) {
      cart = await Cart.findOne({ userId });
    } else if (sessionId) {
      cart = await Cart.findOne({ sessionId });
    }

    if (!cart) {
      return res.status(404).json(ResponseUtils.error('Cart not found'));
    }

    cart.items = [];
    cart.couponCode = undefined;
    cart.couponDiscount = 0;
    await cart.save();

    res.json(ResponseUtils.success(cart, 'Cart cleared successfully'));
  });

  static applyCoupon = asyncHandler(async (req: Request, res: Response) => {
    const { couponCode } = req.body;
    const userId = req.user?.userId;
    const sessionId = req.headers['x-session-id'] as string;

    let cart;
    if (userId) {
      cart = await Cart.findOne({ userId });
    } else if (sessionId) {
      cart = await Cart.findOne({ sessionId });
    }

    if (!cart) {
      return res.status(404).json(ResponseUtils.error('Cart not found'));
    }

    const discount = 100;
    cart.couponCode = couponCode;
    cart.couponDiscount = discount;
    await cart.save();

    res.json(ResponseUtils.success(cart, 'Coupon applied successfully'));
  });

  static removeCoupon = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    const sessionId = req.headers['x-session-id'] as string;

    let cart;
    if (userId) {
      cart = await Cart.findOne({ userId });
    } else if (sessionId) {
      cart = await Cart.findOne({ sessionId });
    }

    if (!cart) {
      return res.status(404).json(ResponseUtils.error('Cart not found'));
    }

    cart.couponCode = undefined;
    cart.couponDiscount = 0;
    await cart.save();

    res.json(ResponseUtils.success(cart, 'Coupon removed successfully'));
  });

  static saveForLater = asyncHandler(async (req: Request, res: Response) => {
    res.json(ResponseUtils.success(null, 'Save for later functionality coming soon'));
  });

  static moveToCart = asyncHandler(async (req: Request, res: Response) => {
    res.json(ResponseUtils.success(null, 'Move to cart functionality coming soon'));
  });

  static mergeGuestCart = asyncHandler(async (req: Request, res: Response) => {
    const { guestCartId } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json(ResponseUtils.error('Authentication required'));
    }

    const [userCart, guestCart] = await Promise.all([
      Cart.findOne({ userId }),
      Cart.findById(guestCartId)
    ]);

    if (!guestCart) {
      return res.status(404).json(ResponseUtils.error('Guest cart not found'));
    }

    if (!userCart) {
      guestCart.userId = userId;
      guestCart.sessionId = undefined;
      await guestCart.save();
      return res.json(ResponseUtils.success(guestCart, 'Guest cart merged successfully'));
    }

    for (const guestItem of guestCart.items) {
      const existingItemIndex = userCart.items.findIndex(item => 
        item.productId.toString() === guestItem.productId.toString() && 
        (!guestItem.variantId || item.variantId?.toString() === guestItem.variantId?.toString())
      );

      if (existingItemIndex > -1) {
        userCart.items[existingItemIndex].quantity += guestItem.quantity;
      } else {
        userCart.items.push(guestItem);
      }
    }

    await userCart.save();
    await Cart.findByIdAndDelete(guestCartId);

    res.json(ResponseUtils.success(userCart, 'Guest cart merged successfully'));
  });
}
