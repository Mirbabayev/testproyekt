import { Product } from './types';

export const menProducts: Product[] = [
  {
    id: "1",
    name: "Dior Sauvage Elixir",
    brand: "Dior",
    description: "Dior Sauvage Elixir - Françis Kurkdjian-ın dəsti-xətti ilə yaradılmış, orijinal Sauvage-ın daha zəngin və konsantrə olunmuş versiyası. Bu əfsanəvi ətrin fəlsəfəsinə sadiq qalaraq daha cəsur və zəngin kompozisiya təqdim edir.",
    image: "https://placehold.co/600x800?text=Dior+Sauvage+Elixir",
    price: 160,
    rating: 4.9,
    gender: "kişi",
    size: "60ml",
    concentration: "Elixir",
    notes: {
      top: ["Qreypfrut", "Portağal", "Qara istiot"],
      middle: ["Darçın", "Lavanda"],
      base: ["Vanil", "Ənbər", "Paçuli", "Sedir", "Meşə notları"]
    },
    inStock: true,
    category: "parfum",
    popularity: 98
  },
  {
    id: "3",
    name: "Tom Ford Noir Extreme",
    brand: "Tom Ford",
    description: "Tom Ford Noir Extreme - istilik və ədviyyəli notlarla zəngin olan, kişilər üçün şərq üslublu gourmet ətir.",
    image: "https://placehold.co/600x800?text=Tom+Ford+Noir+Extreme",
    price: 230,
    rating: 4.7,
    gender: "kişi",
    size: "50ml",
    concentration: "Eau de Parfum",
    notes: {
      top: ["Kardamom", "Zəfəran", "Nutmeq", "Mandarin"],
      middle: ["Kulinar notlar", "Mastika", "Qəhvə", "Nərgiz", "Qızılgül", "Jasmin"],
      base: ["Müşk", "Ənbər", "Sandal ağacı", "Vanil", "Tonka fasulyesi", "Qoz"]
    },
    inStock: true,
    category: "parfum",
    popularity: 92
  },
  {
    id: "6",
    name: "Acqua di Gio Profumo",
    brand: "Giorgio Armani",
    description: "Acqua di Gio Profumo - Alberto Morillas tərəfindən 2015-ci ildə yaradılmış, orijinal Acqua di Gio'nun daha dərin və güclü versiyası.",
    image: "https://placehold.co/600x800?text=Acqua+di+Gio+Profumo",
    price: 150,
    rating: 4.8,
    gender: "kişi",
    size: "75ml",
    concentration: "Parfum",
    notes: {
      top: ["Dəniz notları", "Bergamot", "Portağal"],
      middle: ["Adaçayı", "Geranium", "Rozmarin"],
      base: ["Tütsü", "Paçuli", "Ənbər", "Kedr"]
    },
    inStock: true,
    category: "parfum",
    popularity: 85
  }
]; 