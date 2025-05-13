import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User } from '../types';
import { users } from '../data/users';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Mock login functionality
  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would validate against a backend
    const user = users.find(u => u.email === email);
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  // Mock signup functionality
  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // In a real app, this would create a new user in the backend
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return false; // User already exists
    }

    // Create a new user (mock implementation)
    const newUser: User = {
      id: `u${users.length + 1}`,
      name,
      email,
      avatar: 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    };
    
    // In a real app, this would be saved to a database
    users.push(newUser);
    
    setCurrentUser(newUser);
    setIsAuthenticated(true);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ currentUser, isAuthenticated, login, signup, logout }}>
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