import { BrowserRouter } from 'react-router-dom';
import { Layout } from './components/layout';
import { AppRoutes } from './routes';
import { AuthProvider } from './lib/auth-context';
import { CartProvider } from './lib/cart-context';
import { WishlistProvider } from './lib/wishlist-context';
import { CompareProvider } from './lib/compare-context';
import { useEffect, Component, ErrorInfo, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

// Error Boundary komponenti
class ErrorBoundary extends Component<{children: ReactNode}, {hasError: boolean, error: Error | null}> {
  constructor(props: {children: ReactNode}) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Tətbiqdə xəta baş verdi:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 m-4 border border-red-500 rounded-md bg-red-50 text-red-800">
          <h2 className="text-xl font-bold mb-4">Tətbiqin işləməsində xəta baş verdi</h2>
          <p className="mb-4">{this.state.error?.message || "Naməlum xəta"}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
          >
            Yenidən yüklə
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Səhifə dəyişdikdə sayfa yuxarı scroll edən komponent
 */
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

/**
 * Əsas tətbiq məzmunu - Layout və router
 */
function AppContent() {
  return (
    <>
      <ScrollToTop />
      <Layout>
        <ErrorBoundary>
          <AppRoutes />
        </ErrorBoundary>
      </Layout>
    </>
  );
}

/**
 * Ana tətbiq komponenti
 */
export default function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <CompareProvider>
                <AppContent />
              </CompareProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}