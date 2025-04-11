import { AppError, ErrorCodes } from './types';

export const handleError = (error: Error | AppError): AppError => {
  if (isAppError(error)) {
    return error;
  }

  // Network xətaları
  if (error.name === 'NetworkError' || error.message.includes('network')) {
    return createAppError(ErrorCodes.NETWORK_ERROR, 'Şəbəkə xətası baş verdi');
  }

  // Auth xətaları
  if (error.message.includes('auth') || error.message.includes('unauthorized')) {
    return createAppError(ErrorCodes.AUTH_ERROR, 'İstifadəçi məlumatları yanlışdır');
  }

  // Validation xətaları
  if (error.name === 'ValidationError') {
    return createAppError(ErrorCodes.VALIDATION_ERROR, error.message);
  }

  // API xətaları
  if (error.message.includes('api') || error.message.includes('server')) {
    return createAppError(ErrorCodes.API_ERROR, 'Server xətası baş verdi');
  }

  // Digər xətalar
  return createAppError(ErrorCodes.UNKNOWN_ERROR, 'Gözlənilməz xəta baş verdi');
};

const isAppError = (error: Error | AppError): error is AppError => {
  return 'code' in error && 'timestamp' in error;
};

const createAppError = (code: string, message: string, details?: any): AppError => {
  return {
    code,
    message,
    details,
    timestamp: Date.now()
  };
};

export const logError = (error: AppError) => {
  console.error('Error:', {
    code: error.code,
    message: error.message,
    details: error.details,
    timestamp: new Date(error.timestamp).toISOString()
  });
};

export const handleApiError = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw createAppError(
      ErrorCodes.API_ERROR,
      errorData.message || 'API xətası baş verdi',
      errorData
    );
  }
  return response;
}; 