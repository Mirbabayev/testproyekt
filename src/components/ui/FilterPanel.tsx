import React, { ReactNode } from 'react';
import { X, Filter, RefreshCw } from 'lucide-react';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onReset: () => void;
  onApply: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Filter panel komponenti
 */
export const FilterPanel = ({
  isOpen,
  onClose,
  onReset,
  onApply,
  title = 'Filtrlər',
  children,
  className = ''
}: FilterPanelProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 overflow-hidden lg:relative lg:inset-auto lg:z-0 lg:overflow-visible">
      {/* Mobile backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 transition-opacity lg:hidden" 
        onClick={onClose}
      />
      
      {/* Filter panel */}
      <div 
        className={`fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16 lg:static lg:inset-auto lg:pl-0 ${className}`}
      >
        <div className="w-screen max-w-md transform transition ease-in-out duration-500 lg:w-full lg:max-w-none lg:transform-none">
          <div className="flex h-full flex-col border-l border-gray-200 bg-white shadow-xl lg:border-l-0 lg:border lg:rounded-lg lg:shadow-none">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <Filter className="mr-2 h-5 w-5 text-gray-500" />
                {title}
              </h3>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500 focus:outline-none lg:hidden"
                onClick={onClose}
              >
                <span className="sr-only">Bağla</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            
            {/* Filter content */}
            <div className="flex-1 overflow-y-auto p-4">
              {children}
            </div>
            
            {/* Footer */}
            <div className="border-t border-gray-200 px-4 py-3 flex justify-between">
              <button
                type="button"
                className="flex items-center text-sm text-gray-500 hover:text-gray-700"
                onClick={onReset}
              >
                <RefreshCw className="mr-1 h-4 w-4" />
                Sıfırla
              </button>
              <div className="flex space-x-3">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  onClick={onClose}
                >
                  Ləğv et
                </button>
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                  onClick={() => {
                    onApply();
                    onClose();
                  }}
                >
                  Tətbiq et
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Filter bölməsi başlığı
 */
export const FilterSectionTitle = ({ children }: { children: ReactNode }) => {
  return (
    <h4 className="text-sm font-medium text-gray-900 mb-2">{children}</h4>
  );
};

/**
 * Filter bölməsi
 */
export const FilterSection = ({ children, className = '' }: { children: ReactNode, className?: string }) => {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  );
}; 