import { renderHook, act } from '@testing-library/react-hooks';
import { useCatalogData } from '../catalog-hook';
import { CatalogData, defaultCatalogData } from '../types';
import { getCatalogDataFromStorage, saveCatalogDataToStorage } from '../storage';

describe('useCatalogData hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('initial state is correct', () => {
    const { result } = renderHook(() => useCatalogData());
    
    expect(result.current.isLoading).toBe(true);
    expect(result.current.catalogData).toEqual(defaultCatalogData);
  });

  test('loads data from localStorage', async () => {
    const testData: CatalogData = {
      ...defaultCatalogData,
      brands: ['Test Brand']
    };
    
    saveCatalogDataToStorage(testData);
    
    const { result, waitForNextUpdate } = renderHook(() => useCatalogData());
    
    await waitForNextUpdate();
    
    expect(result.current.isLoading).toBe(false);
    expect(result.current.catalogData).toEqual(testData);
  });

  test('updates catalog data correctly', () => {
    const { result } = renderHook(() => useCatalogData());
    
    act(() => {
      result.current.updateCatalogData({
        ...defaultCatalogData,
        brands: ['New Brand']
      });
    });
    
    expect(result.current.catalogData.brands).toEqual(['New Brand']);
  });

  test('adds new brand correctly', () => {
    const { result } = renderHook(() => useCatalogData());
    
    act(() => {
      result.current.addBrand('New Brand');
    });
    
    expect(result.current.catalogData.brands).toContain('New Brand');
  });

  test('adds new category correctly', () => {
    const { result } = renderHook(() => useCatalogData());
    
    act(() => {
      result.current.addCategory('New Category');
    });
    
    expect(result.current.catalogData.categories).toContain('New Category');
  });

  test('adds new note correctly', () => {
    const { result } = renderHook(() => useCatalogData());
    
    act(() => {
      result.current.addNote('top', 'New Note');
    });
    
    expect(result.current.catalogData.notes.top).toContain('New Note');
  });
}); 