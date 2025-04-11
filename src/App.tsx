import { BrowserRouter as Router } from 'react-router-dom';
import { Suspense } from 'react';
import { AuthProvider } from './lib/auth-context';
import { CartProvider } from './lib/cart-context';
import { WishlistProvider } from './lib/wishlist-context';
import { LanguageProvider } from './lib/language-context';
import { Toaster } from 'react-hot-toast';
import { AppRoutes } from './routes';

// Yüklənmə komponenti
function LoadingSpinner() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-600 text-sm tracking-wider">Yüklənir...</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <LanguageProvider>
              <Suspense fallback={<LoadingSpinner />}>
                <AppRoutes />
              </Suspense>
              <Toaster 
                position="top-right"
                toastOptions={{
                  duration: 2000,
                  style: {
                    background: '#333',
                    color: '#fff',
                  }
                }}
              />
            </LanguageProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;