/**
 * Auth Utils Service
 * Single Responsibility: Provide utility functions for auth state checking
 *
 * SOLID: Single Responsibility - Only handles auth state utilities
 */

import type { Auth, User } from 'firebase/auth';
import { getFirebaseAuth } from '../config/FirebaseAuthClient';

/**
 * Check if user is anonymous
 */
function isAnonymousUser(user: User): boolean {
  return user.isAnonymous === true;
}

/**
 * Auth check result interface
 */
export interface AuthCheckResult {
  isAuthenticated: boolean;
  isAnonymous: boolean;
  isGuest: boolean;
  currentUser: User | null;
  userId: string | null;
}

/**
 * Check authentication state
 * Returns comprehensive auth state information
 */
export function checkAuthState(auth: Auth | null): AuthCheckResult {
  if (!auth) {
    return {
      isAuthenticated: false,
      isAnonymous: false,
      isGuest: false,
      currentUser: null,
      userId: null,
    };
  }

  const currentUser = auth.currentUser;

  if (!currentUser) {
    return {
      isAuthenticated: false,
      isAnonymous: false,
      isGuest: false,
      currentUser: null,
      userId: null,
    };
  }

  const anonymous = isAnonymousUser(currentUser);

  return {
    isAuthenticated: true,
    isAnonymous: anonymous,
    isGuest: anonymous,
    currentUser,
    userId: currentUser.uid,
  };
}

/**
 * Check if user is authenticated (including anonymous)
 */
export function isAuthenticated(auth: Auth | null): boolean {
  return checkAuthState(auth).isAuthenticated;
}

/**
 * Check if user is guest (anonymous)
 */
export function isGuest(auth: Auth | null): boolean {
  return checkAuthState(auth).isGuest;
}

/**
 * Get current user ID (null if not authenticated)
 */
export function getCurrentUserId(auth: Auth | null): string | null {
  return checkAuthState(auth).userId;
}

/**
 * Get current user (null if not authenticated)
 */
export function getCurrentUser(auth: Auth | null): User | null {
  return checkAuthState(auth).currentUser;
}

/**
 * Get current authenticated user ID from global auth instance
 * Convenience function that uses getFirebaseAuth()
 */
export function getCurrentUserIdFromGlobal(): string | null {
  const auth = getFirebaseAuth();
  return getCurrentUserId(auth);
}

/**
 * Get current user from global auth instance
 * Convenience function that uses getFirebaseAuth()
 */
export function getCurrentUserFromGlobal(): User | null {
  const auth = getFirebaseAuth();
  return getCurrentUser(auth);
}

/**
 * Check if current user is authenticated (including anonymous)
 * Convenience function that uses getFirebaseAuth()
 */
export function isCurrentUserAuthenticated(): boolean {
  const auth = getFirebaseAuth();
  return isAuthenticated(auth);
}

/**
 * Check if current user is guest (anonymous)
 * Convenience function that uses getFirebaseAuth()
 */
export function isCurrentUserGuest(): boolean {
  const auth = getFirebaseAuth();
  return isGuest(auth);
}

