"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamModel = void 0;
const mongoose_1 = require("mongoose");
const teamSchema = new mongoose_1.Schema({
    _id: { type: String },
    name: { type: String, required: true },
    description: { type: String },
    memberIds: [{ type: String, required: true }],
    createdAt: { type: Date, default: () => new Date() },
});
exports.TeamModel = (0, mongoose_1.model)('Team', teamSchema);
