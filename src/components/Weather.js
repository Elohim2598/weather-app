import React from 'react';
import humidityIcon from '../assets/humidityIcon.png';
import windIcon from '../assets/windIcon.png';
import { useSpring, animated } from 'react-spring';

const api = {
  key: 'dc2a26e237e7389c3247f9b6460f7597',
  base: 'https://api.openweathermap.org/data/2.5/',
};

export function Weather() {
  const [query, setQuery] = React.useState('');
  const [weather, setWeather] = React.useState({});

  const search = (evt) => {
    if (evt.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  };

  function dateBuilder(d) {
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    let days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }
  const style1 = useSpring({
    from: { opacity: 0, marginTop: -500 },
    to: { opacity: 1, marginTop: 0 },
    config: { mass: 1, tension: 50, friction: 10 },
  });
  return (
    <animated.div style={style1} className="weather-bg">
      <div className="weather-container">
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            value={query}
            onKeyPress={search}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        {typeof weather.main != 'undefined' ? (
          <div className="weather-box">
            <div className="weather-box-top">
              <div className="location">
                Location:{' '}
                <i>
                  <b>
                    {weather.name}, {weather.sys.country}
                  </b>
                </i>
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box-bottom">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="wind">
                <img className="windIcon" src={windIcon} alt="windIcon" />
                Wind: {weather.wind.speed} km/h
              </div>
              <div className="humidity">
                <img
                  className="humidityIcon"
                  src={humidityIcon}
                  alt="humidityIcon"
                />
                Humidity: {weather.main.humidity}%
              </div>
              <div className="weather">
                {weather.weather[0].main}{' '}
                <img
                  className="weatherIcon"
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                  alt="weatherIcon"
                />
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </animated.div>
  );
}
