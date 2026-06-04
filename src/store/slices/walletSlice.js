import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/wallet'; // Ajuste le port si nécessaire

// 1. Thunk pour récupérer les données du portefeuille depuis le backend
export const fetchWalletData = createAsyncThunk(
  'wallet/fetchData',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token; // On récupère ton token JWT du state auth
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Erreur de récupération');
    }
  }
);

// 2. Thunk pour envoyer un dépôt au backend
export const depositFundsServer = createAsyncThunk(
  'wallet/deposit',
  async (amount, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.post(
        `${API_URL}/deposit`,
        { amount: Number(amount) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data; // Renvoie le wallet mis à jour
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Erreur lors du dépôt');
    }
  }
);

const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    balance: 0,
    history: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Wallet
      .addCase(fetchWalletData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWalletData.fulfilled, (state, action) => {
        state.loading = false;
        state.balance = action.payload.balance;
        state.history = action.payload.history;
      })
      .addCase(fetchWalletData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Deposit Funds
      .addCase(depositFundsServer.pending, (state) => {
        state.error = null;
      })
      .addCase(depositFundsServer.fulfilled, (state, action) => {
        state.balance = action.payload.balance;
        state.history = action.payload.history;
      })
      .addCase(depositFundsServer.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default walletSlice.reducer;