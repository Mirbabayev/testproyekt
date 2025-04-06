import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Package, 
  ShoppingBag, 
  Users, 
  Settings, 
  Tag, 
  Database,
  BarChart3,
  FileText,
  ChevronRight, 
  ChevronLeft,
  Menu
} from 'lucide-react';

interface NavItem {
  title: string;
  icon: React.ReactNode;
  path: string;
  isActive: (pathname: string) => boolean;
}

/**
 * Admin sidebar komponenti
 */
export const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // Naviqasiya elementləri
  const navItems: NavItem[] = [
    {
      title: 'Dashboard',
      icon: <Home size={20} />,
      path: '/admin',
      isActive: (pathname) => pathname === '/admin'
    },
    {
      title: 'Məhsullar',
      icon: <Package size={20} />,
      path: '/admin/products',
      isActive: (pathname) => pathname.startsWith('/admin/products')
    },
    {
      title: 'Sifarişlər',
      icon: <ShoppingBag size={20} />,
      path: '/admin/orders',
      isActive: (pathname) => pathname.startsWith('/admin/orders')
    },
    {
      title: 'Kateqoriyalar',
      icon: <Tag size={20} />,
      path: '/admin/categories',
      isActive: (pathname) => pathname.startsWith('/admin/categories')
    },
    {
      title: 'İstifadəçilər',
      icon: <Users size={20} />,
      path: '/admin/users',
      isActive: (pathname) => pathname.startsWith('/admin/users')
    },
    {
      title: 'Kataloq Məlumatları',
      icon: <Database size={20} />,
      path: '/admin/catalog',
      isActive: (pathname) => pathname.startsWith('/admin/catalog')
    },
    {
      title: 'Hesabatlar',
      icon: <FileText size={20} />,
      path: '/admin/reports',
      isActive: (pathname) => pathname.startsWith('/admin/reports')
    },
    {
      title: 'Analitika',
      icon: <BarChart3 size={20} />,
      path: '/admin/analytics',
      isActive: (pathname) => pathname.startsWith('/admin/analytics')
    },
    {
      title: 'Tənzimləmələr',
      icon: <Settings size={20} />,
      path: '/admin/settings',
      isActive: (pathname) => pathname.startsWith('/admin/settings')
    }
  ];
  
  // Responsive üçün sidebar siniflər
  const sidebarClasses = `bg-white h-full border-r border-gray-200 transition-all duration-300 overflow-hidden ${
    collapsed ? 'w-16' : 'w-64'
  } ${mobileOpen ? 'fixed inset-y-0 left-0 z-40 shadow-lg' : 'hidden lg:block'}`;
  
  return (
    <>
      {/* Mobile sidebar toggle */}
      <button 
        className="fixed bottom-4 right-4 lg:hidden z-50 p-3 bg-blue-600 text-white rounded-full shadow-lg"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <Menu size={24} />
      </button>
      
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={sidebarClasses}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="px-4 py-5 flex items-center justify-between border-b border-gray-200 h-16">
            <Link to="/admin" className="font-bold text-lg text-gray-900 flex items-center">
              {!collapsed && (
                <span className="truncate">EasyParfum Admin</span>
              )}
              {collapsed && (
                <span className="text-xl">EP</span>
              )}
            </Link>
            <button 
              className="p-1 rounded-md text-gray-500 hover:bg-gray-100 lg:block hidden"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
          </div>
          
          {/* Nav items */}
          <nav className="flex-1 py-4 overflow-y-auto">
            <ul className="space-y-1">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                      item.isActive(location.pathname)
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    <span className={`${collapsed ? '' : 'mr-3'}`}>
                      {item.icon}
                    </span>
                    {!collapsed && (
                      <span className="truncate">{item.title}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                A
              </div>
              {!collapsed && (
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">Admin</p>
                  <p className="text-xs text-gray-500 truncate">admin@example.com</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}; 