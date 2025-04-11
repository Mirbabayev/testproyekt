import React from 'react';

interface LoadingContextType {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}

export const LoadingContext = React.createContext<LoadingContextType>({
  isLoading: false,
  startLoading: () => {},
  stopLoading: () => {}
});

export const useLoading = () => React.useContext(LoadingContext); 