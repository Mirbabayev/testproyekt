// Ətir kataloqu məlumatlarını idarə etmək üçün servis
import { useState, useEffect } from 'react';

// Kataloq məlumatları tipini təyin edirik
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

// Default kataloq məlumatları
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

// Local Storage açarları
const STORAGE_KEYS = {
  CATALOG_DATA: 'easyparfum_catalog_data'
};

// Kataloq məlumatlarını localStorage-dən alır
export const getCatalogDataFromStorage = (): CatalogData | null => {
  try {
    const storedData = localStorage.getItem(STORAGE_KEYS.CATALOG_DATA);
    if (storedData) {
      return JSON.parse(storedData);
    }
    return null;
  } catch (error) {
    console.error('Kataloq məlumatları oxunarkən xəta:', error);
    return null;
  }
};

// Kataloq məlumatlarını localStorage-ə yazır
export const saveCatalogDataToStorage = (data: CatalogData): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.CATALOG_DATA, JSON.stringify(data));
  } catch (error) {
    console.error('Kataloq məlumatları saxlanarkən xəta:', error);
  }
};

// Kataloq məlumatları React hook-u
export const useCatalogData = () => {
  const [catalogData, setCatalogData] = useState<CatalogData>(defaultCatalogData);
  const [isLoading, setIsLoading] = useState(true);

  // İlk yükləməni həyata keçiririk
  useEffect(() => {
    const loadCatalogData = async () => {
      setIsLoading(true);
      try {
        // Məlumatları localStorage-dən oxuyuruq
        const storedData = getCatalogDataFromStorage();
        
        // Əgər məlumatlar varsa, onları istifadə edirik
        if (storedData) {
          setCatalogData(storedData);
        } else {
          // Əks halda, default məlumatları istifadə edirik və saxlayırıq
          saveCatalogDataToStorage(defaultCatalogData);
        }
      } catch (error) {
        console.error('Kataloq məlumatları yüklənərkən xəta:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCatalogData();
  }, []);

  // Kataloq məlumatlarını yeniləmək üçün funksiyalar
  const updateCatalogData = (newData: CatalogData) => {
    setCatalogData(newData);
    saveCatalogDataToStorage(newData);
  };

  // Brend əlavə etmək
  const addBrand = (brand: string) => {
    if (!catalogData.brands.includes(brand)) {
      const newData = {
        ...catalogData,
        brands: [...catalogData.brands, brand]
      };
      updateCatalogData(newData);
      return true;
    }
    return false;
  };

  // Kateqoriya əlavə etmək
  const addCategory = (category: string) => {
    if (!catalogData.categories.includes(category)) {
      const newData = {
        ...catalogData,
        categories: [...catalogData.categories, category]
      };
      updateCatalogData(newData);
      return true;
    }
    return false;
  };

  // Şüşə ölçüsü əlavə etmək
  const addBottleSize = (size: string) => {
    if (!catalogData.bottleSizes.includes(size)) {
      const newData = {
        ...catalogData,
        bottleSizes: [...catalogData.bottleSizes, size]
      };
      updateCatalogData(newData);
      return true;
    }
    return false;
  };

  // Konsentrasiya əlavə etmək
  const addConcentration = (concentration: string) => {
    if (!catalogData.concentrations.includes(concentration)) {
      const newData = {
        ...catalogData,
        concentrations: [...catalogData.concentrations, concentration]
      };
      updateCatalogData(newData);
      return true;
    }
    return false;
  };

  // Ətir qrupu əlavə etmək
  const addFragranceGroup = (group: string) => {
    if (!catalogData.fragranceGroups.includes(group)) {
      const newData = {
        ...catalogData,
        fragranceGroups: [...catalogData.fragranceGroups, group]
      };
      updateCatalogData(newData);
      return true;
    }
    return false;
  };

  // Not əlavə etmək
  const addNote = (noteType: 'top' | 'middle' | 'base', note: string) => {
    if (!catalogData.notes[noteType].includes(note)) {
      const newNotes = {
        ...catalogData.notes,
        [noteType]: [...catalogData.notes[noteType], note]
      };
      
      const newData = {
        ...catalogData,
        notes: newNotes
      };
      
      updateCatalogData(newData);
      return true;
    }
    return false;
  };

  // Kataloq məlumatlarını sıfırlamaq
  const resetCatalogData = () => {
    setCatalogData(defaultCatalogData);
    saveCatalogDataToStorage(defaultCatalogData);
  };

  return {
    catalogData,
    isLoading,
    updateCatalogData,
    addBrand,
    addCategory,
    addBottleSize,
    addConcentration,
    addFragranceGroup,
    addNote,
    resetCatalogData
  };
}; 