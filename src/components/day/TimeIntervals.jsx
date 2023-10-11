import classes from "./TimeIntervals.module.css";

const TimeIntervals = (prop) => {
  const { hourlyForeCast } = prop;

  // console.log(hourlyForeCast);

  const day = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return (
    <div className={classes.content}>
      <div>
        {hourlyForeCast?.map((data) => {
          const date = data?.time?.split("-").join(" ");
          const forcastDate = new Date(date);
          return (
            <ul key={data.time_epoch} className={classes.timeIntervalBox}>
              <div className={classes.intervalImageBox}>
                <img src={`http://${data?.condition.icon}`} />
              </div>
              <h4>
                {day[forcastDate.getDay()] + " " + forcastDate.getDate()}
                {", "}
                <span>{data.time.slice(11)}</span>
              </h4>
              <li>
                <span>Temp</span>
                {data.temp_c} C
              </li>
              <li>
                <span>Humidity</span>
                {data.humidity} %
              </li>
              <li>
                <span>wind</span>
                {data.wind_mph} mph
              </li>
              <li>
                <span>Cloud</span> {data.cloud}%
              </li>
            </ul>
          );
        })}

        {/* <ul className={classes.timeIntervalBox}>
          <img />
          <h4>
            Mon 06 <span>23 : 00</span>
          </h4>
          <li>
            <span>Temp</span>60 F
          </li>
          <li>
            <span>Humidity</span>60 F
          </li>
          <li>
            <span>wind</span>3.8 mph
          </li>
          <li>
            <span>Cloud</span> 92%
          </li>
        </ul>
        <ul className={classes.timeIntervalBox}>
          <img />
          <h4>
            Mon 06 <span>00 : 00</span>
          </h4>
          <li>
            <span>Temp</span>60 F
          </li>
          <li>
            <span>Humidity</span>60 F
          </li>
          <li>
            <span>wind</span>3.8 mph
          </li>
          <li>
            <span>Cloud</span> 92%
          </li>
        </ul>
        <ul className={classes.timeIntervalBox}>
          <img />
          <h4>
            Mon 06 <span>00 : 00</span>
          </h4>
          <li>
            <span>Temp</span>60 F
          </li>
          <li>
            <span>Humidity</span>60 F
          </li>
          <li>
            <span>wind</span>3.8 mph
          </li>
          <li>
            <span>Cloud</span> 92%
          </li>
        </ul> */}
      </div>
    </div>
  );
};

export default TimeIntervals;
