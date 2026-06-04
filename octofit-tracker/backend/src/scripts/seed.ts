import mongoose from 'mongoose';
import { ActivityModel } from '../models/Activity';
import { LeaderboardEntryModel } from '../models/LeaderboardEntry';
import { TeamModel } from '../models/Team';
import { UserModel } from '../models/User';
import { WorkoutModel } from '../models/Workout';
import { MONGO_URI } from '../config';

// Seed the octofit_db database with test data
async function seed() {
  console.log('Seed the octofit_db database with test data');
  console.log(`Connecting to MongoDB at ${MONGO_URI}`);

  await mongoose.connect(MONGO_URI);

  const existingCollections = [UserModel, TeamModel, ActivityModel, WorkoutModel, LeaderboardEntryModel] as const;
  await Promise.all(existingCollections.map((model: any) => model.deleteMany({})));

  const users = [
    {
      _id: 'u1',
      name: 'Ari Octo',
      email: 'ari@octofit.dev',
      avatar: 'https://example.com/avatars/ari.png',
      joinedAt: new Date('2026-01-10T08:00:00Z'),
    },
    {
      _id: 'u2',
      name: 'Mia Wave',
      email: 'mia@octofit.dev',
      avatar: 'https://example.com/avatars/mia.png',
      joinedAt: new Date('2026-01-12T09:15:00Z'),
    },
    {
      _id: 'u3',
      name: 'Jax Reef',
      email: 'jax@octofit.dev',
      avatar: 'https://example.com/avatars/jax.png',
      joinedAt: new Date('2026-02-02T07:30:00Z'),
    },
  ];

  const teams = [
    {
      _id: 't1',
      name: 'Team Nautilus',
      description: 'Competitive swimmers who love data-driven progress.',
      memberIds: ['u1', 'u2'],
      createdAt: new Date('2026-01-15T11:00:00Z'),
    },
    {
      _id: 't2',
      name: 'Coral Crushers',
      description: 'Endurance athletes focused on long-distance challenges.',
      memberIds: ['u2', 'u3'],
      createdAt: new Date('2026-02-01T14:45:00Z'),
    },
  ];

  const activities = [
    {
      _id: 'a1',
      userId: 'u1',
      type: 'run',
      durationMinutes: 42,
      distanceKm: 8.2,
      caloriesBurned: 520,
      date: new Date('2026-02-28T06:30:00Z'),
    },
    {
      _id: 'a2',
      userId: 'u2',
      type: 'swim',
      durationMinutes: 55,
      distanceKm: 2.3,
      caloriesBurned: 610,
      date: new Date('2026-03-01T07:15:00Z'),
    },
    {
      _id: 'a3',
      userId: 'u3',
      type: 'cycling',
      durationMinutes: 78,
      distanceKm: 32.4,
      caloriesBurned: 820,
      date: new Date('2026-03-02T16:00:00Z'),
    },
    {
      _id: 'a4',
      userId: 'u1',
      type: 'strength',
      durationMinutes: 50,
      caloriesBurned: 420,
      date: new Date('2026-03-03T18:00:00Z'),
    },
    {
      _id: 'a5',
      userId: 'u2',
      type: 'yoga',
      durationMinutes: 35,
      caloriesBurned: 180,
      date: new Date('2026-03-04T08:00:00Z'),
    },
  ];

  const workouts = [
    {
      _id: 'w1',
      title: 'Cardio Blast',
      description: 'A fast-paced interval workout to build stamina and speed.',
      difficulty: 'medium',
      focus: 'Endurance',
      durationMinutes: 30,
      createdAt: new Date('2026-01-20T08:00:00Z'),
    },
    {
      _id: 'w2',
      title: 'Strength Surge',
      description: 'Full-body strength training with core focus.',
      difficulty: 'hard',
      focus: 'Power',
      durationMinutes: 45,
      createdAt: new Date('2026-01-24T08:00:00Z'),
    },
    {
      _id: 'w3',
      title: 'Recovery Flow',
      description: 'Gentle mobility and breathing work to support recovery.',
      difficulty: 'easy',
      focus: 'Recovery',
      durationMinutes: 25,
      createdAt: new Date('2026-02-05T08:00:00Z'),
    },
  ];

  const leaderboardEntries = [
    {
      _id: 'l1',
      userId: 'u2',
      name: 'Mia Wave',
      score: 1430,
      rank: 1,
      updatedAt: new Date('2026-03-05T10:00:00Z'),
    },
    {
      _id: 'l2',
      userId: 'u1',
      name: 'Ari Octo',
      score: 1250,
      rank: 2,
      updatedAt: new Date('2026-03-05T10:00:00Z'),
    },
    {
      _id: 'l3',
      userId: 'u3',
      name: 'Jax Reef',
      score: 980,
      rank: 3,
      updatedAt: new Date('2026-03-05T10:00:00Z'),
    },
  ];

  await UserModel.insertMany(users);
  await TeamModel.insertMany(teams);
  await ActivityModel.insertMany(activities);
  await WorkoutModel.insertMany(workouts);
  await LeaderboardEntryModel.insertMany(leaderboardEntries);

  console.log('Inserted sample users:', users.length);
  console.log('Inserted sample teams:', teams.length);
  console.log('Inserted sample activities:', activities.length);
  console.log('Inserted sample workouts:', workouts.length);
  console.log('Inserted sample leaderboard entries:', leaderboardEntries.length);

  await mongoose.disconnect();
  console.log('MongoDB connection closed.');
}

seed().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
