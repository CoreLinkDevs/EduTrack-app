import React, { createContext, useState, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser, logoutUser, refreshToken as refreshTokenApi } from '../api/auth';
import { setAuthToken } from '../api';

// Define the user shape
interface User {
  id: string;
  name: string;
  email: string;
  [key: string]: any;
}

// Context contract/interface
interface AuthContextType {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<boolean>;
  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  setRefreshToken: (refreshToken: string | null) => void;
}

// Create context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  // Login method
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await loginUser(email, password);
      // Adjust this according to your backend response
      if (res && res.accessToken && res.refreshToken) {
        setToken(res.accessToken);
        setRefreshToken(res.refreshToken);
        setUser(res.user); // if your backend returns user info
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  // Call this when you get a 401 or before making protected requests
  const refreshAccessToken = async () => {
    if (!refreshToken) return false;
    try {
      const res = await refreshTokenApi(refreshToken);
      setToken(res.accessToken);
      setRefreshToken(res.refreshToken); // If backend returns a new refreshToken
      return true;
    } catch (e) {
      setToken(null);
      setRefreshToken(null);
      return false;
    }
  };

  // Logout method
  const logout = async () => {
    try {
      if (token) await logoutUser(token); // if backend supports logout
    } catch (e) {
      console.warn('Logout error', e);
    } finally {
      setUser(null);
      setToken(null);
      setRefreshToken(null);
      setAuthToken(null);
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, refreshToken, login, refreshAccessToken, logout, setToken, setUser, setRefreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
