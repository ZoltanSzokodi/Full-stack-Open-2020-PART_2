import React, { Fragment } from 'react';
import Contact from './Contact';

const Contacts = ({ contacts, find }) => {
  return (
    <Fragment>
      <h2>Contacts</h2>
      <ul style={{ listStyle: 'none' }}>
        {contacts
          .filter(contact =>
            contact.name.toLowerCase().includes(find.toLowerCase())
          )
          .map(contact => (
            <Contact key={contact.number} contact={contact} />
          ))}
      </ul>
    </Fragment>
  );
};

export default Contacts;
