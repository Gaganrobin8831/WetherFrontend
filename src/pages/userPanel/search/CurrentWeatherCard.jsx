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

const CurrentWeatherCard = ({ fullWetherData, searchText, localTimeString }) => {
    return (
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
    );
};

export default CurrentWeatherCard;
