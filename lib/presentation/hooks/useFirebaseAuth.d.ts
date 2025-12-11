/**
 * useFirebaseAuth Hook
 * React hook for Firebase Auth state management
 *
 * Directly uses Firebase Auth's built-in state management via onAuthStateChanged
 */
import { type User } from "firebase/auth";
export interface UseFirebaseAuthResult {
    /** Current authenticated user from Firebase Auth */
    user: User | null;
    /** Whether auth state is loading (initial check) */
    loading: boolean;
    /** Whether Firebase Auth is initialized */
    initialized: boolean;
}
/**
 * Hook for Firebase Auth state management
 *
 * Directly uses Firebase Auth's built-in state management.
 * No additional state management layer needed.
 *
 * @example
 * ```typescript
 * const { user, loading } = useFirebaseAuth();
 * ```
 */
export declare function useFirebaseAuth(): UseFirebaseAuthResult;
//# sourceMappingURL=useFirebaseAuth.d.ts.map