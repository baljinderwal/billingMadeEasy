import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { errorHandler, notFound, corsOptions } from '../../../shared/middleware/dist/index.js';
import campaignRoutes from './routes/campaigns';
import promotionRoutes from './routes/promotions';
import referralRoutes from './routes/referrals';
import loyaltyRoutes from './routes/loyalty';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3006;

app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/campaigns', campaignRoutes);
app.use('/api/promotions', promotionRoutes);
app.use('/api/referrals', referralRoutes);
app.use('/api/loyalty', loyaltyRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'marketing-service' });
});

app.use(notFound);
app.use(errorHandler);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI!);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

const startServer = async () => {
  await connectDB();
  
  app.listen(PORT, () => {
    console.log(`Marketing service running on port ${PORT}`);
  });
};

startServer().catch(console.error);
