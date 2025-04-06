import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { supabase } from './supabase';
import { getCurrentUser, signOut as localSignOut, UserRole, isAdmin as checkIsAdmin, isSeller as checkIsSeller, hasRole as checkHasRole } from './auth';

type User = {
  id: string;
  email?: string;
  user_metadata?: {
    role?: UserRole;
  };
  role?: UserRole;
} | null;

type AuthContextType = {
  user: User;
  isLoading: boolean;
  refreshUser: () => Promise<void>;
  signOut: () => Promise<void>;
  checkRole: (role: UserRole) => Promise<boolean>;
  isAdmin: () => Promise<boolean>;
  isSeller: () => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  refreshUser: async () => {},
  signOut: async () => {},
  checkRole: async () => false,
  isAdmin: async () => false,
  isSeller: async () => false,
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = async () => {
    try {
      setIsLoading(true);
      console.log('Refreshing user...'); // Debug log
      
      // Try to get Supabase session
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        console.log('Supabase user found:', data.session.user); // Debug log
        const supabaseUser = data.session.user as User;
        setUser(supabaseUser);
        setIsLoading(false);
        return;
      }

      // Try local auth as fallback
      const localUser = await getCurrentUser() as User;
      console.log('Local user found:', localUser); // Debug log
      setUser(localUser);
    } catch (error) {
      console.error('Error getting user: ', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      // Try Supabase sign out first
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      // If Supabase fails, try local sign out
      await localSignOut();
      
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  // Rol yoxlama funksiyası - auth.ts-dən birbaşa istifadə edərək
  const checkRole = async (role: UserRole): Promise<boolean> => {
    return checkHasRole(role);
  };

  useEffect(() => {
    refreshUser();

    // Listen for auth changes with Supabase
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        setUser(null);
      } else if (session?.user) {
        // Supabase-dən gələn istifadəçini düzgün User tipinə cast edirik
        const supabaseUser = session.user as User;
        setUser(supabaseUser);
      }
      setIsLoading(false);
    });

    // Check local storage for auth changes
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'e-parfum-current-user' || event.key === 'supabase.auth.token') {
        refreshUser();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);

    return () => {
      authListener?.subscription.unsubscribe();
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const value = {
    user,
    isLoading,
    refreshUser,
    signOut,
    checkRole,
    isAdmin: checkIsAdmin,
    isSeller: checkIsSeller,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
} 