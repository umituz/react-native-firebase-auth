/**
 * Firebase Auth Domain Errors
 *
 * Domain-Driven Design: Error types for Firebase Auth operations
 */
/**
 * Base Firebase Auth Error
 */
export class FirebaseAuthError extends Error {
    constructor(message, code, originalError) {
        super(message);
        this.code = code;
        this.originalError = originalError;
        this.name = 'FirebaseAuthError';
        Object.setPrototypeOf(this, FirebaseAuthError.prototype);
    }
}
/**
 * Auth Initialization Error
 * Thrown when Firebase Auth fails to initialize
 */
export class FirebaseAuthInitializationError extends FirebaseAuthError {
    constructor(message, originalError) {
        super(message, 'AUTH_INITIALIZATION_ERROR', originalError);
        this.name = 'FirebaseAuthInitializationError';
        Object.setPrototypeOf(this, FirebaseAuthInitializationError.prototype);
    }
}
//# sourceMappingURL=FirebaseAuthError.js.map