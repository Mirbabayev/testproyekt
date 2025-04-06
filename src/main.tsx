import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import './lib/i18n/index';
import './output.css';
import './index.css';

// Xəta idarəetməsi üçün 
const handleError = (error: Error) => {
  console.error('Tətbiqin işləməsi zamanı xəta baş verdi:', error);
  // Xəta mesajını göstərə bilərik
  const errorElement = document.createElement('div');
  errorElement.innerHTML = `
    <div style="padding: 20px; margin: 20px; border: 1px solid #f44336; border-radius: 4px; color: #721c24; background-color: #f8d7da;">
      <h3>Tətbiqin işləməsində xəta baş verdi</h3>
      <p>${error.message}</p>
      <button onclick="location.reload()" style="padding: 8px 16px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">
        Yenidən yüklə
      </button>
    </div>
  `;
  document.body.appendChild(errorElement);
};

window.addEventListener('error', (event) => {
  handleError(event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  handleError(event.reason);
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1
    }
  }
});

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

try {
  createRoot(rootElement).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </StrictMode>
  );
} catch (error) {
  handleError(error instanceof Error ? error : new Error(String(error)));
}