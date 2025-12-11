/**
 * useFirebaseAuth Hook
 * React hook for Firebase Auth state management
 *
 * Directly uses Firebase Auth's built-in state management via onAuthStateChanged
 */
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getFirebaseAuth, isFirebaseAuthInitialized } from "../../infrastructure/config/FirebaseAuthClient";
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
export function useFirebaseAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [initialized, setInitialized] = useState(false);
    useEffect(() => {
        // Check if Firebase Auth is initialized
        const isInitialized = isFirebaseAuthInitialized();
        setInitialized(isInitialized);
        if (!isInitialized) {
            setLoading(false);
            setUser(null);
            return;
        }
        try {
            const auth = getFirebaseAuth();
            if (!auth) {
                setUser(null);
                setLoading(false);
                return;
            }
            // Subscribe to auth state changes
            const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
                setUser(currentUser);
                setLoading(false);
            });
            // Set initial state
            setUser(auth.currentUser);
            setLoading(false);
            return () => {
                unsubscribe();
            };
        }
        catch (error) {
            // Firebase Auth not initialized or error
            setUser(null);
            setLoading(false);
            return () => { };
        }
    }, []);
    return {
        user,
        loading,
        initialized,
    };
}
//# sourceMappingURL=useFirebaseAuth.js.map