import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { errorHandler, notFound, corsOptions } from '../../../shared/middleware/dist/index.js';
import vendorRoutes from './routes/vendors';
import applicationRoutes from './routes/applications';
import commissionRoutes from './routes/commissions';
import payoutRoutes from './routes/payouts';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3009;

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/vendors', vendorRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/commissions', commissionRoutes);
app.use('/api/payouts', payoutRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'vendor-service' });
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
    console.log(`Vendor service running on port ${PORT}`);
  });
};

startServer().catch(console.error);
