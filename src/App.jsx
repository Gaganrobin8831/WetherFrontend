import { useSelector } from 'react-redux'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import clearWeather from '/weater/clear.gif'
import cloudWeather from '/weater/cloud.gif'
import rainyWeather from '/weater/rainy cloud.gif'
import Search from './pages/userPanel/search/Search';


function App() {
  const weather = useSelector((state)=> state.weather.weather);
  // console.log(clearWeather);
  // console.log({weather});
  let weatherbg = weather.toUpperCase() === "CLEAR" ? clearWeather : weather === "CLOUDS" ? cloudWeather : rainyWeather;
  return (
 <div
  className="h-[100vh] bg-cover bg-center"
  style={{
    backgroundImage: "url(" + weatherbg + ")",
  }}
>
  <Nav/>
  <Routes>
    
    <Route path='/' element={<div>Home</div>} />
    <Route path='/login' element={<div>Login</div>} />
    <Route path='/Search' element={<Search/>} />
  </Routes>
  
  </div>
  )
}

export default App
