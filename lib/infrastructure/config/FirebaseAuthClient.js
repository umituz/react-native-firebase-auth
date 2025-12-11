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
import { getFirebaseApp } from '@umituz/react-native-firebase';
import { FirebaseAuthInitializer } from './initializers/FirebaseAuthInitializer';
/**
 * Firebase Auth Client Singleton
 * Manages Firebase Auth initialization
 */
class FirebaseAuthClientSingleton {
    constructor() {
        this.auth = null;
        this.initializationError = null;
        // Private constructor to enforce singleton pattern
    }
    /**
     * Get singleton instance
     */
    static getInstance() {
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
    initialize(config) {
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
            // Return null if Firebase App is not available (offline mode)
            if (!app) {
                // Don't set initializationError - this is normal offline mode
                return null;
            }
            // Initialize Auth
            this.auth = FirebaseAuthInitializer.initialize(app, config);
            return this.auth;
        }
        catch (error) {
            // Only set error if it's a real initialization failure, not just missing config
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            if (!errorMessage.includes('not initialized') && !errorMessage.includes('not available')) {
                this.initializationError = errorMessage;
            }
            return null;
        }
    }
    /**
     * Get the Firebase Auth instance
     * Auto-initializes if Firebase App is available
     * Returns null if config is not available (offline mode - no error)
     * @returns Firebase Auth instance or null if not initialized
     */
    getAuth() {
        // Auto-initialize if not already initialized
        if (!this.auth && !this.initializationError) {
            try {
                // Try to get Firebase App (will auto-initialize if config is available)
                const app = getFirebaseApp();
                if (app) {
                    this.initialize();
                }
            }
            catch {
                // Firebase App not available, return null (offline mode)
                return null;
            }
        }
        // Return null if not initialized (offline mode - no error)
        return this.auth || null;
    }
    /**
     * Check if Auth is initialized
     */
    isInitialized() {
        return this.auth !== null;
    }
    /**
     * Get initialization error if any
     */
    getInitializationError() {
        return this.initializationError;
    }
    /**
     * Reset the Auth client instance
     * Useful for testing
     */
    reset() {
        this.auth = null;
        this.initializationError = null;
    }
}
FirebaseAuthClientSingleton.instance = null;
/**
 * Singleton instance
 */
export const firebaseAuthClient = FirebaseAuthClientSingleton.getInstance();
export function initializeFirebaseAuth(config) {
    return firebaseAuthClient.initialize(config);
}
/**
 * Get Firebase Auth instance
 * Auto-initializes if Firebase App is available
 * Returns null if config is not available (offline mode - no error)
 * @returns Firebase Auth instance or null if not initialized
 */
export function getFirebaseAuth() {
    return firebaseAuthClient.getAuth();
}
/**
 * Check if Firebase Auth is initialized
 */
export function isFirebaseAuthInitialized() {
    return firebaseAuthClient.isInitialized();
}
/**
 * Get initialization error if any
 */
export function getFirebaseAuthInitializationError() {
    return firebaseAuthClient.getInitializationError();
}
/**
 * Reset Firebase Auth client instance
 * Useful for testing
 */
export function resetFirebaseAuthClient() {
    firebaseAuthClient.reset();
}
//# sourceMappingURL=FirebaseAuthClient.js.map