import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { errorHandler, notFound, corsOptions } from '../../../shared/middleware/dist/index.js';
import analyticsRoutes from './routes/analytics';
import dashboardRoutes from './routes/dashboard';
import reportsRoutes from './routes/reports';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3007;

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/analytics', analyticsRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/reports', reportsRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'analytics-service' });
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
    console.log(`Analytics service running on port ${PORT}`);
  });
};

startServer().catch(console.error);
