import { Product } from './types';

export const womenProducts: Product[] = [
  {
    id: "2",
    name: "Chanel Coco Mademoiselle",
    brand: "Chanel",
    description: "Chanel Coco Mademoiselle - Jacques Polge tərəfindən müasir qadının azadlıq ruhunu və cazibədarlığını əks etdirmək üçün yaradılan efsanəvi ətir.",
    image: "https://placehold.co/600x800?text=Chanel+Coco+Mademoiselle",
    price: 145,
    rating: 4.8,
    gender: "qadın",
    size: "100ml",
    concentration: "Eau de Parfum",
    notes: {
      top: ["Portağal", "Mandarin", "Bergamot"],
      middle: ["Jasmin", "Çəhrayı istiot", "May gülü", "Dəfnə yarpağı"],
      base: ["Paçuli", "Vetiver", "Vanil", "Ağ müşk"]
    },
    inStock: true,
    category: "parfum",
    popularity: 95
  },
  {
    id: "4",
    name: "Yves Saint Laurent Black Opium",
    brand: "YSL",
    description: "YSL Black Opium - Nathalie Lorson, Marie Salamagne, Olivier Cresp və Honorine Blanc tərəfindən 2014-cü ildə yaradılan, cəsarətli və enerjili ətirlər sevən qadınlar üçün mükəmməl seçim.",
    image: "https://placehold.co/600x800?text=YSL+Black+Opium",
    price: 125,
    rating: 4.6,
    gender: "qadın",
    size: "90ml",
    concentration: "Eau de Parfum",
    notes: {
      top: ["Qəhvə", "Portağal çiçəyi", "Armud"],
      middle: ["Çəhrayı istiot", "Jasmin", "Badam çiçəyi"],
      base: ["Şirin vanil", "Kedr", "Paçuli", "Kakao"]
    },
    inStock: true,
    category: "parfum",
    popularity: 88
  },
  {
    id: "5",
    name: "Guerlain Mon Guerlain",
    brand: "Guerlain",
    description: "Guerlain Mon Guerlain - Angelina Jolie-nin ilham qaynağı olduğu, Thierry Wasser və Delphine Jelk tərəfindən 2017-ci ildə yaradılan müasir qadın parfümü.",
    image: "https://placehold.co/600x800?text=Guerlain+Mon+Guerlain",
    price: 135,
    rating: 4.7,
    gender: "qadın",
    size: "50ml",
    concentration: "Eau de Parfum",
    notes: {
      top: ["Lavanda", "Bergamot", "Məryəm noxudu"],
      middle: ["Jasmin Sambac", "Iris"],
      base: ["Qızılgül", "Vanil", "Kumarin", "Bənzoin", "Sandal ağacı", "Paçuli", "Likris"]
    },
    inStock: true,
    category: "parfum",
    popularity: 90
  },
  {
    id: "9",
    name: "Lancôme Trésor",
    brand: "Lancôme",
    description: "Lancôme Trésor - Sophia Grojsman tərəfindən 1990-cı ildə yaradılan, zamansız bir klassika halına gəlmiş qadın ətrləri arasında ən məşhur olanlardan biri.",
    image: "https://placehold.co/600x800?text=Lancome+Tresor",
    price: 110,
    rating: 4.5,
    gender: "qadın",
    size: "100ml",
    concentration: "Eau de Parfum",
    notes: {
      top: ["Şaftalı"],
      middle: ["Bergamot", "Anaşı", "Apelsin çiçəyi"],
      base: ["Qızılgül", "İris", "Yasəmən", "Lilyum", "Vanil", "Sandal ağacı", "Müşk", "Ənbər", "Abrikos"]
    },
    inStock: true,
    category: "parfum",
    popularity: 85
  }
]; 