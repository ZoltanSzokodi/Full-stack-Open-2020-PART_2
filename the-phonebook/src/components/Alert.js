import React from 'react';

const alert = ({ alert: { type, message } }) => {
  if (type === '') return null;

  return <div className={type}>{message}</div>;
};

export default alert;
