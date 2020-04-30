import React from 'react';

const Form = ({ handleSubmit, handleChange, newContact }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name:{' '}
        <input
          onChange={handleChange}
          value={newContact.name}
          name='name'
          placeholder='add name...'
          required
        />
        number:{' '}
        <input
          onChange={handleChange}
          value={newContact.number}
          name='number'
          placeholder='add number...'
          required
        />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  );
};

export default Form;
