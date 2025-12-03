import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchWeatherData,
    clearWeatherData,
} from "../../../redux/features/weather/weatherSlice";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SearchBar from "./SearchBar";
import CurrentWeatherCard from "./CurrentWeatherCard";
import WeatherStatsCards from "./WeatherStatsCards";
import ForecastCards from "./ForecastCards";
import { calculateLocalTime } from "./timezoneUtils";

const Search = () => {
    const dispatch = useDispatch();
    const { searchText, status, error, fullWetherData } = useSelector(
        (state) => state.weather
    );
    const debounceTimerRef = useRef(null);
    const [hasSearched, setHasSearched] = useState(false);
    const toastErrorRef = useRef(null);

    // Show redux errors only after a search attempt
    useEffect(() => {
        if (error && hasSearched) {
            if (toastErrorRef.current) {
                toast.dismiss(toastErrorRef.current);
            }
            toastErrorRef.current = toast.error(error);
        }
    }, [error, hasSearched]);

    // Debounce effect - auto-search after user stops typing
    useEffect(() => {
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        // Only search if searchText has content
        if (searchText.trim()) {
            // Clear old data immediately when user starts typing
            dispatch(clearWeatherData());

            debounceTimerRef.current = setTimeout(() => {
                if (navigator.onLine) {
                    setHasSearched(true);
                    dispatch(fetchWeatherData(searchText));
                } else {
                    toast.error("No internet connection.");
                }
            }, 900); // Wait 500ms after user stops typing
        } else {
            // Clear data if search text is empty
            dispatch(clearWeatherData());
        }

        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, [searchText, dispatch]);

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

        setHasSearched(true);
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
    const { localTimeString, isValidCitySearch } = calculateLocalTime(fullWetherData);

    return (
        <div className={`${fullWetherData ? "h-auto" : "h-[60vh]"} flex flex-col items-center justify-center`}>
            <ToastContainer />

            {/* Search Bar */}
            <SearchBar handleSubmit={handleSubmit} />

            {status === "loading" && <p className="mt-4 text-white">Loading...</p>}

            {/* WEATHER DISPLAY */}
            {fullWetherData && isValidCitySearch && status !== "loading" && (
                <>
                    <CurrentWeatherCard
                        fullWetherData={fullWetherData}
                        searchText={searchText}
                        localTimeString={localTimeString}
                    />

                    <WeatherStatsCards fullWetherData={fullWetherData} />

                    <ForecastCards fullWetherData={fullWetherData} />
                </>
            )}
        </div>
    );
};

export default Search;
