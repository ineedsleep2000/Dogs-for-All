// src/contexts/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isLoggedIn: false,
    user: null,
  });

  useEffect(() => {
    const checkAuthorization = async () => {
      const response = await fetch('/authorized');
      if (response.ok) {
        const user = await response.json();
        setAuth({
          isLoggedIn: true,
          user,
        });
      }
    };

    checkAuthorization();
  }, []);

  const login = (user) => {
    setAuth({
      isLoggedIn: true,
      user,
    });
  };

  const logout = async () => {
    const response = await fetch('/logout', {
      method: 'DELETE',
    });
    if (response.ok) {
      setAuth({
        isLoggedIn: false,
        user: null,
      });
    }
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
