import React from 'react'
import { AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

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
        <h2 className="text-xl flex items-center gap-2">
          <AiFillHome className="text-sky-400 text-2xl" />
          Home
        </h2>

        <h2 className="text-xl flex items-center gap-2">
          <AiOutlineSearch className="text-sky-400 text-2xl"/>
          Search
        </h2>

        <p className="text-center text-sm text-gray-300">
          Explore weather with us.
        </p>
      </div>

      {/* Social Section */}
      <div className='bg-black h-auto w-[60%] lg:w-[20%] lg:h-[40%] flex flex-col items-center justify-evenly mt-10 lg:mt-0 space-y-4'>
        
        <h2 className="text-xl flex items-center gap-2">
          <FaInstagram className="text-pink-500 text-2xl"/>
          Instagram
        </h2>

        <h2 className="text-xl flex items-center gap-2">
          <FaWhatsapp className="text-green-400 text-2xl"/>
          WhatsApp
        </h2>

        <p className="text-center text-sm text-gray-300">
          Connect with us anytime.
        </p>
      </div>

    </div>
  )
}

export default Footer
