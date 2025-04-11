import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { useAuth } from '../lib/auth-context';
import { Layout } from '../components/layout';
import { ScrollToTop } from '../components/scroll-to-top/index';
import { ProtectedRoute } from '../components/protected-route';
import { UserRole } from '../types/user';
import AdminLayout from '../layouts/AdminLayout';

const Home = lazy(() => import('../pages/home'));
const Products = lazy(() => import('../pages/products'));
const ProductDetails = lazy(() => import('../pages/product-details'));
const Login = lazy(() => import('../pages/auth/login'));
const Register = lazy(() => import('../pages/auth/register'));
const AdminLogin = lazy(() => import('../pages/auth/AdminLogin'));
const AdminPanel = lazy(() => import('../pages/admin/AdminPanel'));
const AdminProducts = lazy(() => import('../pages/admin/pages/Products'));
const AdminOrders = lazy(() => import('../pages/admin/pages/Orders'));
const AdminCategories = lazy(() => import('../pages/admin/pages/Categories'));
const AdminUsers = lazy(() => import('../pages/admin/pages/Users'));
const AdminSettings = lazy(() => import('../pages/admin/pages/Settings'));
const AdminNewProduct = lazy(() => import('../pages/admin/products/new'));
const AdminCatalog = lazy(() => import('../pages/admin/pages/Catalog'));
const Unauthorized = lazy(() => import('../pages/unauthorized'));
const Wishlist = lazy(() => import('../pages/wishlist'));
const Cart = lazy(() => import('../pages/cart'));
const Profile = lazy(() => import('../pages/profile'));
const Orders = lazy(() => import('../pages/profile/orders'));
const OrderDetails = lazy(() => import('../pages/profile/orders/[id]'));

// Yüklənmə komponenti
function LoadingSpinner() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-600 text-sm tracking-wider">Yüklənir...</p>
    </div>
  );
}

export function AppRoutes() {
  const { user } = useAuth();

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Ana səhifə */}
        <Route path="/" element={
          <Suspense fallback={<LoadingSpinner />}>
            <Home />
          </Suspense>
        } />
        
        {/* Kataloq səhifələri */}
        <Route path="/products" element={
          <Layout>
            <Suspense fallback={<LoadingSpinner />}>
              <Products />
            </Suspense>
          </Layout>
        } />
        <Route path="/products/:id" element={
          <Layout>
            <Suspense fallback={<LoadingSpinner />}>
              <ProductDetails />
            </Suspense>
          </Layout>
        } />
        <Route path="/wishlist" element={
          <Layout>
            <Suspense fallback={<LoadingSpinner />}>
              <Wishlist />
            </Suspense>
          </Layout>
        } />
        <Route path="/cart" element={
          <Layout>
            <Suspense fallback={<LoadingSpinner />}>
              <Cart />
            </Suspense>
          </Layout>
        } />
        
        {/* İstifadəçi profil səhifəsi */}
        <Route 
          path="/profile/*" 
          element={
            <Suspense fallback={<LoadingSpinner />}>
              {user ? (
                <Routes>
                  <Route index element={<Profile />} />
                  <Route path="orders" element={<Orders />} />
                  <Route path="orders/:id" element={<OrderDetails />} />
                </Routes>
              ) : (
                <Navigate to="/auth/login" replace />
              )}
            </Suspense>
          } 
        />
        
        {/* Auth routes */}
        <Route 
          path="/auth/login" 
          element={
            <Suspense fallback={<LoadingSpinner />}>
              {user ? <Navigate to="/" replace /> : <Login />}
            </Suspense>
          } 
        />
        <Route 
          path="/auth/register" 
          element={
            <Suspense fallback={<LoadingSpinner />}>
              {user ? <Navigate to="/" replace /> : <Register />}
            </Suspense>
          } 
        />
        
        {/* Admin giriş səhifəsi */}
        <Route 
          path="/admin/login" 
          element={
            <Suspense fallback={<LoadingSpinner />}>
              {user?.role === 'admin' ? <Navigate to="/admin" replace /> : <AdminLogin />}
            </Suspense>
          } 
        />
        
        {/* Admin routes */}
        <Route 
          path="/admin/*" 
          element={
            user?.role === 'admin' ? (
              <Suspense fallback={<LoadingSpinner />}>
                <AdminLayout />
              </Suspense>
            ) : (
              <Navigate to="/admin/login" replace />
            )
          }
        >
          <Route index element={<AdminPanel />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/new" element={<AdminNewProduct />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="catalog" element={<AdminCatalog />} />
        </Route>

        {/* İcazəsiz səhifəsi */}
        <Route path="/unauthorized" element={
          <Suspense fallback={<LoadingSpinner />}>
            <Unauthorized />
          </Suspense>
        } />
        
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}