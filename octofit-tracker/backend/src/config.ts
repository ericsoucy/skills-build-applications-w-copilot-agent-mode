export const PORT = 8000;
export const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://localhost:27017/octofit_db';

export const API_URL = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
  : `http://localhost:${PORT}`;
