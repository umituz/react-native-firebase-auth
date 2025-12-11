/**
 * Auth Guard Service
 * Single Responsibility: Validate authenticated user access
 *
 * SOLID: Single Responsibility - Only handles auth validation
 * Generic implementation for all React Native apps
 */
/**
 * Auth Guard Service
 * Provides authentication validation for protected operations
 */
export declare class AuthGuardService {
    /**
     * Check if user is authenticated (not guest)
     * @throws Error if user is not authenticated
     */
    requireAuthenticatedUser(): Promise<string>;
    /**
     * Check if user is authenticated (not guest)
     * Returns null if not authenticated instead of throwing
     */
    getAuthenticatedUserId(): Promise<string | null>;
    /**
     * Check if current user is authenticated (not guest)
     */
    isAuthenticated(): boolean;
    /**
     * Check if current user is guest (anonymous)
     */
    isGuest(): boolean;
}
export declare const authGuardService: AuthGuardService;
//# sourceMappingURL=auth-guard.service.d.ts.map