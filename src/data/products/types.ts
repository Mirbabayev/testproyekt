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

export type Gender = 'kişi' | 'qadın' | 'uniseks';
export type Concentration = 'Eau de Parfum' | 'Eau de Toilette' | 'Parfum' | 'Elixir' | 'Cologne Intense'; 