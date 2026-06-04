"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Activity_1 = require("./models/Activity");
const LeaderboardEntry_1 = require("./models/LeaderboardEntry");
const Team_1 = require("./models/Team");
const User_1 = require("./models/User");
const Workout_1 = require("./models/Workout");
const router = (0, express_1.Router)();
const handleError = (res, error) => {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
};
router.get('/users', async (_req, res) => {
    try {
        const users = await User_1.UserModel.find().sort({ joinedAt: 1 }).lean();
        res.json(users);
    }
    catch (error) {
        handleError(res, error);
    }
});
router.post('/users', async (req, res) => {
    try {
        const user = await User_1.UserModel.create({ ...req.body, joinedAt: new Date() });
        res.status(201).json(user);
    }
    catch (error) {
        handleError(res, error);
    }
});
router.get('/teams', async (_req, res) => {
    try {
        const teams = await Team_1.TeamModel.find().sort({ createdAt: -1 }).lean();
        res.json(teams);
    }
    catch (error) {
        handleError(res, error);
    }
});
router.post('/teams', async (req, res) => {
    try {
        const team = await Team_1.TeamModel.create(req.body);
        res.status(201).json(team);
    }
    catch (error) {
        handleError(res, error);
    }
});
router.get('/activities', async (_req, res) => {
    try {
        const activities = await Activity_1.ActivityModel.find().sort({ date: -1 }).lean();
        res.json(activities);
    }
    catch (error) {
        handleError(res, error);
    }
});
router.post('/activities', async (req, res) => {
    try {
        const activity = await Activity_1.ActivityModel.create({ ...req.body, date: req.body.date ? new Date(req.body.date) : new Date() });
        res.status(201).json(activity);
    }
    catch (error) {
        handleError(res, error);
    }
});
router.get('/leaderboard', async (_req, res) => {
    try {
        const leaderboard = await LeaderboardEntry_1.LeaderboardEntryModel.find().sort({ rank: 1 }).lean();
        res.json(leaderboard);
    }
    catch (error) {
        handleError(res, error);
    }
});
router.get('/workouts', async (_req, res) => {
    try {
        const workouts = await Workout_1.WorkoutModel.find().sort({ createdAt: -1 }).lean();
        res.json(workouts);
    }
    catch (error) {
        handleError(res, error);
    }
});
router.post('/workouts', async (req, res) => {
    try {
        const workout = await Workout_1.WorkoutModel.create(req.body);
        res.status(201).json(workout);
    }
    catch (error) {
        handleError(res, error);
    }
});
exports.default = router;
