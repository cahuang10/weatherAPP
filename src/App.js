import "./styles.css";
import SearchBar from "./SearchBar";
import CurrentWeather from "./CurrentWeather";
import { useState, useEffect } from "react";
import { Weather_API, Image_API, config, WEATHER_API_KEY } from "./api";
import axios from "axios";
import { parseData, ParseCurrentWheatherData } from "./HelperFunctions";
import Forecast from "./Forecast/Forecast";

export default function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = async (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = await axios.get(
      `${Weather_API}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=imperial`
    );

    const forecastFetch = await axios.get(
      `${Weather_API}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=imperial`
    );

    const [currentWeatherResponse, forecastResponse] = await Promise.all([
      currentWeatherFetch,
      forecastFetch
    ]);

    const description = currentWeatherResponse.data.weather[0].description;

    const imageFetch = parseData(
      await axios.get(`${Image_API}${description}`, config)
    );
    setCurrentWeather({
      description: description,
      src: imageFetch.src,
      city: searchData.label,
      ...ParseCurrentWheatherData(currentWeatherResponse.data)
    });

    setForecast(forecastResponse.data);
    //console.log(currentWeather)
    //console.log(forecast)
  };

  return (
    <div className="App">
      <SearchBar onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}
