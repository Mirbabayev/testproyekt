import { useState, useEffect } from 'react';
import { 
  TrendingUp, Users, ShoppingBag, CreditCard, Calendar, 
  ArrowUpRight, ArrowDownRight, DollarSign, RefreshCw, 
  Package, Eye, BarChart2, PieChart, LineChart
} from 'lucide-react';

// Demo analitika verilənləri
const DEMO_ANALYTICS = {
  summary: {
    sales: { value: 15750, trend: 12.5, period: 'this month' },
    revenue: { value: 32450, trend: 8.2, period: 'this month' },
    customers: { value: 573, trend: 5.1, period: 'this month' },
    orders: { value: 294, trend: 7.3, period: 'this month' },
  },
  topProducts: [
    { id: 1, name: 'Aventus', brand: 'Creed', sales: 32, revenue: 6500 },
    { id: 2, name: 'Sauvage', brand: 'Dior', sales: 28, revenue: 4200 },
    { id: 3, name: 'Black Opium', brand: 'YSL', sales: 25, revenue: 3750 },
    { id: 4, name: 'Baccarat Rouge 540', brand: 'Maison Francis Kurkdjian', sales: 22, revenue: 5500 },
    { id: 5, name: 'Oud Wood', brand: 'Tom Ford', sales: 18, revenue: 3600 },
  ],
  recentOrders: [
    { id: 'ORD-001', customer: 'Əli Məmmədov', date: '12.06.2023', amount: 250, status: 'completed' },
    { id: 'ORD-002', customer: 'Leyla Əliyeva', date: '11.06.2023', amount: 120, status: 'processing' },
    { id: 'ORD-003', customer: 'Nicat Həsənli', date: '10.06.2023', amount: 340, status: 'shipped' },
    { id: 'ORD-004', customer: 'Aynur Kərimli', date: '09.06.2023', amount: 89, status: 'delivered' },
    { id: 'ORD-005', customer: 'Tural Quliyev', date: '08.06.2023', amount: 175, status: 'completed' },
  ],
  salesByCategory: [
    { category: 'Ətir', value: 45 },
    { category: 'Dəst', value: 28 },
    { category: 'Duxi', value: 15 },
    { category: 'Nümunə', value: 12 },
  ],
  customersByGender: [
    { gender: 'Kişi', value: 42 },
    { gender: 'Qadın', value: 53 },
    { gender: 'Digər', value: 5 },
  ],
  salesByMonth: [
    { month: 'Yan', value: 8500 },
    { month: 'Fev', value: 7200 },
    { month: 'Mar', value: 9800 },
    { month: 'Apr', value: 8700 },
    { month: 'May', value: 12000 },
    { month: 'İyun', value: 15750 },
  ],
};

// Sipariş statusuna görə rəng
const getOrderStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'bg-green-100 text-green-800';
    case 'processing': return 'bg-blue-100 text-blue-800';
    case 'shipped': return 'bg-purple-100 text-purple-800';
    case 'delivered': return 'bg-teal-100 text-teal-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

// Sipariş statusunun adını düzgün format
const formatOrderStatus = (status: string) => {
  switch (status) {
    case 'completed': return 'Tamamlandı';
    case 'processing': return 'Hazırlanır';
    case 'shipped': return 'Göndərildi';
    case 'delivered': return 'Çatdırıldı';
    default: return status;
  }
};

// Statistika kartı komponenti
const StatCard = ({ 
  title, 
  value, 
  trend, 
  icon, 
  period 
}: { 
  title: string; 
  value: number | string; 
  trend?: number; 
  icon: React.ReactNode; 
  period?: string;
}) => {
  const isTrendPositive = typeof trend === 'number' && trend > 0;
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-gray-500 text-sm">{title}</h3>
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex items-end">
          <h2 className="text-2xl font-bold">
            {typeof value === 'number' ? value.toLocaleString('az-AZ') : value}
          </h2>
          
          {trend !== undefined && (
            <span className={`ml-2 text-sm flex items-center ${
              isTrendPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              {isTrendPositive ? (
                <ArrowUpRight className="h-3 w-3 mr-0.5" />
              ) : (
                <ArrowDownRight className="h-3 w-3 mr-0.5" />
              )}
              {Math.abs(trend)}%
            </span>
          )}
        </div>
        
        {period && (
          <p className="text-gray-500 text-xs mt-1">{period}</p>
        )}
      </div>
    </div>
  );
};

// Qəliz qrafika komponentləri yerinə sadə nümayiş
const SimpleBarChart = ({ data, nameKey, valueKey }: { data: any[]; nameKey: string; valueKey: string }) => {
  const max = Math.max(...data.map(d => d[valueKey]));
  
  return (
    <div className="space-y-2">
      {data.map((item, index) => (
        <div key={index} className="flex items-center">
          <div className="w-24 text-xs text-gray-500">{item[nameKey]}</div>
          <div className="flex-1 h-5 bg-gray-100 rounded-sm overflow-hidden">
            <div 
              className="h-full bg-primary rounded-sm"
              style={{ width: `${(item[valueKey] / max) * 100}%` }} 
            />
          </div>
          <div className="w-12 text-xs font-medium text-right ml-2">{item[valueKey]}</div>
        </div>
      ))}
    </div>
  );
};

const SimplePieChart = ({ data, nameKey, valueKey }: { data: any[]; nameKey: string; valueKey: string }) => {
  const total = data.reduce((sum, item) => sum + item[valueKey], 0);
  const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-amber-500', 'bg-red-500'];
  
  return (
    <div className="space-y-2">
      {data.map((item, index) => {
        const percentage = Math.round((item[valueKey] / total) * 100);
        
        return (
          <div key={index} className="flex items-center">
            <div className={`w-3 h-3 rounded-sm ${colors[index % colors.length]}`} />
            <div className="ml-2 flex-1 text-sm">{item[nameKey]}</div>
            <div className="text-sm font-medium">{percentage}%</div>
          </div>
        );
      })}
    </div>
  );
};

const SimpleLineChart = ({ data, nameKey, valueKey }: { data: any[]; nameKey: string; valueKey: string }) => {
  const max = Math.max(...data.map(d => d[valueKey]));
  const width = 100 / (data.length - 1);
  
  // Points for the polyline
  const points = data.map((d, i) => {
    const x = i * width;
    const y = 100 - (d[valueKey] / max) * 100;
    return `${x},${y}`;
  }).join(' ');
  
  return (
    <div>
      <svg className="w-full h-40" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline
          points={points}
          fill="none"
          stroke="#7c3aed"
          strokeWidth="2"
        />
        
        {/* Dot for each point */}
        {data.map((d, i) => {
          const x = i * width;
          const y = 100 - (d[valueKey] / max) * 100;
          
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="2"
              fill="#7c3aed"
            />
          );
        })}
      </svg>
      
      <div className="flex justify-between mt-2">
        {data.map((item, index) => (
          <div key={index} className="text-xs text-gray-500">{item[nameKey]}</div>
        ))}
      </div>
    </div>
  );
};

// Əsas analitika paneli komponenti
export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState(DEMO_ANALYTICS);
  const [timeRange, setTimeRange] = useState('month');
  const [isLoading, setIsLoading] = useState(false);
  
  // Demo məqsədilə verilənləri yenidən yüklə
  const refreshData = async () => {
    setIsLoading(true);
    
    // Demo üçün gecikdirmə
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Demo üçün random dəyişikliklər
    const getRandomChange = () => ((Math.random() * 10) - 5).toFixed(1);
    
    const updatedAnalytics = {
      ...analytics,
      summary: {
        sales: { 
          value: analytics.summary.sales.value + Math.floor(Math.random() * 1000) - 500, 
          trend: parseFloat(getRandomChange()), 
          period: 'this month' 
        },
        revenue: { 
          value: analytics.summary.revenue.value + Math.floor(Math.random() * 2000) - 1000, 
          trend: parseFloat(getRandomChange()), 
          period: 'this month' 
        },
        customers: { 
          value: analytics.summary.customers.value + Math.floor(Math.random() * 50) - 25, 
          trend: parseFloat(getRandomChange()), 
          period: 'this month' 
        },
        orders: { 
          value: analytics.summary.orders.value + Math.floor(Math.random() * 30) - 15, 
          trend: parseFloat(getRandomChange()), 
          period: 'this month' 
        },
      }
    };
    
    setAnalytics(updatedAnalytics);
    setIsLoading(false);
  };
  
  return (
    <div className="space-y-6">
      {/* Başlıq və filtr */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Analitika Paneli</h1>
          <p className="text-gray-500 text-sm mt-1">Satış və müştəri analitika məlumatları</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex p-1 bg-gray-100 rounded-lg">
            <button
              onClick={() => setTimeRange('week')}
              className={`px-3 py-1 text-sm rounded-md ${
                timeRange === 'week' ? 'bg-white shadow-sm' : 'text-gray-500'
              }`}
            >
              Həftə
            </button>
            <button
              onClick={() => setTimeRange('month')}
              className={`px-3 py-1 text-sm rounded-md ${
                timeRange === 'month' ? 'bg-white shadow-sm' : 'text-gray-500'
              }`}
            >
              Ay
            </button>
            <button
              onClick={() => setTimeRange('year')}
              className={`px-3 py-1 text-sm rounded-md ${
                timeRange === 'year' ? 'bg-white shadow-sm' : 'text-gray-500'
              }`}
            >
              İl
            </button>
          </div>
          
          <button
            onClick={refreshData}
            disabled={isLoading}
            className="inline-flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 mr-1.5 ${isLoading ? 'animate-spin' : ''}`} />
            Yenilə
          </button>
        </div>
      </div>
      
      {/* Əsas statistikalar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Ümumi Satış"
          value={analytics.summary.sales.value}
          trend={analytics.summary.sales.trend}
          icon={<ShoppingBag className="h-6 w-6" />}
          period="Bu ay"
        />
        <StatCard
          title="Ümumi Gəlir"
          value={`${analytics.summary.revenue.value.toLocaleString('az-AZ')} ₼`}
          trend={analytics.summary.revenue.trend}
          icon={<DollarSign className="h-6 w-6" />}
          period="Bu ay"
        />
        <StatCard
          title="Müştərilər"
          value={analytics.summary.customers.value}
          trend={analytics.summary.customers.trend}
          icon={<Users className="h-6 w-6" />}
          period="Bu ay"
        />
        <StatCard
          title="Sifarişlər"
          value={analytics.summary.orders.value}
          trend={analytics.summary.orders.trend}
          icon={<Package className="h-6 w-6" />}
          period="Bu ay"
        />
      </div>
      
      {/* Qrafiklər */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Satış qrafiki */}
        <div className="bg-white rounded-lg shadow-sm p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold flex items-center">
              <LineChart className="h-5 w-5 mr-2 text-primary" />
              Aylıq Satış
            </h2>
          </div>
          
          <SimpleLineChart 
            data={analytics.salesByMonth} 
            nameKey="month" 
            valueKey="value" 
          />
        </div>
        
        {/* Kateqoriyalar */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold flex items-center">
              <BarChart2 className="h-5 w-5 mr-2 text-primary" />
              Kateqoriyalar üzrə Satış
            </h2>
          </div>
          
          <SimpleBarChart 
            data={analytics.salesByCategory} 
            nameKey="category" 
            valueKey="value" 
          />
        </div>
      </div>
      
      {/* Əlavə məlumatlar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ən çox satılan məhsullar */}
        <div className="bg-white rounded-lg shadow-sm p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-primary" />
              Ən Çox Satılan Məhsullar
            </h2>
            
            <a href="/admin/products" className="text-sm text-primary hover:underline">
              Hamısını gör
            </a>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Məhsul
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Satış sayı
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Gəlir
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {analytics.topProducts.map((product, index) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">{product.brand}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.sales}</div>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.revenue} ₼</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Müştəri demoqrafikası */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold flex items-center">
              <PieChart className="h-5 w-5 mr-2 text-primary" />
              Müştəri demoqrafikası
            </h2>
          </div>
          
          <SimplePieChart 
            data={analytics.customersByGender} 
            nameKey="gender" 
            valueKey="value" 
          />
          
          <div className="mt-6 pt-6 border-t">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Son sifarişlər</h3>
            
            <div className="space-y-3">
              {analytics.recentOrders.slice(0, 3).map((order) => (
                <div key={order.id} className="flex justify-between items-center">
                  <div>
                    <div className="text-sm font-medium">{order.customer}</div>
                    <div className="text-xs text-gray-500">{order.date}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">{order.amount} ₼</div>
                    <div className={`text-xs px-1.5 py-0.5 rounded-full ${getOrderStatusColor(order.status)}`}>
                      {formatOrderStatus(order.status)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 text-center">
              <a href="/admin/orders" className="text-sm text-primary hover:underline">
                Bütün sifarişləri gör
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 