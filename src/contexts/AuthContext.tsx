import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '@/services/authService';

interface User {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string | null;
  level: number;
  coolPoints: number;
  totalCo2Saved: number;
  organizationId: string | null;
  createdAt: string;
  role?: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, fullName: string) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      fetchCurrentUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      // If fetching current user fails, remove the token
      localStorage.removeItem('token');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login(email, password);
      setUser(response.data.user);
      localStorage.setItem('token', response.token);
    } catch (error) {
      // Re-throw the error so it can be handled by the calling component
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const register = async (email: string, password: string, fullName: string) => {
    try {
      const response = await authService.register(email, password, fullName);
      setUser(response.data.user);
      localStorage.setItem('token', response.token);
    } catch (error) {
      // Re-throw the error so it can be handled by the calling component
      throw error;
    }
  };

  const value = {
    user,
    login,
    logout,
    register,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};