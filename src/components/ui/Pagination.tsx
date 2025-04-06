import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Pagination as PaginationType } from '../../types';

interface PaginationProps extends PaginationType {
  onPageChange: (page: number) => void;
  totalPages: number;
  className?: string;
  showTotal?: boolean;
}

/**
 * Səhifələndirmə komponenti
 */
export const Pagination = ({
  page,
  perPage,
  total,
  onPageChange,
  totalPages,
  className = '',
  showTotal = true
}: PaginationProps) => {
  // Əvvəlki və sonrakı səhifə düymələri
  const goToPreviousPage = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  const goToNextPage = () => {
    if (page < totalPages) {
      onPageChange(page + 1);
    }
  };

  // Səhifə nömrələrini göstərmək üçün
  const renderPageNumbers = () => {
    const pageNumbers = [];
    
    // Ümumi səhifə sayı 7-dən azdırsa, bütün səhifələri göstərmək
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <PageButton 
            key={i}
            page={i}
            isActive={i === page}
            onClick={() => onPageChange(i)}
          />
        );
      }
      return pageNumbers;
    }
    
    // Əks halda, cari səhifənin ətrafındakı səhifələri və ellipsis göstərmək
    pageNumbers.push(
      <PageButton 
        key={1}
        page={1}
        isActive={1 === page}
        onClick={() => onPageChange(1)}
      />
    );
    
    // Əvvəlki səhifələr üçün ellipsis
    if (page > 3) {
      pageNumbers.push(
        <div key="ellipsis-start" className="px-2 py-2 text-gray-400">
          ...
        </div>
      );
    }
    
    // Cari səhifənin ətrafındakı səhifələr
    const startPage = Math.max(2, page - 1);
    const endPage = Math.min(totalPages - 1, page + 1);
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <PageButton 
          key={i}
          page={i}
          isActive={i === page}
          onClick={() => onPageChange(i)}
        />
      );
    }
    
    // Sonrakı səhifələr üçün ellipsis
    if (page < totalPages - 2) {
      pageNumbers.push(
        <div key="ellipsis-end" className="px-2 py-2 text-gray-400">
          ...
        </div>
      );
    }
    
    // Son səhifə
    pageNumbers.push(
      <PageButton 
        key={totalPages}
        page={totalPages}
        isActive={totalPages === page}
        onClick={() => onPageChange(totalPages)}
      />
    );
    
    return pageNumbers;
  };

  return (
    <div className={`flex items-center justify-between border-t border-gray-200 pt-3 ${className}`}>
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={goToPreviousPage}
          disabled={page === 1}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Əvvəlki
        </button>
        <button
          onClick={goToNextPage}
          disabled={page === totalPages}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Sonrakı
        </button>
      </div>
      
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        {showTotal && (
          <div>
            <p className="text-sm text-gray-700">
              <span className="font-medium">{total}</span> nəticədən{' '}
              <span className="font-medium">{(page - 1) * perPage + 1}</span>-
              <span className="font-medium">{Math.min(page * perPage, total)}</span> arası göstərilir
            </p>
          </div>
        )}
        
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button
              onClick={goToPreviousPage}
              disabled={page === 1}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Əvvəlki</span>
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            
            {renderPageNumbers()}
            
            <button
              onClick={goToNextPage}
              disabled={page === totalPages}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Sonrakı</span>
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

// Səhifə nömrəsi düyməsi
interface PageButtonProps {
  page: number;
  isActive: boolean;
  onClick: () => void;
}

const PageButton = ({ page, isActive, onClick }: PageButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
        isActive
          ? 'z-10 bg-blue-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
          : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
      }`}
      aria-current={isActive ? 'page' : undefined}
    >
      {page}
    </button>
  );
}; 