/**
 * Authentication Context Provider
 * 
 * Manages user authentication state across the application.
 * Provides login, logout, and user data to all components.
 * 
 * Why use Context instead of prop drilling?
 * - Centralized auth state management
 * - Easy access from any component
 * - Automatic token management
 * - Clean component code
 */

'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { login as apiLogin, getCurrentUser } from '@/lib/api';
import type { User, LoginCredentials } from '@/types';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Hook to use the auth context.
 * Throws error if used outside AuthProvider.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

/**
 * Auth Provider Component
 * 
 * Wrap your app with this to provide auth state to all components.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  /**
   * Load user data on mount if tokens exist.
   */
  useEffect(() => {
    const loadUser = async () => {
      const accessToken = localStorage.getItem('access_token');
      
      if (!accessToken) {
        setLoading(false);
        return;
      }

      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (error) {
        // Token invalid or expired, clear it
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  /**
   * Login function
   * 
   * @param credentials - Username and password
   */
  const login = async (credentials: LoginCredentials) => {
    try {
      // Get JWT tokens from backend
      const tokens = await apiLogin(credentials);
      
      // Store tokens in localStorage
      localStorage.setItem('access_token', tokens.access);
      localStorage.setItem('refresh_token', tokens.refresh);
      
      // Get user data
      const userData = await getCurrentUser();
      setUser(userData);
      
      // Show success message
      toast.success(`Welcome back, ${userData.first_name || userData.username}!`);
      
      // Redirect to dashboard
      router.push('/dashboard');
    } catch (error: any) {
      // Handle login errors
      const errorMessage = error.response?.data?.detail || 'Invalid username or password';
      toast.error(errorMessage);
      throw error;
    }
  };

  /**
   * Logout function
   * 
   * Clears tokens and user data, redirects to login.
   */
  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
    toast.success('Logged out successfully');
    router.push('/');
  };

  /**
   * Refresh user data
   * 
   * Useful after giving kudos to update remaining count.
   */
  const refreshUser = async () => {
    try {
      const userData = await getCurrentUser();
      setUser(userData);
    } catch (error) {
      console.error('Failed to refresh user:', error);
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
