// Chaque slice gère une partie de l'état global
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import projectReducer from "./slices/projectSlice";
import dashboardReducer from "./slices/dashboardSlice";
import partnerReducer from "./slices/partnerSlice";
import portfolioReducer from "./slices/portofolioSlices";
import walletReducer from "./slices/walletSlice";
import inverstorDashboardSlice from "./slices/investorDashboardSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    partners: partnerReducer,
    projects: projectReducer,
    portfolio: portfolioReducer,
    investorDashboard:inverstorDashboardSlice,
    wallet:walletReducer,
    
  },
});
