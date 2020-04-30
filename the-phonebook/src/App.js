import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Contacts from './components/Contacts';
import Form from './components/Form';
import Find from './components/Find';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({
    name: '',
    number: '',
  });
  const [find, setFind] = useState('');

  const fetchData = async () => {
    const res = await axios.get('http://localhost:3001/persons');
    setContacts(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
