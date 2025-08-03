import { Request, Response } from 'express';
import { ResponseUtils, DatabaseUtils } from '../../../../shared/utils/dist/index.js';
import { asyncHandler } from '../../../../shared/middleware/dist/index.js';
import Cart from '../models/Cart';

export class CartController {
  static getCart = asyncHandler(async (req: Request, res: Response): Promise<void> => {
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

  static addItem = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { productId, variantId, quantity, price, originalPrice } = req.body;
    const userId = req.user?.userId;
    const sessionId = req.headers['x-session-id'] as string;

    if (!DatabaseUtils.isValidObjectId(productId)) {
      res.status(400).json(ResponseUtils.error('Invalid product ID'));
      return;
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

  static updateItem = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { itemId } = req.params;
    const { quantity } = req.body;
    const userId = req.user?.userId;
    const sessionId = req.headers['x-session-id'] as string;

    if (!DatabaseUtils.isValidObjectId(itemId)) {
      res.status(400).json(ResponseUtils.error('Invalid item ID'));
      return;
    }

    let cart;
    if (userId) {
      cart = await Cart.findOne({ userId });
    } else if (sessionId) {
      cart = await Cart.findOne({ sessionId });
    }

    if (!cart) {
      res.status(404).json(ResponseUtils.error('Cart not found'));
      return;
    }

    const item = cart.items.id(itemId);
    if (!item) {
      res.status(404).json(ResponseUtils.error('Item not found in cart'));
      return;
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

  static removeItem = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { itemId } = req.params;
    const userId = req.user?.userId;
    const sessionId = req.headers['x-session-id'] as string;

    if (!DatabaseUtils.isValidObjectId(itemId)) {
      res.status(400).json(ResponseUtils.error('Invalid item ID'));
      return;
    }

    let cart;
    if (userId) {
      cart = await Cart.findOne({ userId });
    } else if (sessionId) {
      cart = await Cart.findOne({ sessionId });
    }

    if (!cart) {
      res.status(404).json(ResponseUtils.error('Cart not found'));
      return;
    }

    cart.items.pull(itemId);
    await cart.save();
    await cart.populate('items.productId', 'name images basePrice status');

    res.json(ResponseUtils.success(cart, 'Item removed from cart successfully'));
  });

  static clearCart = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.userId;
    const sessionId = req.headers['x-session-id'] as string;

    let cart;
    if (userId) {
      cart = await Cart.findOne({ userId });
    } else if (sessionId) {
      cart = await Cart.findOne({ sessionId });
    }

    if (!cart) {
      res.status(404).json(ResponseUtils.error('Cart not found'));
      return;
    }

    cart.items = [];
    cart.couponCode = undefined;
    cart.couponDiscount = 0;
    await cart.save();

    res.json(ResponseUtils.success(cart, 'Cart cleared successfully'));
  });

  static applyCoupon = asyncHandler(async (req: Request, res: Response): Promise<void> => {
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
      res.status(404).json(ResponseUtils.error('Cart not found'));
      return;
    }

    const discount = 100;
    cart.couponCode = couponCode;
    cart.couponDiscount = discount;
    await cart.save();

    res.json(ResponseUtils.success(cart, 'Coupon applied successfully'));
  });

  static removeCoupon = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.userId;
    const sessionId = req.headers['x-session-id'] as string;

    let cart;
    if (userId) {
      cart = await Cart.findOne({ userId });
    } else if (sessionId) {
      cart = await Cart.findOne({ sessionId });
    }

    if (!cart) {
      res.status(404).json(ResponseUtils.error('Cart not found'));
      return;
    }

    cart.couponCode = undefined;
    cart.couponDiscount = 0;
    await cart.save();

    res.json(ResponseUtils.success(cart, 'Coupon removed successfully'));
  });

  static saveForLater = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    res.json(ResponseUtils.success(null, 'Save for later functionality coming soon'));
  });

  static moveToCart = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    res.json(ResponseUtils.success(null, 'Move to cart functionality coming soon'));
  });

  static mergeGuestCart = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { guestCartId } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json(ResponseUtils.error('Authentication required'));
      return;
    }

    const [userCart, guestCart] = await Promise.all([
      Cart.findOne({ userId }),
      Cart.findById(guestCartId)
    ]);

    if (!guestCart) {
      res.status(404).json(ResponseUtils.error('Guest cart not found'));
      return;
    }

    if (!userCart) {
      guestCart.userId = userId;
      guestCart.sessionId = undefined;
      await guestCart.save();
      res.json(ResponseUtils.success(guestCart, 'Guest cart merged successfully'));
      return;
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
