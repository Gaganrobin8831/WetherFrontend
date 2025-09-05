import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/AuthSlice';
import weatherReducer from './features/weather/weatherSlice'
export const store = configureStore({
  reducer: {
     auth: authReducer,
     weather: weatherReducer, 
  },
});
