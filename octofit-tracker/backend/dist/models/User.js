"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    _id: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String },
    joinedAt: { type: Date, default: () => new Date() },
});
exports.UserModel = (0, mongoose_1.model)('User', userSchema);
