import { useSelector } from 'react-redux'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import clearWeather from '/weater/clear.gif'
import cloudWeather from '/weater/cloud.gif'
import rainyWeather from '/weater/rainy cloud.gif'
import Search from './pages/userPanel/search/Search';
import Register from './pages/userPanel/Register/Register';
import Login from './pages/userPanel/Login/Login';


function App() {
  // const weather = useSelector((state)=> state.weather.weather);
     const {weather,  weatherData} = useSelector(
          (state) => state.weather
      );
  // console.log(clearWeather);
  // console.log({weather});
  let weatherbg = weather.toUpperCase() === "CLEAR" ? clearWeather : weather === "CLOUDS" ? cloudWeather : rainyWeather;

     // Get current location using geolocation API
navigator.geolocation.getCurrentPosition(function(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    console.log("Latitude: " + latitude);
    console.log("Longitude: " + longitude);

    // Use a reverse geocoding service to get the city name
    const apiKey = import.meta.env.VITE_API_KEY; // You can use Google Maps API, OpenCage, etc.
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const city = data.name; // City name
            console.log("City: " + city);
        })
        .catch(error => {
            console.error('Error getting city:', error);
        });
}, function(error) {
    console.error('Error getting location:', error);
});


  return (
 <div
  className={`${weatherData ? 'h-auto':'h-[100vh]'}  bg-cover bg-center`}
  style={{
    backgroundImage: "url(" + weatherbg + ")",
    backgroundRepeat:'repeat'
  }}
>
  <Nav/>
  <Routes>
    
    <Route path='/' element={<div>Home</div>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/Register' element={<Register/>} />
    <Route path='/Search' element={<Search/>} />
  </Routes>
  
  </div>
  )
}

export default App
