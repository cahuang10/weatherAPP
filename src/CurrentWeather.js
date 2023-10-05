import React, { useEffect } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from "react-accessible-accordion";
// Feels_like: data.main.feels_like,
//     Humidity: data.main.humidity,
//     Pressure: data.main.pressure,
//     CurrentTemp: data.main.temp,
//     High: data.main.temp_max,
//     Low: data.main.temp_min,
//     WindSpeed: data.wind.speed
const CurrentWeather = ({ data }) => {
  const keysToExclude = ["src", "CurrentTemp", "city", "description"];
  const keys = Object.keys(data).filter((key) => !keysToExclude.includes(key));
  return (
    <div>
      <div className="edge-temp-detailts">
        <div
          className="temp-details"
          style={{
            backgroundImage: `url("${data.src}")`
          }}
        >
          <p className="city">{data.city}</p>
          <p className="temp">
            <span className="number">{data.CurrentTemp}</span>
            <span className="celsius">°C</span>
          </p>
          <p>{data.description}</p>
        </div>
      </div>
      <Accordion allowZeroExpanded>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>
              <button className="button">More Details</button>
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <div className="details">
              {keys.map((key) => (
                <p className="details-items" key={key}>
                  <label className="description">{key}:</label>{" "}
                  <span>{data[key]}</span>
                </p>
              ))}
            </div>
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
      <hr></hr>
    </div>
  );
};

export default CurrentWeather;
