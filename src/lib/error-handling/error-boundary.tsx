import React from 'react';
import { ErrorBoundaryProps, ErrorBoundaryState, AppError } from './types';
import { handleError } from './error-handler';

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error: handleError(error)
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const appError = handleError(error);
    this.props.onError?.(appError);
    
    // Burada error tracking servisinə məlumat göndərmək olar
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
            <div className="text-center">
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Xəta baş verdi
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                {this.state.error?.message || 'Gözlənilməz xəta baş verdi'}
              </p>
            </div>
            <div className="mt-8 space-y-6">
              <button
                onClick={() => window.location.reload()}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Səhifəni yenilə
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
} 