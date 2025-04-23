// src/contexts/AuthContext.jsx
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [connected, setConnected] = useState(false);

  const connect = () => {
    console.log("Connected!"); // Just to confirm it's working
    setConnected(true);
  };

  const disconnect = () => {
    setConnected(false);
  };

  return (
    <AuthContext.Provider value={{ connected, connect, disconnect }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
