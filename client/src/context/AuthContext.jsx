import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { useToast } from './ToastContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('shopez_token');
      const savedUser = localStorage.getItem('shopez_user');

      if (token && savedUser) {
        try {
          setUser(JSON.parse(savedUser));
          const freshUser = await api.getMe();
          setUser(freshUser);
          localStorage.setItem('shopez_user', JSON.stringify(freshUser));
        } catch (err) {
          // Token expired or invalid
          console.warn('Session expired or offline fallback.');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const data = await api.login(email, password);
      localStorage.setItem('shopez_token', data.token);
      localStorage.setItem('shopez_user', JSON.stringify(data));
      setUser(data);
      addToast(`Welcome back, ${data.username}!`, 'success');
      return { success: true };
    } catch (err) {
      addToast(err.message || 'Login failed', 'error');
      return { success: false, error: err.message };
    }
  };

  const register = async (username, email, password, usertype = 'customer') => {
    try {
      const data = await api.register(username, email, password, usertype);
      localStorage.setItem('shopez_token', data.token);
      localStorage.setItem('shopez_user', JSON.stringify(data));
      setUser(data);
      addToast(`Account created! Welcome to ShopEZ, ${data.username}!`, 'success');
      return { success: true };
    } catch (err) {
      addToast(err.message || 'Registration failed', 'error');
      return { success: false, error: err.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('shopez_token');
    localStorage.removeItem('shopez_user');
    setUser(null);
    addToast('Logged out successfully', 'info');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAdmin: user?.usertype === 'admin',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
