import React from 'react';
import { 
  ShoppingBag, 
  Package, 
  Users, 
  Eye,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // Demo məlumatlar - real tətbiqdə verilənlər bazasından gələcək
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

  return (
    <div className="space-y-6">
      <div className="mb-2">
        <h1 className="text-2xl font-bold text-gray-800">İdarə Paneli</h1>
        <p className="text-gray-600">Mağazanızın ümumi statistikasına baxın</p>
      </div>
      
      {/* Ümumi statistika kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <ShoppingBag className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Sifarişlər</p>
              <h3 className="text-xl font-bold text-gray-900">{stats.totalOrders}</h3>
            </div>
          </div>
          <Link to="/admin/orders" className="mt-3 inline-flex items-center text-sm text-blue-600 font-medium hover:text-blue-800">
            Sifarişlərə bax <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg">
              <Package className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Məhsullar</p>
              <h3 className="text-xl font-bold text-gray-900">{stats.totalProducts}</h3>
            </div>
          </div>
          <Link to="/admin/products" className="mt-3 inline-flex items-center text-sm text-green-600 font-medium hover:text-green-800">
            Məhsullara bax <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">İstifadəçilər</p>
              <h3 className="text-xl font-bold text-gray-900">{stats.totalUsers}</h3>
            </div>
          </div>
          <Link to="/admin/users" className="mt-3 inline-flex items-center text-sm text-purple-600 font-medium hover:text-purple-800">
            İstifadəçilərə bax <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="bg-amber-100 p-3 rounded-lg">
              <Eye className="h-6 w-6 text-amber-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Ümumi Satış</p>
              <h3 className="text-xl font-bold text-gray-900">{stats.totalSales} ₼</h3>
            </div>
          </div>
          <div className="mt-3 inline-flex items-center text-sm text-gray-600">
            Son 30 gün
          </div>
        </div>
      </div>
      
      {/* Son sifarişlər */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Son sifarişlər</h2>
          <Link to="/admin/orders" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            Bütün sifarişlər
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Sifariş №</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Müştəri</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Tarix</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Məbləğ</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-900">#{order.id}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{order.customer}</td>
                  <td className="py-3 px-4 text-sm text-gray-500">{order.date}</td>
                  <td className="py-3 px-4 text-sm">
                    <span 
                      className={`inline-flex px-2 py-1 text-xs rounded-full font-medium
                        ${order.status === 'Tamamlanıb' ? 'bg-green-100 text-green-800' : 
                          order.status === 'Gözləmədə' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-blue-100 text-blue-800'}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900 text-right">{order.total} ₼</td>
                  <td className="py-3 px-4 text-right">
                    <Link to={`/admin/orders/${order.id}`} className="text-blue-600 hover:text-blue-900 text-sm">
                      Bax
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 