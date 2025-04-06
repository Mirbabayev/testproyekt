// Sifariş tipləri
export interface Order {
  id: string;
  customer: string;
  email: string;
  date: string;
  status: OrderStatus;
  total: number;
  items: number;
  products?: OrderItem[];
  shippingAddress?: Address;
  billingAddress?: Address;
}

export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled';

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Address {
  fullName: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  phone: string;
}

// Sifariş filtri tipi
export interface OrderFilter {
  status?: OrderStatus;
  dateFrom?: string;
  dateTo?: string;
  minAmount?: number;
  maxAmount?: number;
}

// Sifariş sıralama tipi
export interface OrderSort {
  field: 'date' | 'total' | 'customer';
  direction: 'asc' | 'desc';
} 