import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchText } from "../../../redux/features/weather/weatherSlice";
import search_icon from "/Assets/search.png";

const SearchBar = ({ handleSubmit }) => {
    const dispatch = useDispatch();
    const { searchText } = useSelector((state) => state.weather);

    return (
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
    );
};

export default SearchBar;
