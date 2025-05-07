import React, { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  const getStatus = async () => {
    try {
      const response = await axios.get("http://localhost:5000/auth/status", {
        withCredentials: true,
      });
      if (response.data.statusCode === 200) {
        setIsLoggedIn(true);
        console.log(response.data.message);
        console.log(response.data.userId);
        setUserId(response.data.userId);
      } else {
        console.log(response.data.message);
        setIsLoggedIn(false);
        setUserId(null);
      }
    } catch {
      console.log("Error in checking auth status");
      setIsLoggedIn(false);
      setUserId(null);
    }
  };

  useEffect(() => {
    getStatus();
  }, []);

  const login = async () => await getStatus();
  const logout = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
