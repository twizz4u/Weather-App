import { useState } from "react";
import MainNavigation from "./components/MainNavigation/MainNavigation";
import Content from "./components/Content/Content";
import "./App.css";

function App() {
  const [seaerchWeatherData, setSearchData] = useState({});
  const [loadState, setloadState] = useState();
  const [error, setError] = useState();
  const [errorMessage, setErrorMessage] = useState();

  function searchData(searchData) {
    setSearchData(searchData);
  }

  function loadHandler(error = false, loading = false, errorMessage = "") {
    setError(error);
    setloadState(loading);
    setErrorMessage(errorMessage);
    console.log(error, loadState, errorMessage);
  }

  return (
    <>
      <MainNavigation searchHandler={searchData} loadHandler={loadHandler} />
      {error && (
        <div className="center">
          <h2>{errorMessage}</h2>
        </div>
      )}
      {loadState && (
        <div className="center">
          <h2>loadind data</h2>
        </div>
      )}
      {!loadState && !error && <Content currentSearch={seaerchWeatherData} />}
    </>
  );
}

export default App;
