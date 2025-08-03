import express from 'express';
import dotenv from 'dotenv';
import { DatabaseUtils } from '../../../shared/utils/dist/index.js';
import { corsMiddleware, errorHandler, notFoundHandler, requestLogger, apiLimiter } from '../../../shared/middleware/dist/index.js';
import orderRoutes from './routes/orders';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

app.use(corsMiddleware);
app.use(requestLogger);
app.use(apiLimiter);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

DatabaseUtils.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/billing_db');

app.get('/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Order Service is healthy',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/orders', orderRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Order Service running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
