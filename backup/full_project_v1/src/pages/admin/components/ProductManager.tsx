import { useState } from 'react';
import { X, Plus, Save, Trash2, Search, ChevronDown, ChevronUp } from 'lucide-react';

interface ProductManagerProps {
  existingProducts: { [brand: string]: string[] };
  existingBrands: string[];
  onSaveProducts: (products: { [brand: string]: string[] }) => void;
}

export const ProductManager = ({ existingProducts, existingBrands, onSaveProducts }: ProductManagerProps) => {
  const [productsByBrand, setProductsByBrand] = useState<{ [brand: string]: string[] }>(existingProducts);
  const [selectedBrand, setSelectedBrand] = useState<string>(existingBrands[0] || '');
  const [newProduct, setNewProduct] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedBrands, setExpandedBrands] = useState<{ [brand: string]: boolean }>({});

  const handleAddProduct = () => {
    if (newProduct.trim() && selectedBrand && !productsByBrand[selectedBrand]?.includes(newProduct.trim())) {
      const updatedProducts = { 
        ...productsByBrand,
        [selectedBrand]: [...(productsByBrand[selectedBrand] || []), newProduct.trim()]
      };
      setProductsByBrand(updatedProducts);
      setNewProduct('');
    }
  };

  const handleRemoveProduct = (brand: string, product: string) => {
    const updatedProducts = { 
      ...productsByBrand,
      [brand]: productsByBrand[brand].filter(p => p !== product)
    };
    setProductsByBrand(updatedProducts);
  };

  const toggleExpandBrand = (brand: string) => {
    setExpandedBrands({
      ...expandedBrands,
      [brand]: !expandedBrands[brand]
    });
  };

  const filteredBrands = () => {
    if (!searchTerm.trim()) return existingBrands;
    
    return existingBrands.filter(brand => 
      brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      productsByBrand[brand]?.some(product => 
        product.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const filteredProducts = (brand: string) => {
    if (!searchTerm.trim()) return productsByBrand[brand] || [];
    
    return (productsByBrand[brand] || []).filter(product => 
      product.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleSaveProducts = () => {
    onSaveProducts(productsByBrand);
    setIsOpen(false);
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors flex items-center gap-2"
      >
        <Plus size={16} /> Məhsulları idarə et
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md p-6 w-full max-w-3xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Məhsulları idarə et</h3>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="flex flex-col md:flex-row gap-2 mb-4">
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="md:w-1/3 px-4 py-2 border border-purple-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {existingBrands.map((brand, index) => (
                  <option key={index} value={brand}>{brand}</option>
                ))}
              </select>
              
              <div className="md:w-2/3 flex gap-2">
                <input
                  type="text"
                  value={newProduct}
                  onChange={(e) => setNewProduct(e.target.value)}
                  placeholder="Yeni məhsul əlavə et"
                  className="flex-grow px-4 py-2 border border-purple-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button
                  type="button"
                  onClick={handleAddProduct}
                  className="px-3 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors flex items-center gap-1"
                  disabled={!selectedBrand}
                >
                  <Plus size={16} /> Əlavə et
                </button>
              </div>
            </div>
            
            <div className="mb-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Axtar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-2 pl-8 pr-10 border border-purple-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-purple-500" size={16} />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-500 hover:text-purple-700"
                  >
                    &times;
                  </button>
                )}
              </div>
            </div>
            
            <div className="border border-purple-200 rounded-md bg-purple-50/50 mb-4 max-h-60 overflow-y-auto">
              {filteredBrands().length > 0 ? (
                filteredBrands().map((brand, index) => (
                  <div key={index} className="border-b border-purple-200 last:border-b-0">
                    <div 
                      className="flex items-center justify-between px-4 py-2 bg-purple-100/50 cursor-pointer"
                      onClick={() => toggleExpandBrand(brand)}
                    >
                      <span className="font-medium">{brand}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-purple-700">
                          {productsByBrand[brand]?.length || 0} məhsul
                        </span>
                        {expandedBrands[brand] ? (
                          <ChevronUp size={16} className="text-purple-600" />
                        ) : (
                          <ChevronDown size={16} className="text-purple-600" />
                        )}
                      </div>
                    </div>
                    
                    {expandedBrands[brand] && (
                      <div className="p-2">
                        {filteredProducts(brand).length > 0 ? (
                          <div className="space-y-1">
                            {filteredProducts(brand).map((product, productIndex) => (
                              <div key={productIndex} className="flex items-center justify-between px-2 py-1 hover:bg-purple-100/50 rounded-md">
                                <span className="text-sm">{product}</span>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveProduct(brand, product)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-2 text-purple-500 text-sm">
                            <p>Bu brenddə məhsul yoxdur</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-purple-500">
                  <p>Axtarışınıza uyğun brend və ya məhsul tapılmadı</p>
                </div>
              )}
            </div>
            
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 border border-purple-200 text-purple-700 rounded-md hover:bg-purple-50 transition-colors"
              >
                Ləğv et
              </button>
              <button
                type="button"
                onClick={handleSaveProducts}
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