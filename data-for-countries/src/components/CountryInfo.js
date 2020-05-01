import React, { useEffect, Fragment } from 'react';

const CountryInfo = ({
  country: { name, capital, population, languages, flag },
  currentWeather: { temperature, wind, image },
  fetchWeather,
}) => {
  useEffect(() => {
    fetchWeather(capital);
  }, [capital]);

  return (
    <Fragment>
      <h3>{name}</h3>
      <p>capital: {capital}</p>
      <p>population: {population}</p>
      <p>languages:</p>
      <ul>
        {languages.map(lang => (
          <li key={lang.name}>{lang.name}</li>
        ))}
      </ul>
      <img style={{ width: '200px' }} src={flag} alt='flag' />

      <h3>Weather in {capital}</h3>
      <p>temperature: {temperature} °C</p>
      <p>wind: {wind} km/h</p>
      <img style={{ width: '50px' }} src={image} alt='weather incon' />
    </Fragment>
  );
};

export default CountryInfo;
