import { useState } from "react";
import TimeIntervals from "./TimeIntervals";
import classes from "./day.module.css";

const Day = (prop) => {
  const [hours, setHour] = useState();
  const [min, setmin] = useState();

  const date = new Date();

  setInterval(() => {
    const date = new Date();
    setHour(+date.getHours() >= 10 ? date.getHours() : "0" + date.getHours());
    setmin(
      +date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes()
    );
  }, 1000);

  const month = [
    "Jan",
    "Feb",
    "Mar",
    "April",
    "May",
    "Jun",
    "Aug",
    "Sept",
    "Oct",
    "Sept",
  ];

  const { currentWeatherData, currentWeatherLocation, hourlyForeCast } = prop;

  return (
    <div className={classes.dayBox}>
      <div className={classes.date}>
        {date.getDate()}th {month[date.getMonth() - 1]} {date.getFullYear()}
        {","}
        {hours} : {min}
      </div>
      <div className={classes.dayBoxData}>
        <div className={classes.dayBoxDataImg}>
          <div className={classes.dayBoxImg}>
            <img
              src={`http://${
                currentWeatherData && currentWeatherData?.condition.icon
              }
            `}
            />
          </div>
          <h2>{currentWeatherData && currentWeatherData?.temp_c}.C</h2>
        </div>
        <h3>{currentWeatherLocation}</h3>
        <p className={classes.condition}>
          {currentWeatherData?.condition?.text}
        </p>
        <div className={classes.currentBox}>
          <ul>
            <li>
              <span>Wind:</span>

              <span>
                {currentWeatherData && currentWeatherData?.wind_mph} mph
              </span>
            </li>
            <li>
              <span>Precip:</span>
              <span>{currentWeatherData?.precip_in} in</span>
            </li>
            <li>
              <span>Pressure:</span>
              <span> {currentWeatherData?.pressure_in} in</span>
            </li>
          </ul>
        </div>
      </div>
      <TimeIntervals hourlyForeCast={hourlyForeCast} />
    </div>
  );
};

export default Day;
