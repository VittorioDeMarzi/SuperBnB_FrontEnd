import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const login = (receivedToken) => {
    setToken(receivedToken);
    localStorage.setItem("token", receivedToken);
    setUser(user);
  };

  const logout = () => {
      setToken(null);
      setUser(null)
    localStorage.removeItem("token");
  };
    
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);
    
  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  return useContext(AuthContext)
}

export default AuthProvider; 