const FutureDays = (prop) => {
  const { futureDaysData } = prop;

  console.log(futureDaysData);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return (
    <>
      {futureDaysData?.map((data) => {
        const date = data.date.split("-").join(" ");
        const forcastDate = new Date(date);
        console.log(date);
        return (
          <div key={data.date_epoch}>
            <h3>{days[forcastDate.getDay()]}</h3>
            <div>
              <img
                src={`http://${data.day.condition.icon}`}
                alt="weather-img"
              />
              <p>{data.day.avgtemp_c}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default FutureDays;
