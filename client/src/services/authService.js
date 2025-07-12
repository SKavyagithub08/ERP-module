import axios from 'axios';

const API_URL = 'https://erp-module-3.onrender.com/api/auth';

export const login = async (loginData) => {
  const res = await axios.post(`${API_URL}/login`, loginData);
  return res.data;
};
