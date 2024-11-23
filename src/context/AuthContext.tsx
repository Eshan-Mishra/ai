import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string, registrationNo: string) => Promise<void>;
  register: (email: string, password: string, registrationNo: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email: string, password: string, registrationNo: string) => {
    try {
      const response = await fetch('https://ai-seven-alpha.vercel.app/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, registrationNo }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Login failed: ${errorText}`);
        throw new Error(`Login failed: ${errorText}`);
      }

      const data = await response.json();
      console.log('Login successful:', data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (email: string, password: string, registrationNo: string) => {
    try {
      const response = await fetch('https://ai-seven-alpha.vercel.app/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, registrationNo }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Registration failed: ${errorText}`);
      }

      setIsAuthenticated(true);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};