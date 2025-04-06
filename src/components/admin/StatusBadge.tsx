import React, { ReactNode } from 'react';
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  XCircle, 
  User,
  Shield,
  Users
} from 'lucide-react';
import { OrderStatus } from '../../types';
import { UserRole } from '../../lib/auth';

interface BadgeProps {
  children: ReactNode;
  color: string;
  bgColor: string;
  icon?: ReactNode;
}

/**
 * Ümumi badge (nişan) komponenti
 */
export const Badge = ({ children, color, bgColor, icon }: BadgeProps) => {
  return (
    <span 
      className={`px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${bgColor} ${color}`}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </span>
  );
};

/**
 * Sifariş statusu üçün badge
 */
export const OrderStatusBadge = ({ status }: { status: OrderStatus }) => {
  switch (status) {
    case 'completed':
      return (
        <Badge 
          color="text-green-800" 
          bgColor="bg-green-100" 
          icon={<CheckCircle size={12} />}
        >
          Tamamlanıb
        </Badge>
      );
    case 'processing':
      return (
        <Badge 
          color="text-blue-800" 
          bgColor="bg-blue-100" 
          icon={<Clock size={12} />}
        >
          Hazırlanır
        </Badge>
      );
    case 'pending':
      return (
        <Badge 
          color="text-yellow-800" 
          bgColor="bg-yellow-100" 
          icon={<AlertTriangle size={12} />}
        >
          Gözləmədə
        </Badge>
      );
    case 'cancelled':
      return (
        <Badge 
          color="text-red-800" 
          bgColor="bg-red-100" 
          icon={<XCircle size={12} />}
        >
          Ləğv edilib
        </Badge>
      );
    default:
      return null;
  }
};

/**
 * İstifadəçi rolu üçün badge
 */
export const RoleBadge = ({ role }: { role: UserRole }) => {
  switch (role) {
    case UserRole.ADMIN:
      return (
        <Badge 
          color="text-red-800" 
          bgColor="bg-red-100" 
          icon={<Shield size={12} />}
        >
          Admin
        </Badge>
      );
    case UserRole.SELLER:
      return (
        <Badge 
          color="text-blue-800" 
          bgColor="bg-blue-100" 
          icon={<Users size={12} />}
        >
          Satıcı
        </Badge>
      );
    case UserRole.USER:
      return (
        <Badge 
          color="text-gray-800" 
          bgColor="bg-gray-100" 
          icon={<User size={12} />}
        >
          İstifadəçi
        </Badge>
      );
    default:
      return null;
  }
};

/**
 * Aktivlik statusu üçün badge
 */
export const StatusBadge = ({ isActive }: { isActive: boolean }) => {
  return isActive ? (
    <Badge 
      color="text-green-800" 
      bgColor="bg-green-100" 
      icon={<CheckCircle size={12} />}
    >
      Aktiv
    </Badge>
  ) : (
    <Badge 
      color="text-gray-800" 
      bgColor="bg-gray-100" 
      icon={<XCircle size={12} />}
    >
      Deaktiv
    </Badge>
  );
}; 