import React, { Fragment } from 'react';

const CountryInfo = ({
  country: { name, capital, population, languages, flag },
}) => {
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
    </Fragment>
  );
};

export default CountryInfo;
