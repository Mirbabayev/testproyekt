export interface CatalogData {
  brands: string[];
  categories: string[];
  bottleSizes: string[];
  concentrations: string[];
  fragranceGroups: string[];
  notes: {
    top: string[];
    middle: string[];
    base: string[];
  };
}

export const defaultCatalogData: CatalogData = {
  brands: [
    "Chanel", "Dior", "Tom Ford", "Lancôme", "Guerlain", "Givenchy", 
    "Yves Saint Laurent", "Jo Malone", "Hermès", "Prada", "Armani"
  ],
  categories: ["parfum", "skin care", "makeup", "hair care", "body care"],
  bottleSizes: ["30ml", "50ml", "75ml", "100ml", "125ml", "150ml", "200ml"],
  concentrations: ["Eau de Toilette", "Eau de Parfum", "Parfum", "Cologne", "Eau de Cologne", "Elixir", "Extrait"],
  fragranceGroups: ["Şərq", "Çiçəkli", "Odunlu", "Sitrus"],
  notes: {
    top: ["Bergamot", "Limon", "Portağal"],
    middle: ["Qızılgül", "Jasmin", "Lavanda"],
    base: ["Vanil", "Müşk", "Paçuli"]
  }
}; 