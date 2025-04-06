// Məhsul tipləri
export interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  image: string;
  price: number;
  rating: number;
  gender: 'kişi' | 'qadın' | 'uniseks';
  size: string;
  concentration: string;
  notes: {
    top: string[];
    middle: string[];
    base: string[];
  };
  inStock: boolean;
  category: string;
  popularity: number;
}

// Məhsul filtri tipi
export interface ProductFilter {
  brands: string[];
  priceRange: [number, number];
  gender?: 'kişi' | 'qadın' | 'uniseks';
  category?: string;
  inStock?: boolean;
}

// Məhsul sıralama tipi
export interface ProductSort {
  field: 'name' | 'price' | 'brand' | 'popularity';
  direction: 'asc' | 'desc';
} 