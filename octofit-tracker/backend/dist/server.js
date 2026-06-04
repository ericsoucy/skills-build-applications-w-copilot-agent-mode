"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("./index"));
const config_1 = require("./config");
const API_URL = process.env.CODESPACE_NAME
    ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
    : `http://localhost:${config_1.PORT}`;
mongoose_1.default.connect(config_1.MONGO_URI)
    .then(() => {
    console.log('Connected to MongoDB');
    console.log(`API URL: ${API_URL}`);
    index_1.default.listen(config_1.PORT, '0.0.0.0', () => {
        console.log(`Backend listening on ${API_URL}`);
    });
})
    .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
});
