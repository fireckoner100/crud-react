import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com/users';

export const getUsers = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

export const createUser = async (user: { name: string; email: string }) => {
  const response = await axios.post(API_BASE_URL, user);
  return response.data;
};

export const updateUser = async (id: number, user: { name: string; email: string }) => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, user);
  return response.data;
};

export const deleteUser = async (id: number) => {
  const response = await axios.delete(`${API_BASE_URL}/${id}`);
  return response.data;
};
