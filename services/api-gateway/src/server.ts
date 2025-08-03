import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv';
import { corsMiddleware, errorHandler, notFoundHandler, requestLogger, generalLimiter } from '../shared/middleware/dist/index';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(compression());
app.use(corsMiddleware);
app.use(requestLogger);
app.use(generalLimiter);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'API Gateway is healthy',
    timestamp: new Date().toISOString(),
    services: {
      'product-service': process.env.PRODUCT_SERVICE_URL || 'http://localhost:3001',
      'cart-service': process.env.CART_SERVICE_URL || 'http://localhost:3002',
      'order-service': process.env.ORDER_SERVICE_URL || 'http://localhost:3003',
      'payment-service': process.env.PAYMENT_SERVICE_URL || 'http://localhost:3004',
      'user-service': process.env.USER_SERVICE_URL || 'http://localhost:3005',
    }
  });
});

app.use('/api/products', createProxyMiddleware({
  target: process.env.PRODUCT_SERVICE_URL || 'http://localhost:3001',
  changeOrigin: true,
  pathRewrite: { '^/api/products': '/api/products' },
  onError: (err: any, req: any, res: any) => {
    console.error('Product service proxy error:', err);
    res.status(503).json({ success: false, message: 'Product service unavailable' });
  }
}));

app.use('/api/cart', createProxyMiddleware({
  target: process.env.CART_SERVICE_URL || 'http://localhost:3002',
  changeOrigin: true,
  pathRewrite: { '^/api/cart': '/api/cart' },
  onError: (err: any, req: any, res: any) => {
    console.error('Cart service proxy error:', err);
    res.status(503).json({ success: false, message: 'Cart service unavailable' });
  }
}));

app.use('/api/orders', createProxyMiddleware({
  target: process.env.ORDER_SERVICE_URL || 'http://localhost:3003',
  changeOrigin: true,
  pathRewrite: { '^/api/orders': '/api/orders' },
  onError: (err: any, req: any, res: any) => {
    console.error('Order service proxy error:', err);
    res.status(503).json({ success: false, message: 'Order service unavailable' });
  }
}));

app.use('/api/payments', createProxyMiddleware({
  target: process.env.PAYMENT_SERVICE_URL || 'http://localhost:3004',
  changeOrigin: true,
  pathRewrite: { '^/api/payments': '/api/payments' },
  onError: (err: any, req: any, res: any) => {
    console.error('Payment service proxy error:', err);
    res.status(503).json({ success: false, message: 'Payment service unavailable' });
  }
}));

app.use('/api/users', createProxyMiddleware({
  target: process.env.USER_SERVICE_URL || 'http://localhost:3005',
  changeOrigin: true,
  pathRewrite: { '^/api/users': '/api/users' },
  onError: (err: any, req: any, res: any) => {
    console.error('User service proxy error:', err);
    res.status(503).json({ success: false, message: 'User service unavailable' });
  }
}));

app.use('/api/auth', createProxyMiddleware({
  target: process.env.USER_SERVICE_URL || 'http://localhost:3005',
  changeOrigin: true,
  pathRewrite: { '^/api/auth': '/api/auth' },
  onError: (err: any, req: any, res: any) => {
    console.error('Auth service proxy error:', err);
    res.status(503).json({ success: false, message: 'Auth service unavailable' });
  }
}));

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
