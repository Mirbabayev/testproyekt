import { useState, useCallback } from 'react';
import { CrudState, QueryStatus } from '../types';

interface UseCrudProps<T> {
  onCreate?: (data: T) => Promise<T>;
  onUpdate?: (id: string, data: Partial<T>) => Promise<T>;
  onDelete?: (id: string) => Promise<void>;
  onGetById?: (id: string) => Promise<T>;
}

interface UseCrudReturn<T> {
  createItem: (data: T) => Promise<T | null>;
  updateItem: (id: string, data: Partial<T>) => Promise<T | null>;
  deleteItem: (id: string) => Promise<boolean>;
  getItemById: (id: string) => Promise<T | null>;
  isProcessing: boolean;
  createState: CrudState;
  updateState: CrudState;
  deleteState: CrudState;
  fetchState: CrudState;
  resetStates: () => void;
}

/**
 * CRUD əməliyyatları üçün hook
 * @param props CRUD əməliyyatları üçün funksiyalar
 * @returns CRUD əməliyyatları üçün funksiyalar və vəziyyət
 */
export function useCrud<T extends { id: string }>({
  onCreate,
  onUpdate,
  onDelete,
  onGetById
}: UseCrudProps<T>): UseCrudReturn<T> {
  // CRUD əməliyyatlarının vəziyyətini saxlayan state'lər
  const [createState, setCreateState] = useState<CrudState>({
    status: 'idle',
    error: null
  });
  
  const [updateState, setUpdateState] = useState<CrudState>({
    status: 'idle',
    error: null
  });
  
  const [deleteState, setDeleteState] = useState<CrudState>({
    status: 'idle',
    error: null
  });
  
  const [fetchState, setFetchState] = useState<CrudState>({
    status: 'idle',
    error: null
  });

  // Create əməliyyatı
  const createItem = useCallback(async (data: T): Promise<T | null> => {
    if (!onCreate) return null;
    
    setCreateState({ status: 'loading', error: null });
    
    try {
      const result = await onCreate(data);
      setCreateState({ status: 'success', error: null });
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Xəta baş verdi';
      setCreateState({ status: 'error', error: errorMessage });
      return null;
    }
  }, [onCreate]);

  // Update əməliyyatı
  const updateItem = useCallback(async (id: string, data: Partial<T>): Promise<T | null> => {
    if (!onUpdate) return null;
    
    setUpdateState({ status: 'loading', error: null });
    
    try {
      const result = await onUpdate(id, data);
      setUpdateState({ status: 'success', error: null });
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Xəta baş verdi';
      setUpdateState({ status: 'error', error: errorMessage });
      return null;
    }
  }, [onUpdate]);

  // Delete əməliyyatı
  const deleteItem = useCallback(async (id: string): Promise<boolean> => {
    if (!onDelete) return false;
    
    setDeleteState({ status: 'loading', error: null });
    
    try {
      await onDelete(id);
      setDeleteState({ status: 'success', error: null });
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Xəta baş verdi';
      setDeleteState({ status: 'error', error: errorMessage });
      return false;
    }
  }, [onDelete]);

  // GetById əməliyyatı
  const getItemById = useCallback(async (id: string): Promise<T | null> => {
    if (!onGetById) return null;
    
    setFetchState({ status: 'loading', error: null });
    
    try {
      const result = await onGetById(id);
      setFetchState({ status: 'success', error: null });
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Xəta baş verdi';
      setFetchState({ status: 'error', error: errorMessage });
      return null;
    }
  }, [onGetById]);

  // Bütün vəziyyətləri sıfırlamaq
  const resetStates = useCallback(() => {
    setCreateState({ status: 'idle', error: null });
    setUpdateState({ status: 'idle', error: null });
    setDeleteState({ status: 'idle', error: null });
    setFetchState({ status: 'idle', error: null });
  }, []);

  // Ümumi processing flag
  const isProcessing = 
    createState.status === 'loading' || 
    updateState.status === 'loading' || 
    deleteState.status === 'loading' || 
    fetchState.status === 'loading';

  return {
    createItem,
    updateItem,
    deleteItem,
    getItemById,
    isProcessing,
    createState,
    updateState,
    deleteState,
    fetchState,
    resetStates
  };
} 