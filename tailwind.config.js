// tailwind.config.js
import clearWeather from './public/weather/clear.gif'

export default {
  theme: {
    extend: {
      backgroundImage: {
        'clear-weather': `url(${clearWeather})`,
        'sky-linear': 'linear-gradient(90deg, rgba(7, 181, 250, 0.35) 30%, rgba(34, 230, 213, 0.42) 50%, rgba(64, 227, 208, 0.42) 100%)',
      },
      colors: {
        'to-sky-700': '#334155',
      },
    },
  },
  plugins: [],
}
