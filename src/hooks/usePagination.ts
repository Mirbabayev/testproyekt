import { useState, useEffect, useMemo } from 'react';
import { Pagination } from '../types';

interface UsePaginationProps<T> {
  data: T[];
  perPage?: number;
  initialPage?: number;
}

interface UsePaginationReturn<T> extends Pagination {
  paginatedData: T[];
  goToPage: (page: number) => void;
  goToNextPage: () => void;
  goToPrevPage: () => void;
  totalPages: number;
}

/**
 * Pagination hook
 * @param data Səhifələnəcək məlumatlar
 * @param perPage Hər səhifədə göstəriləcək element sayı
 * @param initialPage İlkin səhifə nömrəsi
 * @returns Səhifələnmiş məlumatlar və pagination funksiyaları
 */
export function usePagination<T>({
  data,
  perPage = 10,
  initialPage = 1
}: UsePaginationProps<T>): UsePaginationReturn<T> {
  const [page, setPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(perPage);
  
  // Ümumi səhifə sayını hesabla
  const totalPages = useMemo(() => Math.ceil(data.length / itemsPerPage), [data, itemsPerPage]);
  
  // Verilən məlumatların dəyişməsi halında, əgər mövcud səhifə ümumi səhifə sayından
  // böyükdürsə, səhifəni düzgün qiymətə qaytarırıq
  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setPage(totalPages);
    }
  }, [data, page, totalPages]);

  // Məlumatları səhifələndir
  const paginatedData = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return data.slice(start, end);
  }, [data, page, itemsPerPage]);

  // Səhifə naviqasiyası funksiyaları
  const goToPage = (newPage: number) => {
    setPage(Math.max(1, Math.min(newPage, totalPages)));
  };

  const goToNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const goToPrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return {
    page,
    perPage: itemsPerPage,
    total: data.length,
    paginatedData,
    goToPage,
    goToNextPage,
    goToPrevPage,
    totalPages
  };
} 