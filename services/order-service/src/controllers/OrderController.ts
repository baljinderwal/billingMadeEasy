import { Request, Response } from 'express';
import { ResponseUtils, DatabaseUtils, HelperUtils } from '../../../../shared/utils/dist/index.js';
import { asyncHandler } from '../../../../shared/middleware/dist/index.js';
import Order from '../models/Order';

export class OrderController {
  static getOrders = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.userId;
    const { page = 1, limit = 20, status, startDate, endDate } = req.query;

    const filter: any = {};
    
    if (req.user?.role !== 'admin') {
      filter.userId = userId;
    }
    
    if (status) {
      filter.status = status;
    }
    
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate as string);
      if (endDate) filter.createdAt.$lte = new Date(endDate as string);
    }

    const skip = (Number(page) - 1) * Number(limit);
    
    const [orders, total] = await Promise.all([
      Order.find(filter)
        .populate('userId', 'firstName lastName email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .lean(),
      Order.countDocuments(filter)
    ]);

    res.json(ResponseUtils.paginated(orders, Number(page), Number(limit), total, 'Orders retrieved successfully'));
  });

  static getOrderById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const userId = req.user?.userId;

    if (!DatabaseUtils.isValidObjectId(id)) {
      res.status(400).json(ResponseUtils.error('Invalid order ID'));
      return;
    }

    const filter: any = { _id: id };
    if (req.user?.role !== 'admin') {
      filter.userId = userId;
    }

    const order = await Order.findOne(filter)
      .populate('userId', 'firstName lastName email')
      .lean();

    if (!order) {
      res.status(404).json(ResponseUtils.error('Order not found'));
      return;
    }

    res.json(ResponseUtils.success(order, 'Order retrieved successfully'));
  });

  static getOrderByNumber = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { orderNumber } = req.params;
    const userId = req.user?.userId;

    const filter: any = { orderNumber };
    if (req.user?.role !== 'admin') {
      filter.userId = userId;
    }

    const order = await Order.findOne(filter)
      .populate('userId', 'firstName lastName email')
      .lean();

    if (!order) {
      res.status(404).json(ResponseUtils.error('Order not found'));
      return;
    }

    res.json(ResponseUtils.success(order, 'Order retrieved successfully'));
  });

  static createOrder = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const orderData = req.body;
    const userId = req.user?.userId;

    orderData.userId = userId;
    orderData.orderNumber = HelperUtils.generateOrderNumber();

    const order = new Order(orderData);
    await order.save();

    const populatedOrder = await Order.findById(order._id)
      .populate('userId', 'firstName lastName email')
      .lean();

    res.status(201).json(ResponseUtils.success(populatedOrder, 'Order created successfully'));
  });

  static updateOrderStatus = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { status, note } = req.body;

    if (!DatabaseUtils.isValidObjectId(id)) {
      res.status(400).json(ResponseUtils.error('Invalid order ID'));
      return;
    }

    const order = await Order.findById(id);
    if (!order) {
      res.status(404).json(ResponseUtils.error('Order not found'));
      return;
    }

    order.status = status;
    if (note) {
      order.statusHistory.push({
        status,
        timestamp: new Date(),
        note
      });
    }

    if (status === 'delivered') {
      order.deliveredAt = new Date();
    }

    await order.save();

    res.json(ResponseUtils.success(order, 'Order status updated successfully'));
  });

  static updateShipping = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { trackingNumber, shippingMethod, estimatedDelivery } = req.body;

    if (!DatabaseUtils.isValidObjectId(id)) {
      res.status(400).json(ResponseUtils.error('Invalid order ID'));
      return;
    }

    const order = await Order.findByIdAndUpdate(
      id,
      {
        trackingNumber,
        shippingMethod,
        estimatedDelivery: estimatedDelivery ? new Date(estimatedDelivery) : undefined,
        status: 'shipped'
      },
      { new: true }
    );

    if (!order) {
      res.status(404).json(ResponseUtils.error('Order not found'));
      return;
    }

    res.json(ResponseUtils.success(order, 'Shipping information updated successfully'));
  });

  static requestRefund = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { amount, reason } = req.body;
    const userId = req.user?.userId;

    if (!DatabaseUtils.isValidObjectId(id)) {
      res.status(400).json(ResponseUtils.error('Invalid order ID'));
      return;
    }

    const filter: any = { _id: id };
    if (req.user?.role !== 'admin') {
      filter.userId = userId;
    }

    const order = await Order.findOne(filter);
    if (!order) {
      res.status(404).json(ResponseUtils.error('Order not found'));
      return;
    }

    order.refunds.push({
      amount,
      reason,
      status: 'pending',
      requestedAt: new Date()
    });

    await order.save();

    res.json(ResponseUtils.success(order, 'Refund request submitted successfully'));
  });

  static processRefund = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id, refundId } = req.params;
    const { status } = req.body;

    if (!DatabaseUtils.isValidObjectId(id) || !DatabaseUtils.isValidObjectId(refundId)) {
      res.status(400).json(ResponseUtils.error('Invalid ID'));
      return;
    }

    const order = await Order.findById(id);
    if (!order) {
      res.status(404).json(ResponseUtils.error('Order not found'));
      return;
    }

    const refund = order.refunds.id(refundId);
    if (!refund) {
      res.status(404).json(ResponseUtils.error('Refund not found'));
      return;
    }

    refund.status = status;
    if (status === 'processed') {
      refund.processedAt = new Date();
      order.paymentStatus = 'refunded';
    }

    await order.save();

    res.json(ResponseUtils.success(order, 'Refund processed successfully'));
  });

  static generateInvoice = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const userId = req.user?.userId;

    if (!DatabaseUtils.isValidObjectId(id)) {
      res.status(400).json(ResponseUtils.error('Invalid order ID'));
      return;
    }

    const filter: any = { _id: id };
    if (req.user?.role !== 'admin') {
      filter.userId = userId;
    }

    const order = await Order.findOne(filter)
      .populate('userId', 'firstName lastName email')
      .lean();

    if (!order) {
      res.status(404).json(ResponseUtils.error('Order not found'));
      return;
    }

    const invoice = {
      orderNumber: order.orderNumber,
      invoiceNumber: `INV-${order.orderNumber}`,
      date: new Date(),
      customer: order.userId,
      items: order.items,
      subtotal: order.subtotal,
      tax: order.tax,
      shipping: order.shipping,
      discount: order.discount,
      total: order.total,
      shippingAddress: order.shippingAddress,
      billingAddress: order.billingAddress || order.shippingAddress
    };

    res.json(ResponseUtils.success(invoice, 'Invoice generated successfully'));
  });

  static getTrackingInfo = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!DatabaseUtils.isValidObjectId(id)) {
      res.status(400).json(ResponseUtils.error('Invalid order ID'));
      return;
    }

    const order = await Order.findById(id)
      .select('orderNumber status trackingNumber shippingMethod estimatedDelivery deliveredAt statusHistory')
      .lean();

    if (!order) {
      res.status(404).json(ResponseUtils.error('Order not found'));
      return;
    }

    const trackingInfo = {
      orderNumber: order.orderNumber,
      status: order.status,
      trackingNumber: order.trackingNumber,
      shippingMethod: order.shippingMethod,
      estimatedDelivery: order.estimatedDelivery,
      deliveredAt: order.deliveredAt,
      statusHistory: order.statusHistory
    };

    res.json(ResponseUtils.success(trackingInfo, 'Tracking information retrieved successfully'));
  });
}
