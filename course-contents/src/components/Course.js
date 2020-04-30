import React, { Fragment } from 'react';
import Header from './Header';
import Content from './Content';
import Total from './Total';

const Course = ({ course }) => {
  return (
    <Fragment>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </Fragment>
  );
};

export default Course;
