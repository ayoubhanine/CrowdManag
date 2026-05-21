import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";
import React from "react";

export const fetchDashboardData=createAsyncThunk(
    "dashboard/fetchDashboardData",
    async(_,{rejectWithValue})=>{
        try{
            const response=await API.get("/dashboard");
            return response.data //C'est le JSON avec les kpis et les projects
        }
        catch(error){
            return rejectWithValue(
                error.response?.data?.message || 'Impossible de charger le tableau de bord'
            )
        }
    }
)
const dashboardSlice=createSlice({
    name:"dashboard",
    initialState:{
        kpis: {
      totalProjects: 0,
      openProjects: 0,
      closedProjects: 0,
      totalRaised: 0
    },
    projects: [],
    loading: false,
    error: null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(fetchDashboardData.pending,(state)=>{
                state.loading=true;
                state.error=null;
            })
            .addCase(fetchDashboardData.fulfilled,(state,action)=>{
                state.loading=false;
                state.kpis=action.payload.kpis;  // Injecte les KPIs dans l'état global
                state.projects=action.payload.projects  // Injecte les projets dans l'état global
            })
            .addCase(fetchDashboardData.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload
            })
    }
})
export default dashboardSlice.reducer

