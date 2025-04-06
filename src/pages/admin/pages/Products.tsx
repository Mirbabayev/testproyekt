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
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  X,
  AlertTriangle,
  Save,
  CheckCircle
} from 'lucide-react';
import { products } from '../../../data/products';

// Məhsul tipini data/products.ts faylından istifadə edirik
import { Product } from '../../../data/products';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([...products]);
  const [sortField, setSortField] = useState<'name' | 'price' | 'brand'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [visibleItems, setVisibleItems] = useState<string[]>([]);
  
  // Səhifələmə state'ləri
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(1);
  const [paginatedProducts, setPaginatedProducts] = useState<typeof products>([]);

  // Bütün brendləri əldə et
  const allBrands = Array.from(new Set(products.map(p => p.brand)));

  // Silmə üçün state-lər
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  
  // Redaktə üçün state-lər
  const [showEditModal, setShowEditModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<Product>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);
  const [editError, setEditError] = useState('');

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
  }, [paginatedProducts]);
  
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
      const price = parseFloat(p.price.toString());
      return price >= priceRange[0] && price <= priceRange[1];
    });
    
    // Sıralama
    result.sort((a, b) => {
      if (sortField === 'price') {
        const aPrice = parseFloat(a.price.toString());
        const bPrice = parseFloat(b.price.toString());
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
    // Filterlər dəyişdikdə birinci səhifəyə qayıt
    setCurrentPage(1);
    setVisibleItems([]); // Yeni filter nəticələri üçün görünən elementləri sıfırla
  }, [searchTerm, sortField, sortDirection, selectedBrands, priceRange]);
  
  // Filtered products dəyişəndə səhifələməni yenilə
  useEffect(() => {
    // Ümumi səhifə sayını təyin et
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    setPageCount(totalPages);
    
    // Cari səhifə totalPageCount-dan böyüksə, cari səhifəni sonuncu səhifəyə qaytar
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
    
    // Cari səhifə üçün məhsulları filtrələ
    paginateProducts();
  }, [filteredProducts, currentPage, itemsPerPage]);
  
  // Cari səhifə dəyişdikdə məhsulları paginate et
  useEffect(() => {
    paginateProducts();
  }, [currentPage]);
  
  // Məhsulları paginate etmək funksiyası
  const paginateProducts = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const slicedProducts = filteredProducts.slice(startIndex, endIndex);
    setPaginatedProducts(slicedProducts);
  };
  
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
    setCurrentPage(1);
  };
  
  // Səhifə dəyişdirmə funksiyaları
  const goToNextPage = () => {
    if (currentPage < pageCount) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const goToPage = (page: number) => {
    setCurrentPage(page);
  };
  
  // Paginator komponentini render et
  const renderPagination = () => {
    const pageNumbers = [];
    
    // Əgər 7-dən az səhifə varsa, hamısını göstər
    if (pageCount <= 7) {
      for (let i = 1; i <= pageCount; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Əgər 7-dən çox səhifə varsa, ellipsis istifadə et
      if (currentPage <= 3) {
        // Əgər ilk səhifələrdəyiksə
        for (let i = 1; i <= 5; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('ellipsis');
        pageNumbers.push(pageCount);
      } else if (currentPage >= pageCount - 2) {
        // Əgər son səhifələrdəyiksə
        pageNumbers.push(1);
        pageNumbers.push('ellipsis');
        for (let i = pageCount - 4; i <= pageCount; i++) {
          pageNumbers.push(i);
        }
      } else {
        // Ortadakı səhifələrdəyiksə
        pageNumbers.push(1);
        pageNumbers.push('ellipsis');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('ellipsis');
        pageNumbers.push(pageCount);
      }
    }
    
    return (
      <div className="flex items-center justify-between bg-white px-4 py-3 sm:px-6 border-t border-gray-200">
        <div className="flex flex-1 items-center justify-between">
          <div>
            <p className="text-sm text-gray-700">
              <span className="font-medium">{filteredProducts.length}</span> məhsuldan{' '}
              <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span>-
              <span className="font-medium">
                {Math.min(currentPage * itemsPerPage, filteredProducts.length)}
              </span> arası göstərilir
            </p>
          </div>
          <div>
            <div className="isolate inline-flex -space-x-px rounded-md shadow-sm">
              <button
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                  currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <span className="sr-only">Əvvəlki</span>
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              
              {pageNumbers.map((page, index) => (
                page === 'ellipsis' ? (
                  <span
                    key={`ellipsis-${index}`}
                    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => goToPage(page as number)}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                      currentPage === page
                        ? 'bg-primary text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
                        : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                    }`}
                  >
                    {page}
                  </button>
                )
              ))}
              
              <button
                onClick={goToNextPage}
                disabled={currentPage === pageCount}
                className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                  currentPage === pageCount ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <span className="sr-only">Sonrakı</span>
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Silmək üçün dialoqunu göstər
  const handleShowDeleteModal = (product: Product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
    setDeleteError('');
  };
  
  // Dialoqunu bağla
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
    setDeleteError('');
  };
  
  // Məhsulu sil
  const handleDeleteProduct = async () => {
    if (!productToDelete) return;
    
    setIsDeleting(true);
    setDeleteError('');
    
    try {
      // Real API-yə göndərmək üçün aşağıdakı kodu istifadə edərdik
      // const response = await fetch(`/api/products/${productToDelete.id}`, {
      //   method: 'DELETE',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   }
      // });
      
      // if (!response.ok) {
      //   throw new Error('Məhsul silinərkən xəta baş verdi');
      // }
      
      // Məhsul frontend-də silmək
      const updatedProducts = filteredProducts.filter(
        (product) => product.id !== productToDelete.id
      );
      
      // Mock silmə əməliyyatı - real əməliyyatda API çağırıldıqdan sonra state yenilənəcək
      setTimeout(() => {
        setFilteredProducts(updatedProducts);
        setIsDeleting(false);
        setDeleteSuccess(true);
        
        // 2 saniyə sonra modal-ı bağla
        setTimeout(() => {
          setShowDeleteModal(false);
          setProductToDelete(null);
          setDeleteSuccess(false);
        }, 2000);
      }, 1000);
      
    } catch (error) {
      setIsDeleting(false);
      setDeleteError('Məhsul silinərkən xəta baş verdi');
      console.error('Silmə xətası:', error);
    }
  };

  // Redaktə üçün dialoqunu göstər
  const handleShowEditModal = (product: Product) => {
    setProductToEdit(product);
    setEditFormData({ ...product });
    setShowEditModal(true);
    setEditError('');
  };
  
  // Redaktə dialoqunu bağla
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setProductToEdit(null);
    setEditFormData({});
    setEditError('');
  };
  
  // Redaktə formu dəyişikliklərini izlə
  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: name === 'price' ? parseFloat(value) : value
    });
  };
  
  // Məhsulu redaktə et
  const handleEditProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productToEdit || !editFormData) return;
    
    setIsEditing(true);
    setEditError('');
    
    try {
      // Real API-yə göndərmək üçün aşağıdakı kodu istifadə edərdik
      // const response = await fetch(`/api/products/${productToEdit.id}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(editFormData)
      // });
      
      // if (!response.ok) {
      //   throw new Error('Məhsul yenilənərkən xəta baş verdi');
      // }
      
      // Məhsul frontend-də redaktə et
      const updatedProducts = filteredProducts.map(product => 
        product.id === productToEdit.id 
          ? { ...product, ...editFormData } 
          : product
      );
      
      // Mock redaktə əməliyyatı - real əməliyyatda API çağırıldıqdan sonra state yenilənəcək
      setTimeout(() => {
        setFilteredProducts(updatedProducts);
        setIsEditing(false);
        setEditSuccess(true);
        
        // 2 saniyə sonra modal-ı bağla
        setTimeout(() => {
          setShowEditModal(false);
          setProductToEdit(null);
          setEditFormData({});
          setEditSuccess(false);
        }, 2000);
      }, 1000);
      
    } catch (error) {
      setIsEditing(false);
      setEditError('Məhsul yenilənərkən xəta baş verdi');
      console.error('Redaktə xətası:', error);
    }
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
          <>
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
                  {paginatedProducts.map((product) => (
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
                          <button 
                            className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50 transition-colors"
                            title="Redaktə et"
                            onClick={() => handleShowEditModal(product)}
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button 
                            className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50 transition-colors"
                            title="Sil"
                            onClick={() => handleShowDeleteModal(product)}
                          >
                            <Trash className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Səhifələmə */}
            {renderPagination()}
          </>
        ) : (
          <div className="py-12 text-center">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">Məhsul tapılmadı</h3>
            <p className="text-gray-500">Axtarış parametrlərini dəyişin və ya yeni məhsul əlavə edin.</p>
          </div>
        )}
      </div>
      
      {/* Səhifə elementlərini seçmək üçün seçim */}
      <div className="mt-4 flex justify-end">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700">Bir səhifədə:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="rounded-md border-gray-300 shadow-sm text-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
      
      {/* Sil modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative bg-white rounded-lg max-w-md w-full mx-auto animate-fadeIn">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Məhsulu Sil</h3>
                <button 
                  className="text-gray-400 hover:text-gray-500"
                  onClick={handleCloseDeleteModal}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                {deleteSuccess ? (
                  <div className="bg-green-50 p-4 rounded-md text-green-800 flex items-center">
                    <CheckCircle className="mr-2" size={20} />
                    <span>Məhsul uğurla silindi!</span>
                  </div>
                ) : (
                  <>
                    <p className="text-gray-700">
                      <strong>{productToDelete?.name}</strong> məhsulunu silmək istədiyinizə əminsiniz?
                    </p>
                    
                    <div className="bg-yellow-50 p-3 rounded-md text-yellow-800 text-sm">
                      <AlertTriangle className="inline-block mr-1" size={16} />
                      Diqqət: Bu əməliyyat geri qaytarıla bilməz.
                    </div>
                    
                    <div className="flex justify-end gap-2 pt-3">
                      <button
                        onClick={handleCloseDeleteModal}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                        disabled={isDeleting}
                      >
                        Ləğv et
                      </button>
                      <button
                        onClick={handleDeleteProduct}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                        disabled={isDeleting}
                      >
                        {isDeleting ? (
                          <div className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            İcra edilir...
                          </div>
                        ) : 'Sil'}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Düzəliş modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative bg-white rounded-lg max-w-2xl w-full mx-auto max-h-[90vh] flex flex-col animate-fadeIn">
            <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white z-10">
              <h3 className="text-lg font-medium text-gray-900">Məhsulu Redaktə Et</h3>
              <button 
                className="text-gray-400 hover:text-gray-500"
                onClick={handleCloseEditModal}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="overflow-y-auto">
              {editSuccess ? (
                <div className="p-6">
                  <div className="bg-green-50 p-4 rounded-md text-green-800 flex items-center">
                    <CheckCircle className="mr-2" size={20} />
                    <span>Məhsul uğurla yeniləndi!</span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleEditProduct} className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Məhsul adı</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={editFormData.name || ''}
                        onChange={handleEditFormChange}
                        className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">Brend</label>
                      <input
                        type="text"
                        name="brand"
                        id="brand"
                        value={editFormData.brand || ''}
                        onChange={handleEditFormChange}
                        className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Qiymət (₼)</label>
                      <input
                        type="number"
                        name="price"
                        id="price"
                        min="0"
                        step="0.01"
                        value={editFormData.price || ''}
                        onChange={handleEditFormChange}
                        className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mt-5 flex justify-end gap-2 border-t pt-5">
                    <button
                      type="button"
                      onClick={handleCloseEditModal}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none"
                      disabled={isEditing}
                    >
                      Ləğv Et
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 focus:outline-none flex items-center"
                      disabled={isEditing}
                    >
                      {isEditing ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          İcra edilir...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-1" />
                          Yadda Saxla
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products; 