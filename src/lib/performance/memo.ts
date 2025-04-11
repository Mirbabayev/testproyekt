import { useMemo, useCallback } from 'react';

export const useMemoizedValue = <T>(value: T, deps: any[]): T => {
  return useMemo(() => value, deps);
};

export const useMemoizedCallback = <T extends (...args: any[]) => any>(
  callback: T,
  deps: any[]
): T => {
  return useCallback(callback, deps);
};

export const memoize = <T extends (...args: any[]) => any>(fn: T): T => {
  const cache = new Map<string, any>();

  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
}; 