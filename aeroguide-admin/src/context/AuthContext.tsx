'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';

interface User {
  id: string;
  email: string;
  name: string;
  picture: string | null;
  role: 'user' | 'admin';
}

interface JWTPayload {
  userId: string;
  email: string;
  role: 'user' | 'admin';
  exp: number;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAdmin: boolean;
  isLoading: boolean;
  login: (credential: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored token on mount
    const storedToken = localStorage.getItem('aeroguide_admin_token');
    const storedUser = localStorage.getItem('aeroguide_admin_user');

    if (storedToken && storedUser) {
      try {
        const decoded = jwtDecode<JWTPayload>(storedToken);
        const isExpired = decoded.exp * 1000 < Date.now();

        if (!isExpired && decoded.role === 'admin') {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        } else {
          // Token expired or not admin, clear storage
          localStorage.removeItem('aeroguide_admin_token');
          localStorage.removeItem('aeroguide_admin_user');
        }
      } catch {
        localStorage.removeItem('aeroguide_admin_token');
        localStorage.removeItem('aeroguide_admin_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (credential: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch(`${API_URL}/api/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credential }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || 'Authentication failed' };
      }

      // Check if user is admin
      if (data.user.role !== 'admin') {
        return { success: false, error: 'Admin access required. Please contact support.' };
      }

      // Store token and user
      localStorage.setItem('aeroguide_admin_token', data.token);
      localStorage.setItem('aeroguide_admin_user', JSON.stringify(data.user));

      setToken(data.token);
      setUser(data.user);

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('aeroguide_admin_token');
    localStorage.removeItem('aeroguide_admin_user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAdmin: user?.role === 'admin',
        isLoading,
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
