/**
 * Komponent test sistemi üçün yardımçı funksiyalar
 * Bu kitabxana test prosesini asanlaşdırmaq üçün istifadə edilə bilər
 */
import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n'; // i18n konfiqurasiyası

/**
 * Test wrapper provider
 */
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  route?: string;
  queryClient?: QueryClient;
}

/**
 * Test üçün lazım olan bütün providerləri əhatə edən bir wrapper
 */
export function AllTheProviders({ children, queryClient, route = '/' }: any) {
  // Route dəyişdirmək
  if (window.history.pushState) {
    window.history.pushState({}, 'Test page', route);
  }
  
  // Default QueryClient yaratmaq
  const testQueryClient = queryClient || new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        cacheTime: 0,
      },
    },
  });
  
  return (
    <QueryClientProvider client={testQueryClient}>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </I18nextProvider>
    </QueryClientProvider>
  );
}

/**
 * Custom render funksiyası
 */
export function renderWithProviders(
  ui: ReactElement,
  options?: CustomRenderOptions
) {
  const { route, queryClient, ...renderOptions } = options || {};
  
  return render(ui, {
    wrapper: (props) => AllTheProviders({ 
      ...props, 
      route, 
      queryClient 
    }),
    ...renderOptions,
  });
}

/**
 * Mock edilmiş məlumatlar yaratmaq üçün funksiya
 */
export function createMockData(type: string, count: number = 1, overrides: any = {}) {
  switch (type) {
    case 'product':
      return Array(count).fill(0).map((_, index) => ({
        id: `product-${index + 1}`,
        name: `Test Product ${index + 1}`,
        description: 'Test description',
        price: 100 + index * 10,
        image: 'test-image.jpg',
        category: 'test-category',
        brand: 'test-brand',
        ...overrides,
      }));
      
    case 'user':
      return Array(count).fill(0).map((_, index) => ({
        id: `user-${index + 1}`,
        email: `test${index + 1}@example.com`,
        name: `Test User ${index + 1}`,
        role: 'user',
        ...overrides,
      }));
      
    case 'order':
      return Array(count).fill(0).map((_, index) => ({
        id: `order-${index + 1}`,
        userId: `user-1`,
        products: [{ id: 'product-1', quantity: 2 }],
        totalPrice: 200,
        status: 'pending',
        createdAt: new Date().toISOString(),
        ...overrides,
      }));
      
    case 'notification':
      return Array(count).fill(0).map((_, index) => ({
        id: `notif-${index + 1}`,
        title: `Test Notification ${index + 1}`,
        message: 'Test message',
        type: 'info',
        read: false,
        createdAt: new Date().toISOString(),
        ...overrides,
      }));
      
    default:
      return null;
  }
}

/**
 * Məlumat yükləməsini simulyasiya etmək
 */
export function mockApiResponse(data: any, delay: number = 300, shouldFail: boolean = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('API error'));
      } else {
        resolve({ data });
      }
    }, delay);
  });
}

/**
 * LocalStorage-i mock etmək
 */
export const mockLocalStorage = () => {
  const store: Record<string, string> = {};
  
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { Object.keys(store).forEach(key => delete store[key]); },
    getAllKeys: () => Object.keys(store),
  };
};

/**
 * Formları test etmək üçün yardımçı funksiya
 */
export function fillForm(inputs: Record<string, any>, getByRole: Function) {
  Object.entries(inputs).forEach(([fieldName, value]) => {
    const input = getByRole('textbox', { name: new RegExp(fieldName, 'i') });
    input.value = value;
  });
}

/**
 * Event listener-ləri test etmək
 */
export function mockEventListeners() {
  const listeners: Record<string, Function[]> = {};
  
  const addEventListener = (event: string, callback: Function) => {
    if (!listeners[event]) {
      listeners[event] = [];
    }
    listeners[event].push(callback);
  };
  
  const removeEventListener = (event: string, callback: Function) => {
    if (listeners[event]) {
      listeners[event] = listeners[event].filter(cb => cb !== callback);
    }
  };
  
  const triggerEvent = (event: string, ...args: any[]) => {
    if (listeners[event]) {
      listeners[event].forEach(callback => callback(...args));
    }
  };
  
  return { addEventListener, removeEventListener, triggerEvent };
}

/**
 * Network status-u mock etmək
 */
export function mockNetworkStatus(initialStatus: boolean = true) {
  let online = initialStatus;
  const listeners = { online: [] as Function[], offline: [] as Function[] };
  
  return {
    get online() { return online; },
    set online(value: boolean) {
      if (online !== value) {
        online = value;
        const eventType = value ? 'online' : 'offline';
        listeners[eventType].forEach(listener => listener());
      }
    },
    addEventListener: (event: 'online' | 'offline', callback: Function) => {
      listeners[event].push(callback);
    },
    removeEventListener: (event: 'online' | 'offline', callback: Function) => {
      listeners[event] = listeners[event].filter(cb => cb !== callback);
    }
  };
} 