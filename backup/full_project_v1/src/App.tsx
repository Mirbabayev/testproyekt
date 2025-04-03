import { BrowserRouter } from 'react-router-dom';
import { Layout } from './components/layout';
import { AppRoutes } from './routes';
import { AuthProvider } from './lib/auth-context';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// ScrollToTop komponenti - səhifə dəyişdikdə yuxarı scroll etmək üçün
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

// AdminLayout komponentini əlavə edirik - bu admin səhifələri üçün ayrica təmiz layout olacaq
function AppContent() {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith('/admin');
  
  return (
    <>
      <ScrollToTop />
      {isAdminRoute ? (
        <AppRoutes />
      ) : (
        <Layout>
          <AppRoutes />
        </Layout>
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}