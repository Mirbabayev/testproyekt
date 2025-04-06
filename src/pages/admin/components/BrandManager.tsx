import { useState } from 'react';
import { X, Plus, Save, Trash2, Search } from 'lucide-react';

interface BrandManagerProps {
  existingBrands: string[];
  onSaveBrands: (brands: string[]) => void;
}

export const BrandManager = ({ existingBrands, onSaveBrands }: BrandManagerProps) => {
  const [brands, setBrands] = useState<string[]>(existingBrands);
  const [newBrand, setNewBrand] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddBrand = () => {
    if (newBrand.trim() && !brands.includes(newBrand.trim())) {
      setBrands([...brands, newBrand.trim()]);
      setNewBrand('');
    }
  };

  const handleRemoveBrand = (brand: string) => {
    setBrands(brands.filter(b => b !== brand));
  };

  const filteredBrands = () => {
    if (!searchTerm.trim()) return brands;
    
    return brands.filter(brand => 
      brand.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleSaveBrands = () => {
    onSaveBrands(brands);
    setIsOpen(false);
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors flex items-center gap-2"
      >
        <Plus size={16} /> Brendləri idarə et
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Brendləri idarə et</h3>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newBrand}
                onChange={(e) => setNewBrand(e.target.value)}
                placeholder="Yeni brend əlavə et"
                className="flex-grow px-4 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                type="button"
                onClick={handleAddBrand}
                className="px-3 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors flex items-center gap-1"
              >
                <Plus size={16} /> Əlavə et
              </button>
            </div>
            
            <div className="mb-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Brend axtar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-2 pl-8 pr-10 border border-blue-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-blue-500" size={16} />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-700"
                  >
                    &times;
                  </button>
                )}
              </div>
            </div>
            
            <div className="border border-blue-200 rounded-md p-4 mb-4 bg-blue-50/50 max-h-60 overflow-y-auto">
              {filteredBrands().length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {filteredBrands().map((brand, index) => (
                    <div key={index} className="flex items-center">
                      <span className="flex-grow text-sm">{brand}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveBrand(brand)}
                        className="text-red-500 hover:text-red-700 ml-2"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-blue-500">
                  <p>Axtarışınıza uyğun brend tapılmadı</p>
                </div>
              )}
            </div>
            
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 border border-blue-200 text-blue-700 rounded-md hover:bg-blue-50 transition-colors"
              >
                Ləğv et
              </button>
              <button
                type="button"
                onClick={handleSaveBrands}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2"
              >
                <Save size={16} /> Yadda saxla
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 