// İstifadəçi tipləri
import { UserRole } from "../lib/auth";

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: UserRole;
  createdAt: string;
  status: 'active' | 'inactive';
  phoneNumber?: string;
  address?: string;
  orders?: string[];
}

// İstifadəçi filtri tipi
export interface UserFilter {
  role?: UserRole;
  status?: 'active' | 'inactive';
  dateFrom?: string;
  dateTo?: string;
}

// İstifadəçi sıralama tipi
export interface UserSort {
  field: 'email' | 'createdAt' | 'role';
  direction: 'asc' | 'desc';
} 