const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};
export const parseData = (data) => {
  let length = data.data.photos.length;
  let url = data.data.photos[getRandomInt(length)].src.large;
  return {
    src: url
  };
};
export const ParseCurrentWheatherData = (data) => {
  return {
    Feels_like: data.main.feels_like + "°F",
    High: Math.round(data.main.temp_max) + "°F",
    Low: Math.round(data.main.temp_min) + "°F",
    Humidity: Math.round(data.main.humidity) + "%",
    Pressure: Math.round(data.main.pressure) + " hPa",
    CurrentTemp: Math.round(data.main.temp),
    WindSpeed: Math.round(data.wind.speed) + " m/s",
    description: data.weather[0].description.toUpperCase()
  };
};

export const ParseCurrentForestcast = (data) => {
  console.log(data);
  let listOfday = [];
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  const uniqueDays = new Set(dayNames[new Date().getDay()]);
  for (let i = 0; i < data.data.list.length; i++) {
    const singleItem = data.data.list[i];
    const day = dayNames[new Date(singleItem.dt_txt).getDay()];
    // Check if the day has already been encountered, if yes, skip to the next iteration
    if (uniqueDays.has(day)) {
      continue;
    }
    // If the day is not encountered, add it to the Set and push the item to listOfday
    uniqueDays.add(day);
    listOfday.push({
      date: dayNames[new Date(singleItem.dt_txt).getDay()],
      high: Math.round(singleItem.main.temp_max),
      low: Math.round(singleItem.main.temp_min),
      currentTemp: Math.round(singleItem.main.temp),
      description: singleItem.weather[0].description.toUpperCase(),
      icon: singleItem.weather[0].icon
    });
  }
  return listOfday;
};
//data.data.list[i];
