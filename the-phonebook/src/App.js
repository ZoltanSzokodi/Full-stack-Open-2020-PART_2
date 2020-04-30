import React, { useState, Fragment } from 'react';
import Contacts from './components/Contacts';
import Form from './components/Form';
import Find from './components/Find';

const App = () => {
  const [contacts, setContacts] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ]);
  const [newContact, setNewContact] = useState({
    name: '',
    number: '',
  });
  const [find, setFind] = useState('');

  // A single eventhandler with dynamic key props
  const handleChange = e => {
    setNewContact({
      ...newContact,
      [e.target.name]: e.target.value,
    });
  };

  const handleFind = e => setFind(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();

    // Check if name already exists
    const nameTaken = contacts.find(
      contact => newContact.name === contact.name
    );

    // Alert user when duplicate key found
    if (nameTaken) {
      return alert(`${newContact.name} is already taken`);
    }

    // Set and Reset states
    setContacts(contacts.concat(newContact));
    setNewContact({
      name: '',
      number: '',
    });
  };

  return (
    <Fragment>
      <h2>Phonebook</h2>
      <Find handleFind={handleFind} find={find} />
      <br />
      <Form
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        newContact={newContact}
      />
      <Contacts contacts={contacts} find={find} />
    </Fragment>
  );
};

export default App;
