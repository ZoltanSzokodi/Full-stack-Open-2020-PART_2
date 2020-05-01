import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

export const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

export const create = newCont => {
  const request = axios.post(baseUrl, newCont);

  return request.then(response => response.data);
};

export const remove = id => {
  const request = axios.delete(`${baseUrl}/${id}`);

  return request.then(response => response.data);
};

export const update = (id, changedCont) => {
  const request = axios.put(`${baseUrl}/${id}`, changedCont);

  return request.then(response => response.data);
};
