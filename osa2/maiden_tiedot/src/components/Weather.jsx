import { useState, useEffect } from "react"
import axios from "axios"

const Weather = ({ capital }) => {
    const [weather, setWeather] = useState(null)
    const api_key = import.meta.env.VITE_API_KEY

    useEffect(() => {
    console.log('weather data')
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`)
      .then(response => {
        console.log('promise fulfilled')
        setWeather(response.data)
      })
  }, [])

  if (!weather) {
    return null
  }

  return (
    <div>
        <div>Temperature {weather.main.temp} Celsius</div>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
        <div>Wind {weather.wind.speed} m/s</div>
    </div>
  )
}


export default Weather