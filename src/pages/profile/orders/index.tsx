import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Order } from '../../../types/order';
import { getUserOrders, mockOrders } from '../../../lib/orders';
import { useAuth } from '../../../lib/auth-context';
import { Layout } from '../../../components/layout';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // İstifadəçi giriş etməyibsə, login səhifəsinə yönləndir
    if (!user) {
      navigate('/auth/login');
      return;
    }

    async function fetchOrders() {
      try {
        setLoading(true);
        // API bağlantısı hazır olmadığı təqdirdə mock data istifadə edilə bilər
        // Gerçək implementasiyada bu kod işləyəcək:
        // const data = await getUserOrders();
        
        // Test datası
        const data = mockOrders;
        setOrders(data);
      } catch (err) {
        setError('Sifarişlər yüklənərkən xəta baş verdi.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [user, navigate]);

  function getStatusClass(status: string): string {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  function getStatusText(status: string): string {
    switch (status) {
      case 'pending':
        return 'Gözləmədə';
      case 'processing':
        return 'Hazırlanır';
      case 'shipped':
        return 'Göndərilib';
      case 'delivered':
        return 'Çatdırılıb';
      case 'cancelled':
        return 'Ləğv edilib';
      default:
        return status;
    }
  }

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('az-AZ');
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate('/profile')}
            className="flex items-center text-primary hover:text-primary-dark"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Profilə qayıt
          </button>
        </div>

        <h1 className="text-2xl font-bold mb-6">Mənim Sifarişlərim</h1>
        
        {loading && (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-md mb-4">
            {error}
          </div>
        )}
        
        {!loading && orders.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">Hələ heç bir sifariş verməmisiniz.</p>
            <button 
              onClick={() => navigate('/products')}
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
            >
              Alış-verişə başla
            </button>
          </div>
        )}
        
        {!loading && orders.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left">Sifariş №</th>
                  <th className="py-3 px-4 text-left">Tarix</th>
                  <th className="py-3 px-4 text-left">Məbləğ</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Əməliyyatlar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4">{order.id}</td>
                    <td className="py-3 px-4">{formatDate(order.createdAt)}</td>
                    <td className="py-3 px-4">{order.totalAmount} ₼</td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs ${getStatusClass(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button 
                        onClick={() => navigate(`/profile/orders/${order.id}`)}
                        className="text-primary hover:text-primary-dark mr-2"
                      >
                        Detallar
                      </button>
                      
                      {order.status === 'pending' && (
                        <button 
                          className="text-red-600 hover:text-red-800"
                          onClick={() => {
                            // TODO: Sifarişi ləğv et funksiyası
                            if (window.confirm('Sifarişi ləğv etmək istədiyinizə əminsiniz?')) {
                              console.log('Sifariş ləğv edildi:', order.id);
                            }
                          }}
                        >
                          Ləğv et
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
} 