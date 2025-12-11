/**
 * Firebase Auth Domain Errors
 *
 * Domain-Driven Design: Error types for Firebase Auth operations
 */

/**
 * Base Firebase Auth Error
 */
export class FirebaseAuthError extends Error {
  constructor(
    message: string,
    public readonly code?: string,
    public readonly originalError?: unknown
  ) {
    super(message);
    this.name = 'FirebaseAuthError';
    Object.setPrototypeOf(this, FirebaseAuthError.prototype);
  }
}

/**
 * Auth Initialization Error
 * Thrown when Firebase Auth fails to initialize
 */
export class FirebaseAuthInitializationError extends FirebaseAuthError {
  constructor(message: string, originalError?: unknown) {
    super(message, 'AUTH_INITIALIZATION_ERROR', originalError);
    this.name = 'FirebaseAuthInitializationError';
    Object.setPrototypeOf(this, FirebaseAuthInitializationError.prototype);
  }
}

