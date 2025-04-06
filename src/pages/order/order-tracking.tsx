import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  ShoppingBag, 
  Package, 
  Truck, 
  CheckCircle, 
  ArrowLeft, 
  Clock, 
  MapPin, 
  Share2, 
  Mail, 
  Phone, 
  Calendar, 
  FileText, 
  AlertCircle 
} from 'lucide-react';

// Dummy sifariş məlumatları
const DUMMY_ORDER = {
  id: 'ORD-1234',
  customerName: 'Əli Məmmədov',
  date: '12.06.2023',
  estimatedDelivery: '18.06.2023',
  status: 'shipped',
  trackingNumber: 'TRK-87654321',
  deliveryAddress: 'Bakı şəhəri, Nəsimi rayonu, Azadlıq prospekti 15, mənzil 42',
  contactPhone: '+994 50 123 45 67',
  contactEmail: 'ali.mammadov@mail.az',
  total: 175.50,
  paymentMethod: 'Kart',
  items: [
    { 
      id: 1, 
      name: 'Aventus', 
      brand: 'Creed', 
      price: 120.00, 
      quantity: 1, 
      image: 'https://i.ibb.co/PMCnnKg/creed-aventus.jpg' 
    },
    { 
      id: 2, 
      name: 'Sauvage', 
      brand: 'Dior', 
      price: 55.50, 
      quantity: 1, 
      image: 'https://i.ibb.co/MnS5k5p/dior-sauvage.jpg' 
    }
  ],
  statusHistory: [
    { status: 'pending', date: '12.06.2023 10:00', message: 'Sifariş qəbul edildi' },
    { status: 'processing', date: '13.06.2023 09:30', message: 'Sifariş hazırlanır' },
    { status: 'shipped', date: '15.06.2023 14:15', message: 'Sifariş göndərildi' }
  ]
};

// Status konfiqurasiyaları
const STATUS_CONFIGS = {
  pending: { 
    color: 'text-yellow-700 bg-yellow-100', 
    icon: <Clock className="w-5 h-5" />,
    label: 'Gözləmədə',
    description: 'Sifarişiniz qəbul edildi və ödəniş təsdiqləndi.'
  },
  processing: { 
    color: 'text-blue-700 bg-blue-100', 
    icon: <Package className="w-5 h-5" />,
    label: 'Hazırlanır',
    description: 'Sifarişiniz hazırlanır və qablaşdırılır.'
  },
  shipped: { 
    color: 'text-purple-700 bg-purple-100', 
    icon: <Truck className="w-5 h-5" />,
    label: 'Göndərilib',
    description: 'Sifarişiniz göndərilib və çatdırılma üçün yoldadır.'
  },
  delivered: { 
    color: 'text-green-700 bg-green-100', 
    icon: <CheckCircle className="w-5 h-5" />,
    label: 'Çatdırılıb',
    description: 'Sifarişiniz təyinat yerinə çatdırılıb.'
  },
  cancelled: { 
    color: 'text-red-700 bg-red-100', 
    icon: <AlertCircle className="w-5 h-5" />,
    label: 'Ləğv edilib',
    description: 'Sifarişiniz ləğv edilib.'
  }
};

// Status viz. komponentləri
const StatusIcon = ({ status }: { status: string }) => {
  const config = STATUS_CONFIGS[status as keyof typeof STATUS_CONFIGS] || STATUS_CONFIGS.pending;
  
  return (
    <div className={`rounded-full p-3 ${config.color}`}>
      {config.icon}
    </div>
  );
};

const StatusLabel = ({ status }: { status: string }) => {
  const config = STATUS_CONFIGS[status as keyof typeof STATUS_CONFIGS] || STATUS_CONFIGS.pending;
  
  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
      {config.label}
    </div>
  );
};

// Status proqres addımlarını vizuallaşdıran komponent
const TrackingProgress = ({ currentStatus }: { currentStatus: string }) => {
  const statuses = ['pending', 'processing', 'shipped', 'delivered'];
  const currentIndex = statuses.indexOf(currentStatus);
  
  return (
    <div className="relative">
      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
        <div 
          style={{ width: `${Math.max(0, Math.min(100, currentIndex * 100 / (statuses.length - 1)))}%` }} 
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
        ></div>
      </div>
      
      <div className="flex justify-between">
        {statuses.map((status, index) => {
          const config = STATUS_CONFIGS[status as keyof typeof STATUS_CONFIGS];
          const isActive = index <= currentIndex;
          const isPast = index < currentIndex;
          
          return (
            <div key={status} className="flex flex-col items-center">
              <div className={`relative mb-2 rounded-full h-8 w-8 flex items-center justify-center ${
                isActive ? config.color : 'bg-gray-200 text-gray-400'
              }`}>
                {isPast ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <div className="flex items-center justify-center">
                    {index === currentIndex ? config.icon : <span className="text-xs">{index + 1}</span>}
                  </div>
                )}
                
                {index !== statuses.length - 1 && (
                  <div className={`absolute top-1/2 left-full -translate-y-1/2 h-0.5 w-10 ${
                    index < currentIndex ? 'bg-primary' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
              <span className={`text-xs mt-1 ${isActive ? 'font-medium' : 'text-gray-500'}`}>
                {config.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Status tarixçəsini vizuallaşdıran komponent
const StatusTimeline = ({ history }: { history: { status: string; date: string; message: string }[] }) => {
  return (
    <div className="space-y-4">
      {history.map((item, index) => {
        const config = STATUS_CONFIGS[item.status as keyof typeof STATUS_CONFIGS];
        
        return (
          <div key={index} className="flex">
            <div className="mr-3">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${config.color}`}>
                {config.icon}
              </div>
              {index !== history.length - 1 && (
                <div className="w-0.5 h-full bg-gray-200 mx-auto mt-1"></div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium">{config.label}</span>
                <time className="text-sm text-gray-500">{item.date}</time>
              </div>
              <p className="text-sm text-gray-600">{item.message}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default function OrderTracking() {
  const { t } = useTranslation();
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  
  const [order, setOrder] = useState<typeof DUMMY_ORDER | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Məlumatları al (real tətbiqdə API çağırışı olacaq)
  useEffect(() => {
    const fetchOrderDetails = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Demo məqsədli gecikdirmə simulyasiyası
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Real API çağırışı əvəzinə dummy data istifadə edirik
        // const response = await fetch(`/api/orders/${orderId}`);
        // if (!response.ok) throw new Error('Sifariş məlumatlarını yükləmək mümkün olmadı');
        // const data = await response.json();
        
        setOrder(DUMMY_ORDER);
      } catch (err) {
        console.error('Sifariş məlumatları yüklənərkən xəta baş verdi:', err);
        setError(t('Sifariş məlumatları yüklənərkən xəta baş verdi'));
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrderDetails();
  }, [orderId, t]);
  
  // Sifarişi paylaş
  const shareOrder = () => {
    // Demo məqsədləri üçün alert
    alert(t('Paylaşmaq funksiyası hazırlanır'));
    
    // Real tətbiqdə bu funksiya paylaşım linki yarada bilər
    // navigator.clipboard.writeText(`${window.location.origin}/order/track/${orderId}`);
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center h-60">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }
  
  if (error || !order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate('/orders')}
            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            {t('Sifarişlərə qayıt')}
          </button>
        </div>
        
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error || t('Sifariş məlumatları tapılmadı')}
        </div>
      </div>
    );
  }
  
  // Cari status konfiqurasiyası
  const statusConfig = STATUS_CONFIGS[order.status as keyof typeof STATUS_CONFIGS] || STATUS_CONFIGS.pending;
  
  // Statusun sıra nömrəsinə görə proqres hesabla
  const statuses = ['pending', 'processing', 'shipped', 'delivered'];
  const currentStep = statuses.indexOf(order.status) + 1;
  const totalSteps = statuses.length;
  const progressPercentage = (currentStep / totalSteps) * 100;
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Geri qayıtma və paylaşma düymələri */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate('/orders')}
          className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          {t('Sifarişlərə qayıt')}
        </button>
        
        <button
          onClick={shareOrder}
          className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary"
        >
          <Share2 className="h-4 w-4 mr-1" />
          {t('Sifarişi paylaş')}
        </button>
      </div>
      
      {/* Sifariş başlığı və statusu */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <div>
            <div className="flex items-center mb-2">
              <ShoppingBag className="h-5 w-5 text-gray-500 mr-2" />
              <h1 className="text-2xl font-bold">Sifariş #{order.id}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{order.date}</span>
              </div>
              <StatusLabel status={order.status} />
            </div>
          </div>
          
          <div className="mt-4 lg:mt-0">
            <div className="flex items-center">
              <div className="text-sm text-gray-500 mr-2">{t('İzləmə nömrəsi')}:</div>
              <div className="font-medium">{order.trackingNumber}</div>
            </div>
          </div>
        </div>
        
        {/* Status vizuallaşdırması */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <StatusIcon status={order.status} />
            <div>
              <h2 className="font-medium">{statusConfig.label}</h2>
              <p className="text-sm text-gray-600">{statusConfig.description}</p>
            </div>
          </div>
          
          <TrackingProgress currentStatus={order.status} />
        </div>
        
        {/* Çatdırılma məlumatları */}
        <div className="border-t pt-6">
          <h3 className="font-medium mb-4">{t('Çatdırılma məlumatları')}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex">
              <MapPin className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-gray-600 mb-1">{t('Çatdırılma ünvanı')}</h4>
                <p className="text-gray-800">{order.deliveryAddress}</p>
              </div>
            </div>
            
            <div className="flex">
              <Clock className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-gray-600 mb-1">{t('Təxmini çatdırılma tarixi')}</h4>
                <p className="text-gray-800">{order.estimatedDelivery}</p>
              </div>
            </div>
            
            <div className="flex">
              <Phone className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-gray-600 mb-1">{t('Əlaqə nömrəsi')}</h4>
                <p className="text-gray-800">{order.contactPhone}</p>
              </div>
            </div>
            
            <div className="flex">
              <Mail className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-gray-600 mb-1">{t('E-poçt ünvanı')}</h4>
                <p className="text-gray-800">{order.contactEmail}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Status tarixçəsi */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <h2 className="text-lg font-semibold mb-5">{t('Sifariş statusu tarixçəsi')}</h2>
            
            <StatusTimeline history={order.statusHistory} />
          </div>
        </div>
        
        {/* Sifariş məlumatları */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">{t('Sifariş məlumatları')}</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">{t('Ödəniş metodu')}</h3>
                <p className="text-gray-800">{order.paymentMethod}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">{t('Ümumi məbləğ')}</h3>
                <p className="text-xl font-bold text-primary">{order.total.toFixed(2)} ₼</p>
              </div>
              
              <div className="pt-3 border-t">
                <h3 className="text-sm font-medium text-gray-600 mb-3">{t('Məhsullar')}</h3>
                
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-start">
                      <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/images/placeholder.jpg";
                          }}
                        />
                      </div>
                      <div className="ml-3 flex-grow">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-xs text-gray-500">{item.brand}</p>
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-gray-500">Sayı: {item.quantity}</span>
                          <span className="text-sm font-medium">{item.price.toFixed(2)} ₼</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="pt-3 border-t flex justify-between items-center">
                <span className="font-medium">{t('Ümumi')}</span>
                <span className="font-bold text-lg">{order.total.toFixed(2)} ₼</span>
              </div>
            </div>
            
            <div className="mt-6">
              <Link 
                to="/orders" 
                className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none"
              >
                <FileText className="h-4 w-4 mr-1" />
                {t('Bütün sifarişlərimi göstər')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 