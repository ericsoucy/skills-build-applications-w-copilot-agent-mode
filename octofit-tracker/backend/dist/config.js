"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.API_URL = exports.MONGO_URI = exports.PORT = void 0;
exports.PORT = 8000;
exports.MONGO_URI = process.env.MONGO_URI ?? 'mongodb://localhost:27017/octofit_db';
exports.API_URL = process.env.CODESPACE_NAME
    ? `https://${process.env.CODESPACE_NAME}-8000.githubpreview.dev`
    : `http://localhost:${exports.PORT}`;
