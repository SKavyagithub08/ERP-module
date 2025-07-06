import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { token, role, transport }
  
  const loginUser = (data) => {
    setUser(data);
    localStorage.setItem('erp-token', data.token);
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('erp-token');
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
