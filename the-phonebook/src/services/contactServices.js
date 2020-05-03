import axios from 'axios';

const baseUrl = '/api/persons';

export const getAll = () => {
  const req = axios.get(baseUrl);
  return req.then(res => res.data);
};

export const create = newCont => {
  const req = axios.post(baseUrl, newCont);

  return req.then(res => res.data);
};

export const remove = id => {
  const req = axios.delete(`${baseUrl}/${id}`);

  return req.then(res => res.data);
};

export const update = (id, changedCont) => {
  const req = axios.put(`${baseUrl}/${id}`, changedCont);

  return req.then(res => res.data);
};
