import { supabase } from './supabase';

// Simulated local storage of users for demo purposes
const LOCAL_STORAGE_USERS_KEY = 'e-parfum-users';
const LOCAL_STORAGE_CURRENT_USER_KEY = 'e-parfum-current-user';

// Rollar
export enum UserRole {
  USER = 'user',
  SELLER = 'seller',
  ADMIN = 'admin'
}

interface LocalUser {
  id: string;
  email: string;
  password: string;
  createdAt: string;
  role: UserRole;
}

// Helper to get users from local storage
const getLocalUsers = (): LocalUser[] => {
  const users = localStorage.getItem(LOCAL_STORAGE_USERS_KEY);
  if (!users) {
    // Əvvəlcədən təyin edilmiş admin istifadəçisi
    const defaultAdmin: LocalUser = {
      id: 'admin-1',
      email: 'admin@example.com',
      password: 'admin123',
      createdAt: new Date().toISOString(),
      role: UserRole.ADMIN
    };
    saveLocalUsers([defaultAdmin]);
    console.log('Created default admin:', defaultAdmin); // Debug log
    return [defaultAdmin];
  }
  return JSON.parse(users);
};

// Helper to save users to local storage
const saveLocalUsers = (users: LocalUser[]): void => {
  localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(users));
};

export async function signUp(email: string, password: string, role: UserRole = UserRole.USER) {
  try {
    // Try to use Supabase first
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role: role
        }
      }
    });

    if (!error) {
      return data;
    }

    // If Supabase fails, fallback to local simulation
    console.log('Using local auth simulation instead');

    // Check if user already exists
    const users = getLocalUsers();
    const existingUser = users.find(user => user.email === email);
    
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Create new user
    const newUser: LocalUser = {
      id: `local-${Date.now()}`,
      email,
      password, // In a real app, this would be hashed!
      createdAt: new Date().toISOString(),
      role: role
    };

    users.push(newUser);
    saveLocalUsers(users);

    return { user: { id: newUser.id, email: newUser.email, role: newUser.role }};
  } catch (error) {
    console.error('Sign up error:', error);
    throw error;
  }
}

export async function signIn(email: string, password: string) {
  try {
    // Try to use Supabase first
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!error) {
      return data;
    }

    // If Supabase fails, fallback to local simulation
    console.log('Using local auth simulation instead');

    // Find user
    const users = getLocalUsers();
    console.log('Local users:', users); // Debug log
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid login credentials');
    }

    // Store current user
    const { password: _, ...userWithoutPassword } = user;
    localStorage.setItem(LOCAL_STORAGE_CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
    console.log('Stored user:', userWithoutPassword); // Debug log

    return { 
      user: userWithoutPassword,
      session: { 
        access_token: `fake-token-${Date.now()}`,
        user: userWithoutPassword
      }
    };
  } catch (error) {
    console.error('Sign in error:', error);
    throw error;
  }
}

// İstifadəçinin rolunu yoxlayan funksiya
export async function hasRole(requiredRole: UserRole): Promise<boolean> {
  try {
    const currentUser = await getCurrentUser();
    
    if (!currentUser) return false;
    
    // Supabase istifadəçisinin metadatasından rolu yoxlayırıq
    if (currentUser.user_metadata && currentUser.user_metadata.role) {
      return currentUser.user_metadata.role === requiredRole;
    }
    
    // Local istifadəçilər üçün
    if ('role' in currentUser) {
      return (currentUser as any).role === requiredRole;
    }
    
    return false;
  } catch (error) {
    console.error('Error checking role:', error);
    return false;
  }
}

// İstifadəçinin admin olduğunu yoxlayan funksiya
export async function isAdmin(): Promise<boolean> {
  return hasRole(UserRole.ADMIN);
}

// İstifadəçinin satıcı olduğunu yoxlayan funksiya
export async function isSeller(): Promise<boolean> {
  return hasRole(UserRole.SELLER);
}

export async function signOut() {
  try {
    // Try Supabase first
    const { error } = await supabase.auth.signOut();
    
    if (!error) {
      return;
    }

    // If Supabase fails, fallback to local simulation
    console.log('Using local auth simulation instead');
    localStorage.removeItem(LOCAL_STORAGE_CURRENT_USER_KEY);
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
}

export async function getCurrentUser() {
  try {
    // Try Supabase first
    const { data, error } = await supabase.auth.getSession();
    
    if (!error && data.session) {
      return data.session.user;
    }

    // If Supabase fails, fallback to local simulation
    console.log('Using local auth simulation instead');
    const user = localStorage.getItem(LOCAL_STORAGE_CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
}

export async function deleteAccount() {
  try {
    // Try Supabase first
    const { error } = await supabase.auth.admin.deleteUser((await getCurrentUser())?.id);
    
    if (!error) {
      await signOut();
      return;
    }

    // If Supabase fails, fallback to local simulation
    console.log('Using local auth simulation instead');
    
    // Get current user
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      throw new Error('No user is logged in');
    }
    
    // Remove user from the users list
    const users = getLocalUsers();
    const updatedUsers = users.filter(user => user.id !== currentUser.id);
    saveLocalUsers(updatedUsers);
    
    // Sign out and clear local storage
    localStorage.removeItem(LOCAL_STORAGE_CURRENT_USER_KEY);
    
    // Explicitly clear token and any other auth data
    localStorage.removeItem('token');
    localStorage.removeItem('supabase.auth.token');
    
    // Force clear session
    supabase.auth.signOut();
  } catch (error) {
    console.error('Delete account error:', error);
    throw error;
  }
}

// İstifadəçinin rolunu dəyişmək üçün funksiya
export async function changeUserRole(userId: string, newRole: UserRole): Promise<boolean> {
  try {
    // Supabase ilə əvvəlcə
    const { data, error } = await supabase.auth.admin.updateUserById(userId, {
      user_metadata: { role: newRole }
    });
    
    if (!error && data) {
      return true;
    }
    
    // Local istifadəçilər üçün
    const users = getLocalUsers();
    const userIndex = users.findIndex(user => user.id === userId);
    
    if (userIndex === -1) {
      return false;
    }
    
    users[userIndex].role = newRole;
    saveLocalUsers(users);
    
    // Cari istifadəçinin rolunu dəyişdirmiş oluruqsa, local storage-i yeniləyək
    const currentUser = await getCurrentUser();
    if (currentUser && currentUser.id === userId) {
      const updatedCurrentUser = { ...currentUser, role: newRole };
      localStorage.setItem(LOCAL_STORAGE_CURRENT_USER_KEY, JSON.stringify(updatedCurrentUser));
    }
    
    return true;
  } catch (error) {
    console.error('Change user role error:', error);
    return false;
  }
}