import { useState } from "react";
import classes from "./MainNavigation.module.css";

const MainNavigation = (prop) => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrormessage] = useState();

  const { searchHandler, loadHandler } = prop;

  // `http://api.weatherapi.com/v1/current.json?key=ee1530a3a64c4977870124025232209&q=${e.target.search.value}&aqi=no`

  function submithandler(e) {
    e.preventDefault();
    if (!e.target.search.value) {
      setError(true);
      setErrormessage("please enter a city, state or country");
      setTimeout(() => {
        setError(false);
      }, 2000);
      return;
    }
    async function getWeatherSearchData() {
      try {
        loadHandler(false, true, "");
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=ee1530a3a64c4977870124025232209&q=${e.target.search.value}&days=3&aqi=no&alerts=no`
        );
        console.log(response);

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          searchHandler(data);
          loadHandler(false, false, "");
        } else {
          loadHandler(true, false, "weather report for search not available");
        }
      } catch (e) {
        loadHandler(true, false, "could not fetch data");
      }
    }

    getWeatherSearchData();
  }

  return (
    <header>
      <h3>Weather App</h3>
      <form onSubmit={submithandler}>
        <input type="search" id="search" placeholder="Search for city"></input>
        <button type="submit">Search</button>
      </form>
      {error && <div className={classes.error}>{errorMessage}</div>}
    </header>
  );
};

export default MainNavigation;
