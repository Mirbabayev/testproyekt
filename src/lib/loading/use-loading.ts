import { useCallback } from 'react';
import { useLoading } from './loading-context';

export const useLoadingState = () => {
  const { startLoading, stopLoading } = useLoading();

  const withLoading = useCallback(async <T>(promise: Promise<T>): Promise<T> => {
    try {
      startLoading();
      return await promise;
    } finally {
      stopLoading();
    }
  }, [startLoading, stopLoading]);

  return { withLoading };
}; 