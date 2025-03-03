import React from "react";

const AuthContext = React.createContext({
  role: "",
  token: "",
  user: "",
  login: () => {},
  logout: () => {},
});

// Un provider di test che puoi usare nei test
const TestAuthProvider = ({ children }) => {
  const [role, setRole] = React.useState("USER");
  const [token, setToken] = React.useState("fake-token");
  const [user, setUser] = React.useState("testuser");

  return (
    <AuthContext.Provider
      value={{ role, token, user, login: () => {}, logout: () => {} }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// export const useAuth = () => React.useContext(AuthContext);
const useAuth = () => {
  const auth = React.useContext(AuthContext);
  console.log("Auth context value:", auth);
  return auth;
};

export { TestAuthProvider, AuthContext, useAuth };
