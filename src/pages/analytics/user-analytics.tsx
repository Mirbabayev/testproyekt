import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  LineChart, Line, BarChart, Bar, 
  XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { 
  ShoppingCart, Clock, Wallet, TrendingUp, 
  Calendar, RefreshCw, ArrowDownToLine, Filter
} from 'lucide-react';

// Nümunə verilənlər
const purchaseHistory = [
  { month: 'Yan', value: 5 },
  { month: 'Fev', value: 3 },
  { month: 'Mar', value: 8 },
  { month: 'Apr', value: 12 },
  { month: 'May', value: 7 },
  { month: 'İyun', value: 15 },
  { month: 'İyul', value: 10 },
  { month: 'Avq', value: 6 },
  { month: 'Sen', value: 9 },
  { month: 'Okt', value: 12 },
  { month: 'Noy', value: 8 },
  { month: 'Dek', value: 14 },
];

const categoryData = [
  { name: 'Citrus', value: 35 },
  { name: 'Çiçək', value: 25 },
  { name: 'Odun', value: 15 },
  { name: 'Ədviyyat', value: 12 },
  { name: 'Meyvə', value: 8 },
  { name: 'Digər', value: 5 },
];

const spendingData = [
  { month: 'Yan', value: 120 },
  { month: 'Fev', value: 85 },
  { month: 'Mar', value: 230 },
  { month: 'Apr', value: 310 },
  { month: 'May', value: 180 },
  { month: 'İyun', value: 350 },
  { month: 'İyul', value: 270 },
  { month: 'Avq', value: 150 },
  { month: 'Sen', value: 210 },
  { month: 'Okt', value: 290 },
  { month: 'Noy', value: 190 },
  { month: 'Dek', value: 320 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];

export default function UserAnalytics() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('year');
  const [userData, setUserData] = useState({
    totalPurchases: 0,
    totalSpent: 0,
    avgOrderValue: 0,
    mostBoughtCategory: '',
    favoriteScent: '',
  });
  
  // Verilənləri yükləmək
  useEffect(() => {
    const loadUserData = async () => {
      setIsLoading(true);
      
      try {
        // TODO: Real API çağırışı
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Demo verilənlər
        setUserData({
          totalPurchases: 107,
          totalSpent: 2505,
          avgOrderValue: 23.41,
          mostBoughtCategory: 'Citrus',
          favoriteScent: 'Bergamot',
        });
      } catch (err) {
        console.error('İstifadəçi analitika məlumatları yüklənərkən xəta baş verdi:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUserData();
  }, []);
  
  // Zaman diapazonuna əsasən məlumatları filtirləmək
  const filterDataByTimeRange = (data: any[]) => {
    if (timeRange === 'year') {
      return data;
    }
    
    if (timeRange === 'quarter') {
      return data.slice(-3);
    }
    
    if (timeRange === 'month') {
      return data.slice(-1);
    }
    
    return data;
  };
  
  const filteredPurchaseHistory = filterDataByTimeRange(purchaseHistory);
  const filteredSpendingData = filterDataByTimeRange(spendingData);
  
  // Kard komponenti
  const StatCard = ({ icon, title, value, suffix = '', trend = null }: any) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-500 text-sm mb-1">{title}</p>
          <h3 className="text-2xl font-bold">
            {value}{suffix}
          </h3>
          
          {trend && (
            <div className={`mt-2 flex items-center text-sm ${
              trend > 0 ? 'text-green-500' : 'text-red-500'
            }`}>
              {trend > 0 ? (
                <TrendingUp className="w-4 h-4 mr-1" />
              ) : (
                <ArrowDownToLine className="w-4 h-4 mr-1" />
              )}
              {Math.abs(trend)}% {trend > 0 ? 'artım' : 'azalma'}
            </div>
          )}
        </div>
        
        <div className="p-3 rounded-full bg-primary/10 text-primary">
          {icon}
        </div>
      </div>
    </div>
  );
  
  // Hesabatı yükləmək
  const downloadReport = () => {
    // TODO: Hesabat yükləmə funksionallığı
    alert('Hesabat yüklənir...');
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary" />
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">İstifadəçi analitikası</h1>
        <p className="text-gray-600">
          Alış-veriş meyilləriniz və ətir zövqləriniz haqqında ətraflı statistika
        </p>
      </div>
      
      <div className="mb-8 flex flex-wrap justify-between items-center">
        <div className="flex space-x-4 mb-4 md:mb-0">
          <button
            onClick={() => setTimeRange('month')}
            className={`px-3 py-1.5 rounded-full text-sm ${
              timeRange === 'month' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Son ay
          </button>
          <button
            onClick={() => setTimeRange('quarter')}
            className={`px-3 py-1.5 rounded-full text-sm ${
              timeRange === 'quarter' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Son rüb
          </button>
          <button
            onClick={() => setTimeRange('year')}
            className={`px-3 py-1.5 rounded-full text-sm ${
              timeRange === 'year' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            İl boyu
          </button>
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={downloadReport}
            className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center"
          >
            <ArrowDownToLine className="w-4 h-4 mr-2" />
            Hesabatı yüklə
          </button>
          
          <button
            onClick={() => window.location.reload()}
            className="p-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          
          <button className="p-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Statistika kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard 
          icon={<ShoppingCart className="w-6 h-6" />}
          title="Ümumi sifarişlər"
          value={userData.totalPurchases}
          trend={12}
        />
        
        <StatCard 
          icon={<Wallet className="w-6 h-6" />}
          title="Ümumi xərclər"
          value={userData.totalSpent}
          suffix="₼"
          trend={8}
        />
        
        <StatCard 
          icon={<ShoppingCart className="w-6 h-6" />}
          title="Orta sifariş dəyəri"
          value={userData.avgOrderValue}
          suffix="₼"
          trend={-5}
        />
        
        <StatCard 
          icon={<Clock className="w-6 h-6" />}
          title="Son sifariş"
          value="2 gün əvvəl"
        />
      </div>
      
      {/* Qrafiklər */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Alış tarixçəsi */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Alış tarixçəsi</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={filteredPurchaseHistory}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" name="Sifarişlər" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Xərc analizi */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Xərc analizi</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={filteredSpendingData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  name="Xərclər (₼)"
                  stroke="#82ca9d" 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Kateqoriya analizi */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Kateqoriya üzrə sifarişlər</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Əlavə statistika */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-6">Şəxsi ətir profili</h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-gray-500 text-sm mb-1">Ən çox aldığınız kateqoriya</h4>
              <p className="text-xl font-semibold">{userData.mostBoughtCategory}</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>
            
            <div>
              <h4 className="text-gray-500 text-sm mb-1">Sevdiyiniz ətir notu</h4>
              <p className="text-xl font-semibold">{userData.favoriteScent}</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            
            <div>
              <h4 className="text-gray-500 text-sm mb-1">Zövq profili</h4>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs">Elegantlıq</span>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs">Təbiətli</span>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs">Klassik</span>
              </div>
            </div>
            
            <div>
              <h4 className="text-gray-500 text-sm mb-1">Alış-veriş meyilləri</h4>
              <div className="flex items-center mt-2">
                <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                <span className="text-sm">Əsasən weekend və bayram günlərində alış-veriş edirsiniz</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tövsiyələr */}
      <div className="bg-white rounded-lg shadow p-6 mb-10">
        <h3 className="text-lg font-semibold mb-4">Sizə uyğun tövsiyələr</h3>
        <p className="text-gray-600 mb-6">
          Alış-veriş tarixçənizə əsasən, bu məhsulları bəyənə bilərsiniz:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Burada tövsiyə olunan məhsul kartları ola bilər */}
          <div className="bg-gray-100 rounded-lg p-4 text-center">
            <div className="mb-2 h-40 bg-gray-200 rounded-md animate-pulse" />
            <div className="h-4 bg-gray-200 rounded-md animate-pulse mb-1" />
            <div className="h-4 bg-gray-200 rounded-md animate-pulse w-3/4 mx-auto" />
          </div>
          
          <div className="bg-gray-100 rounded-lg p-4 text-center">
            <div className="mb-2 h-40 bg-gray-200 rounded-md animate-pulse" />
            <div className="h-4 bg-gray-200 rounded-md animate-pulse mb-1" />
            <div className="h-4 bg-gray-200 rounded-md animate-pulse w-3/4 mx-auto" />
          </div>
          
          <div className="bg-gray-100 rounded-lg p-4 text-center">
            <div className="mb-2 h-40 bg-gray-200 rounded-md animate-pulse" />
            <div className="h-4 bg-gray-200 rounded-md animate-pulse mb-1" />
            <div className="h-4 bg-gray-200 rounded-md animate-pulse w-3/4 mx-auto" />
          </div>
          
          <div className="bg-gray-100 rounded-lg p-4 text-center">
            <div className="mb-2 h-40 bg-gray-200 rounded-md animate-pulse" />
            <div className="h-4 bg-gray-200 rounded-md animate-pulse mb-1" />
            <div className="h-4 bg-gray-200 rounded-md animate-pulse w-3/4 mx-auto" />
          </div>
        </div>
      </div>
      
      <div className="text-center text-gray-500 text-sm">
        <p>Bu analitika məlumatları şəxsiləşdirilmiş təcrübə təqdim etmək məqsədi daşıyır və hər zaman dəqiq olmaya bilər.</p>
      </div>
    </div>
  );
} 