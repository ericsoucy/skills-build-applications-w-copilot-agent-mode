import { Document, model, Schema } from 'mongoose';

export interface IActivity extends Document {
  userId: string;
  type: string;
  durationMinutes: number;
  distanceKm?: number;
  caloriesBurned: number;
  date: Date;
}

const activitySchema = new Schema<IActivity>({
  _id: { type: String },
  userId: { type: String, required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  distanceKm: { type: Number },
  caloriesBurned: { type: Number, required: true },
  date: { type: Date, default: () => new Date() },
});

export const ActivityModel = model<IActivity>('Activity', activitySchema);
