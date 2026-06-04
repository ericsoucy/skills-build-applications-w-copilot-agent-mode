import { Router, Request, Response } from 'express';
import { ActivityModel } from './models/Activity';
import { LeaderboardEntryModel } from './models/LeaderboardEntry';
import { TeamModel } from './models/Team';
import { UserModel } from './models/User';
import { WorkoutModel } from './models/Workout';

const router = Router();

const handleError = (res: Response, error: unknown) => {
  console.error(error);
  return res.status(500).json({ error: 'Internal server error' });
};

router.get('/users', async (_req: Request, res: Response) => {
  try {
    const users = await UserModel.find().sort({ joinedAt: 1 }).lean();
    res.json(users);
  } catch (error) {
    handleError(res, error);
  }
});

router.post('/users', async (req: Request, res: Response) => {
  try {
    const user = await UserModel.create({ ...req.body, joinedAt: new Date() });
    res.status(201).json(user);
  } catch (error) {
    handleError(res, error);
  }
});

router.get('/teams', async (_req: Request, res: Response) => {
  try {
    const teams = await TeamModel.find().sort({ createdAt: -1 }).lean();
    res.json(teams);
  } catch (error) {
    handleError(res, error);
  }
});

router.post('/teams', async (req: Request, res: Response) => {
  try {
    const team = await TeamModel.create(req.body);
    res.status(201).json(team);
  } catch (error) {
    handleError(res, error);
  }
});

router.get('/activities', async (_req: Request, res: Response) => {
  try {
    const activities = await ActivityModel.find().sort({ date: -1 }).lean();
    res.json(activities);
  } catch (error) {
    handleError(res, error);
  }
});

router.post('/activities', async (req: Request, res: Response) => {
  try {
    const activity = await ActivityModel.create({ ...req.body, date: req.body.date ? new Date(req.body.date) : new Date() });
    res.status(201).json(activity);
  } catch (error) {
    handleError(res, error);
  }
});

router.get('/leaderboard', async (_req: Request, res: Response) => {
  try {
    const leaderboard = await LeaderboardEntryModel.find().sort({ rank: 1 }).lean();
    res.json(leaderboard);
  } catch (error) {
    handleError(res, error);
  }
});

router.get('/workouts', async (_req: Request, res: Response) => {
  try {
    const workouts = await WorkoutModel.find().sort({ createdAt: -1 }).lean();
    res.json(workouts);
  } catch (error) {
    handleError(res, error);
  }
});

router.post('/workouts', async (req: Request, res: Response) => {
  try {
    const workout = await WorkoutModel.create(req.body);
    res.status(201).json(workout);
  } catch (error) {
    handleError(res, error);
  }
});

export default router;
