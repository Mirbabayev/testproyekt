import { User, UserRole, LoginCredentials, RegisterCredentials } from '../types/user';

// Local storage key
const USER_KEY = 'e-parfum-current-user';

// Default admin user
const DEFAULT_ADMIN: User = {
  id: 'admin',
  email: 'admin@example.com',
  name: 'Admin User',
  role: UserRole.ADMIN,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

// Sign in user
export const signIn = async (credentials: LoginCredentials): Promise<User> => {
  // Burada real API çağırışı olmalıdır
  // İndilik default admin hesabı ilə giriş edək
  if (credentials.email === DEFAULT_ADMIN.email) {
    localStorage.setItem(USER_KEY, JSON.stringify(DEFAULT_ADMIN));
    return DEFAULT_ADMIN;
  }
  throw new Error('Invalid credentials');
};

// Get current user
export const getCurrentUser = async (): Promise<User | null> => {
  const userJson = localStorage.getItem(USER_KEY);
  return userJson ? JSON.parse(userJson) : null;
};

// Check if user is admin
export const isAdmin = async (): Promise<boolean> => {
  const currentUser = await getCurrentUser();
  return currentUser?.role === UserRole.ADMIN;
};

// Sign out user
export const signOut = async (): Promise<void> => {
  localStorage.removeItem(USER_KEY);
};

// Update user role
export const updateUserRole = async (userId: string, role: UserRole): Promise<void> => {
  const currentUser = await getCurrentUser();
  if (currentUser?.id === userId) {
    const updatedUser = { ...currentUser, role };
    localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
  }
};

// Sign up new user
export const signUp = async (credentials: RegisterCredentials): Promise<User> => {
  // Burada real API çağırışı olmalıdır
  // İndilik sadə bir user obyekti yaradaq
  const newUser: User = {
    id: Math.random().toString(36).substr(2, 9),
    email: credentials.email,
    name: credentials.name,
    role: UserRole.USER,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  localStorage.setItem(USER_KEY, JSON.stringify(newUser));
  return newUser;
};

// Delete user account
export const deleteAccount = async (): Promise<void> => {
  // Real API çağırışı burada olmalıdır
  // İndilik sadəcə local storage-dan məlumatları silirik
  localStorage.removeItem(USER_KEY);
};

// Update user profile
export const updateUserProfile = async (profileData: { fullName?: string; phone?: string; address?: string }): Promise<User> => {
  // Real API çağırışı burada olmalıdır
  const currentUser = await getCurrentUser();
  
  if (!currentUser) {
    throw new Error('User not found');
  }
  
  const updatedUser = { 
    ...currentUser,
    name: profileData.fullName || currentUser.name,
    phone: profileData.phone || (currentUser as any).phone || '',
    address: profileData.address || (currentUser as any).address || '',
    updatedAt: new Date().toISOString()
  };
  
  localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
  return updatedUser;
};