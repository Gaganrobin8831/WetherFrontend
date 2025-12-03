import React from "react";
import clear_icon from "/Assets/clear.png";
import cloud_icon from "/Assets/cloud.png";
import drizzle_icon from "/Assets/drizzle.png";
import rain_icon from "/Assets/rain.png";
import snow_icon from "/Assets/snow.png";
import humidity_icon from "/Assets/humidity.png";

const weatherIcons = {
    Clear: clear_icon,
    Clouds: cloud_icon,
    Drizzle: drizzle_icon,
    Rain: rain_icon,
    Snow: snow_icon,
    Wind: humidity_icon,
    Haze: humidity_icon,
    Mist: humidity_icon,
    Fog: humidity_icon,
};

const ForecastCards = ({ fullWetherData }) => {
    return (
        <>
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
    );
};

export default ForecastCards;
