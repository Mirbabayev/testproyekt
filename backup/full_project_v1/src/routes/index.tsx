import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { useAuth } from '../lib/auth-context';
import { ProtectedRoute } from '../components/protected-route';
import { UserRole } from '../lib/auth';
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

export function AppRoutes() {
  const { user } = useAuth();

  return (
    <Suspense fallback={<div className="container py-8 text-center">Yüklənir...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Kataloq səhifələri */}
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        
        {/* Auth routes */}
        <Route 
          path="/auth/login" 
          element={user ? <Navigate to="/" replace /> : <Login />} 
        />
        <Route 
          path="/auth/register" 
          element={user ? <Navigate to="/" replace /> : <Register />} 
        />
        
        {/* Admin giriş səhifəsi - Ayrı */}
        <Route 
          path="/admin/login" 
          element={user?.role === UserRole.ADMIN ? <Navigate to="/admin" replace /> : <AdminLogin />} 
        />
        
        {/* Admin routes - AdminLayout ilə əhatə olunmuş */}
        <Route 
          path="/admin" 
          element={
            user?.role === UserRole.ADMIN ? (
              <AdminLayout />
            ) : (
              <Navigate to="/admin/login" replace />
            )
          }
        >
          {/* AdminLayout içərisində göstəriləcək alt routlar */}
          <Route index element={<AdminPanel />} /> {/* /admin üçün əsas panel */}
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/new" element={<AdminNewProduct />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="catalog" element={<AdminCatalog />} />
        </Route>

        {/* İcazəsiz səhifəsi */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}