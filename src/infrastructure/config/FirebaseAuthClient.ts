/**
 * Firebase Auth Client - Infrastructure Layer
 *
 * Domain-Driven Design: Infrastructure implementation of Firebase Auth client
 * Singleton pattern for managing Firebase Auth instance
 *
 * IMPORTANT: This package requires Firebase App to be initialized first.
 * Use @umituz/react-native-firebase to initialize Firebase App.
 *
 * SOLID Principles:
 * - Single Responsibility: Only manages Auth initialization
 * - Open/Closed: Extensible through configuration, closed for modification
 * - Dependency Inversion: Depends on Firebase App from @umituz/react-native-firebase
 */

import type { Auth } from 'firebase/auth';
import { getFirebaseApp } from '@umituz/react-native-firebase';
import { FirebaseAuthInitializationError } from '../../domain/errors/FirebaseAuthError';
import { FirebaseAuthInitializer } from './initializers/FirebaseAuthInitializer';
import type { FirebaseAuthConfig } from '../../domain/value-objects/FirebaseAuthConfig';

/**
 * Firebase Auth Client Singleton
 * Manages Firebase Auth initialization
 */
class FirebaseAuthClientSingleton {
  private static instance: FirebaseAuthClientSingleton | null = null;
  private auth: Auth | null = null;
  private initializationError: string | null = null;

  private constructor() {
    // Private constructor to enforce singleton pattern
  }

  /**
   * Get singleton instance
   */
  static getInstance(): FirebaseAuthClientSingleton {
    if (!FirebaseAuthClientSingleton.instance) {
      FirebaseAuthClientSingleton.instance = new FirebaseAuthClientSingleton();
    }
    return FirebaseAuthClientSingleton.instance;
  }

  /**
   * Initialize Firebase Auth
   * Requires Firebase App to be initialized first via @umituz/react-native-firebase
   *
   * @param config - Optional Firebase Auth configuration
   * @returns Firebase Auth instance or null if initialization fails
   */
  initialize(config?: FirebaseAuthConfig): Auth | null {
    // Return existing instance if already initialized
    if (this.auth) {
      return this.auth;
    }

    // Don't retry if initialization already failed
    if (this.initializationError) {
      return null;
    }

    try {
      // Get Firebase App instance (must be initialized first)
      const app = getFirebaseApp();

      // Initialize Auth
      this.auth = FirebaseAuthInitializer.initialize(app, config);

      return this.auth;
    } catch (error) {
      this.initializationError =
        error instanceof Error
          ? error.message
          : 'Failed to initialize Firebase Auth. Make sure Firebase App is initialized first.';
      return null;
    }
  }

  /**
   * Get the Firebase Auth instance
   * @throws {FirebaseAuthInitializationError} If Auth is not initialized
   */
  getAuth(): Auth {
    if (!this.auth) {
      const errorMsg =
        this.initializationError ||
        'Firebase Auth not initialized. Call initialize() first. Make sure Firebase App is initialized via @umituz/react-native-firebase.';
      throw new FirebaseAuthInitializationError(errorMsg);
    }
    return this.auth;
  }

  /**
   * Check if Auth is initialized
   */
  isInitialized(): boolean {
    return this.auth !== null;
  }

  /**
   * Get initialization error if any
   */
  getInitializationError(): string | null {
    return this.initializationError;
  }

  /**
   * Reset the Auth client instance
   * Useful for testing
   */
  reset(): void {
    this.auth = null;
    this.initializationError = null;
  }
}

/**
 * Singleton instance
 */
export const firebaseAuthClient = FirebaseAuthClientSingleton.getInstance();

/**
 * Initialize Firebase Auth
 * This is the main entry point for applications
 *
 * @param config - Optional Firebase Auth configuration
 * @returns Firebase Auth instance or null if initialization fails
 *
 * @example
 * ```typescript
 * import { initializeFirebase } from '@umituz/react-native-firebase';
 * import { initializeFirebaseAuth } from '@umituz/react-native-firebase-auth';
 *
 * // First, initialize Firebase App
 * const app = initializeFirebase(config);
 *
 * // Then, initialize Firebase Auth
 * const auth = initializeFirebaseAuth();
 * ```
 */
export function initializeFirebaseAuth(
  config?: FirebaseAuthConfig
): Auth | null {
  return firebaseAuthClient.initialize(config);
}

/**
 * Get Firebase Auth instance
 * @throws {FirebaseAuthInitializationError} If Auth is not initialized
 */
export function getFirebaseAuth(): Auth {
  return firebaseAuthClient.getAuth();
}

/**
 * Check if Firebase Auth is initialized
 */
export function isFirebaseAuthInitialized(): boolean {
  return firebaseAuthClient.isInitialized();
}

/**
 * Get initialization error if any
 */
export function getFirebaseAuthInitializationError(): string | null {
  return firebaseAuthClient.getInitializationError();
}

/**
 * Reset Firebase Auth client instance
 * Useful for testing
 */
export function resetFirebaseAuthClient(): void {
  firebaseAuthClient.reset();
}

// Export types
export type { Auth } from 'firebase/auth';
export type { FirebaseAuthConfig } from '../../domain/value-objects/FirebaseAuthConfig';

