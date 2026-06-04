import { Document, model, Schema } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  userId: string;
  name: string;
  score: number;
  rank: number;
  updatedAt: Date;
}

const leaderboardEntrySchema = new Schema<ILeaderboardEntry>({
  _id: { type: String },
  userId: { type: String, required: true },
  name: { type: String, required: true },
  score: { type: Number, required: true },
  rank: { type: Number, required: true },
  updatedAt: { type: Date, default: () => new Date() },
});

export const LeaderboardEntryModel = model<ILeaderboardEntry>('LeaderboardEntry', leaderboardEntrySchema);
