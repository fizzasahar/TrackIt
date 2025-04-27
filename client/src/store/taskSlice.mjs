// src/store/taskSlice.js
import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    todo: [],
    inProgress: [],
    done: [],
  },
  reducers: {
    fetchTasksSuccess: (state, action) => {
      return action.payload;
    },
    addTaskSuccess: (state, action) => {
      state.todo.push(action.payload);
    },
    updateTaskStatusSuccess: (state, action) => {
      return action.payload;
    },
  },
});

export const { fetchTasksSuccess, addTaskSuccess, updateTaskStatusSuccess } = taskSlice.actions;
export default taskSlice.reducer;
