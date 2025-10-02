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


import cityTimezones from 'city-timezones';

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
    const { searchText, weatherData, status, error, fullWetherData } = useSelector(
        (state) => state.weather
    );
    // console.log(fullWetherData);

    // Validate input and lookup timezone
    const getTimezoneFromCity = (cityName, countryCodeIso2) => {
        if (!cityName || cityName.length < 2) return null;

        const cities = cityTimezones.lookupViaCity(cityName.trim());

        if (!cities.length) return null;

        const cityMatch = cities.find(
            (c) => c.iso2?.toLowerCase() === countryCodeIso2?.toLowerCase()
        );

        return cityMatch ? cityMatch.timezone : cities[0].timezone;
    };

    // Fallback for offset in seconds
    const getLocalTimeFromOffset = (offsetInSeconds) => {
        const utc = new Date(Date.now() + new Date().getTimezoneOffset() * 60000);
        return new Date(utc.getTime() + offsetInSeconds * 1000).toLocaleString();
    };

    // Local time to show in the UI
    let localTimeString = "";

    // Flag to determine if data should be shown
    let isValidCitySearch = true;

    if (fullWetherData?.city) {
        const city = fullWetherData.city;
        const timezoneName = getTimezoneFromCity(city?.name, city?.country);

        if (!timezoneName) {
            toast.error("Please enter a valid city name.");
            isValidCitySearch = false;
        } else {
            try {
                localTimeString = new Date().toLocaleString("en-US", { timeZone: timezoneName });
            } catch (e) {
                console.warn("Invalid timezone, using offset fallback", e);
                localTimeString = getLocalTimeFromOffset(city.timezone);
            }
        }
    } else {
        isValidCitySearch = false;
    }

    // Show any fetch errors
    if (error) {
        toast.error(error);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchText.trim()) {
            dispatch(fetchWeatherData(searchText));
        }
    };

    return (
<div className={`${fullWetherData ? 'h-auto' : 'h-[60vh]'} flex flex-col items-center justify-center mt-20`}>
            <ToastContainer />
            <form onSubmit={handleSubmit} >
                <h1 className='text-center my-11 text-white text-shadow-md text-shadow-sky-700 text-4xl font-extrabold'>Enter the City Name</h1>
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

            {/* Only render if it's a valid city */}
            {weatherData && isValidCitySearch && (
                <>
                    <div className="flex flex-col-reverse md:flex-row items-center justify-evenly mt-4 p-10 rounded-3xl shadow shadow-gray-400 text-white font-bold text-shadow-md bg-gradient-to-r from-sky-400/70 to-sky-700/80">
                        <h1 className='text-[60px] font-bold'>{Math.trunc(weatherData.main.temp_max)}&deg;</h1>

                        <div className='w-full text-center md:w-[50%]'>
                            <h2>{searchText.toUpperCase()}</h2>
                            <p className="text-wrap text-shadow-lg">
                                {localTimeString}
                            </p>
                        </div>

                        <div className='flex flex-col items-center justify-center md:mr-10'>
                            <img
                                src={weatherIcons[weatherData.weather[0].main] || clear_icon}
                                alt={weatherData.weather[0].main}
                                className="w-20 h-20"
                            />
                            <p className="text-lg font-medium mt-2">
                                {weatherData.weather[0].main}
                            </p>
                        </div>
                    </div>

                    <div className='flex flex-col md:flex-row items-center justify-evenly w-[80%] font-bold text-2xl'>
                        <div className='flex flex-col items-center justify-evenly mt-10 p-10 text-white rounded-3xl shadow-2xl shadow-gray-400 bg-gradient-to-r from-sky-400/70 to-sky-700/80'>
                            <h3>Humidity</h3>
                            <p>{Math.trunc(weatherData.main.humidity)}%</p>
                        </div>

                        <div className='flex flex-col items-center justify-evenly mt-10 p-10 text-white rounded-3xl shadow-2xl shadow-gray-400 bg-gradient-to-r from-sky-400/70 to-sky-700/80'>
                            <h3>Pressure</h3>
                            <p>{weatherData.main.pressure} mb</p>
                        </div>

                        <div className='flex flex-col items-center justify-evenly mt-10 p-10 text-white rounded-3xl shadow-2xl shadow-gray-400 bg-gradient-to-r from-sky-400/70 to-sky-700/80'>
                            <h3>Wind</h3>
                            <p>{weatherData.wind.speed} mph</p>
                        </div>
                    </div>
                </>
            )}


           {fullWetherData && <h1 className=' text-center my-11 text-white text-shadow-md text-shadow-sky-700 text-4xl font-extrabold'>Full Month Weather</h1>}
            {fullWetherData?.list?.length > 0 && (
                <div className='h-auto w-full mt-10 flex flex-wrap items-center justify-center gap-10'>
                    {fullWetherData.list.map((item, index) => (
                        <div
                            key={index}
                            className=' h-auto flex flex-col items-center justify-evenly mt-10 p-10 text-white rounded-3xl shadow-2xl shadow-gray-400 bg-gradient-to-r from-sky-400/70 to-sky-700/80'
                        >
                            <h1 className='text-[60px] font-bold'>{Math.trunc(item.main.temp_max)}&deg;</h1>
                            <img
                                src={weatherIcons[item.weather[0].main] || clear_icon}
                                alt={item.weather[0].main}
                                className="w-20 h-20"
                            />
                            <p className="text-lg font-medium mt-2">
                                {item.weather[0].main}
                            </p>
                            {/* <p>Date: {new Date(item.dt_txt).toISOString().split('T')[0]}</p> */}
                            <p>Date: {new Date(item.dt_txt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric"
                            })}</p>

                            <p>Humidity : {item.main.humidity}%</p>

                            <p>Pressure : {weatherData.main.pressure} mb</p>
                        </div>
                    ))}
                </div>
            )}




        </div>
    );
};

export default Search;
