// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import dashboardReducer from "./slices/dashboardSlice"
import partnerReducer from "./slices/partnerSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard:dashboardReducer,
    partners:partnerReducer,
    // On ajoutera projectReducer ici plus tard !
  },
});