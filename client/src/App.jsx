import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SelectTransport from './pages/SelectTransport';
import RegisterUser from './pages/RegisterUser'; 

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/select-transport" element={<SelectTransport />} />
      <Route path="/register-user" element={<RegisterUser />} />
    </Routes>
  );
};

export default App;
