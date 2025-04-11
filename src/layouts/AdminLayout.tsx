import React, { useEffect, useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, LogOut, Home, Package, ShoppingBag, Tag, Users, Settings, Database } from 'lucide-react';
import { useAuth } from '../lib/auth-context';

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const currentPath = location.pathname;
  const [isLoaded, setIsLoaded] = useState(false);

  // Əsas admin səhifəsində geri düyməsini göstərməmək üçün yoxlama
  const showBackButton = currentPath !== '/admin'; 

  // UI animasiyaları üçün
  useEffect(() => {
    // Səhifə yüklənən kimi animasiyaları həyata keçirmək üçün
    setIsLoaded(false);
    setTimeout(() => setIsLoaded(true), 100);
  }, [currentPath]);

  // Çıxış funksiyası
  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
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
      title: 'Parametrlər',
      icon: <Settings className="w-5 h-5 text-gray-500" />
    };
    if (path.startsWith('/admin/catalog')) return { 
      title: 'Kataloq Məlumatları',
      icon: <Database className="w-5 h-5 text-orange-500" />
    };
    
    return { 
      title: 'Admin Panel',
      icon: <Home className="w-5 h-5 text-gray-500" />
    };
  };

  const { title, icon } = getPageInfo(currentPath);

  // CSS Keyframes animasiyaları
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes slideInFromRight {
        0% {
          transform: translateX(20px);
          opacity: 0;
        }
        100% {
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @keyframes scaleIn {
        from { 
          transform: scale(0.98);
          opacity: 0;
        }
        to { 
          transform: scale(1);
          opacity: 1;
        }
      }
      
      .admin-fade-in {
        animation: fadeIn 0.3s ease-out forwards;
      }
      
      .admin-scale-in {
        animation: scaleIn 0.4s ease-out forwards;
      }
      
      .admin-slide-in {
        animation: slideInFromRight 0.4s ease-out forwards;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 h-[65px] flex items-center justify-between border-b border-gray-200 flex-shrink-0 transition-all duration-300 hover:shadow-md">
        <div className="flex items-center">
          {/* Geri Düyməsi */}
          {showBackButton && (
            <Link 
              to="/admin" 
              className="mr-4 p-2 text-gray-500 hover:text-primary transition-all duration-300 hover:scale-110 rounded-full hover:bg-gray-50"
            >
              <ArrowLeft size={20} />
            </Link>
          )}
          
          {/* Səhifə Başlığı */}
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-gray-50">
              {icon}
            </div>
            <h1 className="text-xl font-semibold text-gray-800 tracking-wide">{title}</h1>
          </div>
        </div>
        
        {/* Çıxış düyməsi */}
        <button 
          onClick={handleLogout}
          className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-300 flex items-center group"
        >
          <LogOut size={20} className="mr-1 group-hover:scale-110 transition-transform duration-300" />
          <span className="group-hover:translate-x-[-2px] transition-transform duration-300">Çıxış</span>
        </button>
      </header>

      {/* Səhifə məzmunu */}
      <main 
        className={`flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6 ${isLoaded ? 'admin-slide-in' : 'opacity-0'}`}
        style={{ animationDelay: '0.1s' }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumbs naviqasiyası */}
          {showBackButton && (
            <div className="text-sm text-gray-500 mb-4 admin-fade-in" style={{ animationDelay: '0.2s' }}>
              <Link to="/admin" className="hover:text-primary transition-colors">Admin Panel</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-700">{title}</span>
            </div>
          )}
          
          {/* Alt routların komponentləri */}
          <div className="admin-scale-in" style={{ animationDelay: '0.3s' }}>
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout; 