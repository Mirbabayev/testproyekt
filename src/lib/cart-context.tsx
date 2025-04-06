import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../data/products';

// Səbətdəki məhsul elementi tipi
export interface CartItem {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  quantity: number;
}

// Kontekst tipi
interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  clearCart: () => void;
  itemCount: number;
  totalPrice: number;
}

// Başlanğıc dəyər
const defaultCartContext: CartContextType = {
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  clearCart: () => {},
  itemCount: 0,
  totalPrice: 0
};

// Context yaratmaq
const CartContext = createContext<CartContextType>(defaultCartContext);

// Custom hook
export const useCart = () => useContext(CartContext);

// Provider komponenti
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  // Səbət məlumatlarını saxlamaq üçün state
  const [items, setItems] = useState<CartItem[]>([]);
  
  // Toplam məhsul sayı və qiyməti
  const [itemCount, setItemCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  
  // Local Storage-dən məlumatları yükləmək
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setItems(parsedCart);
      } catch (error) {
        console.error('Səbət yüklənmə xətası:', error);
      }
    }
  }, []);
  
  // Səbətdəki məhsulları saxlamaq
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
    
    // Toplam məhsul sayı və qiyməti hesablamaq
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    setItemCount(count);
    setTotalPrice(total);
  }, [items]);
  
  // Məhsul əlavə etmək
  const addToCart = (product: Product) => {
    // Əvvəlcə məhsulun səbətdə olub-olmadığını yoxlayırıq
    const existingItem = items.find(item => item.id === product.id);
    
    if (existingItem) {
      // Məhsul artıq səbətdədirsə, sayını artırırıq
      setItems(
        items.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        )
      );
    } else {
      // Məhsul səbətdə deyilsə, yeni məhsul kimi əlavə edirik
      setItems([
        ...items, 
        {
          id: product.id,
          name: product.name,
          brand: product.brand,
          price: product.price,
          image: product.image,
          quantity: 1
        }
      ]);
    }
  };
  
  // Məhsulu silmək
  const removeFromCart = (productId: string) => {
    setItems(items.filter(item => item.id !== productId));
  };
  
  // Məhsul sayını artırmaq
  const increaseQuantity = (productId: string) => {
    setItems(
      items.map(item => 
        item.id === productId 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      )
    );
  };
  
  // Məhsul sayını azaltmaq
  const decreaseQuantity = (productId: string) => {
    setItems(
      items.map(item => {
        if (item.id === productId) {
          const newQuantity = Math.max(1, item.quantity - 1);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };
  
  // Səbəti təmizləmək
  const clearCart = () => {
    setItems([]);
  };
  
  const value = {
    items,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    itemCount,
    totalPrice
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}; 