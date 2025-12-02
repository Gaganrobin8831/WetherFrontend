import { useSelector } from 'react-redux'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import clearWeather from '/weater/clear.gif'
import cloudWeather from '/weater/cloud.gif'
import rainyWeather from '/weater/rainy cloud.gif'
import Search from './pages/userPanel/search/Search';

import Hero from './pages/userPanel/Hero/HEro';
import Text from './pages/userPanel/test/Text';
import Footer from './components/Footer/Footer';


function App() {
  // const weather = useSelector((state)=> state.weather.weather);
     const {weather,  weatherData} = useSelector(
          (state) => state.weather
      );
  // console.log(clearWeather);
  // console.log({weather});
  let weatherbg = weather.toUpperCase() === "CLEAR" ? clearWeather : weather === "CLOUDS" ? cloudWeather : rainyWeather;

 

  return (
    <div
    className="min-h-screen bg-cover bg-center"

    style={{
      backgroundImage: `url(${weatherbg})`,
      backgroundRepeat: 'repeat'
    }}
  >
  
  <Nav/>
  <Routes>  
    
    <Route path='/' element={<Hero/>} />
  
    <Route path='/Search' element={<Search/>} />
    <Route path='/text' element={<Text/>} />
  </Routes>
  <Footer/>
  
  </div>
  )
}

export default App
