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

  // Helper function for data fetching
  const fetchData = async () => {
    const res = await axios.get('https://restcountries.eu/rest/v2/all');
    setCountries(res.data);
  };

  // Fetch data on first render
  useEffect(() => {
    fetchData();
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
        <CountryInfo country={filteredCountries[0]} />
      )}

      {isSelected && <CountryInfo country={selectedCountry} />}
    </div>
  );
};

export default App;
