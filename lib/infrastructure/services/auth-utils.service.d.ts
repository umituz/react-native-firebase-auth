/**
 * Auth Utils Service
 * Single Responsibility: Provide utility functions for auth state checking
 *
 * SOLID: Single Responsibility - Only handles auth state utilities
 */
import type { Auth, User } from 'firebase/auth';
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
export declare function checkAuthState(auth: Auth | null): AuthCheckResult;
/**
 * Check if user is authenticated (including anonymous)
 */
export declare function isAuthenticated(auth: Auth | null): boolean;
/**
 * Check if user is guest (anonymous)
 */
export declare function isGuest(auth: Auth | null): boolean;
/**
 * Get current user ID (null if not authenticated)
 */
export declare function getCurrentUserId(auth: Auth | null): string | null;
/**
 * Get current user (null if not authenticated)
 */
export declare function getCurrentUser(auth: Auth | null): User | null;
/**
 * Get current authenticated user ID from global auth instance
 * Convenience function that uses getFirebaseAuth()
 */
export declare function getCurrentUserIdFromGlobal(): string | null;
/**
 * Get current user from global auth instance
 * Convenience function that uses getFirebaseAuth()
 */
export declare function getCurrentUserFromGlobal(): User | null;
/**
 * Check if current user is authenticated (including anonymous)
 * Convenience function that uses getFirebaseAuth()
 */
export declare function isCurrentUserAuthenticated(): boolean;
/**
 * Check if current user is guest (anonymous)
 * Convenience function that uses getFirebaseAuth()
 */
export declare function isCurrentUserGuest(): boolean;
//# sourceMappingURL=auth-utils.service.d.ts.map