import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchWeatherData,
    setSearchText,
} from "../../../redux/features/weather/weatherSlice";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import search_icon from '/Assets/search.png';
import clear_icon from '/Assets/clear.png';
import cloud_icon from '/Assets/cloud.png';
import drizzle_icon from '/Assets/drizzle.png';
import rain_icon from '/Assets/rain.png';
import snow_icon from '/Assets/snow.png';
import wind_icon from '/Assets/wind.png';
import humidity_icon from '/Assets/humidity.png';

const weatherIcons = {
    Clear: clear_icon,
    Clouds: cloud_icon,
    Drizzle: drizzle_icon,
    Rain: rain_icon,
    Snow: snow_icon,
    Wind: wind_icon,
    Haze: humidity_icon,
    Mist: humidity_icon,
    Fog: humidity_icon,
};

const Search = () => {
    const dispatch = useDispatch();
    const { searchText, weatherData, status, error } = useSelector(
        (state) => state.weather
    );
    // console.log(weatherData);
    if (error) {
        toast.success(error);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchText.trim()) {
            dispatch(fetchWeatherData(searchText));
        }
    };

    return (
        <div className='flex flex-col items-center justify-center mt-20 '>
            <ToastContainer/>
            <form onSubmit={handleSubmit}>
                <div className='flex border py-3 bg-white px-7 rounded-4xl'>
                    <input
                        type="text"
                        className='px-10 border-none outline-none'
                        placeholder='Enter the city'
                        value={searchText}
                        onChange={(e) => dispatch(setSearchText(e.target.value))}
                    />
                    <img
                        src={search_icon}
                        alt="Search Icon"
                        className='size-6 cursor-pointer'
                        onClick={(e) => {
                            e.preventDefault();
                            if (searchText.trim()) {
                                dispatch(fetchWeatherData(searchText));
                            }
                        }}
                    />

                </div>
            </form>

            {status === "loading" && <p className="mt-4">Loading...</p>}
            {/* {error && <p className="mt-4 text-red-500">Error: {error}</p>} */}

            {weatherData && (
                <div className="flex flex-col items-center mt-4 p-10 rounded-3xl shadow-2xl shadow-black text-white text-bold text-shadow-md" style={{
                    background: 'linear-gradient(90deg, rgba(7, 181, 250, 0.5) 0%, rgba(34, 230, 213, 0.2) 60%, rgba(64, 227, 208, 0.2) 100%)'
                }}>

                    <img
                        src={weatherIcons[weatherData.weather[0].main] || clear_icon}
                        alt={weatherData.weather[0].main}
                        className="w-20 h-20"
                    />
                    <h1>{searchText.toUpperCase()}</h1>
                    <h2>{Math.trunc(weatherData.main.temp)}</h2>
                    <p className="text-lg font-medium mt-2">
                        {weatherData.weather[0].main}
                    </p>
                </div>
            )}
        </div>
    );
};

export default Search;
