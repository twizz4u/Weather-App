import { useEffect, useState } from "react";
import Day from "../day/day";
import Days from "../days/Days";
import FutureDays from "../days/futureDays";
import classes from "./Content.module.css";

const Content = (prop) => {
  const [loadState, setloadState] = useState();
  const [error, setError] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [currentLocation, setLocation] = useState({
    latitude: null,
    longitude: null,
  });

  const [currentWeatherData, setCurrentWeatherData] = useState(null);

  const { currentSearch } = prop;
  console.log(currentSearch);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((t) => {
      setLocation({
        latitude: t.coords.latitude,
        longitude: t.coords.longitude,
      });
    });

    let timer;

    if (!currentLocation.latitude && Object.keys(currentSearch).length === 0) {
      console.log(currentLocation.latitude);
      setloadState(true);
      timer = setTimeout(() => {
        setloadState((loadState) => !loadState);
        setError(true);
        setErrorMessage("please check your location settings");
        console.log("yes");
      }, 5000);
    }

    async function getWeatherData() {
      try {
        setError(false);
        setloadState(true);
        const response = await fetch(
          `http://api.weatherapi.com/v1/forecast.json?key=ee1530a3a64c4977870124025232209&q=${currentLocation.latitude},${currentLocation.longitude}&days=3&aqi=no&alerts=no`
        );

        if (response.ok) {
          console.log(response.status);
          const data = await response.json();
          setCurrentWeatherData(data);
          setloadState(false);
          setError(false);
        } else {
          setloadState(false);
          setError(true);
          setErrorMessage("city not available");
        }
      } catch (e) {
        setloadState(false);
        setError(true);
        setErrorMessage("could not fetch Data");
      }
    }

    if (
      currentLocation.latitude &&
      currentLocation.longitude &&
      Object.keys(currentSearch).length === 0
    ) {
      getWeatherData();
    } else if (Object.keys(currentSearch).length > 0) {
      setCurrentWeatherData(currentSearch);
      setloadState(!loadState);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [currentLocation.latitude, currentLocation.longitude]);

  const hourly = currentWeatherData?.forecast?.forecastday[0]?.hour;

  let hourlyForecast;

  let currentTime = currentWeatherData?.location.localtime;

  let localtime = currentTime?.slice(11, 13);

  if (hourly) {
    const forecastTime = hourly.filter((data) => {
      if (localtime.slice(-1) == ":") {
        localtime = localtime.slice(0, 1);
      }
      return +data.time.slice(11, 13) > +localtime;
    });

    hourlyForecast = forecastTime.slice(0, 4);
  }

  // let date = new Date();
  // let options = { timeZone: "America/New_York" };
  // let eastCoastTime = date.toLocaleString("en-US", options);
  // console.log(eastCoastTime);

  // console.log(Intl.supportedValuesOf("timeZone"));

  // console.log(currentLocation);

  return (
    <>
      {error && (
        <div className="center">
          <h2>{errorMessage}</h2>
        </div>
      )}
      {loadState && !error && (
        <div className="center">
          <h2>loadind data</h2>
        </div>
      )}
      {!loadState && !error && (
        <div className={classes.content}>
          <Day
            currentWeatherData={currentWeatherData?.current}
            currentWeatherLocation={currentWeatherData?.location?.name}
            hourlyForeCast={hourlyForecast}
          />
          <Days>
            <FutureDays
              futureDaysData={currentWeatherData?.forecast?.forecastday}
            />
          </Days>
        </div>
      )}
    </>
  );
};

export default Content;
