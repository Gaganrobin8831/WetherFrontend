import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchWeatherData,
    setSearchText,
} from "../../../redux/features/weather/weatherSlice";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import search_icon from "/Assets/search.png";

import clear_icon from "/Assets/clear.png";
import cloud_icon from "/Assets/cloud.png";
import drizzle_icon from "/Assets/drizzle.png";
import rain_icon from "/Assets/rain.png";
import snow_icon from "/Assets/snow.png";
import wind_icon from "/Assets/wind.png";
import humidity_icon from "/Assets/humidity.png";

import cityTimezones from "city-timezones";

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
    const { searchText, status, error, fullWetherData } = useSelector(
        (state) => state.weather
    );

    // Show redux errors
    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    // Submit handler with internet check
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!searchText.trim()) {
            toast.error("Please enter a city name.");
            return;
        }

        if (!navigator.onLine) {
            toast.error("No internet connection.");
            return;
        }

        dispatch(fetchWeatherData(searchText));
    };

    // Detect internet status changes
    useEffect(() => {
        const handleOnline = () => toast.success("Back online!");
        const handleOffline = () => toast.error("You are offline.");

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    // TIMEZONE CALCULATION
    let localTimeString = "";
    let isValidCitySearch = true;

    const getTimezoneFromCity = (cityName, countryCodeIso2) => {
        const cities = cityTimezones.lookupViaCity(cityName?.trim());
        if (!cities.length) return null;

        const cityMatch = cities.find(
            (c) => c.iso2?.toLowerCase() === countryCodeIso2?.toLowerCase()
        );

        return cityMatch ? cityMatch.timezone : cities[0].timezone;
    };

    const getLocalTimeFromOffset = (offsetInSeconds) => {
        const utc = new Date(Date.now() + new Date().getTimezoneOffset() * 60000);
        return new Date(utc.getTime() + offsetInSeconds * 1000).toLocaleString();
    };

    if (fullWetherData?.city) {
        const city = fullWetherData.city;

        const timezoneName = getTimezoneFromCity(city?.name, city?.country);

        if (!timezoneName) {
            toast.error("Invalid city name.");
            isValidCitySearch = false;
        } else {
            try {
                localTimeString = new Date().toLocaleString("en-US", {
                    timeZone: timezoneName,
                });
            } catch () {
                localTimeString = getLocalTimeFromOffset(city.timezone);
            }
        }
    }

    return (
        <div className={`${fullWetherData ? "h-auto" : "h-[60vh]"} flex flex-col items-center justify-center`}>
            <ToastContainer />

            {/* Search Bar */}
            <form onSubmit={handleSubmit} className="mt-10">
                <h1 className="text-center my-11 text-white text-shadow-md text-shadow-sky-700 text-4xl font-extrabold">
                    Enter the City Name
                </h1>

                <div className="flex border py-3 bg-white px-7 rounded-4xl">
                    <input
                        type="text"
                        className="px-10 border-none outline-none"
                        placeholder="Enter the city"
                        value={searchText}
                        onChange={(e) => dispatch(setSearchText(e.target.value))}
                    />

                    <img
                        src={search_icon}
                        alt="Search Icon"
                        className="size-6 cursor-pointer"
                        onClick={handleSubmit}
                    />
                </div>
            </form>

            {status === "loading" && <p className="mt-4 text-white">Loading...</p>}

            {/* WEATHER CARD */}
            {fullWetherData && isValidCitySearch && (
                <>
                    <div className="flex flex-col-reverse md:flex-row items-center justify-evenly mt-4 p-10 rounded-3xl shadow text-white bg-gradient-to-r from-sky-400/70 to-sky-700/80">
                        <h1 className="text-[60px] font-bold">
                            {Math.trunc(fullWetherData?.list[0]?.main.temp_max)}°
                        </h1>

                        <div className="w-full text-center md:w-[50%]">
                            <h2>{searchText.toUpperCase()}</h2>
                            <p>{localTimeString}</p>
                        </div>

                        <div className="flex flex-col items-center">
                            <img
                                src={
                                    weatherIcons[fullWetherData?.list[0]?.weather[0].main] ||
                                    clear_icon
                                }
                                className="w-20 h-20"
                            />
                            <p className="text-lg mt-2">
                                {fullWetherData?.list[0]?.weather[0].main}
                            </p>
                        </div>
                    </div>

                    {/* THREE SMALL CARDS */}
                    <div className="flex flex-col md:flex-row items-center justify-evenly w-[80%] mt-10 font-bold text-2xl">
                        <div className="p-10 text-white rounded-3xl shadow-2xl bg-gradient-to-r from-sky-400/70 to-sky-700/80">
                            <h3>Humidity</h3>
                            <p>{fullWetherData?.list[0]?.main.humidity}%</p>
                        </div>

                        <div className="p-10 text-white rounded-3xl shadow-2xl bg-gradient-to-r from-sky-400/70 to-sky-700/80">
                            <h3>Pressure</h3>
                            <p>{fullWetherData?.list[0]?.main.pressure} mb</p>
                        </div>

                        <div className="p-10 text-white rounded-3xl shadow-2xl bg-gradient-to-r from-sky-400/70 to-sky-700/80">
                            <h3>Wind</h3>
                            <p>{fullWetherData?.list[0]?.wind.speed} mph</p>
                        </div>
                    </div>

                    {/* FULL FORECAST */}
                    <h1 className="text-center my-16 text-white text-4xl font-extrabold">
                        Full Month Weather
                    </h1>

                    <div className="w-full flex flex-wrap justify-center gap-10">
                        {fullWetherData.list.map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center p-10 text-white rounded-3xl shadow-2xl bg-gradient-to-r from-sky-400/70 to-sky-700/80"
                            >
                                <h1 className="text-[60px] font-bold">
                                    {Math.trunc(item.main.temp_max)}°
                                </h1>

                                <img
                                    src={weatherIcons[item.weather[0].main]}
                                    className="w-20 h-20"
                                />

                                <p className="text-lg mt-2">
                                    {item.weather[0].main}
                                </p>

                                <p className="mt-2">
                                    {new Date(item.dt_txt).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </p>

                                <p>Humidity: {item.main.humidity}%</p>
                                <p>Pressure: {item.main.pressure} mb</p>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Search;
