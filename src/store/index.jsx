// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import projectReducer from "./slices/projectSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard:dashboardReducer,
    partners:partnerReducer,
    // On ajoutera projectReducer ici plus tard !
    projects : projectReducer,
  },
});