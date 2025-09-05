// tailwind.config.js

import clearWeather from './public/weater/clear.gif'
export default {
  theme: {
    extend: {
      backgroundImage: {
        'clear-weather': `url(${clearWeather})`,
      },
    },
  },
  plugins: [],
}
