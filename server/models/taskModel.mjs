import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['To Do', 'In Progress', 'Done'], default: 'To Do' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
});

const Task = mongoose.model('Task', taskSchema);
export default Task;
