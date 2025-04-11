import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  PlusCircle, 
  Search, 
  Filter, 
  Package, 
  Pencil, 
  Trash, 
  ArrowUpDown,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { products } from '../../../data/products';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([...products]);
  const [sortField, setSortField] = useState<'name' | 'price' | 'brand'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [visibleItems, setVisibleItems] = useState<string[]>([]);

  // Bütün brendləri əldə et
  const allBrands = Array.from(new Set(products.map(p => p.brand)));

  // Animasiya effektləri üçün CSS
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .fade-in-item {
        animation: fadeInUp 0.5s ease-out forwards;
        opacity: 0;
      }
      
      .staggered-item {
        opacity: 0;
      }
      
      .staggered-item.visible {
        animation: fadeInUp 0.4s ease-out forwards;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Məhsul elementlərinin animasiyalı görünməsi
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('data-id');
          if (id) {
            setVisibleItems(prev => [...prev, id]);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    const items = document.querySelectorAll('.staggered-item');
    items.forEach(item => observer.observe(item));
    
    return () => {
      items.forEach(item => observer.unobserve(item));
    };
  }, [filteredProducts]);
  
  // Axtarış və filterlər dəyişdikdə məhsulları filterlə
  useEffect(() => {
    let result = [...products];
    
    // Axtarış
    if (searchTerm) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Brend filteri
    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.includes(p.brand));
    }
    
    // Qiymət aralığı
    result = result.filter(p => {
      const price = parseFloat(p.price);
      return price >= priceRange[0] && price <= priceRange[1];
    });
    
    // Sıralama
    result.sort((a, b) => {
      if (sortField === 'price') {
        const aPrice = parseFloat(a.price);
        const bPrice = parseFloat(b.price);
        return sortDirection === 'asc' ? aPrice - bPrice : bPrice - aPrice;
      }
      
      const aValue = a[sortField].toLowerCase();
      const bValue = b[sortField].toLowerCase();
      
      if (sortDirection === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });
    
    setFilteredProducts(result);
    setVisibleItems([]); // Yeni filter nəticələri üçün görünən elementləri sıfırla
  }, [searchTerm, sortField, sortDirection, selectedBrands, priceRange]);
  
  // Sıralama funksiyası
  const handleSort = (field: 'name' | 'price' | 'brand') => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Brand selection
  const toggleBrandSelection = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };
  
  // Sıfırla
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedBrands([]);
    setPriceRange([0, 500]);
    setSortField('name');
    setSortDirection('asc');
  };

  return (
    <div className="fade-in-item">
      {/* Başlıq və əlavə et düyməsi */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div className="flex items-center mb-4 sm:mb-0">
          <Package className="h-6 w-6 text-green-600 mr-2" />
          <h1 className="text-xl font-semibold text-gray-900">Məhsullar ({filteredProducts.length})</h1>
        </div>
        
        <Link 
          to="/admin/products/new" 
          className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 py-2 flex items-center transition-all duration-300 transform hover:scale-105 hover:shadow-md"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          <span>Məhsul Əlavə Et</span>
        </Link>
      </div>
      
      {/* Axtarış və filter */}
      <div className="bg-white rounded-xl shadow-sm mb-6 p-4 border border-gray-100 transition-all duration-300 hover:shadow-md">
        <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4">
          {/* Axtarış */}
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Məhsul adı və ya brend axtar..."
              className="border border-gray-300 rounded-lg py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          
          {/* Filter toggle düyməsi */}
          <button
            className="flex items-center bg-gray-100 hover:bg-gray-200 rounded-lg px-4 py-2 transition-colors"
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          >
            <Filter className="h-5 w-5 mr-2 text-gray-500" />
            <span>Filterlər</span>
            {isFiltersOpen ? (
              <ChevronUp className="ml-2 h-4 w-4" />
            ) : (
              <ChevronDown className="ml-2 h-4 w-4" />
            )}
          </button>
          
          {/* Sıralama düymələri */}
          <div className="flex space-x-2 ml-auto">
            <button
              className={`px-3 py-2 rounded-lg flex items-center text-sm transition-all duration-300 ${
                sortField === 'name' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
              onClick={() => handleSort('name')}
            >
              Ad
              {sortField === 'name' && (
                sortDirection === 'asc' ? 
                <ChevronUp className="ml-1 h-4 w-4" /> : 
                <ChevronDown className="ml-1 h-4 w-4" />
              )}
            </button>
            
            <button
              className={`px-3 py-2 rounded-lg flex items-center text-sm transition-all duration-300 ${
                sortField === 'price' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
              onClick={() => handleSort('price')}
            >
              Qiymət
              {sortField === 'price' && (
                sortDirection === 'asc' ? 
                <ChevronUp className="ml-1 h-4 w-4" /> : 
                <ChevronDown className="ml-1 h-4 w-4" />
              )}
            </button>
            
            <button
              className={`px-3 py-2 rounded-lg flex items-center text-sm transition-all duration-300 ${
                sortField === 'brand' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
              onClick={() => handleSort('brand')}
            >
              Brend
              {sortField === 'brand' && (
                sortDirection === 'asc' ? 
                <ChevronUp className="ml-1 h-4 w-4" /> : 
                <ChevronDown className="ml-1 h-4 w-4" />
              )}
            </button>
          </div>
        </div>
        
        {/* Genişləndirilmiş filter paneli */}
        {isFiltersOpen && (
          <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4 fade-in-item">
            {/* Brend filteri */}
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Brendlər</h3>
              <div className="grid grid-cols-2 gap-2">
                {allBrands.map(brand => (
                  <div key={brand} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`brand-${brand}`}
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleBrandSelection(brand)}
                      className="mr-2 h-4 w-4 text-primary focus:ring-primary rounded transition-all duration-300"
                    />
                    <label htmlFor={`brand-${brand}`} className="text-sm text-gray-600">{brand}</label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Qiymət aralığı */}
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Qiymət Aralığı</h3>
              <div className="space-y-4 px-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">{priceRange[0]} ₼</span>
                  <span className="text-sm text-gray-500">{priceRange[1]} ₼</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="500"
                  step="10"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                  className="w-full"
                />
                <input
                  type="range"
                  min="0"
                  max="500"
                  step="10"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>
            </div>
            
            {/* Sıfırla düyməsi */}
            <div className="md:col-span-2 flex justify-end">
              <button
                onClick={resetFilters}
                className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Filterləri Sıfırla
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Məhsul cədvəli */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md">
        {filteredProducts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Məhsul</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brend</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qiymət</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stok</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Əməliyyatlar</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr 
                    key={product.id} 
                    className={`staggered-item hover:bg-gray-50 transition-colors duration-300 ${visibleItems.includes(product.id) ? 'visible' : ''}`}
                    data-id={product.id}
                    style={{ animationDelay: `${parseInt(product.id) % 20 * 0.05}s` }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-md overflow-hidden border border-gray-200">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "https://dummyimage.com/200x200/f0f0f0/333333.png&text=No+Image";
                            }}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-xs text-gray-500">{product.gender} • {product.concentration}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.brand}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{product.price} ₼</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        parseInt(product.id) % 3 === 0 
                          ? 'bg-green-100 text-green-800' 
                          : parseInt(product.id) % 3 === 1 
                          ? 'bg-amber-100 text-amber-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {parseInt(product.id) % 3 === 0 ? 'Stokda var' : parseInt(product.id) % 3 === 1 ? 'Azalır' : 'Bitib'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50 transition-colors">
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50 transition-colors">
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-12 text-center">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">Məhsul tapılmadı</h3>
            <p className="text-gray-500">Axtarış parametrlərini dəyişin və ya yeni məhsul əlavə edin.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products; 