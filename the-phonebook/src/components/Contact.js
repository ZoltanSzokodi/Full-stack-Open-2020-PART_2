import React from 'react';

const Contact = ({ contact: { number, name } }) => {
  return (
    <li>
      {name} - {number}
    </li>
  );
};

export default Contact;
