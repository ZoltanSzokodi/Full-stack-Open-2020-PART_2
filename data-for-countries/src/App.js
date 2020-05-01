import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Find from './components/Find';
import CountriesList from './components/CountriesList';
import CountryInfo from './components/CountryInfo';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({});
  const [query, setQuery] = useState('');
  const [currentWeather, setCurrentWeather] = useState({
    temperature: '',
    wind: '',
    image: '',
  });

  // Helper function for fetching countries from API
  const fetchCountries = async () => {
    try {
      const res = await axios.get('https://restcountries.eu/rest/v2/all');
      setCountries(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Helper function for fetching weather data from API
  const fetchWeather = async city => {
    try {
      const res = await axios.get(
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${city}`
      );

      const { temperature, wind_speed, weather_icons } = res.data.current;

      setCurrentWeather({
        ...currentWeather,
        temperature,
        wind: wind_speed,
        image: weather_icons[0],
      });
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch data on first render
  useEffect(() => {
    fetchCountries();
  }, []);

  // Handle filter when input value changes
  useEffect(() => {
    let filtered = [];

    if (query.length > 0) {
      filtered = countries.filter(country =>
        country.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredCountries(filtered);

    // When the input value changes close the selected country and clear state
    setIsSelected(false);
    setSelectedCountry({});
    setCurrentWeather(currentWeather => ({
      ...currentWeather,
      temperature: '',
      wind: '',
      image: '',
    }));
  }, [query, countries]);

  // Handle input changes
  const handleChange = e => setQuery(e.target.value);

  // Show country details when clicked
  const handleSelect = country => {
    setIsSelected(true);
    setSelectedCountry(country);
  };

  return (
    <div className='container'>
      <Find
        filteredCountries={filteredCountries}
        handleChange={handleChange}
        query={query}
      />

      {filteredCountries.length > 1 && filteredCountries.length < 11 && (
        <CountriesList
          filteredCountries={filteredCountries}
          handleSelect={handleSelect}
        />
      )}

      {filteredCountries.length === 1 && (
        <CountryInfo
          country={filteredCountries[0]}
          fetchWeather={fetchWeather}
          currentWeather={currentWeather}
        />
      )}

      {isSelected && (
        <CountryInfo
          country={selectedCountry}
          fetchWeather={fetchWeather}
          currentWeather={currentWeather}
        />
      )}
    </div>
  );
};

export default App;
