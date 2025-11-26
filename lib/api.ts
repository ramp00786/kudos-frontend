/**
 * API client for the Kudos application backend.
 * 
 * This module configures axios to communicate with the Django backend
 * and provides typed API functions for all endpoints.
 * 
 * Features:
 * - Automatic JWT token inclusion in requests
 * - Token refresh on 401 errors
 * - Centralized error handling
 * - Type-safe API calls
 */

import axios, { AxiosError } from 'axios';
import type {
  User,
  Kudo,
  TokenResponse,
  LoginCredentials,
  GiveKudosRequest,
  RemainingKudosResponse,
  PaginatedResponse,
} from '@/types';

// Base URL for the backend API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor to add JWT access token to requests.
 * 
 * Reads the token from localStorage and adds it to the Authorization header.
 */
api.interceptors.request.use(
  (config) => {
    // Get access token from localStorage
    const accessToken = localStorage.getItem('access_token');
    
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor to handle token refresh on 401 errors.
 * 
 * If a request fails with 401 (Unauthorized), tries to refresh the token
 * and retry the original request.
 */
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;
    
    // If error is 401 and we haven't tried to refresh yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        
        if (!refreshToken) {
          // No refresh token available, redirect to login
          window.location.href = '/';
          return Promise.reject(error);
        }
        
        // Try to refresh the token
        const response = await axios.post(`${API_BASE_URL}/auth/refresh/`, {
          refresh: refreshToken,
        });
        
        const { access } = response.data;
        
        // Save new access token
        localStorage.setItem('access_token', access);
        
        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed, clear tokens and redirect to login
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

// ============================================================================
// Authentication API calls
// ============================================================================

/**
 * Login with username and password.
 * Returns JWT access and refresh tokens.
 */
export async function login(credentials: LoginCredentials): Promise<TokenResponse> {
  const response = await api.post<TokenResponse>('/auth/login/', credentials);
  return response.data;
}

/**
 * Refresh the JWT access token using refresh token.
 */
export async function refreshToken(refresh: string): Promise<{ access: string }> {
  const response = await api.post('/auth/refresh/', { refresh });
  return response.data;
}

// ============================================================================
// User API calls
// ============================================================================

/**
 * Get information about the currently authenticated user.
 */
export async function getCurrentUser(): Promise<User> {
  const response = await api.get<User>('/users/me/');
  return response.data;
}

/**
 * Get all users in the current user's organization.
 * Excludes the current user (since you can't give kudos to yourself).
 */
export async function getOrganizationUsers(): Promise<User[]> {
  const response = await api.get<User[]>('/users/organization/');
  return response.data;
}

// ============================================================================
// Kudos API calls
// ============================================================================

/**
 * Get all kudos received by the current user.
 * Returns paginated results.
 */
export async function getReceivedKudos(): Promise<PaginatedResponse<Kudo>> {
  const response = await api.get<PaginatedResponse<Kudo>>('/kudos/received/');
  return response.data;
}

/**
 * Get all kudos sent by the current user.
 * Returns paginated results.
 */
export async function getSentKudos(): Promise<PaginatedResponse<Kudo>> {
  const response = await api.get<PaginatedResponse<Kudo>>('/kudos/sent/');
  return response.data;
}

/**
 * Give kudos to another user.
 * 
 * @param data - Object containing to_user_id and message
 * @returns The created Kudo object
 */
export async function giveKudos(data: GiveKudosRequest): Promise<Kudo> {
  const response = await api.post<Kudo>('/kudos/give/', data);
  return response.data;
}

/**
 * Get the number of kudos remaining for the current user this week.
 */
export async function getRemainingKudos(): Promise<RemainingKudosResponse> {
  const response = await api.get<RemainingKudosResponse>('/kudos/remaining/');
  return response.data;
}

// ============================================================================
// Export axios instance for custom requests
// ============================================================================

export default api;
