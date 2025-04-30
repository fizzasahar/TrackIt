import express from 'express';
import Task from '../models/Task.mjs';

const router = express.Router();

// Create a task
router.post("/", async (req, res) => {
	try {
		const task = new Task(req.body);
		await task.save();
		res.status(201).send(task);
	} catch (error) {
		res.status(400).send(error);
	}
});

// Read all tasks
router.get("/", async (req, res) => {
	try {
		const tasks = await Task.find();
		res.send(tasks);
	} catch (error) {
		res.status(500).send(error);
	}
});

// Update a task
router.patch("/:id", async (req, res) => {
	try {
		const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!task) {
			return res.status(404).send();
		}
		res.send(task);
	} catch (error) {
		res.status(400).send(error);
	}
});

// Delete a task
router.delete("/:id", async (req, res) => {
	try {
		const task = await Task.findByIdAndDelete(req.params.id);
		if (!task) {
			return res.status(404).send();
		}
		res.send(task);
	} catch (error) {
		res.status(500).send(error);
	}
});

export default router;