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
import type { FirebaseAuthConfig } from '../../domain/value-objects/FirebaseAuthConfig';
/**
 * Firebase Auth Client Singleton
 * Manages Firebase Auth initialization
 */
declare class FirebaseAuthClientSingleton {
    private static instance;
    private auth;
    private initializationError;
    private constructor();
    /**
     * Get singleton instance
     */
    static getInstance(): FirebaseAuthClientSingleton;
    /**
     * Initialize Firebase Auth
     * Requires Firebase App to be initialized first via @umituz/react-native-firebase
     *
     * @param config - Optional Firebase Auth configuration
     * @returns Firebase Auth instance or null if initialization fails
     */
    initialize(config?: FirebaseAuthConfig): Auth | null;
    /**
     * Get the Firebase Auth instance
     * Auto-initializes if Firebase App is available
     * Returns null if config is not available (offline mode - no error)
     * @returns Firebase Auth instance or null if not initialized
     */
    getAuth(): Auth | null;
    /**
     * Check if Auth is initialized
     */
    isInitialized(): boolean;
    /**
     * Get initialization error if any
     */
    getInitializationError(): string | null;
    /**
     * Reset the Auth client instance
     * Useful for testing
     */
    reset(): void;
}
/**
 * Singleton instance
 */
export declare const firebaseAuthClient: FirebaseAuthClientSingleton;
export declare function initializeFirebaseAuth(config?: FirebaseAuthConfig): Auth | null;
/**
 * Get Firebase Auth instance
 * Auto-initializes if Firebase App is available
 * Returns null if config is not available (offline mode - no error)
 * @returns Firebase Auth instance or null if not initialized
 */
export declare function getFirebaseAuth(): Auth | null;
/**
 * Check if Firebase Auth is initialized
 */
export declare function isFirebaseAuthInitialized(): boolean;
/**
 * Get initialization error if any
 */
export declare function getFirebaseAuthInitializationError(): string | null;
/**
 * Reset Firebase Auth client instance
 * Useful for testing
 */
export declare function resetFirebaseAuthClient(): void;
export type { Auth } from 'firebase/auth';
export type { FirebaseAuthConfig } from '../../domain/value-objects/FirebaseAuthConfig';
//# sourceMappingURL=FirebaseAuthClient.d.ts.map