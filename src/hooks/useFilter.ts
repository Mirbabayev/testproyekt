import { useState, useEffect, useCallback, useMemo } from 'react';
import { FilterState } from '../types';

interface UseFilterProps<T, F, S> {
  data: T[];
  initialFilters?: F;
  initialSort?: S;
  filterFn: (item: T, filters: F) => boolean;
  sortFn: (a: T, b: T, sort: S) => number;
}

interface UseFilterReturn<T, F, S> {
  filteredData: T[];
  filterState: FilterState<F>;
  sortState: S;
  setFilters: (filters: F) => void;
  setSort: (sort: S) => void;
  resetFilters: () => void;
  toggleFilters: () => void;
}

/**
 * Məlumatların filtrləmə və sıralanması üçün hook
 * @param data Filtrləmək üçün məlumatlar
 * @param initialFilters İlkin filtr vəziyyəti
 * @param initialSort İlkin sıralama parametrləri
 * @param filterFn Filter funksiyası
 * @param sortFn Sıralama funksiyası
 * @returns Filtrlənmiş məlumatlar və filter funksiyaları
 */
export function useFilter<T, F, S>({
  data,
  initialFilters,
  initialSort,
  filterFn,
  sortFn
}: UseFilterProps<T, F, S>): UseFilterReturn<T, F, S> {
  // Filter panelinın açıq/qapalı vəziyyəti
  const [filterState, setFilterState] = useState<FilterState<F>>({
    isOpen: false,
    filters: initialFilters as F
  });
  
  // Sıralama vəziyyəti
  const [sortState, setSortState] = useState<S>(initialSort as S);

  // Filterləri dəyişmək
  const setFilters = useCallback((filters: F) => {
    setFilterState(prev => ({
      ...prev,
      filters
    }));
  }, []);

  // Sıralamanı dəyişmək
  const setSort = useCallback((sort: S) => {
    setSortState(sort);
  }, []);

  // Filterləri sıfırlamaq
  const resetFilters = useCallback(() => {
    setFilterState(prev => ({
      ...prev,
      filters: initialFilters as F
    }));
  }, [initialFilters]);

  // Filter panelini açmaq/bağlamaq
  const toggleFilters = useCallback(() => {
    setFilterState(prev => ({
      ...prev,
      isOpen: !prev.isOpen
    }));
  }, []);

  // Məlumatları filterlə
  const filteredData = useMemo(() => {
    // Əvvəlcə filterləri tətbiq et
    let result = filterState.filters 
      ? data.filter(item => filterFn(item, filterState.filters))
      : [...data];
    
    // Sonra sıralamanı tətbiq et
    if (sortState) {
      result = [...result].sort((a, b) => sortFn(a, b, sortState));
    }
    
    return result;
  }, [data, filterState.filters, sortState, filterFn, sortFn]);

  return {
    filteredData,
    filterState,
    sortState,
    setFilters,
    setSort,
    resetFilters,
    toggleFilters
  };
} 