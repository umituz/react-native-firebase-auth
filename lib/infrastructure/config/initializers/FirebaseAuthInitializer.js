/**
 * Firebase Auth Initializer
 *
 * Single Responsibility: Initialize Firebase Auth instance
 * Platform-agnostic: Works on all platforms (Web, iOS, Android)
 */
import { initializeAuth, getAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
/**
 * Initializes Firebase Auth
 * Platform-agnostic: Works on all platforms (Web, iOS, Android)
 */
export class FirebaseAuthInitializer {
    /**
     * Initialize Firebase Auth with persistence support
     */
    static initialize(app, config) {
        try {
            // Try React Native persistence first (works on all platforms)
            return this.initializeWithPersistence(app, config);
        }
        catch (error) {
            // If already initialized or persistence fails, get existing instance
            if (error.code === 'auth/already-initialized') {
                return getAuth(app);
            }
            /* eslint-disable-next-line no-console */
            if (__DEV__)
                console.warn('Firebase Auth initialization error:', error);
            return getAuth(app);
        }
    }
    static initializeWithPersistence(app, config) {
        try {
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            const authModule = require('firebase/auth');
            const getReactNativePersistence = authModule.getReactNativePersistence;
            if (!getReactNativePersistence) {
                return getAuth(app);
            }
            const storage = config?.authStorage || {
                getItem: (key) => AsyncStorage.getItem(key),
                setItem: (key, value) => AsyncStorage.setItem(key, value),
                removeItem: (key) => AsyncStorage.removeItem(key),
            };
            return initializeAuth(app, {
                persistence: getReactNativePersistence(storage),
            });
        }
        catch {
            return getAuth(app);
        }
    }
}
//# sourceMappingURL=FirebaseAuthInitializer.js.map