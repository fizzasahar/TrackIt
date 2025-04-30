import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice.mjs'
import tasksReducer from './reducers/taskReducer.mjs'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
  },
})
