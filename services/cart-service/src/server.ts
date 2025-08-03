import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { errorHandler, notFoundHandler, requestLogger, corsMiddleware } from '@billing/middleware';
import cartRoutes from './routes/cart';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

app.use(corsMiddleware);
app.use(requestLogger);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Cart Service is healthy',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/cart', cartRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://admin:password123@localhost:27017/billing_db?authSource=admin';
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Cart Service running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
});

export default app;
