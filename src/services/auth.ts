import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile as firebaseUpdateProfile,
  onAuthStateChanged,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import type { User, UserCredential, AuthError } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';
import type { LoginCredentials, RegisterCredentials, AuthUser } from '../types';

/**
 * Convert Firebase User to our AuthUser type
 */
const mapFirebaseUser = (user: User): AuthUser => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
  photoURL: user.photoURL,
  emailVerified: user.emailVerified,
  phoneNumber: user.phoneNumber,
  providerId: user.providerData[0]?.providerId ?? 'firebase',
  metadata: {
    creationTime: user.metadata.creationTime,
    lastSignInTime: user.metadata.lastSignInTime,
  },
});

/**
 * Handle Firebase Auth errors and return user-friendly messages
 */
const handleAuthError = (error: AuthError): string => {
  console.error('Firebase Auth Error:', error);
  
  const errorMessages: Record<string, string> = {
    'auth/user-not-found': 'No account found with this email address.',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/user-disabled': 'This account has been disabled.',
    'auth/email-already-in-use': 'An account with this email already exists.',
    'auth/weak-password': 'Password should be at least 6 characters.',
    'auth/network-request-failed': 'Network error. Please check your connection.',
    'auth/too-many-requests': 'Too many attempts. Please try again later.',
    'auth/invalid-credential': 'Invalid credentials. Please check your email and password.',
    'auth/operation-not-allowed': 'This sign-in method is not enabled.',
    'auth/popup-closed-by-user': 'Sign-in was cancelled.',
    'auth/popup-blocked': 'Pop-up was blocked by your browser. Please allow pop-ups and try again.',
    'auth/cancelled-popup-request': 'Sign-in was cancelled.',
    'auth/unauthorized-domain': 'This domain is not authorized for OAuth operations.',
    'auth/invalid-api-key': 'Invalid API key. Please check your Firebase configuration.',
    'auth/app-deleted': 'Firebase app was deleted.',
    'auth/invalid-user-token': 'Your session has expired. Please sign in again.',
    'auth/user-token-expired': 'Your session has expired. Please sign in again.',
    'auth/null-user': 'No user is currently signed in.',
    'auth/invalid-tenant-id': 'Invalid tenant ID.',
  };

  return errorMessages[error.code] || `An unexpected error occurred: ${error.code}. Please try again.`;
};

export class AuthService {
  /**
   * Sign in with email and password
   */
  static async signIn({ email, password, rememberMe = false }: LoginCredentials): Promise<AuthUser> {
    try {
      // Set persistence based on remember me
      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
      
      const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
      return mapFirebaseUser(userCredential.user);
    } catch (error) {
      throw new Error(handleAuthError(error as AuthError));
    }
  }

  /**
   * Sign up with email and password
   */
  static async signUp({ firstName, lastName, email, password }: RegisterCredentials): Promise<AuthUser> {
    try {
      const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update user profile with display name
      await firebaseUpdateProfile(userCredential.user, {
        displayName: `${firstName} ${lastName}`.trim(),
      });

      return mapFirebaseUser(userCredential.user);
    } catch (error) {
      throw new Error(handleAuthError(error as AuthError));
    }
  }

  /**
   * Sign in with Google
   */
  static async signInWithGoogle(): Promise<AuthUser> {
    try {
      const userCredential: UserCredential = await signInWithPopup(auth, googleProvider);
      return mapFirebaseUser(userCredential.user);
    } catch (error) {
      throw new Error(handleAuthError(error as AuthError));
    }
  }

  /**
   * Sign out current user
   */
  static async signOut(): Promise<void> {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      throw new Error(handleAuthError(error as AuthError));
    }
  }

  /**
   * Send password reset email
   */
  static async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      throw new Error(handleAuthError(error as AuthError));
    }
  }

  /**
   * Update user profile
   */
  static async updateProfile(data: { displayName?: string; photoURL?: string }): Promise<void> {
    if (!auth.currentUser) {
      throw new Error('No user is currently signed in.');
    }

    try {
      await firebaseUpdateProfile(auth.currentUser, data);
    } catch (error) {
      throw new Error(handleAuthError(error as AuthError));
    }
  }

  /**
   * Subscribe to authentication state changes
   */
  static onAuthStateChanged(callback: (user: AuthUser | null) => void): () => void {
    try {
      return onAuthStateChanged(auth, (user) => {
        callback(user ? mapFirebaseUser(user) : null);
      });
    } catch (error) {
      console.warn('Firebase not properly configured, running in demo mode');
      // Return a no-op unsubscribe function
      return () => {};
    }
  }

  /**
   * Get current user
   */
  static getCurrentUser(): AuthUser | null {
    try {
      return auth.currentUser ? mapFirebaseUser(auth.currentUser) : null;
    } catch (error) {
      console.warn('Firebase not properly configured, running in demo mode');
      return null;
    }
  }
}
