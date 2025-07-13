import axios from 'axios';

// Fallback for production if env var is not set
const API_URL = `${import.meta.env.VITE_API_BASE_URL || 'https://erp-module-1k4b.onrender.com'}/api/auth`;

console.log('API_URL:', API_URL); // Debug log

export const login = async (loginData) => {
  try {
    console.log('Attempting login to:', `${API_URL}/login`);
    const res = await axios.post(`${API_URL}/login`, loginData);
    return res.data;
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw error;
  }
};
