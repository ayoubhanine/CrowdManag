// src/store/slices/partnerSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";

// export const fetchPartners = createAsyncThunk(
//   "partners/fetchPartners",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await API.get("/partners");
//       return response.data; // Tableau contenant [{ entityName, associatedProject, volume, share }]
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Erreur réseau lors de la récupération des partenaires"
//       );
//     }
//   }
// );

export const fetchPartners = createAsyncThunk(
  "partners/fetchPartners",
  async (_, { rejectWithValue }) => {
    try {
      // Tu appelles le préfixe + la sous-route '/partner' déclarée dans ton routeur
      const response = await API.get('/investments/partner'); 
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Erreur réseau");
    }
  }
);

const partnerSlice = createSlice({
  name: "partners",
  initialState: { list: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPartners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPartners.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchPartners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default partnerSlice.reducer;