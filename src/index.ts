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
 *   import { getFirebaseAuth } from '@umituz/react-native-firebase-auth';
 *
 * IMPORTANT: Use initializeAllFirebaseServices() from @umituz/react-native-firebase to initialize all Firebase services
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
  getFirebaseAuth,
  isFirebaseAuthInitialized,
  getFirebaseAuthInitializationError,
  resetFirebaseAuthClient,
  firebaseAuthClient,
  initializeFirebaseAuth,
} from './infrastructure/config/FirebaseAuthClient';

export type {
  Auth,
} from './infrastructure/config/FirebaseAuthClient';

// Auth Utilities
export {
  checkAuthState,
  isAuthenticated,
  isGuest,
  getCurrentUserId,
  getCurrentUser,
  getCurrentUserIdFromGlobal,
  getCurrentUserFromGlobal,
  isCurrentUserAuthenticated,
  isCurrentUserGuest,
} from './infrastructure/services/auth-utils.service';

export type {
  AuthCheckResult,
} from './infrastructure/services/auth-utils.service';

// =============================================================================
// PRESENTATION LAYER - Hooks
// =============================================================================

export { useFirebaseAuth } from './presentation/hooks/useFirebaseAuth';
export type { UseFirebaseAuthResult } from './presentation/hooks/useFirebaseAuth';

