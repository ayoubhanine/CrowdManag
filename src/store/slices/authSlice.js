// src/store/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../services/api';

// Action asynchrone pour la connexion
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await API.post('/login', credentials);
      // ADAPTATION ICI : On sépare le token du reste des données de l'utilisateur
      const { token, ...userData } = response.data;
      // On sauvegarde le token ET les infos de l'utilisateur renvoyées par ton loginUser controller
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData)); 
      
      return {token,user:userData}; // Contient { token, user }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Erreur de connexion');
    }
  }
);

// L'action register reste identique
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await API.post('/register', userData); 
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Erreur lors de l'inscription");
    }
  }
);

// Fonction d'aide pour éviter le crash au démarrage
const getInitialUser = () => {
  const localUser = localStorage.getItem('user');
  if (!localUser || localUser === 'undefined') {
    return null;
  }
  try {
    return JSON.parse(localUser);
  } catch (error) {
    return null;
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    // On utilise notre fonction sécurisée à la place du JSON.parse direct
    user: getInitialUser(),
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {  //En cours
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {   //Si succès --> État fulfilled (Résolue)
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user; // Les infos du user injectées dans le state global
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;