"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutModel = void 0;
const mongoose_1 = require("mongoose");
const workoutSchema = new mongoose_1.Schema({
    _id: { type: String },
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, required: true, enum: ['easy', 'medium', 'hard'] },
    focus: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    createdAt: { type: Date, default: () => new Date() },
});
exports.WorkoutModel = (0, mongoose_1.model)('Workout', workoutSchema);
