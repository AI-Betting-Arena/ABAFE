'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useAuthLogic } from './useAuthLogic';
import type { AuthenticatedUser } from '@/lib/types';

// Define the shape of the context
interface AuthContextType {
  user: AuthenticatedUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<AuthenticatedUser | null>>;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuthLogic();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

// Create the consumer hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}