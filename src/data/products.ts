export interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  popularity: number;
  gender: 'kişi' | 'qadın' | 'uniseks';
  size: string;
  concentration: string;
  inStock: boolean;
  isNew: boolean;
  isBestSeller: boolean;
  notes: string[];
  fragranceFamily: 'citrus' | 'floral' | 'woody' | 'oriental' | 'fresh' | 'fruity' | 'gourmand' | 'aqua';
}

export const products: Product[] = [
  {
    id: "1",
    name: "Bleu de Chanel",
    brand: "CHANEL",
    description: "Təravətli və cəlbedici ətir",
    price: 299,
    image: "https://parfumaz.com/image/cache/catalog/chanel/bleu-de-chanel-parfum-800x800.jpg",
    rating: 4.8,
    popularity: 95,
    gender: "kişi",
    size: "100ml",
    concentration: "Eau de Parfum",
    inStock: true,
    isNew: false,
    isBestSeller: true,
    notes: ["sitrus", "kəhrəba", "sandal ağacı", "vətiver"],
    fragranceFamily: "woody"
  },
  {
    id: "2",
    name: "La Vie Est Belle",
    brand: "LANCÔME",
    description: "Zərif və romantik ətir",
    price: 259,
    image: "https://parfumaz.com/image/cache/catalog/lancome/la-vie-est-belle-800x800.jpg",
    rating: 4.7,
    popularity: 92,
    gender: "qadın",
    size: "75ml",
    concentration: "Eau de Parfum",
    inStock: true,
    isNew: false,
    isBestSeller: true,
    notes: ["qara qarağat", "çiyələk", "vanil", "badem"],
    fragranceFamily: "gourmand"
  },
  {
    id: "3",
    name: "Acqua di Gio",
    brand: "GIORGIO ARMANI",
    description: "Sərin və təravətli dəniz ətri",
    price: 279,
    image: "https://parfumaz.com/image/cache/catalog/armani/acqua-di-gio-profumo-800x800.jpg",
    rating: 4.6,
    popularity: 88,
    gender: "kişi",
    size: "100ml",
    concentration: "Eau de Toilette",
    inStock: true,
    isNew: false,
    isBestSeller: false,
    notes: ["limon", "portağal", "dəniz", "vətiver"],
    fragranceFamily: "aqua"
  },
  {
    id: "4",
    name: "Black Opium",
    brand: "YVES SAINT LAURENT",
    description: "Cəlbedici və sirli ətir",
    price: 289,
    image: "https://parfumaz.com/image/cache/catalog/ysl/black-opium-800x800.jpg",
    rating: 4.9,
    popularity: 94,
    gender: "qadın",
    size: "90ml",
    concentration: "Eau de Parfum",
    inStock: true,
    isNew: true,
    isBestSeller: true,
    notes: ["qəhvə", "vanil", "çiçək", "kəhrəba"],
    fragranceFamily: "oriental"
  },
  {
    id: "5",
    name: "Aventus",
    brand: "CREED",
    description: "Premium və lüks ətir",
    price: 799,
    image: "https://parfumaz.com/image/cache/catalog/creed/aventus-800x800.jpg",
    rating: 4.9,
    popularity: 96,
    gender: "kişi",
    size: "100ml",
    concentration: "Eau de Parfum",
    inStock: true,
    isNew: false,
    isBestSeller: true,
    notes: ["ananas", "sitrus", "sandal ağacı", "məşk"],
    fragranceFamily: "fruity"
  },
  {
    id: "6",
    name: "Libre",
    brand: "YVES SAINT LAURENT",
    description: "Modern və azad ruhlu ətir",
    price: 269,
    image: "https://parfumaz.com/image/cache/catalog/ysl/libre-intense-800x800.jpg",
    rating: 4.7,
    popularity: 90,
    gender: "qadın",
    size: "90ml",
    concentration: "Eau de Parfum",
    inStock: true,
    isNew: true,
    isBestSeller: false,
    notes: ["lavanda", "çiçək", "vanil", "sitrus"],
    fragranceFamily: "floral"
  },
  {
    id: "7",
    name: "Baccarat Rouge 540",
    brand: "MAISON FRANCIS KURKDJIAN",
    description: "Lüks və unikal ətir",
    price: 899,
    image: "https://parfumaz.com/image/cache/catalog/francis-kurkdjian/baccarat-rouge-540-800x800.jpg",
    rating: 5.0,
    popularity: 98,
    gender: "uniseks",
    size: "70ml",
    concentration: "Extrait de Parfum",
    inStock: true,
    isNew: false,
    isBestSeller: true,
    notes: ["safran", "ambergris", "kəhrəba", "cedar"],
    fragranceFamily: "oriental"
  },
  {
    id: "8",
    name: "Good Girl",
    brand: "CAROLINA HERRERA",
    description: "Cəsarətli və cazibədar ətir",
    price: 249,
    image: "https://parfumaz.com/image/cache/catalog/carolina-herrera/good-girl-800x800.jpg",
    rating: 4.6,
    popularity: 89,
    gender: "qadın",
    size: "80ml",
    concentration: "Eau de Parfum",
    inStock: true,
    isNew: false,
    isBestSeller: false,
    notes: ["yasəmən", "qəhvə", "vanil", "çiçək"],
    fragranceFamily: "floral"
  }
]; 