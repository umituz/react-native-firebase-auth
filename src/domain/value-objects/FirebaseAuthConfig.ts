/**
 * Firebase Auth Configuration Value Object
 *
 * Domain-Driven Design: Value object for Firebase Auth configuration
 */

/**
 * Firebase Auth Configuration
 * Configuration for initializing Firebase Auth
 */
export interface FirebaseAuthConfig {
  /**
   * Optional: Custom storage adapter for Auth persistence
   * If not provided, AsyncStorage will be used for React Native
   */
  authStorage?: {
    getItem: (key: string) => Promise<string | null>;
    setItem: (key: string, value: string) => Promise<void>;
    removeItem: (key: string) => Promise<void>;
  };
}

