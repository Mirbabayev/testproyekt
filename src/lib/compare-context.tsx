import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Product } from '../data/products';

// Əməliyyat tipləri
type CompareAction = 
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR_ITEMS' };

interface CompareContextType {
  items: Product[];
  dispatch: React.Dispatch<CompareAction>;
  isInCompare: (productId: string) => boolean;
  itemCount: number;
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: string) => void;
}

// Reduser funksiyası
const compareReducer = (state: Product[], action: CompareAction): Product[] => {
  switch (action.type) {
    case 'ADD_ITEM':
      if (state.some(item => item.id === action.payload.id)) {
        return state;
      }
      return [...state, action.payload];
    case 'REMOVE_ITEM':
      return state.filter(item => item.id !== action.payload);
    case 'CLEAR_ITEMS':
      return [];
    default:
      return state;
  }
};

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(compareReducer, []);
  
  // Local storage-dan məlumatları yükləyirik
  useEffect(() => {
    const storedItems = localStorage.getItem('compare-items');
    if (storedItems) {
      try {
        const parsedItems = JSON.parse(storedItems);
        parsedItems.forEach((item: Product) => {
          dispatch({ type: 'ADD_ITEM', payload: item });
        });
      } catch (error) {
        console.error('Müqayisə məlumatları yüklənərkən xəta:', error);
        localStorage.removeItem('compare-items');
      }
    }
  }, []);
  
  // Local storage-a məlumatları saxlayırıq
  useEffect(() => {
    localStorage.setItem('compare-items', JSON.stringify(items));
  }, [items]);
  
  // Məhsulun müqayisədə olub-olmadığını yoxlamaq
  const isInCompare = (productId: string) => {
    return items.some(item => item.id === productId);
  };
  
  // Müqayisəyə məhsul əlavə etmək
  const addToCompare = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };
  
  // Müqayisədən məhsul silmək
  const removeFromCompare = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };
  
  return (
    <CompareContext.Provider 
      value={{ 
        items, 
        dispatch,
        isInCompare,
        itemCount: items.length,
        addToCompare,
        removeFromCompare
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  
  if (context === undefined) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  
  return context;
} 