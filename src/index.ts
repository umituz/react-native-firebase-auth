/**
 * React Native Firebase Auth - Public API
 *
 * Domain-Driven Design (DDD) Architecture
 *
 * This is the SINGLE SOURCE OF TRUTH for all Firebase Auth operations.
 * ALL imports from the Firebase Auth package MUST go through this file.
 *
 * Architecture:
 * - domain: Entities, value objects, errors (business logic)
 * - application: Ports (interfaces)
 * - infrastructure: Firebase Auth client implementation
 *
 * Usage:
 *   import { initializeFirebaseAuth, getFirebaseAuth } from '@umituz/react-native-firebase-auth';
 *
 * IMPORTANT: Firebase App must be initialized first via @umituz/react-native-firebase
 */

// =============================================================================
// DOMAIN LAYER - Business Logic
// =============================================================================

export {
  FirebaseAuthError,
  FirebaseAuthInitializationError,
} from './domain/errors/FirebaseAuthError';

export type { FirebaseAuthConfig } from './domain/value-objects/FirebaseAuthConfig';

// =============================================================================
// INFRASTRUCTURE LAYER - Implementation
// =============================================================================

export {
  initializeFirebaseAuth,
  getFirebaseAuth,
  isFirebaseAuthInitialized,
  getFirebaseAuthInitializationError,
  resetFirebaseAuthClient,
  firebaseAuthClient,
} from './infrastructure/config/FirebaseAuthClient';

export type {
  Auth,
} from './infrastructure/config/FirebaseAuthClient';

// =============================================================================
// PRESENTATION LAYER - Hooks
// =============================================================================

export { useFirebaseAuth } from './presentation/hooks/useFirebaseAuth';
export type { UseFirebaseAuthResult } from './presentation/hooks/useFirebaseAuth';

