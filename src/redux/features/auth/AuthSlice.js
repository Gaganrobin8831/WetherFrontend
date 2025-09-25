// src/features/auth/authSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// REGISTER USER
export const Registertion = createAsyncThunk(
  'auth/Registertion',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:2112/api/users/register', formData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "Registration failed"
      );
    }
  }
);

// LOGIN USER
export const SignIn = createAsyncThunk(
  'auth/SignIn',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:2112/api/users/login', formData);
      // console.log(response.data);
      
      return response.data;
      
      
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "Login failed"
      );
    }
  }
);
const token = localStorage.getItem("authToken");
const user = JSON.parse(localStorage.getItem("authUser"));

const initialState = {
  isAuthenticated: !!token,
  token: token || null,
  user: user || null,
  data: null,
  status: null,
  error: null
};

// Auth Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
    },

  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(Registertion.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(Registertion.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(Registertion.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // SignIn
      .addCase(SignIn.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(SignIn.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.status = "succeeded";
        state.data = action.payload;
        state.token = action.payload?.token; // set token in Redux
        state.user = {
          id: action.payload?.id,
          email: action.payload?.email
        };
        state.isAuthenticated = true;

        // Save to localStorage
        localStorage.setItem("authToken", action.payload?.token);
        localStorage.setItem("authUser", JSON.stringify({
          id: action.payload?.id,
          email: action.payload?.email
        }));
      })

      .addCase(SignIn.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.isAuthenticated = false;
      });
  }
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
