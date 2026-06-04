import { Document, model, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  avatar?: string;
  joinedAt: Date;
}

const userSchema = new Schema<IUser>({
  _id: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: { type: String },
  joinedAt: { type: Date, default: () => new Date() },
});

export const UserModel = model<IUser>('User', userSchema);
