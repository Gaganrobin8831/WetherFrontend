// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { getAuthData } from './AuthFunc.js';

const { token, User } = getAuthData();
console.log({ token, User });

// Get token from localStorage on init
// const token = localStorage.getItem('token');
// const User = JSON.parse(localStorage.getItem('User'));

const initialState = {
  isAuthenticated: !!token,
  token: token || null,
  user: User|| null, // optional: to store user data
};

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
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
