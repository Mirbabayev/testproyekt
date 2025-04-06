import React, { ReactNode } from 'react';
import { 
  Eye, 
  Pencil, 
  Trash, 
  ChevronDown, 
  ChevronUp, 
  Search, 
  Filter, 
  PlusCircle
} from 'lucide-react';
import { SortState } from '../../types';

interface TableColumn<T> {
  header: string;
  accessor: keyof T | ((item: T) => ReactNode);
  width?: string;
  sortable?: boolean;
  center?: boolean;
}

interface TableAction {
  icon: ReactNode;
  onClick: (item: any) => void;
  label: string;
  color?: string;
  show?: (item: any) => boolean;
}

interface AdminTableProps<T, S> {
  data: T[];
  columns: TableColumn<T>[];
  actions?: TableAction[];
  sortState?: SortState<S>;
  onSort?: (field: S) => void;
  onCreateNew?: () => void;
  onSearch?: (term: string) => void;
  onToggleFilters?: () => void;
  searchPlaceholder?: string;
  createButtonText?: string;
  emptyMessage?: string;
  isLoading?: boolean;
  uniqueIdAccessor?: keyof T;
}

/**
 * Admin cədvəl komponenti
 */
export function AdminTable<T extends object, S extends string>({
  data,
  columns,
  actions,
  sortState,
  onSort,
  onCreateNew,
  onSearch,
  onToggleFilters,
  searchPlaceholder = 'Axtar...',
  createButtonText = 'Yeni Əlavə Et',
  emptyMessage = 'Məlumat tapılmadı.',
  isLoading = false,
  uniqueIdAccessor = 'id' as keyof T
}: AdminTableProps<T, S>) {
  // Sıralama simgesin göstərmək üçün funksiya
  const renderSortIcon = (field: string) => {
    if (!sortState || field !== sortState.field) return null;
    
    return sortState.direction === 'asc' 
      ? <ChevronUp className="ml-1 h-4 w-4" /> 
      : <ChevronDown className="ml-1 h-4 w-4" />;
  };

  // Cədvəl başlığını göstərmək
  const renderHeader = (column: TableColumn<T>, index: number) => {
    const isSortable = column.sortable && onSort;
    const fieldName = typeof column.accessor === 'string' ? column.accessor : '';
    
    return (
      <th 
        key={index}
        className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 ${
          column.center ? 'text-center' : ''
        } ${column.width || ''} ${isSortable ? 'cursor-pointer hover:bg-gray-50' : ''}`}
        onClick={() => {
          if (isSortable && typeof column.accessor === 'string') {
            onSort(column.accessor as unknown as S);
          }
        }}
      >
        <div className="flex items-center">
          {column.header}
          {isSortable && renderSortIcon(fieldName as string)}
        </div>
      </th>
    );
  };

  // Cədvəl datası göstərmək
  const renderCell = (item: T, column: TableColumn<T>, index: number) => {
    let cellContent: ReactNode;
    
    if (typeof column.accessor === 'function') {
      cellContent = column.accessor(item);
    } else {
      cellContent = item[column.accessor] as ReactNode;
    }
    
    return (
      <td 
        key={index} 
        className={`px-4 py-4 whitespace-nowrap text-sm text-gray-900 ${column.center ? 'text-center' : ''}`}
      >
        {cellContent}
      </td>
    );
  };

  // Fəaliyyətlər sütunu göstərmək
  const renderActions = (item: T) => {
    if (!actions || actions.length === 0) return null;
    
    return (
      <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex justify-end space-x-2">
          {actions.map((action, index) => {
            // Əgər şərt varsa və şərt false qaytarırsa, fəaliyyəti göstərmə
            if (action.show && !action.show(item)) return null;
            
            const buttonClass = `p-1 rounded-full hover:bg-gray-100 focus:outline-none ${
              action.color ? action.color : ''
            }`;
            
            return (
              <button
                key={index}
                type="button"
                className={buttonClass}
                onClick={() => action.onClick(item)}
                title={action.label}
              >
                {action.icon}
              </button>
            );
          })}
        </div>
      </td>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Cədvəl başlığı - Axtarış, Filter və Əlavə et düymələri */}
      {(onSearch || onToggleFilters || onCreateNew) && (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border-b border-gray-200">
          <div className="flex items-center mb-4 sm:mb-0 w-full sm:w-auto">
            {onSearch && (
              <div className="relative w-full sm:w-64">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder={searchPlaceholder}
                  onChange={(e) => onSearch(e.target.value)}
                />
              </div>
            )}

            {onToggleFilters && (
              <button
                type="button"
                className="ml-3 p-2 flex items-center text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                onClick={onToggleFilters}
              >
                <Filter className="h-4 w-4 mr-1" />
                Filtrlər
              </button>
            )}
          </div>
          
          {onCreateNew && (
            <button
              type="button"
              className="px-4 py-2 flex items-center text-sm text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 w-full sm:w-auto justify-center"
              onClick={onCreateNew}
            >
              <PlusCircle className="h-4 w-4 mr-1" />
              {createButtonText}
            </button>
          )}
        </div>
      )}
      
      {/* Cədvəl */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map(renderHeader)}
              {actions && actions.length > 0 && (
                <th className="relative px-4 py-3">
                  <span className="sr-only">Fəaliyyətlər</span>
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              // Yüklənmə vəziyyəti
              <tr>
                <td 
                  colSpan={columns.length + (actions && actions.length > 0 ? 1 : 0)} 
                  className="px-4 py-4 text-center text-sm text-gray-500"
                >
                  Yüklənir...
                </td>
              </tr>
            ) : data.length === 0 ? (
              // Boş vəziyyət
              <tr>
                <td 
                  colSpan={columns.length + (actions && actions.length > 0 ? 1 : 0)} 
                  className="px-4 py-4 text-center text-sm text-gray-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              // Məlumatlar
              data.map((item, rowIndex) => (
                <tr 
                  key={String(item[uniqueIdAccessor])}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {columns.map((column, colIndex) => renderCell(item, column, colIndex))}
                  {actions && actions.length > 0 && renderActions(item)}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Ümumi fəaliyyət düymələri
export const ViewAction = (onClick: (item: any) => void) => ({
  icon: <Eye className="h-5 w-5 text-blue-600" />,
  onClick,
  label: 'Ətraflı bax',
  color: 'text-blue-600'
});

export const EditAction = (onClick: (item: any) => void) => ({
  icon: <Pencil className="h-5 w-5 text-amber-600" />,
  onClick,
  label: 'Redaktə et',
  color: 'text-amber-600'
});

export const DeleteAction = (onClick: (item: any) => void) => ({
  icon: <Trash className="h-5 w-5 text-red-600" />,
  onClick,
  label: 'Sil',
  color: 'text-red-600'
}); 