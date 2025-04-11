import { useState, useEffect } from 'react';
import { CatalogData, defaultCatalogData } from './types';
import { getCatalogDataFromStorage } from './storage';
import { 
  updateCatalogData,
  addBrand,
  addCategory,
  addBottleSize,
  addConcentration,
  addFragranceGroup,
  addNote
} from './catalog-actions';

export const useCatalogData = () => {
  const [catalogData, setCatalogData] = useState<CatalogData>(defaultCatalogData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCatalogData = async () => {
      setIsLoading(true);
      try {
        const storedData = getCatalogDataFromStorage();
        
        if (storedData) {
          setCatalogData(storedData);
        } else {
          setCatalogData(defaultCatalogData);
        }
      } catch (error) {
        console.error('Kataloq məlumatları yüklənərkən xəta:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCatalogData();
  }, []);

  const handleUpdateCatalogData = (newData: CatalogData) => {
    const updatedData = updateCatalogData(catalogData, newData);
    setCatalogData(updatedData);
  };

  const handleAddBrand = (brand: string) => {
    return addBrand(catalogData, brand);
  };

  const handleAddCategory = (category: string) => {
    return addCategory(catalogData, category);
  };

  const handleAddBottleSize = (size: string) => {
    return addBottleSize(catalogData, size);
  };

  const handleAddConcentration = (concentration: string) => {
    return addConcentration(catalogData, concentration);
  };

  const handleAddFragranceGroup = (group: string) => {
    return addFragranceGroup(catalogData, group);
  };

  const handleAddNote = (noteType: 'top' | 'middle' | 'base', note: string) => {
    return addNote(catalogData, noteType, note);
  };

  return {
    catalogData,
    isLoading,
    updateCatalogData: handleUpdateCatalogData,
    addBrand: handleAddBrand,
    addCategory: handleAddCategory,
    addBottleSize: handleAddBottleSize,
    addConcentration: handleAddConcentration,
    addFragranceGroup: handleAddFragranceGroup,
    addNote: handleAddNote
  };
}; 