import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../components/Login.css';

const SelectTransport = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSelect = (type) => {
    sessionStorage.setItem('transportType', type);
    const role = user?.role;

    // Role-specific navigation
    if (role === 'vehicleMaster') {
      // Vehicle masters go to vehicle dispatch for both domestic and local
      navigate('/vehicle-dispatch');
      
    } else if (role === 'partyMaster') {
      // Party masters can access domestic and local dashboards
      if (type === 'Domestic') {
        navigate('/domestic/dashboard');
      } else if (type === 'Local') {
        navigate('/local/dashboard');
      }
    } else if (role === 'master') {
      // Master users can access domestic and local dashboards
      if (type === 'Domestic') {
        navigate('/domestic/dashboard');
      } else if (type === 'Local') {
        navigate('/local/dashboard');
      }
    } else {
      // Other roles (vendorMaster, rateCardMaster, bankMaster) can access dashboards
      if (type === 'Domestic') {
        navigate('/domestic/dashboard');
      } else if (type === 'Local') {
        navigate('/local/dashboard');
      }
    }
  };

  const handleRegisterUser = () => {
    navigate('/register-user');
  };

  return (
    <div className="select-transport-container">
      <h2>Welcome, {user?.name}</h2>
      <h3>Select Transport Type:</h3>

      <div className="transport-buttons">
        <button onClick={() => handleSelect('Domestic')}>Domestic Transport</button>
        <button onClick={() => handleSelect('Local')}>Local Transport</button>
      </div>

      {/* 👑 Only visible to master role */}
      {user?.role === 'master' && (
        <div className="master-controls">
          <hr />
          <h4>Master Panel</h4>
          <button onClick={handleRegisterUser}>➕ Register New User</button>
        </div>
      )}
    </div>
  );
};

export default SelectTransport;
