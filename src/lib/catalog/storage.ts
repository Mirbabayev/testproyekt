import { CatalogData } from './types';

const STORAGE_KEYS = {
  CATALOG_DATA: 'easyparfum_catalog_data'
};

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

export const saveCatalogDataToStorage = (data: CatalogData): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.CATALOG_DATA, JSON.stringify(data));
  } catch (error) {
    console.error('Kataloq məlumatları saxlanarkən xəta:', error);
  }
}; 