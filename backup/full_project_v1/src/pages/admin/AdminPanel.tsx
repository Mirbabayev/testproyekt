import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Users, 
  ShoppingBag, 
  BarChart3, 
  Settings, 
  Package, 
  Tag,
  Home,
  LogOut,
  PlusCircle,
  Search,
  Eye,
  Database
} from 'lucide-react';
import { useAuth } from '../../lib/auth-context';

const AdminPanel = () => {
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const [isAdminUser, setIsAdminUser] = useState<boolean | null>(null);
  const [animationComplete, setAnimationComplete] = useState(false);

  // Demo məlumatlar
  const stats = {
    totalSales: "18,543",
    totalOrders: 156,
    totalProducts: 89,
    totalUsers: 1234
  };

  // Son sifarişlər
  const recentOrders = [
    { id: "1", customer: "Anar Məmmədov", total: "150.00", date: "13.05.2024", status: "Tamamlanıb" },
    { id: "2", customer: "Nigar Əliyeva", total: "240.00", date: "12.05.2024", status: "Gözləmədə" },
    { id: "3", customer: "Orxan Həsənli", total: "280.00", date: "10.05.2024", status: "Hazırlanır" }
  ];

  // Son məhsullar
  const recentProducts = [
    { id: "1", name: "Bleu de Chanel", brand: "Chanel", price: "245.00", stock: 15 },
    { id: "2", name: "Sauvage", brand: "Dior", price: "220.00", stock: 8 },
    { id: "3", name: "Black Orchid", brand: "Tom Ford", price: "320.00", stock: 5 }
  ];

  // İstifadəçinin admin olduğunu yoxlayırıq
  useEffect(() => {
    const checkAdmin = async () => {
      const hasAdminRole = await isAdmin();
      setIsAdminUser(hasAdminRole);
      
      if (!hasAdminRole) {
        navigate('/unauthorized');
      }
    };
    
    checkAdmin();
  }, [isAdmin, navigate]);

  // CSS Keyframes üçün stil əlavə edirik
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes scaleIn {
        from {
          opacity: 0;
          transform: scale(0.95);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
      
      @keyframes slideInRight {
        from {
          opacity: 0;
          transform: translateX(20px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      .admin-card {
        animation: fadeInUp 0.5s ease-out forwards;
        opacity: 0;
      }
      
      .stats-card {
        animation: scaleIn 0.4s ease-out forwards;
        opacity: 0;
      }
      
      .recent-section {
        animation: slideInRight 0.6s ease-out forwards;
        opacity: 0;
      }
    `;
    document.head.appendChild(style);

    // Animasiyaları tamamlandıqdan sonra state-i yeniləyirik
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 800);
    
    return () => {
      document.head.removeChild(style);
      clearTimeout(timer);
    };
  }, []);

  // Admin yoxlanılması hələ başa çatmayıbsa gözləyirik
  if (isAdminUser === null) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full mb-4"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Əsas naviqasiya kartları */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        <Link 
          to="/" 
          className="admin-card bg-white rounded-xl shadow-sm p-4 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-all duration-500 min-h-[100px] border border-gray-100 hover:shadow-md hover:-translate-y-1 hover:border-gray-200"
          style={{ animationDelay: '0.1s' }}
        >
          <Home className="h-8 w-8 text-gray-600 mb-2 transform transition-all duration-500 group-hover:scale-110" />
          <span className="text-sm font-medium text-gray-700">Ana Səhifə</span>
        </Link>

        <Link 
          to="/admin/products" 
          className="admin-card bg-white rounded-xl shadow-sm p-4 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-all duration-500 min-h-[100px] border border-gray-100 hover:shadow-md hover:-translate-y-1 hover:border-gray-200"
          style={{ animationDelay: '0.15s' }}
        >
          <Package className="h-8 w-8 text-green-600 mb-2 transform transition-all duration-500 group-hover:scale-110" />
          <span className="text-sm font-medium text-gray-700">Məhsullar</span>
        </Link>

        <Link 
          to="/admin/orders" 
          className="admin-card bg-white rounded-xl shadow-sm p-4 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-all duration-500 min-h-[100px] border border-gray-100 hover:shadow-md hover:-translate-y-1 hover:border-gray-200"
          style={{ animationDelay: '0.2s' }}
        >
          <ShoppingBag className="h-8 w-8 text-blue-600 mb-2 transform transition-all duration-500 group-hover:scale-110" />
          <span className="text-sm font-medium text-gray-700">Sifarişlər</span>
        </Link>

        <Link 
          to="/admin/categories" 
          className="admin-card bg-white rounded-xl shadow-sm p-4 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-all duration-500 min-h-[100px] border border-gray-100 hover:shadow-md hover:-translate-y-1 hover:border-gray-200"
          style={{ animationDelay: '0.25s' }}
        >
          <Tag className="h-8 w-8 text-purple-600 mb-2 transform transition-all duration-500 group-hover:scale-110" />
          <span className="text-sm font-medium text-gray-700">Kateqoriyalar</span>
        </Link>

        <Link 
          to="/admin/catalog" 
          className="admin-card bg-white rounded-xl shadow-sm p-4 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-all duration-500 min-h-[100px] border border-gray-100 hover:shadow-md hover:-translate-y-1 hover:border-gray-200"
          style={{ animationDelay: '0.3s' }}
        >
          <Database className="h-8 w-8 text-orange-600 mb-2 transform transition-all duration-500 group-hover:scale-110" />
          <span className="text-sm font-medium text-gray-700">Kataloq Məlumatları</span>
        </Link>

        <Link 
          to="/admin/users" 
          className="admin-card bg-white rounded-xl shadow-sm p-4 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-all duration-500 min-h-[100px] border border-gray-100 hover:shadow-md hover:-translate-y-1 hover:border-gray-200"
          style={{ animationDelay: '0.35s' }}
        >
          <Users className="h-8 w-8 text-amber-600 mb-2 transform transition-all duration-500 group-hover:scale-110" />
          <span className="text-sm font-medium text-gray-700">İstifadəçilər</span>
        </Link>

        <Link 
          to="/admin/settings" 
          className="admin-card bg-white rounded-xl shadow-sm p-4 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-all duration-500 min-h-[100px] border border-gray-100 hover:shadow-md hover:-translate-y-1 hover:border-gray-200 sm:col-span-3 col-span-2"
          style={{ animationDelay: '0.4s' }}
        >
          <Settings className="h-8 w-8 text-gray-600 mb-2 transform transition-all duration-500 group-hover:scale-110" />
          <span className="text-sm font-medium text-gray-700">Tənzimləmələr</span>
        </Link>
      </div>

      {/* Statistika kartları */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div 
          className="stats-card bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-500 border border-gray-100 hover:border-gray-200 transform hover:-translate-y-1 group"
          style={{ animationDelay: '0.45s' }}
        >
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-xl group-hover:bg-blue-200 transition-colors duration-500">
              <ShoppingBag className="h-6 w-6 text-blue-600 group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Sifarişlər</p>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">{stats.totalOrders}</h3>
            </div>
          </div>
        </div>
        
        <div 
          className="stats-card bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-500 border border-gray-100 hover:border-gray-200 transform hover:-translate-y-1 group"
          style={{ animationDelay: '0.5s' }}
        >
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-xl group-hover:bg-green-200 transition-colors duration-500">
              <Package className="h-6 w-6 text-green-600 group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Məhsullar</p>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-700 transition-colors">{stats.totalProducts}</h3>
            </div>
          </div>
        </div>
        
        <div 
          className="stats-card bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-500 border border-gray-100 hover:border-gray-200 transform hover:-translate-y-1 group"
          style={{ animationDelay: '0.55s' }}
        >
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-xl group-hover:bg-purple-200 transition-colors duration-500">
              <Users className="h-6 w-6 text-purple-600 group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">İstifadəçilər</p>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors">{stats.totalUsers}</h3>
            </div>
          </div>
        </div>
        
        <div 
          className="stats-card bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-500 border border-gray-100 hover:border-gray-200 transform hover:-translate-y-1 group"
          style={{ animationDelay: '0.6s' }}
        >
          <div className="flex items-center">
            <div className="bg-amber-100 p-3 rounded-xl group-hover:bg-amber-200 transition-colors duration-500">
              <BarChart3 className="h-6 w-6 text-amber-600 group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Ümumi Satış</p>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-amber-700 transition-colors">{stats.totalSales} ₼</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Son Sifarişlər və Məhsullar Bölməsi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Son Sifarişlər */}
        <div 
          className="recent-section bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-500 border border-gray-100 hover:border-gray-200"
          style={{ animationDelay: '0.65s' }}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Son Sifarişlər</h3>
            <Link to="/admin/orders" className="text-primary hover:text-primary/80 text-sm font-medium flex items-center">
              <span>Hamısına bax</span>
              <Eye className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Müştəri</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Məbləğ</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarix</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors cursor-pointer">
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">#{order.id}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{order.customer}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{order.total} ₼</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        order.status === 'Tamamlanıb' 
                          ? 'bg-green-100 text-green-800' 
                          : order.status === 'Gözləmədə' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Son Məhsullar */}
        <div 
          className="recent-section bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-500 border border-gray-100 hover:border-gray-200"
          style={{ animationDelay: '0.7s' }}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Son Məhsullar</h3>
            <div className="flex space-x-2">
              <Link to="/admin/products/new" className="text-green-600 hover:text-green-500 text-sm font-medium flex items-center">
                <PlusCircle className="w-4 h-4 mr-1" />
                <span>Əlavə Et</span>
              </Link>
              <Link to="/admin/products" className="text-primary hover:text-primary/80 text-sm font-medium flex items-center ml-4">
                <span>Hamısına bax</span>
                <Eye className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Məhsul</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brend</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qiymət</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stok</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors cursor-pointer">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{product.brand}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{product.price} ₼</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        product.stock > 10 
                          ? 'bg-green-100 text-green-800' 
                          : product.stock > 5 
                          ? 'bg-amber-100 text-amber-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.stock}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPanel; 