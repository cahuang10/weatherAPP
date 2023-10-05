import "./forestcast.css";
import { ParseCurrentForestcast } from "../HelperFunctions";
const Forecast = (data) => {
  const formattedData = ParseCurrentForestcast(data);
  console.log(formattedData);
  return (
    <div className="time-card-container">
      {formattedData.map((day, index) => (
        <div key={index} className="time-card">
          <div>
            <p className="day">{day.date}</p>
            <div key={index} className="temperatures">
              <p className="high">
                <span className="arrow-up">&#x2191;</span>
                {day.high}°F
              </p>
              <p className="temperature">
                {day.currentTemp}
                <span className="celsius-symbol">°F</span>
              </p>
              <p className="low">
                <span className="arrow-down">&#x2193;</span>
                {day.low}°F
              </p>
            </div>
            <div className="weather">
              <img
                alt="icon"
                className="icon"
                src={"icon/" + day.icon + ".png"}
              />
              <div className="weatherDescrip">{day.description}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Forecast;
