import { getCatalogDataFromStorage, saveCatalogDataToStorage } from '../storage';
import { CatalogData, defaultCatalogData } from '../types';

describe('LocalStorage operations', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('getCatalogDataFromStorage returns null when no data exists', () => {
    const result = getCatalogDataFromStorage();
    expect(result).toBeNull();
  });

  test('saveCatalogDataToStorage and getCatalogDataFromStorage work correctly', () => {
    const testData: CatalogData = {
      ...defaultCatalogData,
      brands: ['Test Brand']
    };

    saveCatalogDataToStorage(testData);
    const result = getCatalogDataFromStorage();

    expect(result).toEqual(testData);
  });

  test('getCatalogDataFromStorage handles invalid JSON gracefully', () => {
    localStorage.setItem('easyparfum_catalog_data', 'invalid json');
    const result = getCatalogDataFromStorage();
    expect(result).toBeNull();
  });
}); 