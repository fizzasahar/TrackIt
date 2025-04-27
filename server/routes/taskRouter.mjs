// routes/taskRoutes.js
import express from "express";
import { createTask, updateTask, deleteTask } from "../controller/taskController.mjs";
import Task from "../models/taskModel.mjs";

const router = express.Router();

// Get tasks
router.get("/tasks", async (req, res) => {
    const { date, userId } = req.query;
    try {
        const tasks = await Task.find({ date, userId });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch tasks" });
    }
});

// Create task
router.post("/tasks", createTask);

// Update task
router.put("/tasks/:id", updateTask);

// Delete task
router.delete("/tasks/:id", deleteTask);

export default router;
