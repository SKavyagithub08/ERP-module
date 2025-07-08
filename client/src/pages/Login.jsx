import { useState } from 'react';
import { login } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import '../components/index.css'; // Assuming you have a CSS file for styling
=======
import '../components/Login.css';
>>>>>>> c5e3db24aecff4aa4e7388c10035dff47242eb59

const Login = () => {
  const [loginData, setLoginData] = useState({
    login: '',
    password: '',
    role: 'partyMaster' // default value
  });

  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(loginData);
      loginUser(res);
      navigate('/select-transport');
    } catch (err) {
      alert('❌ Login failed: ' + err.response?.data?.message);
    }
  };

  return (
    <div className="login-container">
      <h2>ERP Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="login"
          placeholder="Username or Email"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <select name="role" onChange={handleChange} value={loginData.role} required>
          <option value="partyMaster">Party Master</option>
          <option value="vehicleMaster">Vehicle Master</option>
          <option value="vendorMaster">Vendor Master</option>
          <option value="rateCardMaster">Rate Card Master</option>
          <option value="bankMaster">Bank Master</option>
          <option value="master">Master</option>
        </select>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
