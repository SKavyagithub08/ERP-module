import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../components/Login.css'; 

const RegisterUser = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    role: 'partyMaster',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'https://erp-module-1k4b.onrender.com';
      await axios.post(`${apiUrl}/api/auth/register`, formData);
      alert('✅ User registered successfully!');
      navigate('/select-transport');
    } catch (err) {
      console.error('Registration error:', err.response?.data || err.message);
      alert('❌ Registration failed: ' + err.response?.data?.message);
    }
  };

  return (
    <div className="register-container">
      <h2>Register New User</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Full Name" onChange={handleChange} required />
        <input name="username" placeholder="Username" onChange={handleChange} required />
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        
        <select name="role" onChange={handleChange} required>
          <option value="partyMaster">Party Master</option>
          <option value="vehicleMaster">Vehicle Master</option>
          <option value="vendorMaster">Vendor Master</option>
          <option value="rateCardMaster">Rate Card Master</option>
          <option value="bankMaster">Bank Master</option>
        </select>

        <button type="submit">Register User</button>
      </form>
    </div>
  );
};

export default RegisterUser;
