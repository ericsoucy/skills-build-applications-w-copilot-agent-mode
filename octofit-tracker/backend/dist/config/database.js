"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGO_URI = exports.connectDatabase = exports.DATABASE_NAME = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config");
Object.defineProperty(exports, "MONGO_URI", { enumerable: true, get: function () { return config_1.MONGO_URI; } });
exports.DATABASE_NAME = 'octofit_db';
const connectDatabase = async () => mongoose_1.default.connect(config_1.MONGO_URI);
exports.connectDatabase = connectDatabase;
