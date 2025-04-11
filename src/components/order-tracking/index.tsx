import { useState } from 'react';
import { Order, OrderStatus } from '../../types/order';

interface OrderTrackingProps {
  order: Order;
}

export function OrderTracking({ order }: OrderTrackingProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Sifariş izləmə mərhələləri
  const steps: { status: OrderStatus; label: string; description: string; date?: string }[] = [
    { 
      status: 'pending', 
      label: 'Sifariş qəbul edildi', 
      description: 'Sifarişiniz qəbul edildi və ödənişiniz təsdiqləndi.',
      date: order.status !== 'pending' ? order.createdAt : undefined
    },
    { 
      status: 'processing', 
      label: 'Hazırlanır', 
      description: 'Sifarişiniz hazırlanır və qablaşdırılır.',
      date: order.status === 'processing' || order.status === 'shipped' || order.status === 'delivered' ? getStatusDate('processing') : undefined
    },
    { 
      status: 'shipped', 
      label: 'Göndərilib', 
      description: 'Sifarişiniz göndərildi və çatdırılma zamanı.',
      date: order.status === 'shipped' || order.status === 'delivered' ? getStatusDate('shipped') : undefined
    },
    { 
      status: 'delivered', 
      label: 'Çatdırılıb', 
      description: 'Sifarişiniz çatdırıldı.',
      date: order.status === 'delivered' ? getStatusDate('delivered') : undefined
    }
  ];

  // Mərhələdə ola biləcək tarixləri almaq
  function getStatusDate(status: OrderStatus): string {
    // Bu nümunə funksiyasıdır. Real tətbiqdə sifariş məlumatlarından tarix əldə edilə bilər.
    // Nümunə üçün cari tarixi qaytarırıq
    return order.updatedAt;
  }

  // Mərhələ aktivdir?
  function isStepActive(status: OrderStatus): boolean {
    if (order.status === 'cancelled') return false;
    
    switch (status) {
      case 'pending':
        return true;
      case 'processing':
        return ['processing', 'shipped', 'delivered'].includes(order.status);
      case 'shipped':
        return ['shipped', 'delivered'].includes(order.status);
      case 'delivered':
        return order.status === 'delivered';
      default:
        return false;
    }
  }

  // Mərhələ tamamlanıb?
  function isStepCompleted(status: OrderStatus): boolean {
    if (order.status === 'cancelled') return false;
    
    switch (status) {
      case 'pending':
        return ['processing', 'shipped', 'delivered'].includes(order.status);
      case 'processing':
        return ['shipped', 'delivered'].includes(order.status);
      case 'shipped':
        return order.status === 'delivered';
      case 'delivered':
        return false;
      default:
        return false;
    }
  }

  // Tarixi formatla
  function formatDate(dateString?: string): string {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('az-AZ', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  if (order.status === 'cancelled') {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 my-6">
        <div className="flex items-center">
          <svg className="w-6 h-6 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
          </svg>
          <h3 className="text-lg font-semibold text-red-700">Sifariş ləğv edilib</h3>
        </div>
        <p className="mt-2 text-red-600">Bu sifariş {formatDate(order.updatedAt)} tarixində ləğv edilib.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 my-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Sifarişin izlənməsi</h3>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-primary hover:text-primary-dark text-sm"
        >
          {isExpanded ? 'Az məlumat göstər' : 'Daha çox məlumat göstər'}
        </button>
      </div>

      <div className="relative">
        {/* Xətt */}
        <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200"></div>

        {/* Mərhələlər */}
        <div className="space-y-8">
          {steps.map((step, index) => (
            <div key={step.status} className={`relative flex items-start ${isStepActive(step.status) ? '' : 'opacity-50'}`}>
              {/* Icon */}
              <div className={`absolute left-0 rounded-full h-8 w-8 flex items-center justify-center border-2 z-10 
                ${isStepCompleted(step.status) 
                  ? 'bg-green-600 border-green-600' 
                  : isStepActive(step.status) 
                    ? 'bg-primary border-primary' 
                    : 'bg-white border-gray-300'}`}
              >
                {isStepCompleted(step.status) ? (
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                ) : isStepActive(step.status) ? (
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                ) : (
                  <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                )}
              </div>

              {/* Məzmun */}
              <div className="ml-12">
                <h4 className={`font-medium ${isStepActive(step.status) ? 'text-gray-900' : 'text-gray-500'}`}>
                  {step.label}
                </h4>
                
                {(isExpanded || index === steps.findIndex(s => s.status === order.status)) && (
                  <>
                    <p className="text-sm text-gray-500 mt-1">{step.description}</p>
                    {step.date && <p className="text-xs text-gray-400 mt-1">{formatDate(step.date)}</p>}
                  </>
                )}

                {/* Xüsusi məlumatlar */}
                {step.status === 'shipped' && order.status === 'shipped' && order.trackingNumber && (
                  <div className="mt-2 p-3 bg-gray-50 rounded text-sm">
                    <p className="font-medium">İzləmə nömrəsi: <span className="text-primary">{order.trackingNumber}</span></p>
                    <p className="mt-1 text-gray-500">Bağlamanızı izləmək üçün izləmə nömrəsini istifadə edə bilərsiniz.</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 