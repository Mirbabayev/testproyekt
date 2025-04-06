import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  LogOut, 
  Home, 
  Package, 
  ShoppingBag, 
  Tag, 
  Users, 
  Settings, 
  Database,
  Bell,
  Search,
  BarChart3,
  FileText
} from 'lucide-react';
import { useAuth } from '../../lib/auth-context';

/**
 * Admin header komponenti
 */
export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const currentPath = location.pathname;
  
  // Əsas admin səhifəsində geri düyməsini göstərməmək üçün yoxlama
  const showBackButton = currentPath !== '/admin';

  // Çıxış funksiyası
  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/admin/login');
    } catch (error) {
      console.error('Çıxış xətası:', error);
    }
  };

  // Səhifə başlığı və ikonunu avtomatik təyin etmək üçün
  const getPageInfo = (path: string): {title: string, icon: React.ReactNode} => {
    if (path.startsWith('/admin/products/new')) return { 
      title: 'Yeni Məhsul Əlavə Et',
      icon: <Package className="w-5 h-5 text-green-500" />
    };
    if (path.startsWith('/admin/products')) return { 
      title: 'Məhsullar',
      icon: <Package className="w-5 h-5 text-green-500" />
    };
    if (path.startsWith('/admin/orders')) return { 
      title: 'Sifarişlər',
      icon: <ShoppingBag className="w-5 h-5 text-blue-500" /> 
    };
    if (path.startsWith('/admin/categories')) return { 
      title: 'Kateqoriyalar',
      icon: <Tag className="w-5 h-5 text-purple-500" />
    };
    if (path.startsWith('/admin/users')) return { 
      title: 'İstifadəçilər',
      icon: <Users className="w-5 h-5 text-amber-500" />
    };
    if (path.startsWith('/admin/settings')) return { 
      title: 'Tənzimləmələr',
      icon: <Settings className="w-5 h-5 text-gray-500" />
    };
    if (path.startsWith('/admin/catalog')) return { 
      title: 'Kataloq Məlumatları',
      icon: <Database className="w-5 h-5 text-orange-500" />
    };
    if (path.startsWith('/admin/reports')) return {
      title: 'Hesabatlar',
      icon: <FileText className="w-5 h-5 text-indigo-500" />
    };
    if (path.startsWith('/admin/analytics')) return {
      title: 'Analitika',
      icon: <BarChart3 className="w-5 h-5 text-cyan-500" />
    };
     
    return { 
      title: 'Admin Panel',
      icon: <Home className="w-5 h-5 text-gray-500" />
    };
  };

  const { title, icon } = getPageInfo(currentPath);

  return (
    <header className="bg-white shadow-sm px-4 py-3 h-16 flex items-center justify-between border-b border-gray-200 flex-shrink-0 transition-all duration-300">
      <div className="flex items-center">
        {/* Geri Düyməsi */}
        {showBackButton && (
          <Link 
            to="/admin" 
            className="mr-4 p-2 text-gray-500 hover:text-blue-600 transition-all duration-300 hover:scale-105 rounded-full hover:bg-gray-50"
          >
            <ArrowLeft size={20} />
          </Link>
        )}
         
        {/* Səhifə Başlığı */}
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-full bg-gray-50">
            {icon}
          </div>
          <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
        </div>
      </div>
       
      <div className="flex items-center space-x-4">
        {/* Search Button */}
        <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-full transition-all duration-300">
          <Search size={20} />
        </button>
        
        {/* Notifications */}
        <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-full transition-all duration-300 relative">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
         
        {/* Çıxış düyməsi */}
        <button 
          onClick={handleLogout}
          className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-300 flex items-center group"
        >
          <LogOut size={20} className="group-hover:scale-110 transition-transform duration-300" />
        </button>
      </div>
    </header>
  );
}; 