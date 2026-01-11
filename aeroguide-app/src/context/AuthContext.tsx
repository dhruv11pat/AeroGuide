import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { googleLogout } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

interface User {
  id?: string;
  email: string;
  name: string;
  picture: string;
  role?: string;
  sub?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (userData: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('aeroguide_user');
    const savedToken = localStorage.getItem('aeroguide_token');
    
    if (savedUser && savedToken) {
      try {
        // Check if token is expired
        const decoded: any = jwtDecode(savedToken);
        const currentTime = Date.now() / 1000;
        
        if (decoded.exp && decoded.exp < currentTime) {
          // Token expired
          console.log('Token expired, logging out');
          localStorage.removeItem('aeroguide_user');
          localStorage.removeItem('aeroguide_token');
          setUser(null);
          setToken(null);
        } else {
          // Token valid
          setUser(JSON.parse(savedUser));
          setToken(savedToken);
        }
      } catch (error) {
        console.error('Failed to parse saved user or token:', error);
        localStorage.removeItem('aeroguide_user');
        localStorage.removeItem('aeroguide_token');
      }
    }
  }, []);

  const login = (userData: User, authToken: string) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('aeroguide_user', JSON.stringify(userData));
    localStorage.setItem('aeroguide_token', authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('aeroguide_user');
    localStorage.removeItem('aeroguide_token');
    googleLogout();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
