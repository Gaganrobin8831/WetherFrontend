import React from 'react'
import { AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='min-h-[50vh] bg-black text-white text-shadow-2xs text-shadow-sky-950 flex flex-col lg:flex-row items-center justify-evenly py-10'>

      {/* Logo Section */}
      <div className='flex justify-center w-[30%] items-center space-x-3 font-extrabold text-3xl'>
        <img src="./Assets/clear.png" alt="" className='size-[60px]'/>
        <h2>Weather Forecast</h2>
      </div>

      {/* Navigation Section */}
      <div className='bg-black h-auto w-[60%] lg:w-[20%] lg:h-[40%] flex flex-col items-center justify-evenly mt-10 lg:mt-0 space-y-4'>
        <a href="/" className="text-xl flex items-center gap-2 hover:text-sky-300 transition-colors cursor-pointer">
          <AiFillHome className="text-sky-400 text-2xl" />
          Home
        </a>

        <Link to="/Search" className="text-xl flex items-center gap-2 hover:text-sky-300 transition-colors cursor-pointer">
          <AiOutlineSearch className="text-sky-400 text-2xl"/>
          Search
        </Link>

        <p className="text-center text-sm text-gray-300">
          Explore weather with us.
        </p>
      </div>

      {/* Social Section */}
      <div className='bg-black h-auto w-[60%] lg:w-[20%] lg:h-[40%] flex flex-col items-center justify-evenly mt-10 lg:mt-0 space-y-4'>
        
        <a href="https://www.instagram.com/singh_gagan9322" target="_blank" rel="noopener noreferrer" className="text-xl flex items-center gap-2 hover:text-pink-400 transition-colors cursor-pointer">
          <FaInstagram className="text-pink-500 text-2xl"/>
          Instagram
        </a>

        <a href="https://wa.me/916280738831" target="_blank" rel="noopener noreferrer" className="text-xl flex items-center gap-2 hover:text-green-300 transition-colors cursor-pointer">
          <FaWhatsapp className="text-green-400 text-2xl"/>
          WhatsApp
        </a>

        <p className="text-center text-sm text-gray-300">
          Connect with us anytime.
        </p>
      </div>

    </div>
  )
}

export default Footer
