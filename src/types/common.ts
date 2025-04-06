// Ümumi istifadə olunan tiplər

// Pagination tipi
export interface Pagination {
  page: number;
  perPage: number;
  total: number;
}

// Sorğuların vəziyyəti üçün tip
export type QueryStatus = 'idle' | 'loading' | 'success' | 'error';

// CRUD əməliyyatı vəziyyəti
export interface CrudState {
  status: QueryStatus;
  error: string | null;
}

// Modal tipi
export interface ModalState {
  isOpen: boolean;
  type: 'create' | 'view' | 'edit' | 'delete' | null;
  data: any;
}

// Filtr vəziyyəti
export interface FilterState<T> {
  isOpen: boolean;
  filters: T;
}

// Sıralama üçün ümumi tip
export interface SortState<T> {
  field: T;
  direction: 'asc' | 'desc';
} 