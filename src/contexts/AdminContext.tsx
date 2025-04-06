import React, { createContext, ReactNode, useContext, useState, useCallback } from 'react';
import { 
  ModalState, 
  FilterState,
  ProductFilter,
  OrderFilter,
  UserFilter,
  ProductSort,
  OrderSort,
  UserSort
} from '../types';

interface AdminContextValue {
  // Modal vəziyyəti
  productModal: ModalState;
  orderModal: ModalState;
  userModal: ModalState;
  categoryModal: ModalState;
  
  // Filter vəziyyəti
  productFilter: FilterState<ProductFilter>;
  orderFilter: FilterState<OrderFilter>;
  userFilter: FilterState<UserFilter>;
  
  // Sıralama vəziyyəti
  productSort: ProductSort;
  orderSort: OrderSort;
  userSort: UserSort;
  
  // Modal funksiyaları
  openProductModal: (type: ModalState['type'], data?: any) => void;
  closeProductModal: () => void;
  openOrderModal: (type: ModalState['type'], data?: any) => void;
  closeOrderModal: () => void;
  openUserModal: (type: ModalState['type'], data?: any) => void;
  closeUserModal: () => void;
  openCategoryModal: (type: ModalState['type'], data?: any) => void;
  closeCategoryModal: () => void;
  
  // Filter funksiyaları
  setProductFilters: (filters: ProductFilter) => void;
  toggleProductFilters: () => void;
  resetProductFilters: () => void;
  setOrderFilters: (filters: OrderFilter) => void;
  toggleOrderFilters: () => void;
  resetOrderFilters: () => void;
  setUserFilters: (filters: UserFilter) => void;
  toggleUserFilters: () => void;
  resetUserFilters: () => void;
  
  // Sıralama funksiyaları
  setProductSort: (sort: ProductSort) => void;
  setOrderSort: (sort: OrderSort) => void;
  setUserSort: (sort: UserSort) => void;
}

// Default filter dəyərləri
const defaultProductFilter: ProductFilter = {
  brands: [],
  priceRange: [0, 1000],
  inStock: true
};

const defaultOrderFilter: OrderFilter = {
  status: undefined,
  dateFrom: undefined,
  dateTo: undefined,
  minAmount: undefined,
  maxAmount: undefined
};

const defaultUserFilter: UserFilter = {
  role: undefined,
  status: undefined,
  dateFrom: undefined,
  dateTo: undefined
};

// Default sort dəyərləri
const defaultProductSort: ProductSort = {
  field: 'name',
  direction: 'asc'
};

const defaultOrderSort: OrderSort = {
  field: 'date',
  direction: 'desc'
};

const defaultUserSort: UserSort = {
  field: 'email',
  direction: 'asc'
};

// Context yaratmaq
const AdminContext = createContext<AdminContextValue | undefined>(undefined);

// Context provider
export const AdminProvider = ({ children }: { children: ReactNode }) => {
  // Modal vəziyyətləri
  const [productModal, setProductModal] = useState<ModalState>({ isOpen: false, type: null, data: null });
  const [orderModal, setOrderModal] = useState<ModalState>({ isOpen: false, type: null, data: null });
  const [userModal, setUserModal] = useState<ModalState>({ isOpen: false, type: null, data: null });
  const [categoryModal, setCategoryModal] = useState<ModalState>({ isOpen: false, type: null, data: null });
  
  // Filter vəziyyətləri
  const [productFilter, setProductFilter] = useState<FilterState<ProductFilter>>({
    isOpen: false,
    filters: defaultProductFilter
  });
  
  const [orderFilter, setOrderFilter] = useState<FilterState<OrderFilter>>({
    isOpen: false,
    filters: defaultOrderFilter
  });
  
  const [userFilter, setUserFilter] = useState<FilterState<UserFilter>>({
    isOpen: false,
    filters: defaultUserFilter
  });
  
  // Sıralama vəziyyətləri
  const [productSort, setProductSort] = useState<ProductSort>(defaultProductSort);
  const [orderSort, setOrderSort] = useState<OrderSort>(defaultOrderSort);
  const [userSort, setUserSort] = useState<UserSort>(defaultUserSort);
  
  // Modal funksiyaları
  const openProductModal = useCallback((type: ModalState['type'], data?: any) => {
    setProductModal({ isOpen: true, type, data });
  }, []);
  
  const closeProductModal = useCallback(() => {
    setProductModal({ isOpen: false, type: null, data: null });
  }, []);
  
  const openOrderModal = useCallback((type: ModalState['type'], data?: any) => {
    setOrderModal({ isOpen: true, type, data });
  }, []);
  
  const closeOrderModal = useCallback(() => {
    setOrderModal({ isOpen: false, type: null, data: null });
  }, []);
  
  const openUserModal = useCallback((type: ModalState['type'], data?: any) => {
    setUserModal({ isOpen: true, type, data });
  }, []);
  
  const closeUserModal = useCallback(() => {
    setUserModal({ isOpen: false, type: null, data: null });
  }, []);
  
  const openCategoryModal = useCallback((type: ModalState['type'], data?: any) => {
    setCategoryModal({ isOpen: true, type, data });
  }, []);
  
  const closeCategoryModal = useCallback(() => {
    setCategoryModal({ isOpen: false, type: null, data: null });
  }, []);
  
  // Filter funksiyaları
  const setProductFilters = useCallback((filters: ProductFilter) => {
    setProductFilter(prev => ({
      ...prev,
      filters
    }));
  }, []);
  
  const toggleProductFilters = useCallback(() => {
    setProductFilter(prev => ({
      ...prev,
      isOpen: !prev.isOpen
    }));
  }, []);
  
  const resetProductFilters = useCallback(() => {
    setProductFilter(prev => ({
      ...prev,
      filters: defaultProductFilter
    }));
  }, []);
  
  const setOrderFilters = useCallback((filters: OrderFilter) => {
    setOrderFilter(prev => ({
      ...prev,
      filters
    }));
  }, []);
  
  const toggleOrderFilters = useCallback(() => {
    setOrderFilter(prev => ({
      ...prev,
      isOpen: !prev.isOpen
    }));
  }, []);
  
  const resetOrderFilters = useCallback(() => {
    setOrderFilter(prev => ({
      ...prev,
      filters: defaultOrderFilter
    }));
  }, []);
  
  const setUserFilters = useCallback((filters: UserFilter) => {
    setUserFilter(prev => ({
      ...prev,
      filters
    }));
  }, []);
  
  const toggleUserFilters = useCallback(() => {
    setUserFilter(prev => ({
      ...prev,
      isOpen: !prev.isOpen
    }));
  }, []);
  
  const resetUserFilters = useCallback(() => {
    setUserFilter(prev => ({
      ...prev,
      filters: defaultUserFilter
    }));
  }, []);
  
  const value: AdminContextValue = {
    // Modal vəziyyətləri
    productModal,
    orderModal,
    userModal,
    categoryModal,
    
    // Filter vəziyyətləri
    productFilter,
    orderFilter,
    userFilter,
    
    // Sıralama vəziyyətləri
    productSort,
    orderSort,
    userSort,
    
    // Modal funksiyaları
    openProductModal,
    closeProductModal,
    openOrderModal,
    closeOrderModal,
    openUserModal,
    closeUserModal,
    openCategoryModal,
    closeCategoryModal,
    
    // Filter funksiyaları
    setProductFilters,
    toggleProductFilters,
    resetProductFilters,
    setOrderFilters,
    toggleOrderFilters,
    resetOrderFilters,
    setUserFilters,
    toggleUserFilters,
    resetUserFilters,
    
    // Sıralama funksiyaları
    setProductSort,
    setOrderSort,
    setUserSort
  };
  
  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

// Hook yaratmaq
export const useAdmin = () => {
  const context = useContext(AdminContext);
  
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  
  return context;
}; 