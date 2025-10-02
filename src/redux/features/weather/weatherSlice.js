// redux/features/weather/weatherSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchWeatherData = createAsyncThunk(
    "weather/fetchWeatherData",
    async (city, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
            );
            // console.log(response);
            
            return [response.data.list[0],response.data];
        } catch (err) {
            return rejectWithValue(
                
                err.response?.data?.message ||
                err.message ||
                "Fetch failed"
            );
        }
    }
);


const weatherSlice = createSlice({
    name: "weather",
    initialState: {
        weatherData: null,
        searchText: "",
        status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
        weather: 'clear',
        fullWetherData: null,

    },
    reducers: {
        setSearchText: (state, action) => {
            state.searchText = action.payload;
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeatherData.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchWeatherData.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.weatherData = action.payload[0];
                state.weather = action.payload[0].weather[0].main.toUpperCase(); // ✅ Set weather here
                state.fullWetherData = action.payload[1];
            })

            .addCase(fetchWeatherData.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });

    },
});

export const { setSearchText } = weatherSlice.actions;
export default weatherSlice.reducer;
