/**
 * Firebase Auth Initializer
 *
 * Single Responsibility: Initialize Firebase Auth instance
 * Platform-agnostic: Works on all platforms (Web, iOS, Android)
 */
import type { Auth } from 'firebase/auth';
import type { FirebaseApp } from 'firebase/app';
import type { FirebaseAuthConfig } from '../../../domain/value-objects/FirebaseAuthConfig';
/**
 * Initializes Firebase Auth
 * Platform-agnostic: Works on all platforms (Web, iOS, Android)
 */
export declare class FirebaseAuthInitializer {
    /**
     * Initialize Firebase Auth with persistence support
     */
    static initialize(app: FirebaseApp, config?: FirebaseAuthConfig): Auth;
    private static initializeWithPersistence;
}
//# sourceMappingURL=FirebaseAuthInitializer.d.ts.map