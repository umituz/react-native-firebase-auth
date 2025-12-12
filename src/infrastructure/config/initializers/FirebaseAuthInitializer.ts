/**
 * Firebase Auth Initializer
 *
 * Single Responsibility: Initialize Firebase Auth instance
 * Platform-agnostic: Works on all platforms (Web, iOS, Android)
 */

import { initializeAuth, getAuth } from 'firebase/auth';
import type { Auth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { FirebaseApp } from 'firebase/app';
import type { FirebaseAuthConfig } from '../../../domain/value-objects/FirebaseAuthConfig';

/**
 * Initializes Firebase Auth
 * Platform-agnostic: Works on all platforms (Web, iOS, Android)
 */
export class FirebaseAuthInitializer {
  /**
   * Initialize Firebase Auth with persistence support
   */
  static initialize(app: FirebaseApp, config?: FirebaseAuthConfig): Auth {
    try {
      // Try React Native persistence first (works on all platforms)
      return this.initializeWithPersistence(app, config);
    } catch (error: any) {
      // If already initialized or persistence fails, get existing instance
      if (error.code === 'auth/already-initialized') {
        return getAuth(app);
      }

      if (__DEV__) console.warn('Firebase Auth initialization error:', error);
      return getAuth(app);
    }
  }

  private static initializeWithPersistence(
    app: FirebaseApp,
    config?: FirebaseAuthConfig
  ): Auth {
    try {
      const authModule = require('firebase/auth');
      const getReactNativePersistence = authModule.getReactNativePersistence;

      if (!getReactNativePersistence) {
        return getAuth(app);
      }

      const storage = config?.authStorage || {
        getItem: (key: string) => AsyncStorage.getItem(key),
        setItem: (key: string, value: string) => AsyncStorage.setItem(key, value),
        removeItem: (key: string) => AsyncStorage.removeItem(key),
      };

      return initializeAuth(app, {
        persistence: getReactNativePersistence(storage),
      });
    } catch {
      return getAuth(app);
    }
  }
}

