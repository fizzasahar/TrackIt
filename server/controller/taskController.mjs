// controllers/taskController.js

import Task from "../models/taskModel.mjs";

// Create a new task
export const createTask = async (req, res) => {
    const { title, description, date, userId } = req.body;
    try {
        const newTask = new Task({ title, description, date, userId });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: "Failed to create task" });
    }
};

// Update a task
export const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { title, description },
            { new: true }
        );
        if (!updatedTask) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: "Failed to update task" });
    }
};

// Delete a task
export const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete task" });
    }
};
