import React, { Fragment } from 'react';
import Contact from './Contact';

const Contacts = ({ contacts, find, handleDelete }) => {
  return (
    <Fragment>
      <h2>Contacts</h2>
      <ul style={{ listStyle: 'none' }}>
        {contacts
          .filter(contact =>
            contact.name.toLowerCase().includes(find.toLowerCase())
          )
          .map(contact => (
            <Contact
              key={contact.id}
              contact={contact}
              handleDelete={handleDelete}
            />
          ))}
      </ul>
    </Fragment>
  );
};

export default Contacts;
