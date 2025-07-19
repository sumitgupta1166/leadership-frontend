import axios from 'axios';

const API = import.meta.env.VITE_API_BASE;

export const fetchUsers = () => axios.get(`${API}/users`);
export const addUser = (name) => axios.post(`${API}/users`, { name });
export const claimPoints = (id) => axios.post(`${API}/users/claim/${id}`);