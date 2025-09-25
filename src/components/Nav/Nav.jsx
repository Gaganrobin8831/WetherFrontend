import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const Nav = () => {
  const authData = useSelector((state) => state.auth.isAuthenticated)
  console.log(authData);
  
  return (
    <div className='h-auto py-5 flex justify-evenly items-center text-white text-shadow-2xs text-shadow-sky-950'>
      {/* logo box */}
      <div className=' flex justify-center items-center space-x-1 font-extrabold text-3xl'>
        <img src="" alt="" srcset="./Assets/clear.png"  className='size-[60px]'/>
        <h2>Wether Forcast</h2>
      </div>
      {/* logo box End*/}
      {/* menu box */}
      <div >
        <ul className='flex justify-evenly items-center space-x-5 text-lg font-semibold'>
          <Link to={'/'}><li className='hover:text-sky-300'>Home</li></Link>
         <Link to={'/Search'}>
          <li className='hover:text-sky-300'>Search</li>
         </Link>
       {authData ? <li>Profile</li> : <li>
       <Link to={'/Login'}> <button className=' text-shadow-2xs  text-shadow-black mx-3 ring-1 ring-sky-800 px-7 py-1 rounded-3xl hover:bg-white hover:text-sky-900' >Login</button></Link>
       <Link to={'/Register'}> <button className='text-shadow-2xs   text-shadow-black  mx-3 ring-1 ring-sky-800 px-7 py-1 rounded-3xl hover:bg-white hover:text-sky-900' >Register</button></Link> 
        </li>}
        </ul>
      </div>
      {/* menu box End*/}
    </div>
  )
}

export default Nav