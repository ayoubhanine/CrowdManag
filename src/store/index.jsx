// Chaque slice gère une partie de l'état global
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import projectReducer from "./slices/projectSlice";
import dashboardReducer from "./slices/dashboardSlice";
import partnerReducer from "./slices/partnerSlice";
import portfolioReducer from "./slices/portofolioSlices";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    partners: partnerReducer,
    projects: projectReducer,
    portfolio: portfolioReducer,
  },
});
