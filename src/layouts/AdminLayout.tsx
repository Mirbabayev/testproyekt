import React from 'react';
import { Outlet } from 'react-router-dom';
import { AdminProvider } from '../contexts/AdminContext';
import { Sidebar } from './admin/Sidebar';
import { Header } from './admin/Header';

/**
 * Admin layoutu - admin panelinin əsas tərtibatı
 */
const AdminLayout = () => {
  return (
    <AdminProvider>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Header */}
          <Header />
          
          {/* Page content */}
          <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </AdminProvider>
  );
};

export default AdminLayout; 