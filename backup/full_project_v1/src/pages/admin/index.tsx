import { useState, useEffect, ReactNode } from 'react';
import { 
  Users, 
  ShoppingBag, 
  BarChart3, 
  Settings, 
  Package, 
  Tag,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';
import DataManagementPanel from './components/DataManagementPanel';
import { useAuth } from '../../lib/auth-context';
import { UserRole } from '../../lib/auth';
import { Navigate } from 'react-router-dom';
import AdminPanel from './AdminPanel';

// Tabs komponentləri üçün tiplər
interface TabsProps {
  children: ReactNode;
  className?: string;
  [x: string]: any;
}

interface TabsListProps {
  children: ReactNode;
  className?: string;
  [x: string]: any;
}

interface TabsTriggerProps {
  children: ReactNode;
  value: string;
  active: boolean;
  onClick: (value: string) => void;
  className?: string;
  [x: string]: any;
}

interface TabsContentProps {
  children: ReactNode;
  value: string;
  activeValue: string;
  className?: string;
  [x: string]: any;
}

// Sadə Tabs komponentləri
const Tabs = ({ children, className = "", ...props }: TabsProps) => {
  return <div className={`space-y-4 ${className}`} {...props}>{children}</div>;
};

const TabsList = ({ children, className = "", ...props }: TabsListProps) => {
  return <div className={`bg-white border border-gray-200 rounded-md p-1 flex space-x-1 ${className}`} {...props}>{children}</div>;
};

const TabsTrigger = ({ children, value, active, onClick, className = "", ...props }: TabsTriggerProps) => {
  return (
    <button 
      className={`px-3 py-1.5 text-sm font-medium rounded-sm ${active ? 'bg-gray-100 text-gray-800 shadow-sm' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'} ${className}`}
      onClick={() => onClick(value)}
      {...props}
    >
      {children}
    </button>
  );
};

const TabsContent = ({ children, value, activeValue, className = "", ...props }: TabsContentProps) => {
  if (value !== activeValue) return null;
  return <div className={`mt-2 ${className}`} {...props}>{children}</div>;
};

// Admin paneli səhifəsi
export default AdminPanel; 