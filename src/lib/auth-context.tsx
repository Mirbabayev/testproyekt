import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, LoginCredentials } from '../types/user';
import * as auth from './auth';

interface AuthContextType {
  user: User | null;
  isAdmin: () => Promise<boolean>;
  signOut: () => Promise<void>;
  signIn: (credentials: LoginCredentials) => Promise<User>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      const currentUser = await auth.getCurrentUser();
      setUser(currentUser);
    };

    initAuth();
  }, []);

  useEffect(() => {
    const handleStorageChange = async (event: StorageEvent) => {
      if (event.key === 'e-parfum-current-user') {
        const currentUser = await auth.getCurrentUser();
        setUser(currentUser);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const value = {
    user,
    isAdmin: auth.isAdmin,
    signOut: auth.signOut,
    signIn: async (credentials: LoginCredentials) => {
      const user = await auth.signIn(credentials);
      setUser(user);
      return user;
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 