import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/auth`;

export const login = async (loginData) => {
  const res = await axios.post(`${API_URL}/login`, loginData);
  return res.data;
};
