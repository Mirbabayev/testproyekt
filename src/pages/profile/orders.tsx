import { useState } from 'react';
import { useAuth } from '../../lib/auth-context';
import { ShoppingBag, Package, Truck, CheckCircle, Calendar, ArrowRight, X, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

// Dummy data - backend olduqda əvəz ediləcək
const DUMMY_ORDERS = [
  {
    id: 'ORD-001',
    date: '15.04.2023',
    total: 120.50,
    status: 'completed',
    items: [
      { id: 1, name: 'Chanel No 5', price: 120.50, quantity: 1, image: '/images/perfumes/perfume1.jpg' }
    ]
  },
  {
    id: 'ORD-002',
    date: '21.02.2023',
    total: 75.00,
    status: 'delivered',
    items: [
      { id: 2, name: 'Dior Sauvage', price: 75.00, quantity: 1, image: '/images/perfumes/perfume2.jpg' }
    ]
  },
  {
    id: 'ORD-003',
    date: '10.01.2023',
    total: 195.90,
    status: 'processing',
    items: [
      { id: 3, name: 'Tom Ford Oud Wood', price: 195.90, quantity: 1, image: '/images/perfumes/perfume3.jpg' }
    ]
  }
];

// Status rəng və ikonları
const STATUS_CONFIG = {
  processing: { 
    color: 'bg-blue-100 text-blue-800', 
    icon: <Package className="w-4 h-4 mr-1.5" /> ,
    text: 'Hazırlanır'
  },
  shipped: { 
    color: 'bg-purple-100 text-purple-800', 
    icon: <Truck className="w-4 h-4 mr-1.5" />,
    text: 'Göndərilib'
  },
  delivered: { 
    color: 'bg-green-100 text-green-800', 
    icon: <CheckCircle className="w-4 h-4 mr-1.5" />,
    text: 'Çatdırılıb'
  },
  completed: { 
    color: 'bg-gray-100 text-gray-800', 
    icon: <CheckCircle className="w-4 h-4 mr-1.5" />,
    text: 'Tamamlanıb'
  }
};

// Sifariş Statusu komponenti
const OrderStatus = ({ status }: { status: string }) => {
  const config = STATUS_CONFIG[status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.processing;
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
      {config.icon}
      {config.text}
    </span>
  );
};

// Şəkil olmaması halına qarşı placeholder şəkil
const DEFAULT_PLACEHOLDER = '/images/placeholder.jpg';

export default function Orders() {
  const { user } = useAuth();
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  
  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };
  
  // Sifarişlər boşdursa göstəriləcək mesaj
  const renderEmptyState = () => (
    <div className="bg-white p-8 rounded-lg shadow-md text-center">
      <ShoppingBag className="h-12 w-12 mx-auto text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-800 mb-2">Hələ heç bir sifariş yoxdur</h3>
      <p className="text-gray-500 mb-6">İlk sifarişinizi vermək üçün məhsullar səhifəsinə keçin.</p>
      <Link 
        to="/products" 
        className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        Məhsullara Bax
      </Link>
    </div>
  );
  
  // Sifarişlər siyahısı
  const renderOrdersList = () => (
    <div className="space-y-4">
      {DUMMY_ORDERS.map((order) => (
        <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Sifariş başlığı */}
          <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200">
            <div>
              <div className="flex items-center">
                <ShoppingBag className="h-5 w-5 text-gray-500 mr-2" />
                <h3 className="font-medium text-gray-800">Sifariş #{order.id}</h3>
              </div>
              <p className="text-sm text-gray-500 mt-1">{order.date}</p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mt-3 sm:mt-0">
              <OrderStatus status={order.status} />
              <div className="font-medium">{order.total.toFixed(2)} ₼</div>
              <div className="flex space-x-2">
                <Link 
                  to={`/order/track/${order.id}`}
                  className="text-blue-600 text-sm flex items-center hover:underline"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  İzlə
                </Link>
                <button 
                  onClick={() => toggleOrderDetails(order.id)}
                  className="text-primary text-sm flex items-center hover:underline"
                >
                  {expandedOrder === order.id ? (
                    <>
                      <X className="h-4 w-4 mr-1" />
                      Bağla
                    </>
                  ) : (
                    <>
                      Ətraflı 
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
          
          {/* Sifariş detallları */}
          {expandedOrder === order.id && (
            <div className="p-4 bg-gray-50">
              <h4 className="font-medium text-sm text-gray-700 mb-3">Məhsullar</h4>
              
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between border-b border-gray-200 pb-3">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-200 flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = DEFAULT_PLACEHOLDER;
                          }}
                        />
                      </div>
                      <div className="ml-4">
                        <h5 className="font-medium text-gray-800">{item.name}</h5>
                        <p className="text-sm text-gray-500">Sayı: {item.quantity}</p>
                      </div>
                    </div>
                    <div className="font-medium">{item.price.toFixed(2)} ₼</div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 flex justify-between border-t border-gray-200 pt-4">
                <h4 className="font-medium">Ümumi</h4>
                <span className="font-bold">{order.total.toFixed(2)} ₼</span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Sifarişlərim</h1>
        <div className="flex space-x-2 items-center text-sm text-gray-500">
          <Calendar className="h-4 w-4" />
          <span>Son 6 ay</span>
        </div>
      </div>
      
      {DUMMY_ORDERS.length === 0 ? renderEmptyState() : renderOrdersList()}
    </div>
  );
} 