import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../data/products';

// Seçilmişlərdəki məhsul elementi tipi
export interface WishlistItem {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
}

// Kontekst tipi
interface WishlistContextType {
  items: WishlistItem[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
  isInWishlist: (productId: string) => boolean;
  itemCount: number;
}

// Başlanğıc dəyər
const defaultWishlistContext: WishlistContextType = {
  items: [],
  addToWishlist: () => {},
  removeFromWishlist: () => {},
  clearWishlist: () => {},
  isInWishlist: () => false,
  itemCount: 0
};

// Context yaratmaq
const WishlistContext = createContext<WishlistContextType>(defaultWishlistContext);

// Custom hook
export const useWishlist = () => useContext(WishlistContext);

// Provider komponenti
interface WishlistProviderProps {
  children: ReactNode;
}

export const WishlistProvider = ({ children }: WishlistProviderProps) => {
  // Seçilmişlər məlumatlarını saxlamaq üçün state
  const [items, setItems] = useState<WishlistItem[]>([]);
  
  // Toplam məhsul sayı
  const [itemCount, setItemCount] = useState(0);
  
  // Local Storage-dən məlumatları yükləmək
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        const parsedWishlist = JSON.parse(savedWishlist);
        setItems(parsedWishlist);
      } catch (error) {
        console.error('Seçilmişlər yüklənmə xətası:', error);
      }
    }
  }, []);
  
  // Seçilmişlərdəki məhsulları saxlamaq
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(items));
    
    // Toplam məhsul sayı hesablamaq
    setItemCount(items.length);
  }, [items]);
  
  // Məhsul əlavə etmək
  const addToWishlist = (product: Product) => {
    // Əvvəlcə məhsulun seçilmişlərdə olub-olmadığını yoxlayırıq
    const existingItem = items.find(item => item.id === product.id);
    
    if (!existingItem) {
      // Məhsul seçilmişlərdə deyilsə, əlavə edirik
      setItems([
        ...items, 
        {
          id: product.id,
          name: product.name,
          brand: product.brand,
          price: product.price,
          image: product.image
        }
      ]);
    }
  };
  
  // Məhsulu silmək
  const removeFromWishlist = (productId: string) => {
    setItems(items.filter(item => item.id !== productId));
  };
  
  // Seçilmişləri təmizləmək
  const clearWishlist = () => {
    setItems([]);
  };
  
  // Məhsulun seçilmişlərdə olub-olmadığını yoxlamaq
  const isInWishlist = (productId: string) => {
    return items.some(item => item.id === productId);
  };
  
  const value = {
    items,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
    itemCount
  };
  
  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}; 