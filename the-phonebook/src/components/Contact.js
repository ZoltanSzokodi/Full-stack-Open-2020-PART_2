import React from 'react';

const Contact = ({ contact: { number, name, id }, handleDelete }) => {
  return (
    <li>
      {name} - {number}
      <button onClick={() => handleDelete(id, name)}>delete</button>
    </li>
  );
};

export default Contact;
