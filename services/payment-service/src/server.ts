import express from 'express';
import dotenv from 'dotenv';
import { DatabaseUtils } from '@billing/utils';
import { corsMiddleware, errorHandler, notFoundHandler, requestLogger, apiLimiter } from '@billing/middleware';
import paymentRoutes from './routes/payments';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3004;

app.use(corsMiddleware);
app.use(requestLogger);
app.use(apiLimiter);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

DatabaseUtils.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/billing_db');

app.get('/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Payment Service is healthy',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/payments', paymentRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Payment Service running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
