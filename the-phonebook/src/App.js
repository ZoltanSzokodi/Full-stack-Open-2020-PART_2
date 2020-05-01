import React, { useState, useEffect, Fragment } from 'react';
import Contacts from './components/Contacts';
import Form from './components/Form';
import Find from './components/Find';
import Alert from './components/Alert';

import { getAll, create, remove, update } from './services/contactServices';

const App = () => {
  const [find, setFind] = useState('');
  const [contacts, setContacts] = useState([]);
  const [alert, setAlert] = useState({
    type: '',
    message: '',
  });
  const [newContact, setNewContact] = useState({
    name: '',
    number: '',
  });

  // Funtion to reset alert state after 3s
  const resetAlert = () =>
    setTimeout(
      () =>
        setAlert({
          type: '',
          message: '',
        }),
      3000
    );

  useEffect(() => {
    // Fetch initial data
    getAll()
      .then(initialData => setContacts(initialData))
      .catch(err => {
        setAlert({
          type: 'fail',
          message: err.message,
        });
        resetAlert();
      });
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
          .then(updatedCont => {
            // Update the state with the response
            setContacts(
              contacts.map(contact =>
                contact.id === updatedCont.id ? updatedCont : contact
              )
            );
            setAlert({
              type: 'success',
              message: 'Contact updated',
            });
            resetAlert();
          })
          .catch(err => {
            setAlert({
              type: 'fail',
              message: err.message,
            });
            resetAlert();
          });
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
        .then(newCont => {
          setContacts(contacts.concat(newCont));
          setAlert({
            type: 'success',
            message: 'Contact added',
          });
          resetAlert();
        })
        .catch(err => {
          setAlert({
            type: 'fail',
            message: err.message,
          });
          resetAlert();
        });

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
        .then(() => {
          setContacts(contacts.filter(contact => contact.id !== id));
          setAlert({
            type: 'success',
            message: 'Contact deleted',
          });
          resetAlert();
        })
        .catch(err => {
          setAlert({
            type: 'fail',
            message: err.message,
          });
          resetAlert();
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
      <br />
      <Alert alert={alert} />
      <Contacts contacts={contacts} find={find} handleDelete={handleDelete} />
    </Fragment>
  );
};

export default App;
