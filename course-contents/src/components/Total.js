import React from 'react';

const Total = ({ course: { parts } }) => {
  let initialValue = 0;
  let sum = parts.reduce(
    (accumulator, currentValue) => accumulator + currentValue.exercises,
    initialValue
  );
  return <p style={{ fontWeight: 'bold' }}>Number of exercises {sum}</p>;
};

export default Total;
