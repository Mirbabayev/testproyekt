import { CatalogData } from './types';
import { saveCatalogDataToStorage } from './storage';

export const updateCatalogData = (currentData: CatalogData, newData: CatalogData): CatalogData => {
  const updatedData = { ...currentData, ...newData };
  saveCatalogDataToStorage(updatedData);
  return updatedData;
};

export const addBrand = (currentData: CatalogData, brand: string): boolean => {
  if (!currentData.brands.includes(brand)) {
    const newData = {
      ...currentData,
      brands: [...currentData.brands, brand]
    };
    saveCatalogDataToStorage(newData);
    return true;
  }
  return false;
};

export const addCategory = (currentData: CatalogData, category: string): boolean => {
  if (!currentData.categories.includes(category)) {
    const newData = {
      ...currentData,
      categories: [...currentData.categories, category]
    };
    saveCatalogDataToStorage(newData);
    return true;
  }
  return false;
};

export const addBottleSize = (currentData: CatalogData, size: string): boolean => {
  if (!currentData.bottleSizes.includes(size)) {
    const newData = {
      ...currentData,
      bottleSizes: [...currentData.bottleSizes, size]
    };
    saveCatalogDataToStorage(newData);
    return true;
  }
  return false;
};

export const addConcentration = (currentData: CatalogData, concentration: string): boolean => {
  if (!currentData.concentrations.includes(concentration)) {
    const newData = {
      ...currentData,
      concentrations: [...currentData.concentrations, concentration]
    };
    saveCatalogDataToStorage(newData);
    return true;
  }
  return false;
};

export const addFragranceGroup = (currentData: CatalogData, group: string): boolean => {
  if (!currentData.fragranceGroups.includes(group)) {
    const newData = {
      ...currentData,
      fragranceGroups: [...currentData.fragranceGroups, group]
    };
    saveCatalogDataToStorage(newData);
    return true;
  }
  return false;
};

export const addNote = (currentData: CatalogData, noteType: 'top' | 'middle' | 'base', note: string): boolean => {
  if (!currentData.notes[noteType].includes(note)) {
    const newNotes = {
      ...currentData.notes,
      [noteType]: [...currentData.notes[noteType], note]
    };
    
    const newData = {
      ...currentData,
      notes: newNotes
    };
    
    saveCatalogDataToStorage(newData);
    return true;
  }
  return false;
}; 