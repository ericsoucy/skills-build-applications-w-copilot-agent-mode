import mongoose from 'mongoose';
import { MONGO_URI } from '../config';

export const DATABASE_NAME = 'octofit_db';
export const connectDatabase = async () => mongoose.connect(MONGO_URI);
export { MONGO_URI };
