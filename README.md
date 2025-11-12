# @umituz/react-native-firebase-auth

Firebase Auth initialization and utilities for React Native apps - Platform-agnostic Firebase Auth client.

Built with **SOLID**, **DRY**, and **KISS** principles.

## Installation

```bash
npm install @umituz/react-native-firebase-auth
```

## Peer Dependencies

- `@umituz/react-native-firebase` >= 1.0.0 (Firebase App initialization)
- `firebase` >= 11.0.0
- `react` >= 18.2.0
- `react-native` >= 0.74.0
- `@react-native-async-storage/async-storage` >= 1.21.0

## Features

- ✅ Domain-Driven Design (DDD) architecture
- ✅ SOLID principles (Single Responsibility, Open/Closed, etc.)
- ✅ DRY (Don't Repeat Yourself)
- ✅ KISS (Keep It Simple, Stupid)
- ✅ Singleton pattern for single Auth instance
- ✅ Type-safe Firebase Auth operations
- ✅ Platform-agnostic initialization (Web, iOS, Android)
- ✅ **Security**: No .env reading - configuration must be provided by app
- ✅ Works with Expo and React Native CLI

## Important: Prerequisites

**This package requires Firebase App to be initialized first.**

You must initialize Firebase App using `@umituz/react-native-firebase` before using this package.

## Usage

### 1. Initialize Firebase App First

```typescript
import { initializeFirebase } from '@umituz/react-native-firebase';
import Constants from 'expo-constants';

// Initialize Firebase App first
const config = {
  apiKey: Constants.expoConfig?.extra?.firebaseApiKey || process.env.EXPO_PUBLIC_FIREBASE_API_KEY!,
  authDomain: Constants.expoConfig?.extra?.firebaseAuthDomain || process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: Constants.expoConfig?.extra?.firebaseProjectId || process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID!,
};

const app = initializeFirebase(config);
if (!app) {
  console.error('Failed to initialize Firebase');
}
```

### 2. Initialize Firebase Auth

```typescript
import { initializeFirebaseAuth, getFirebaseAuth } from '@umituz/react-native-firebase-auth';

// Initialize Firebase Auth (after Firebase App is initialized)
const auth = initializeFirebaseAuth();

if (!auth) {
  console.error('Failed to initialize Firebase Auth');
}
```

### 3. Use Firebase Auth

```typescript
import { getFirebaseAuth } from '@umituz/react-native-firebase-auth';
import { signInWithEmailAndPassword } from 'firebase/auth';

// Get Auth instance
const auth = getFirebaseAuth();

// Use Firebase Auth features
await signInWithEmailAndPassword(auth, email, password);
```

### 4. Error Handling

```typescript
import {
  getFirebaseAuth,
  FirebaseAuthInitializationError,
} from '@umituz/react-native-firebase-auth';

try {
  const auth = getFirebaseAuth();
  // Use auth
} catch (error) {
  if (error instanceof FirebaseAuthInitializationError) {
    console.error('Firebase Auth not initialized:', error.message);
  }
}
```

### 5. Check Initialization Status

```typescript
import {
  isFirebaseAuthInitialized,
  getFirebaseAuthInitializationError,
} from '@umituz/react-native-firebase-auth';

if (isFirebaseAuthInitialized()) {
  console.log('Firebase Auth is ready');
} else {
  const error = getFirebaseAuthInitializationError();
  console.error('Initialization error:', error);
}
```

## Architecture

### SOLID Principles

- **Single Responsibility**: Each class has one clear purpose
  - `FirebaseAuthInitializer`: Only initializes Auth
  - `FirebaseAuthClient`: Only orchestrates Auth initialization

- **Open/Closed**: Extensible through configuration, closed for modification

- **Dependency Inversion**: Depends on `@umituz/react-native-firebase` for Firebase App

### DRY (Don't Repeat Yourself)

- Shared initialization logic extracted to specialized classes
- No code duplication across platforms

### KISS (Keep It Simple, Stupid)

- Simple, focused classes
- Clear responsibilities
- Easy to understand and maintain

## API

### Functions

- `initializeFirebaseAuth(config?)`: Initialize Firebase Auth with optional configuration
- `getFirebaseAuth()`: Get Firebase Auth instance (throws if not initialized)
- `isFirebaseAuthInitialized()`: Check if Auth is initialized
- `getFirebaseAuthInitializationError()`: Get initialization error if any
- `resetFirebaseAuthClient()`: Reset Auth client instance (useful for testing)

### Types

- `FirebaseAuthConfig`: Configuration interface
- `Auth`: Firebase Auth type

### Errors

- `FirebaseAuthError`: Base error class
- `FirebaseAuthInitializationError`: Initialization errors

## Integration with @umituz/react-native-auth

This package works seamlessly with `@umituz/react-native-auth`:

```typescript
import { initializeFirebase } from '@umituz/react-native-firebase';
import { initializeFirebaseAuth } from '@umituz/react-native-firebase-auth';
import { initializeAuthService } from '@umituz/react-native-auth';

// 1. Initialize Firebase App
const app = initializeFirebase(config);

// 2. Initialize Firebase Auth
const auth = initializeFirebaseAuth();

// 3. Initialize Auth Service (business logic)
initializeAuthService(auth, {
  minPasswordLength: 6,
  // ... other config
});
```

## Security Best Practices

1. **Never commit credentials**: Use environment variables or secure config files
2. **Use proper Firebase security rules**: Configure Auth rules
3. **Clear user data on logout**: Always clear user data on logout (GDPR compliance)

## License

MIT

