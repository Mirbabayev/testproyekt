import axios from 'axios';
import { Product, Order, User } from '../types';

// API səviyyəsinin funksiyaları local storage ilə işləyir
// (real API hazır olanda əvəz ediləcək)

// LOCAL STORAGE KEYS
const LS_PRODUCTS = 'products';
const LS_ORDERS = 'orders';
const LS_USERS = 'users';

// HELPERS
const getFromLocalStorage = <T>(key: string, defaultValue: T[]): T[] => {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : defaultValue;
};

const saveToLocalStorage = <T>(key: string, data: T[]): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

// PRODUCTS API
export const productsApi = {
  getAll: async (): Promise<Product[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Fetch from localStorage or data file as fallback
    try {
      const products = getFromLocalStorage<Product>(LS_PRODUCTS, []);
      if (products.length === 0) {
        // If no products in localStorage, import from data file
        const { products: importedProducts } = await import('../data/products');
        saveToLocalStorage(LS_PRODUCTS, importedProducts);
        return importedProducts;
      }
      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },
  
  getById: async (id: string): Promise<Product | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    try {
      const products = getFromLocalStorage<Product>(LS_PRODUCTS, []);
      return products.find(product => product.id === id) || null;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      return null;
    }
  },
  
  create: async (product: Omit<Product, 'id'>): Promise<Product> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      const products = getFromLocalStorage<Product>(LS_PRODUCTS, []);
      
      // Create new product with ID
      const newProduct: Product = {
        ...product as any,
        id: String(Date.now())
      };
      
      // Save to localStorage
      saveToLocalStorage(LS_PRODUCTS, [...products, newProduct]);
      
      return newProduct;
    } catch (error) {
      console.error('Error creating product:', error);
      throw new Error('Məhsul yaradılarkən xəta baş verdi');
    }
  },
  
  update: async (id: string, product: Partial<Product>): Promise<Product> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      const products = getFromLocalStorage<Product>(LS_PRODUCTS, []);
      const index = products.findIndex(p => p.id === id);
      
      if (index === -1) {
        throw new Error('Məhsul tapılmadı');
      }
      
      // Update product
      const updatedProduct = {
        ...products[index],
        ...product
      };
      
      products[index] = updatedProduct;
      
      // Save to localStorage
      saveToLocalStorage(LS_PRODUCTS, products);
      
      return updatedProduct;
    } catch (error) {
      console.error(`Error updating product ${id}:`, error);
      throw new Error('Məhsul yenilənərkən xəta baş verdi');
    }
  },
  
  delete: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      const products = getFromLocalStorage<Product>(LS_PRODUCTS, []);
      const filteredProducts = products.filter(p => p.id !== id);
      
      // Save to localStorage
      saveToLocalStorage(LS_PRODUCTS, filteredProducts);
    } catch (error) {
      console.error(`Error deleting product ${id}:`, error);
      throw new Error('Məhsul silinərkən xəta baş verdi');
    }
  }
};

// ORDERS API
export const ordersApi = {
  getAll: async (): Promise<Order[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      return getFromLocalStorage<Order>(LS_ORDERS, []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  },
  
  getById: async (id: string): Promise<Order | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    try {
      const orders = getFromLocalStorage<Order>(LS_ORDERS, []);
      return orders.find(order => order.id === id) || null;
    } catch (error) {
      console.error(`Error fetching order ${id}:`, error);
      return null;
    }
  },
  
  create: async (order: Omit<Order, 'id'>): Promise<Order> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      const orders = getFromLocalStorage<Order>(LS_ORDERS, []);
      
      // Create new order with ID
      const newOrder: Order = {
        ...order as any,
        id: String(Date.now())
      };
      
      // Save to localStorage
      saveToLocalStorage(LS_ORDERS, [...orders, newOrder]);
      
      return newOrder;
    } catch (error) {
      console.error('Error creating order:', error);
      throw new Error('Sifariş yaradılarkən xəta baş verdi');
    }
  },
  
  update: async (id: string, order: Partial<Order>): Promise<Order> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      const orders = getFromLocalStorage<Order>(LS_ORDERS, []);
      const index = orders.findIndex(o => o.id === id);
      
      if (index === -1) {
        throw new Error('Sifariş tapılmadı');
      }
      
      // Update order
      const updatedOrder = {
        ...orders[index],
        ...order
      };
      
      orders[index] = updatedOrder;
      
      // Save to localStorage
      saveToLocalStorage(LS_ORDERS, orders);
      
      return updatedOrder;
    } catch (error) {
      console.error(`Error updating order ${id}:`, error);
      throw new Error('Sifariş yenilənərkən xəta baş verdi');
    }
  },
  
  delete: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      const orders = getFromLocalStorage<Order>(LS_ORDERS, []);
      const filteredOrders = orders.filter(o => o.id !== id);
      
      // Save to localStorage
      saveToLocalStorage(LS_ORDERS, filteredOrders);
    } catch (error) {
      console.error(`Error deleting order ${id}:`, error);
      throw new Error('Sifariş silinərkən xəta baş verdi');
    }
  }
}; 