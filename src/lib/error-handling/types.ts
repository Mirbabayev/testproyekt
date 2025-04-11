export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: number;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: AppError | null;
}

export interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: AppError) => void;
}

export type ErrorHandler = (error: Error | AppError) => AppError;

export const ErrorCodes = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  AUTH_ERROR: 'AUTH_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  API_ERROR: 'API_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR'
} as const; 