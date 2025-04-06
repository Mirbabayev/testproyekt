import { useState, useCallback } from 'react';
import { ModalState } from '../types';

/**
 * Modal pəncərələrin idarə edilməsi üçün hook
 * @returns Modal açma, bağlama və vəziyyət məlumatı
 */
export function useModal() {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    type: null,
    data: null
  });

  // Modalı açmaq
  const openModal = useCallback((type: ModalState['type'], data?: any) => {
    setModalState({
      isOpen: true,
      type,
      data: data || null
    });
  }, []);

  // Modalı bağlamaq
  const closeModal = useCallback(() => {
    setModalState({
      isOpen: false,
      type: null,
      data: null
    });
  }, []);

  // View modal açmaq
  const openViewModal = useCallback((data: any) => {
    openModal('view', data);
  }, [openModal]);

  // Edit modal açmaq
  const openEditModal = useCallback((data: any) => {
    openModal('edit', data);
  }, [openModal]);

  // Delete modal açmaq
  const openDeleteModal = useCallback((data: any) => {
    openModal('delete', data);
  }, [openModal]);

  // Create modal açmaq
  const openCreateModal = useCallback((data?: any) => {
    openModal('create', data);
  }, [openModal]);

  return {
    modalState,
    openModal,
    closeModal,
    openViewModal,
    openEditModal,
    openDeleteModal,
    openCreateModal
  };
} 