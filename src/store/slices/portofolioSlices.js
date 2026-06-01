import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPartners = createAsyncThunk(
  "portfolio/fetchPartners",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const response = await axios.get(
        "http://localhost:5000/api/investments/portfolio",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Erreur serveur"
      );
    }
  }
);

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState: {
    projects: [],
    totalInvested: 0,
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchPartners.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchPartners.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload.projects;
        state.totalInvested = action.payload.totalInvested;
      })

      .addCase(fetchPartners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default portfolioSlice.reducer;