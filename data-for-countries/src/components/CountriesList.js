import React from 'react';

const CountriesList = ({ filteredCountries, handleSelect }) => {
  return (
    <ol>
      {filteredCountries.map(country => (
        <li key={country.name}>
          {country.name}{' '}
          <button onClick={() => handleSelect(country)}>show</button>
        </li>
      ))}
    </ol>
  );
};

export default CountriesList;
