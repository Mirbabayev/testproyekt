import { api } from './axios';
import { Order, OrdersResponse } from '../types/order';

// Bütün sifarişləri gətirmək
export async function getUserOrders(): Promise<Order[]> {
  try {
    const response = await api.get<OrdersResponse>('/api/orders');
    return response.data.orders;
  } catch (error) {
    console.error('Error fetching user orders:', error);
    throw error;
  }
}

// Spesifik sifarişi gətirmək
export async function getOrderById(orderId: string): Promise<Order> {
  try {
    const response = await api.get<Order>(`/api/orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching order ${orderId}:`, error);
    throw error;
  }
}

// Sifarişin statusunu yeniləmək (istifadəçilər üçün yalnız ləğvetmə əməliyyatı)
export async function cancelOrder(orderId: string): Promise<Order> {
  try {
    const response = await api.patch<Order>(`/api/orders/${orderId}/cancel`);
    return response.data;
  } catch (error) {
    console.error(`Error cancelling order ${orderId}:`, error);
    throw error;
  }
}

// Mock data - API hazır olmadığı halda test üçün
export const mockOrders: Order[] = [
  {
    id: 'ord-001',
    userId: 'user1',
    items: [
      {
        id: 'item1',
        productId: 'prod1',
        productName: 'Santal 33',
        productImage: '/images/products/santal33.jpg',
        quantity: 1,
        price: 192
      }
    ],
    status: 'delivered',
    totalAmount: 192,
    shippingAddress: {
      fullName: 'Anar Məmmədov',
      address: 'Nizami küç. 12',
      city: 'Bakı',
      postalCode: 'AZ1000',
      country: 'Azərbaycan',
      phone: '+994501234567'
    },
    createdAt: '2023-11-15T14:30:00Z',
    updatedAt: '2023-11-18T10:15:00Z',
    paymentMethod: 'kart',
    trackingNumber: 'AZE12345678'
  },
  {
    id: 'ord-002',
    userId: 'user1',
    items: [
      {
        id: 'item2',
        productId: 'prod2',
        productName: 'Bergamote 22',
        productImage: '/images/products/bergamote22.jpg',
        quantity: 1,
        price: 215
      }
    ],
    status: 'processing',
    totalAmount: 215,
    shippingAddress: {
      fullName: 'Anar Məmmədov',
      address: 'Nizami küç. 12',
      city: 'Bakı',
      postalCode: 'AZ1000',
      country: 'Azərbaycan',
      phone: '+994501234567'
    },
    createdAt: '2023-12-10T09:45:00Z',
    updatedAt: '2023-12-10T09:45:00Z',
    paymentMethod: 'nağd'
  }
]; 