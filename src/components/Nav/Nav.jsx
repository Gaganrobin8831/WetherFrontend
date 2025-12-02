import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  const [open, setOpen] = useState(false);
  const [scrollBg, setScrollBg] = useState(0);

  // Detect scroll to change background opacity
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const opacity = Math.min(scrolled / 200, 0.85); // max opacity 0.85
      setScrollBg(opacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 transition-all duration-300 backdrop-blur-lg"
      style={{
        backgroundColor: `rgba(0, 0, 0, ${scrollBg})`,
      }}
    >
      <div className="flex justify-evenly items-center py-4 text-white">

        {/* Logo */}
        <div className="flex items-center space-x-2 font-extrabold text-2xl">
          <img src="./Assets/clear.png" alt="" className="w-[50px]" />
          <h2>Weather Forecast</h2>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-lg font-semibold">
          <Link to={"/"}>
            <li className="hover:text-sky-300">Home</li>
          </Link>

          <Link to={"/Search"}>
            <li className="hover:text-sky-300">Search</li>
          </Link>
        </ul>

        {/* Hamburger Icon */}
        <button
          className="md:hidden flex flex-col space-y-1"
          onClick={() => setOpen(!open)}
        >
          <span
            className={`w-8 h-1 bg-white rounded transition-all ${
              open ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`w-8 h-1 bg-white rounded transition-all ${
              open ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`w-8 h-1 bg-white rounded transition-all ${
              open ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          open ? "max-h-40" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col items-center py-4 space-y-5 text-lg font-semibold bg-black/60 backdrop-blur-md">
          <Link to={"/"} onClick={() => setOpen(false)}>
            <li className="hover:text-sky-300">Home</li>
          </Link>
          <Link to={"/Search"} onClick={() => setOpen(false)}>
            <li className="hover:text-sky-300">Search</li>
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
