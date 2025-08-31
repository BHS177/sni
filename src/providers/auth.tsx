import { useState, useEffect, type ReactNode } from 'react';
import { AuthContext } from '../contexts/auth';
import { AuthService } from '../services/auth';
import type { AuthUser, AuthContextType, LoginCredentials, RegisterCredentials } from '../types';

interface AuthProviderProps {
  children: ReactNode;
}

export function Auth({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const unsubscribe = AuthService.onAuthStateChanged((authUser) => {
        setUser(authUser);
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (err) {
      console.warn('Firebase not properly configured, running in demo mode');
      setLoading(false);
    }
  }, []);

  const clearError = () => setError(null);

  const signIn = async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      setError(null);
      const user = await AuthService.signIn(credentials);
      setUser(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during sign in');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (credentials: RegisterCredentials) => {
    try {
      setLoading(true);
      setError(null);
      const user = await AuthService.signUp(credentials);
      setUser(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during sign up');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      setError(null);
      const user = await AuthService.signInWithGoogle();
      setUser(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during Google sign in');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      setError(null);
      await AuthService.signOut();
      setUser(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during sign out');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setError(null);
      await AuthService.resetPassword(email);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while sending reset email';
      setError(errorMessage);
      throw err;
    }
  };

  const updateProfile = async (data: { displayName?: string; photoURL?: string }) => {
    try {
      setError(null);
      await AuthService.updateProfile(data);
      // Refresh user data
      const currentUser = AuthService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while updating profile';
      setError(errorMessage);
      throw err;
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    error,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    resetPassword,
    updateProfile,
    clearError,
  };

  return <AuthContext value={value}>{children}</AuthContext>;
}
