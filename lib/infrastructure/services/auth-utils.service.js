/**
 * Auth Utils Service
 * Single Responsibility: Provide utility functions for auth state checking
 *
 * SOLID: Single Responsibility - Only handles auth state utilities
 */
import { getFirebaseAuth } from '../config/FirebaseAuthClient';
/**
 * Check if user is anonymous
 */
function isAnonymousUser(user) {
    return user.isAnonymous === true;
}
/**
 * Check authentication state
 * Returns comprehensive auth state information
 */
export function checkAuthState(auth) {
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
export function isAuthenticated(auth) {
    return checkAuthState(auth).isAuthenticated;
}
/**
 * Check if user is guest (anonymous)
 */
export function isGuest(auth) {
    return checkAuthState(auth).isGuest;
}
/**
 * Get current user ID (null if not authenticated)
 */
export function getCurrentUserId(auth) {
    return checkAuthState(auth).userId;
}
/**
 * Get current user (null if not authenticated)
 */
export function getCurrentUser(auth) {
    return checkAuthState(auth).currentUser;
}
/**
 * Get current authenticated user ID from global auth instance
 * Convenience function that uses getFirebaseAuth()
 */
export function getCurrentUserIdFromGlobal() {
    const auth = getFirebaseAuth();
    return getCurrentUserId(auth);
}
/**
 * Get current user from global auth instance
 * Convenience function that uses getFirebaseAuth()
 */
export function getCurrentUserFromGlobal() {
    const auth = getFirebaseAuth();
    return getCurrentUser(auth);
}
/**
 * Check if current user is authenticated (including anonymous)
 * Convenience function that uses getFirebaseAuth()
 */
export function isCurrentUserAuthenticated() {
    const auth = getFirebaseAuth();
    return isAuthenticated(auth);
}
/**
 * Check if current user is guest (anonymous)
 * Convenience function that uses getFirebaseAuth()
 */
export function isCurrentUserGuest() {
    const auth = getFirebaseAuth();
    return isGuest(auth);
}
//# sourceMappingURL=auth-utils.service.js.map