import { Document, model, Schema } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  description?: string;
  memberIds: string[];
  createdAt: Date;
}

const teamSchema = new Schema<ITeam>({
  _id: { type: String },
  name: { type: String, required: true },
  description: { type: String },
  memberIds: [{ type: String, required: true }],
  createdAt: { type: Date, default: () => new Date() },
});

export const TeamModel = model<ITeam>('Team', teamSchema);
