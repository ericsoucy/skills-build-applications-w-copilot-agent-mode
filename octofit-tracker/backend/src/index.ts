import express from 'express';
import apiRoutes from './routes';
import { API_URL, PORT } from './config';

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

export default app;
