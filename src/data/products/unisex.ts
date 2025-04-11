import { Product } from './types';

export const unisexProducts: Product[] = [
  {
    id: "7",
    name: "Jo Malone Oud & Bergamot",
    brand: "Jo Malone",
    description: "Jo Malone Oud & Bergamot - Christine Nagel tərəfindən 2010-cu ildə yaradılan lüks və zərif qoxu, Cologne Intense kolleksiyasının bir parçası.",
    image: "https://placehold.co/600x800?text=Jo+Malone+Oud+Bergamot",
    price: 180,
    rating: 4.6,
    gender: "uniseks",
    size: "100ml",
    concentration: "Cologne Intense",
    notes: {
      top: ["Oud", "Bergamot"],
      middle: ["Sedir", "Ənbər"],
      base: ["Quru meyvələr", "Tütün", "Sitra", "Apelsin çiçəyi", "Sandal ağacı"]
    },
    inStock: true,
    category: "parfum",
    popularity: 96
  },
  {
    id: "8",
    name: "Byredo Black Saffron",
    brand: "Byredo",
    description: "Byredo Black Saffron - Jerome Epinette tərəfindən 2012-ci ildə Hindistandan ilhamlanaraq yaradılan uniseks parfüm.",
    image: "https://placehold.co/600x800?text=Byredo+Black+Saffron",
    price: 210,
    rating: 4.7,
    gender: "uniseks",
    size: "50ml",
    concentration: "Eau de Parfum",
    notes: {
      top: ["Zəfəran"],
      middle: ["Juniper yağları", "Çin gülü"],
      base: ["Qara bənövşə", "Dəri", "Qızılgül", "Müşk", "Vetiver", "Rasberry"]
    },
    inStock: true,
    category: "parfum",
    popularity: 93
  }
]; 