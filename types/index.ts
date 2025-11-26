/**
 * TypeScript type definitions for the Kudos application.
 * 
 * These types ensure type safety across the frontend application.
 */

/**
 * Organization represents a company/organization in the system.
 */
export interface Organization {
  id: number;
  name: string;
  created_at: string;
}

/**
 * User represents a user in the system.
 */
export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  organization: Organization;
}

/**
 * UserMinimal is a simplified user representation used in kudos lists.
 */
export interface UserMinimal {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
}

/**
 * Kudo represents a kudos given from one user to another.
 */
export interface Kudo {
  id: number;
  from_user: UserMinimal;
  to_user: UserMinimal;
  organization: Organization;
  message: string;
  created_at: string;
  is_new: boolean;
  stars: number;
}

/**
 * KudosAllocation tracks weekly kudos availability.
 */
export interface KudosAllocation {
  id: number;
  week_identifier: string;
  remaining_kudos: number;
  last_reset: string;
}

/**
 * JWT token response from login endpoint.
 */
export interface TokenResponse {
  access: string;
  refresh: string;
}

/**
 * Login request credentials.
 */
export interface LoginCredentials {
  username: string;
  password: string;
}

/**
 * Give kudos request body.
 */
export interface GiveKudosRequest {
  to_user_id: number;
  message: string;
  stars: number;
}

/**
 * Remaining kudos response.
 */
export interface RemainingKudosResponse {
  remaining_kudos: number;
  week_identifier: string;
}

/**
 * Received stars response.
 */
export interface ReceivedStarsResponse {
  total_stars_received: number;
  kudos_received_count: number;
  max_possible_stars: number;
  week_identifier: string;
}

/**
 * Paginated API response.
 */
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

/**
 * API error response.
 */
export interface APIError {
  detail?: string;
  [key: string]: any;
}
