// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ isLoggedIn: false, user: null });
  const history = useHistory();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/authorized');
        if (response.ok) {
          const user = await response.json();
          setAuth({ isLoggedIn: true, user });
        } else {
          setAuth({ isLoggedIn: false, user: null });
        }
      } catch (error) {
        console.error('Error checking authorization:', error);
        setAuth({ isLoggedIn: false, user: null });
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const user = await response.json();
        setAuth({ isLoggedIn: true, user });
        history.push('/adopt');
      } else {
        console.error('Login failed. Please check your credentials and try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const logout = async () => {
    await fetch('/logout', { method: 'DELETE' });
    setAuth({ isLoggedIn: false, user: null });
    history.push('/');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
