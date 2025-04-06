import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { useAuth } from '../lib/auth-context';
import { ProtectedRoute } from '../components/protected-route';
import { UserRole } from '../lib/auth';
import AdminLayout from '../layouts/AdminLayout';

// Lazy yüklənən komponentlər (fallback opsiyaları ilə)
const lazyLoad = (path: string, retries = 2) => {
  return lazy(() => {
    return new Promise((resolve, reject) => {
      const load = async () => {
        try {
          const result = await import(/* @vite-ignore */ path);
          resolve(result);
        } catch (error) {
          if (retries > 0) {
            console.warn(`[${path}] yüklənməsində xəta. Yenidən cəhd edilir...`, error);
            setTimeout(() => load(), 500);
            retries--;
          } else {
            console.error(`[${path}] yüklənməsində xəta:`, error);
            reject(error);
          }
        }
      };
      load();
    });
  });
};

const Home = lazyLoad('../pages/home');
const Products = lazyLoad('../pages/products');
const ProductDetails = lazyLoad('../pages/product-details');
const PerfumeAdvisor = lazyLoad('../pages/perfume-advisor');
const Cart = lazyLoad('../pages/cart');
const Wishlist = lazyLoad('../pages/wishlist');
const Compare = lazyLoad('../pages/compare');
const Login = lazyLoad('../pages/auth/login');
const Register = lazyLoad('../pages/auth/register');
const Profile = lazyLoad('../pages/profile');
const Orders = lazyLoad('../pages/profile/orders');
const OrderTracking = lazyLoad('../pages/order/order-tracking');
const Security = lazyLoad('../pages/profile/security');
const DeviceManager = lazyLoad('../pages/profile/device-manager');
const OfflineDashboard = lazyLoad('../pages/offline/dashboard');
const AdminLogin = lazyLoad('../pages/auth/AdminLogin');
const AdminPanel = lazyLoad('../pages/admin/AdminPanel');
const AdminProducts = lazyLoad('../pages/admin/pages/Products');
const AdminOrders = lazyLoad('../pages/admin/pages/Orders');
const AdminCategories = lazyLoad('../pages/admin/pages/Categories');
const AdminUsers = lazyLoad('../pages/admin/pages/Users');
const AdminSettings = lazyLoad('../pages/admin/pages/Settings');
const AdminNewProduct = lazyLoad('../pages/admin/products/new');
const AdminCatalog = lazyLoad('../pages/admin/pages/Catalog');
const AdminReports = lazyLoad('../pages/admin/pages/Reports');
const AdminAnalytics = lazyLoad('../pages/admin/pages/Analytics');
const Unauthorized = lazyLoad('../pages/unauthorized');

export function AppRoutes() {
  const { user } = useAuth();

  return (
    <Suspense fallback={<div className="container py-8 text-center">Yüklənir...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Kataloq səhifələri */}
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        
        {/* Səbət və Seçilmişlər səhifələri */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/compare" element={<Compare />} />
        
        {/* Ətir Tövsiyəçisi */}
        <Route path="/perfume-advisor" element={<PerfumeAdvisor />} />
        
        {/* Profil səhifəsi - Yalnız giriş etmiş istifadəçilər üçün */}
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
        
        {/* Sifarişlər səhifəsi - Yalnız giriş etmiş istifadəçilər üçün */}
        <Route 
          path="/orders" 
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          } 
        />
        
        {/* Sifariş izləmə səhifəsi */}
        <Route 
          path="/order/track/:orderId" 
          element={
            <ProtectedRoute>
              <OrderTracking />
            </ProtectedRoute>
          } 
        />
        
        {/* Təhlükəsizlik səhifəsi */}
        <Route 
          path="/profile/security" 
          element={
            <ProtectedRoute>
              <Security />
            </ProtectedRoute>
          } 
        />
        
        {/* Cihaz idarəetməsi səhifəsi */}
        <Route 
          path="/profile/devices" 
          element={
            <ProtectedRoute>
              <DeviceManager />
            </ProtectedRoute>
          } 
        />
        
        {/* Offline rejim səhifəsi */}
        <Route 
          path="/offline" 
          element={
            <ProtectedRoute>
              <OfflineDashboard />
            </ProtectedRoute>
          } 
        />
        
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
          <Route path="reports" element={<AdminReports />} />
          <Route path="analytics" element={<AdminAnalytics />} />
        </Route>

        {/* İcazəsiz səhifəsi */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}