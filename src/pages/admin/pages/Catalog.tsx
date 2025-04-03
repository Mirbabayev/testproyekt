import React from 'react';
import CatalogManager from '../../../components/admin/CatalogManager';
import { Database } from 'lucide-react';

const Catalog = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Kataloq Məlumatları</h1>
          <p className="text-gray-600 mt-1">
            Məhsulların kataloq parametrlərini idarə edin - notlar, ətir qrupları, brend və s.
          </p>
        </div>
        <div className="flex items-center text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-md">
          <Database className="w-4 h-4 mr-2 text-primary" />
          <span>Məlumatlar brauzerdə saxlanılır</span>
        </div>
      </div>

      {/* CatalogManager komponenti */}
      <CatalogManager />
    </div>
  );
};

export default Catalog; 