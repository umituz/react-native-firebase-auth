/**
 * Firebase Auth Domain Errors
 *
 * Domain-Driven Design: Error types for Firebase Auth operations
 */
/**
 * Base Firebase Auth Error
 */
export declare class FirebaseAuthError extends Error {
    readonly code?: string | undefined;
    readonly originalError?: unknown | undefined;
    constructor(message: string, code?: string | undefined, originalError?: unknown | undefined);
}
/**
 * Auth Initialization Error
 * Thrown when Firebase Auth fails to initialize
 */
export declare class FirebaseAuthInitializationError extends FirebaseAuthError {
    constructor(message: string, originalError?: unknown);
}
//# sourceMappingURL=FirebaseAuthError.d.ts.map