import React, { Fragment } from 'react';

const Find = ({ handleChange, query, filteredCountries }) => {
  return (
    <Fragment>
      Find: <input onChange={handleChange} value={query} />
      {filteredCountries.length > 10 && (
        <p>Too many matches. Please be more specific</p>
      )}
    </Fragment>
  );
};

export default Find;
