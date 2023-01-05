import axios from "axios";

const apiURL = `http://localhost:3500`;

export const getUsers = () =>
  axios.get(`${apiURL}/users`).then((res) => res.data);

export const getUser = (id) =>
  axios.get(`${apiURL}/users/${id}`).then((res) => res.data);

export const updateUser = ({ updateUser }) => {
  return axios.post(`${apiURL}/users`, updateUser).then((res) => res.data);
};

export const addUser = ({ id, ...updateUser }) => {
  return axios.put(`${apiURL}/users/${id}`, updateUser).then((res) => res.data);
};

export const deleteUser = (id) => {
  return axios.delete(`${apiURL}/users/${id}`).then((res) => res.data);
};
