
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";

export const fetchInvestorDashboard=createAsyncThunk(
    "/investorDashboard/fetch",
    async(_,{rejectWithValue})=>{
        try{
            const response=await API.get("/investor/dashboard")
            return response.data
        }
        catch(err){
            return rejectWithValue(
                err.response?.data?.message || err.message
            )
        }
    }
);
const investorDashboardSlice=createSlice({
    name:"investorDashboard",
    initialState: {
    stats: null,
    loading: false,
    error: null,
  },
  reducers:{},
  extraReducers:(builder)=>{
    builder
    .addCase(fetchInvestorDashboard.pending,
        (state)=>{state.loading=true})

     .addCase(fetchInvestorDashboard.fulfilled,(state,action)=>
     {
        state.loading=false ;
        state.stats=action.payload ;
     }
    )   
    .addCase(fetchInvestorDashboard.rejected,(state,action)=>
    {
        state.loading=false ;
        state.error=action.payload ;
    }
)
  }
});
export default investorDashboardSlice.reducer;
