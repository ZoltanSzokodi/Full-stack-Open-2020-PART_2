import React, { useState, useEffect, Fragment } from 'react';

// COMPONENTS ==========================================
import Contacts from './components/Contacts';
import Form from './components/Form';
import Find from './components/Find';
import Alert from './components/Alert';

// API SERVICE =========================================
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

  // FETCH INIT DATA ==========================================
  useEffect(() => {
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

  // FORM DATA HANDLING =========================================
  // A single eventhandler with dynamic key props
  const handleChange = e => {
    setNewContact({
      ...newContact,
      [e.target.name]: e.target.value,
    });
  };

  // SEARCH CONTACTS ============================================
  const handleFind = e => setFind(e.target.value);

  // ADD OR UPDATE CONTACT ======================================
  const handleSubmit = e => {
    e.preventDefault();

    // Check if name already exists in contacts
    const contact = contacts.find(
      cont => newContact.name.toLowerCase() === cont.name.toLowerCase()
    );

    // If a contact already exists with the name prompt the user for update confirmation
    if (contact) {
      const confirm = window.confirm(
        `Would you like to update ${contact.name}'s number?`
      );

      if (confirm) {
        // Change the contact number according to the input
        const updatedContact = { ...contact, number: newContact.number };

        // Send a PUT request to the server
        update(contact.id, updatedContact)
          .then(updatedCont => {
            // Update the state with the response
            setContacts(
              contacts.map(cont =>
                cont.id === updatedCont.id ? updatedCont : cont
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

  // DELETE A CONTACT =======================================
  const handleDelete = (id, name) => {
    const confirm = window.confirm(`Delete ${name}?`);

    if (confirm) {
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
    }
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
