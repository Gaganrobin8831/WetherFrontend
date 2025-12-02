// import React, { useEffect, useRef } from 'react'
// import { gsap } from 'gsap'

// const Hero = () => {
//   const orbitRef = useRef(null)

//   useEffect(() => {
//     // Infinite rotation animation
//     gsap.to(orbitRef.current, {
//             rotation: 360,
//       repeat: -1,
//       ease: "linear",
//       duration: 15, // speed of rotation (lower = faster)
//       transformOrigin: "50% 50%"
//     })
//   }, [])

//   return (
//     <div className='flex flex-col md:flex-row h-auto md:h-[90vh] justify-center items-center gap-15 '>

//       {/* Left Section */}
//       <div className="w-[30%] h-[80%] flex flex-col justify-center gap-10 text-white">
//         <h1 className='text-6xl font-extrabold text-shadow-md text-shadow-sky-800 italic'>
//           WEATHER FORECAST
//         </h1>
//         <p className='text-[20px] text-shadow-2xs text-shadow-black text-justify'>
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti numquam placeat magnam nihil, illum maiores minima soluta culpa mollitia sit autem accusamus tempora deleniti provident repellat aut possimus. Ratione, recusandae.
//         </p>
//       </div>

//       {/* Right Section */}
//       <div className="w-[40%] h-[80%] flex flex-col justify-center items-center text-5xl font-bold text-blue-600 relative">

//         {/* Earth */}
//         <img
//           src="/Assets/earth.png"
//           alt="earth"
//           className='object-contain size-[400px] relative z-10'
//         />

//         {/* Orbit Container */}
//         <div 
//           ref={orbitRef}
//           className="absolute w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
//         >
//           {/* Orbiting Icons */}
//           <img src="/Assets/sun.png" alt="sun" 
//             className="absolute size-[100px]" 
//             style={{ top: '20%', left: '22%', transform: 'translate(-50%, -50%)' }} 
//           />
//           <img src="/Assets/cloud.png" alt="cloud" 
//             className="absolute size-[120px]" 
//             style={{ top: '30%', left: '90%', transform: 'translate(-50%, -50%)' }} 
//           />
//           <img src="/Assets/snow.png" alt="snow" 
//             className="absolute size-[120px]" 
//             style={{ top: '80%', left: '20%', transform: 'translate(-50%, -50%)' }} 
//           />
//           <img src="/Assets/drizzle.png" alt="drizzle" 
//             className="absolute size-[120px]" 
//             style={{ top: '80%', left: '80%', transform: 'translate(-50%, -50%)' }} 
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Hero
import React from "react";

import Earth3D from "../../../components/Earth3D";
import { Link } from "react-router-dom";

const Hero = () => {

  return (
    <div className="flex flex-col lg:flex-row min-h-screen lg:min-h-[90vh] py-10 justify-evenly items-center gap-15">

      {/* Left Section */}
      <div className="md:w-[40%] my-15  lg:h-[80%] flex flex-col justify-center gap-10  text-white lg:ml-24 ">
        <h1 className="text-2xl md:text-6xl font-extrabold text-shadow-md text-shadow-sky-800 italic text-center lg:text-start">
          WEATHER FORECAST
        </h1>
        <p className="text-[20px] text-shadow-2xs text-shadow-black lg:text-justify text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
       <Link to={'/Search'}> <button
          class="w-[50%] ml-18 lg:ml-0 lg:mx-0 md:w-[60%] lg:w-[30%] md:px-6 py-2 md:py-3 font-semibold text-black 
bg-gradient-to-b from-white to-sky-300 
border-2 border-black rounded-xl
shadow-[6px_6px_0px_#000]
hover:shadow-[3px_3px_0px_#000]
active:shadow-none active:translate-x-[3px] active:translate-y-[3px]
transition-all duration-150">
          Explore Weather
        </button></Link>

      </div>

      {/* Right Section */}
      <div className=" w-full lg:w-[40%] h-auto lg:h-[80%] flex justify-center items-center relative">

        {/* REAL 3D EARTH */}
        <Earth3D />


      </div>
    </div>
  );
};

export default Hero;

