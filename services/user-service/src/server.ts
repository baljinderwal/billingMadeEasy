import express from 'express';
import dotenv from 'dotenv';
import { DatabaseUtils } from '../../../shared/utils/dist/index.js';
import { corsMiddleware, errorHandler, notFoundHandler, requestLogger, apiLimiter } from '../../../shared/middleware/dist/index.js';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import addressRoutes from './routes/addresses';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3005;

app.use(corsMiddleware);
app.use(requestLogger);
app.use(apiLimiter);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

DatabaseUtils.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/billing_db');

app.get('/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'User Service is healthy',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/addresses', addressRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
