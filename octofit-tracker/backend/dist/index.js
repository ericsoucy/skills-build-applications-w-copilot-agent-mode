"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const config_1 = require("./config");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api', routes_1.default);
app.get('/', (_req, res) => {
    res.json({
        message: 'Octofit Tracker backend is running',
        health: '/health',
        api: '/api',
        info: '/api/info',
    });
});
app.get('/health', (_req, res) => {
    res.json({ status: 'ok', apiUrl: config_1.API_URL });
});
app.get('/api/info', (_req, res) => {
    res.json({ apiUrl: config_1.API_URL, port: config_1.PORT, environment: process.env.NODE_ENV || 'development' });
});
exports.default = app;
