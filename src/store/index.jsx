// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import dashboardReducer from "./slices/dashboardSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard:dashboardReducer,
    // On ajoutera projectReducer ici plus tard !
  },
});