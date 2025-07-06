import { useState } from 'react';
import { login } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../components/Login.css'; // Assuming you have a CSS file for styling

const Login = () => {
  const [loginData, setLoginData] = useState({ login: '', password: '' });
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
      alert('Login failed');
    }
  };

  return (
    // <form onSubmit={handleSubmit}>
    //   <h2>ERP Login</h2>
    //   <input name="login" placeholder="Username or Email" onChange={handleChange} />
    //   <input name="password" type="password" placeholder="Password" onChange={handleChange} />
    //   <button type="submit">Login</button>
    // </form>

    <div className="login-container">
    <h2>ERP Login</h2>
    <form onSubmit={handleSubmit}>
      <input name="login" placeholder="Username or Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Login</button>
    </form>
  </div>
  );
};

export default Login;
