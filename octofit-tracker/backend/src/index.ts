import express from 'express';
import mongoose from 'mongoose';
import apiRoutes from './routes';
import { API_URL, MONGO_URI, PORT } from './config';

const app = express();

app.use(express.json());
app.use('/api', apiRoutes);

app.get('/', (_req, res) => {
  res.json({
    message: 'Octofit Tracker backend is running',
    health: '/health',
    api: '/api',
    info: '/api/info',
  });
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', apiUrl: API_URL });
});

app.get('/api/info', (_req, res) => {
  res.json({ apiUrl: API_URL, port: PORT, environment: process.env.NODE_ENV || 'development' });
});

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    console.log(`API URL: ${API_URL}`);
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Backend listening on ${API_URL}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
