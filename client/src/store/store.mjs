import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice.mjs'
import taskReducer from './taskSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
  },
})
