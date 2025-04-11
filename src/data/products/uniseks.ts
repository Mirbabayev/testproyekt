import { Product } from './types';

export const unisexProducts: Product[] = [
  {
    id: "7",
    name: "Jo Malone Wood Sage & Sea Salt",
    brand: "Jo Malone",
    description: "Jo Malone Wood Sage & Sea Salt - Christine Nagel tərəfindən 2014-cü ildə yaradılan, dəniz və meşə notlarını birləşdirən uniseks ətir.",
    image: "https://placehold.co/600x800?text=Jo+Malone+Wood+Sage+Sea+Salt",
    price: 140,
    rating: 4.7,
    gender: "uniseks",
    size: "100ml",
    concentration: "Cologne",
    notes: {
      top: ["Dəniz duzu", "Səbəzə"],
      middle: ["Adaçayı", "Kedr"],
      base: ["Müşk", "Ənbər"]
    },
    inStock: true,
    category: "parfum",
    popularity: 87
  },
  {
    id: "8",
    name: "Maison Margiela Replica By the Fireplace",
    brand: "Maison Margiela",
    description: "Maison Margiela Replica By the Fireplace - Marie Salamagne tərəfindən 2015-ci ildə yaradılan, odlu şömində oturmaq hissini yaradan uniseks ətir.",
    image: "https://placehold.co/600x800?text=Maison+Margiela+By+the+Fireplace",
    price: 130,
    rating: 4.6,
    gender: "uniseks",
    size: "100ml",
    concentration: "Eau de Toilette",
    notes: {
      top: ["Qırmızı qızılgül", "Portağal çiçəyi", "Qlitseriya"],
      middle: ["Qəhvə", "Qəhvə çiçəyi", "Qəhvə yarpağı"],
      base: ["Vanil", "Qəhvə", "Qəhvə çiçəyi", "Qəhvə yarpağı"]
    },
    inStock: true,
    category: "parfum",
    popularity: 84
  }
]; 