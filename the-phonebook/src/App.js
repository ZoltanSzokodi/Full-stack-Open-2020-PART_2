import React, { useState, useEffect, Fragment } from 'react';
import Contacts from './components/Contacts';
import Form from './components/Form';
import Find from './components/Find';

import { getAll, create, remove, update } from './services/contactServices';

const App = () => {
  const [find, setFind] = useState('');
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({
    name: '',
    number: '',
  });

  useEffect(() => {
    // Fetch initial data
    getAll()
      .then(initialData => setContacts(initialData))
      .catch(err => alert(err.message));
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

    // If contact already exists ask user to confirm or decline update
    if (nameTaken) {
      const confirm = window.confirm(
        `Would you like to update ${newContact.name}'s number?`
      );

      if (confirm) {
        // If confirmed search for the contact object in the state
        const contact = contacts.find(
          contact => newContact.name === contact.name
        );

        // Change the contact number according to the input
        const changedContact = { ...contact, number: newContact.number };

        // Send a PUT request to the server
        update(contact.id, changedContact)
          .then(updatedCont =>
            // Update the state with the response
            setContacts(
              contacts.map(contact =>
                contact.id === updatedCont.id ? updatedCont : contact
              )
            )
          )
          .catch(err => alert(err.message));
        // Set and Reset states
        setNewContact({
          name: '',
          number: '',
        });
      }

      // return alert(`${newContact.name} is already taken`);
    } else {
      // Post new contact to the server and add response obj to the state
      create(newContact)
        .then(newCont => setContacts(contacts.concat(newCont)))
        .catch(err => alert(err.message));

      // Set and Reset states
      setNewContact({
        name: '',
        number: '',
      });
    }
  };

  const handleDelete = (id, name) => {
    const confirm = window.confirm(`Delete ${name}?`);

    confirm &&
      remove(id)
        .then(() => setContacts(contacts.filter(contact => contact.id !== id)))
        .catch(err => alert(err.message));
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
      <Contacts contacts={contacts} find={find} handleDelete={handleDelete} />
    </Fragment>
  );
};

export default App;
