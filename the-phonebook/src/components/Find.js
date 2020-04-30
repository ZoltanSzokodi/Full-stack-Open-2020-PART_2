import React, { Fragment } from 'react';

const Find = ({ handleFind, find }) => {
  return (
    <Fragment>
      find: <input onChange={handleFind} value={find} />
    </Fragment>
  );
};

export default Find;
