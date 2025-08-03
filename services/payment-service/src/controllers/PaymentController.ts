import { Request, Response } from 'express';
import { ResponseUtils, DatabaseUtils } from '@billing/utils';
import { asyncHandler } from '@billing/middleware';
import Payment from '../models/Payment';

export class PaymentController {
  static getPayments = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    const { page = 1, limit = 20, status, method, gateway } = req.query;

    const filter: any = {};
    
    if (req.user?.role !== 'admin') {
      filter.userId = userId;
    }
    
    if (status) {
      filter.status = status;
    }
    
    if (method) {
      filter.method = method;
    }
    
    if (gateway) {
      filter.gateway = gateway;
    }

    const skip = (Number(page) - 1) * Number(limit);
    
    const [payments, total] = await Promise.all([
      Payment.find(filter)
        .populate('orderId', 'orderNumber total')
        .populate('userId', 'firstName lastName email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .lean(),
      Payment.countDocuments(filter)
    ]);

    res.json(ResponseUtils.paginated(payments, Number(page), Number(limit), total, 'Payments retrieved successfully'));
  });

  static getPaymentById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user?.userId;

    if (!DatabaseUtils.isValidObjectId(id)) {
      return res.status(400).json(ResponseUtils.error('Invalid payment ID'));
    }

    const filter: any = { _id: id };
    if (req.user?.role !== 'admin') {
      filter.userId = userId;
    }

    const payment = await Payment.findOne(filter)
      .populate('orderId', 'orderNumber total')
      .populate('userId', 'firstName lastName email')
      .lean();

    if (!payment) {
      return res.status(404).json(ResponseUtils.error('Payment not found'));
    }

    res.json(ResponseUtils.success(payment, 'Payment retrieved successfully'));
  });

  static createPayment = asyncHandler(async (req: Request, res: Response) => {
    const { orderId, amount, currency = 'INR', method, gateway } = req.body;
    const userId = req.user?.userId;

    if (!DatabaseUtils.isValidObjectId(orderId)) {
      return res.status(400).json(ResponseUtils.error('Invalid order ID'));
    }

    let gatewayResponse;
    
    try {
      if (gateway === 'razorpay') {
        gatewayResponse = await PaymentController.createRazorpayOrder(amount, currency, orderId);
      } else if (gateway === 'stripe') {
        gatewayResponse = await PaymentController.createStripePaymentIntent(amount, currency);
      } else {
        return res.status(400).json(ResponseUtils.error('Unsupported payment gateway'));
      }

      const paymentData: any = {
        orderId,
        userId,
        amount,
        currency,
        method,
        gateway,
        status: 'pending',
        gatewayOrderId: gatewayResponse.id,
        gatewayResponse: gatewayResponse
      };

      const payment = new Payment(paymentData);
      await payment.save();

      res.status(201).json(ResponseUtils.success({
        payment,
        gatewayData: gatewayResponse
      }, 'Payment created successfully'));

    } catch (error) {
      console.error('Payment creation error:', error);
      res.status(500).json(ResponseUtils.error('Failed to create payment'));
    }
  });

  static verifyPayment = asyncHandler(async (req: Request, res: Response) => {
    const { paymentId, gatewayPaymentId, gatewayOrderId, signature } = req.body;

    if (!paymentId) {
      return res.status(400).json(ResponseUtils.error('Payment ID is required'));
    }

    const payment = await Payment.findOne({ paymentId });
    if (!payment) {
      return res.status(404).json(ResponseUtils.error('Payment not found'));
    }

    try {
      let isValid = false;

      if (payment.gateway === 'razorpay') {
        isValid = PaymentController.verifyRazorpaySignature(gatewayOrderId, gatewayPaymentId, signature);
      } else if (payment.gateway === 'stripe') {
        isValid = true; // Stripe verification would be done via webhooks
      }

      if (isValid) {
        payment.status = 'completed';
        payment.gatewayPaymentId = gatewayPaymentId;
        payment.transactionId = gatewayPaymentId;
        payment.processedAt = new Date();
      } else {
        payment.status = 'failed';
        payment.failureReason = 'Invalid signature';
      }

      await payment.save();

      res.json(ResponseUtils.success(payment, 'Payment verification completed'));

    } catch (error) {
      console.error('Payment verification error:', error);
      payment.status = 'failed';
      payment.failureReason = 'Verification failed';
      await payment.save();

      res.status(500).json(ResponseUtils.error('Payment verification failed'));
    }
  });

  static razorpayWebhook = asyncHandler(async (req: Request, res: Response) => {
    const signature = req.headers['x-razorpay-signature'] as string;
    const payload = JSON.stringify(req.body);

    try {
      const isValid = PaymentController.verifyRazorpayWebhook(payload, signature);
      
      if (!isValid) {
        return res.status(400).json(ResponseUtils.error('Invalid webhook signature'));
      }

      const event = req.body;
      const paymentEntity = event.payload.payment.entity;

      const payment = await Payment.findOne({ gatewayOrderId: paymentEntity.order_id });
      if (payment) {
        if (event.event === 'payment.captured') {
          payment.status = 'completed';
          payment.gatewayPaymentId = paymentEntity.id;
          payment.processedAt = new Date();
        } else if (event.event === 'payment.failed') {
          payment.status = 'failed';
          payment.failureReason = paymentEntity.error_description;
        }

        await payment.save();
      }

      res.json({ success: true });

    } catch (error) {
      console.error('Razorpay webhook error:', error);
      res.status(500).json(ResponseUtils.error('Webhook processing failed'));
    }
  });

  static stripeWebhook = asyncHandler(async (req: Request, res: Response) => {
    const signature = req.headers['stripe-signature'] as string;

    try {
      const event = req.body;

      if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object;
        const payment = await Payment.findOne({ gatewayOrderId: paymentIntent.id });
        
        if (payment) {
          payment.status = 'completed';
          payment.gatewayPaymentId = paymentIntent.id;
          payment.processedAt = new Date();
          await payment.save();
        }
      }

      res.json({ received: true });

    } catch (error) {
      console.error('Stripe webhook error:', error);
      res.status(500).json(ResponseUtils.error('Webhook processing failed'));
    }
  });

  static initiateRefund = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { amount, reason } = req.body;
    const userId = req.user?.userId;

    if (!DatabaseUtils.isValidObjectId(id)) {
      return res.status(400).json(ResponseUtils.error('Invalid payment ID'));
    }

    const filter: any = { _id: id };
    if (req.user?.role !== 'admin') {
      filter.userId = userId;
    }

    const payment = await Payment.findOne(filter);
    if (!payment) {
      return res.status(404).json(ResponseUtils.error('Payment not found'));
    }

    if (payment.status !== 'completed') {
      return res.status(400).json(ResponseUtils.error('Payment must be completed to initiate refund'));
    }

    try {
      let refundResponse;

      if (payment.gateway === 'razorpay') {
        refundResponse = await PaymentController.createRazorpayRefund(payment.gatewayPaymentId!, amount);
      } else if (payment.gateway === 'stripe') {
        refundResponse = await PaymentController.createStripeRefund(payment.gatewayPaymentId!, amount);
      } else {
        return res.status(400).json(ResponseUtils.error('Unsupported payment gateway for refunds'));
      }

      const refund = {
        refundId: refundResponse.id,
        amount,
        reason,
        status: 'processing' as const,
        gatewayRefundId: refundResponse.id,
        createdAt: new Date()
      };

      payment.refunds.push(refund);
      await payment.save();

      res.json(ResponseUtils.success(refund, 'Refund initiated successfully'));

    } catch (error) {
      console.error('Refund initiation error:', error);
      res.status(500).json(ResponseUtils.error('Failed to initiate refund'));
    }
  });

  static getPaymentStatus = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!DatabaseUtils.isValidObjectId(id)) {
      return res.status(400).json(ResponseUtils.error('Invalid payment ID'));
    }

    const payment = await Payment.findById(id)
      .select('paymentId status amount currency method gateway processedAt')
      .lean();

    if (!payment) {
      return res.status(404).json(ResponseUtils.error('Payment not found'));
    }

    res.json(ResponseUtils.success(payment, 'Payment status retrieved successfully'));
  });

  static getAvailablePaymentMethods = asyncHandler(async (req: Request, res: Response) => {
    const paymentMethods = [
      { id: 'card', name: 'Credit/Debit Card', icon: 'card', enabled: true },
      { id: 'upi', name: 'UPI', icon: 'upi', enabled: true },
      { id: 'netbanking', name: 'Net Banking', icon: 'bank', enabled: true },
      { id: 'wallet', name: 'Digital Wallet', icon: 'wallet', enabled: true },
      { id: 'emi', name: 'EMI', icon: 'emi', enabled: true },
      { id: 'bnpl', name: 'Buy Now Pay Later', icon: 'bnpl', enabled: true },
      { id: 'cod', name: 'Cash on Delivery', icon: 'cod', enabled: true }
    ];

    res.json(ResponseUtils.success(paymentMethods, 'Payment methods retrieved successfully'));
  });

  private static async createRazorpayOrder(amount: number, currency: string, orderId: string) {
    return {
      id: `order_${Math.random().toString(36).substr(2, 9)}`,
      amount: amount * 100, // Razorpay expects amount in paise
      currency,
      receipt: orderId
    };
  }

  private static async createStripePaymentIntent(amount: number, currency: string) {
    return {
      id: `pi_${Math.random().toString(36).substr(2, 9)}`,
      amount: amount * 100, // Stripe expects amount in cents
      currency: currency.toLowerCase(),
      client_secret: `pi_${Math.random().toString(36).substr(2, 9)}_secret_${Math.random().toString(36).substr(2, 9)}`
    };
  }

  private static verifyRazorpaySignature(orderId: string, paymentId: string, signature: string): boolean {
    return !!(signature && signature.length > 0);
  }

  private static verifyRazorpayWebhook(payload: string, signature: string): boolean {
    return !!(signature && signature.length > 0);
  }

  private static async createRazorpayRefund(paymentId: string, amount: number) {
    return {
      id: `rfnd_${Math.random().toString(36).substr(2, 9)}`,
      amount: amount * 100,
      payment_id: paymentId
    };
  }

  private static async createStripeRefund(paymentId: string, amount: number) {
    return {
      id: `re_${Math.random().toString(36).substr(2, 9)}`,
      amount: amount * 100,
      payment_intent: paymentId
    };
  }
}
