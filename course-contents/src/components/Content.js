import React, { Fragment } from 'react';
import Part from './Part';

const Content = ({ course: { parts } }) => {
  return (
    <Fragment>
      {parts.map(part => (
        <Part key={part.id} part={part} />
      ))}
    </Fragment>
  );
};

export default Content;
