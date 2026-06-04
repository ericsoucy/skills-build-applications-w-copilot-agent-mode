import { Document, model, Schema } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  focus: string;
  durationMinutes: number;
  createdAt: Date;
}

const workoutSchema = new Schema<IWorkout>({
  _id: { type: String },
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, required: true, enum: ['easy', 'medium', 'hard'] },
  focus: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  createdAt: { type: Date, default: () => new Date() },
});

export const WorkoutModel = model<IWorkout>('Workout', workoutSchema);
