import React from "react";

const WeatherStatsCards = ({ fullWetherData }) => {
    return (
        <div className="flex flex-col md:flex-row space-y-8 lg:space-y-0 items-center justify-evenly w-[80%] mt-10 font-bold text-2xl">
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
    );
};

export default WeatherStatsCards;
