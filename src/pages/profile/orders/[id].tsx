import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Order } from '../../../types/order';
import { getOrderById, cancelOrder, mockOrders } from '../../../lib/orders';
import { useAuth } from '../../../lib/auth-context';
import { Layout } from '../../../components/layout';
import { OrderTracking } from '../../../components/order-tracking';

export default function OrderDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [cancelling, setCancelling] = useState<boolean>(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // İstifadəçi giriş etməyibsə, login səhifəsinə yönləndir
    if (!user) {
      navigate('/auth/login');
      return;
    }

    async function fetchOrderDetails() {
      if (!id) return;
      
      try {
        setLoading(true);
        // API bağlantısı hazır olmadığı təqdirdə mock data istifadə edilə bilər
        // Gerçək implementasiyada bu kod işləyəcək:
        // const data = await getOrderById(id);
        
        // Test datası
        const data = mockOrders.find(order => order.id === id);
        
        if (!data) {
          setError('Sifariş tapılmadı.');
        } else {
          setOrder(data);
        }
      } catch (err) {
        setError('Sifariş məlumatları yüklənərkən xəta baş verdi.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrderDetails();
  }, [id, user, navigate]);

  async function handleCancelOrder() {
    if (!id || !order) return;
    
    if (window.confirm('Sifarişi ləğv etmək istədiyinizə əminsiniz?')) {
      try {
        setCancelling(true);
        // Gerçək implementasiyada bu kod işləyəcək:
        // const updatedOrder = await cancelOrder(id);
        // setOrder(updatedOrder);
        
        // Test üçün
        setOrder({
          ...order,
          status: 'cancelled',
          updatedAt: new Date().toISOString()
        });
        
        alert('Sifariş uğurla ləğv edildi.');
      } catch (err) {
        setError('Sifariş ləğv edilərkən xəta baş verdi.');
        console.error(err);
      } finally {
        setCancelling(false);
      }
    }
  }

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
    return date.toLocaleDateString('az-AZ', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate('/profile/orders')}
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
            Sifarişlərim
          </button>
        </div>

        <h1 className="text-2xl font-bold mb-6">Sifariş Təfərrüatları</h1>
        
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
        
        {!loading && order && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col md:flex-row justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold mb-2">Sifariş #{order.id}</h2>
                  <p className="text-gray-600">Sifariş tarixi: {formatDate(order.createdAt)}</p>
                  {order.updatedAt !== order.createdAt && (
                    <p className="text-gray-600">Son yeniləmə: {formatDate(order.updatedAt)}</p>
                  )}
                </div>
                <div className="mt-4 md:mt-0">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusClass(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                  
                  {order.status === 'pending' && (
                    <button 
                      onClick={handleCancelOrder}
                      disabled={cancelling}
                      className="ml-4 bg-red-600 text-white px-4 py-2 rounded disabled:bg-red-300 hover:bg-red-700 transition"
                    >
                      {cancelling ? 'Ləğv edilir...' : 'Sifarişi ləğv et'}
                    </button>
                  )}
                  
                  {order.status === 'shipped' && order.trackingNumber && (
                    <div className="mt-2">
                      <p className="text-gray-600">İzləmə nömrəsi: <span className="font-medium">{order.trackingNumber}</span></p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Sifariş izləmə komponenti */}
              {order.status !== 'cancelled' && <OrderTracking order={order} />}
              
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold mb-4">Məhsullar</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="py-3 px-4 text-left">Məhsul</th>
                        <th className="py-3 px-4 text-center">Miqdar</th>
                        <th className="py-3 px-4 text-right">Qiymət</th>
                        <th className="py-3 px-4 text-right">Məbləğ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {order.items.map((item) => (
                        <tr key={item.id}>
                          <td className="py-4 px-4">
                            <div className="flex items-center">
                              <img 
                                src={item.productImage} 
                                alt={item.productName} 
                                className="w-16 h-16 object-cover rounded mr-4"
                              />
                              <div>
                                <Link 
                                  to={`/products/${item.productId}`}
                                  className="text-primary hover:underline font-medium"
                                >
                                  {item.productName}
                                </Link>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">{item.quantity}</td>
                          <td className="py-4 px-4 text-right">{item.price} ₼</td>
                          <td className="py-4 px-4 text-right font-medium">{item.price * item.quantity} ₼</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr>
                        <td colSpan={3} className="py-3 px-4 text-right font-medium">Ümumi məbləğ:</td>
                        <td className="py-3 px-4 text-right font-bold">{order.totalAmount} ₼</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 border-t border-gray-200 pt-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Çatdırılma məlumatları</h3>
                  <div className="bg-gray-50 rounded p-4">
                    <p className="font-medium">{order.shippingAddress.fullName}</p>
                    <p>{order.shippingAddress.address}</p>
                    <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                    <p>{order.shippingAddress.country}</p>
                    <p className="mt-2">Telefon: {order.shippingAddress.phone}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Ödəniş məlumatları</h3>
                  <div className="bg-gray-50 rounded p-4">
                    <p>Ödəniş üsulu: <span className="font-medium">{order.paymentMethod}</span></p>
                    <p className="mt-2">Ödəniş statusu: <span className="font-medium">Ödənilib</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
} 