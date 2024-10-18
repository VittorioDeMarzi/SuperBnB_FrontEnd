import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  const login = (receivedToken, user, role) => {
    setToken(receivedToken);
    localStorage.setItem("token", receivedToken);
    setUser(user);
    setRole(role);
    localStorage.setItem("user", user);
    localStorage.setItem("role", role);

    console.log(user + ", " + role);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setRole(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    const storedRole = localStorage.getItem("role");

    if (storedToken) {
      setToken(storedToken);
      setRole(storedRole);
      setUser(storedUser);
    }
    /* if (storedToken) {
    
      fetch(import.meta.env.VITE_BACKEND + "/api/v1/auth/user", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then((response) => {
        if (response.ok) {
          setUser(storedUser);
          setRole(storedRole);
          setToken(storedToken);
          console.log(`You are an loggedin as `)
        } else {
          logout();
          
        }
      });
    }  */
  }, []);

  return (
    <AuthContext.Provider value={{ token, user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
