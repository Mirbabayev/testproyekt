import { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Star, 
  Filter, 
  Search, 
  ShoppingBag, 
  X, 
  SlidersHorizontal, 
  ArrowUpDown, 
  Heart, 
  ChevronLeft, 
  ChevronRight,
  LayoutGrid,
  LayoutList,
  CircleSlash,
  Scale,
  Sparkles
} from 'lucide-react';
import { products } from '../../data/products';
import { ProductCard } from '../../components/product-card';

// Filtrlər üçün tiplər
type GenderFilter = 'hamısı' | 'kişi' | 'qadın' | 'uniseks';
type SortOption = 'default' | 'price-low-high' | 'price-high-low' | 'rating';
type ViewMode = 'grid' | 'list' | 'group';

// Müqayisə üçün tip
type CompareProduct = {
  id: string;
  name: string;
  brand: string;
  image: string;
  price: number;
};

// Ətir qrupları
const fragranceFamilies = [
  "Çiçəkli",
  "Ədviyyəli",
  "Odunsu",
  "Sitruslu", 
  "Şərqli",
  "Meyvəli",
  "Dəniz",
  "Ətirli"
];

// Ətir təklif kategoriyaları
const fragranceSuggestions = [
  { name: "Yay üçün", filters: { family: ["Sitruslu", "Dəniz"] } },
  { name: "Qış üçün", filters: { family: ["Odunsu", "Ədviyyəli", "Şərqli"] } },
  { name: "Ofis üçün", filters: { family: ["Sitruslu", "Ətirli"] } },
  { name: "Axşam gəzintisi", filters: { family: ["Şərqli", "Çiçəkli"] } },
  { name: "Klassik", filters: { family: ["Odunsu", "Ətirli"] } },
];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [genderFilter, setGenderFilter] = useState<GenderFilter>('hamısı');
  const [brandFilters, setBrandFilters] = useState<string[]>([]);
  const [concentrationFilters, setConcentrationFilters] = useState<string[]>([]);
  const [noteFilters, setNoteFilters] = useState<string[]>([]);
  const [familyFilters, setFamilyFilters] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  
  // Yeni bildiriş state-i əlavə et
  const [showNoProductsNotification, setShowNoProductsNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  
  // Yeni state'lər
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [compareProducts, setCompareProducts] = useState<CompareProduct[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [showFragranceWheel, setShowFragranceWheel] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<number | null>(null);
  
  // Səhifələmə state'ləri
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [paginatedProducts, setPaginatedProducts] = useState<typeof products>([]);

  // Kataloqdan unikal dəyərləri əldə et
  const allBrands = useMemo(() => [...new Set(products.map(p => p.brand))], []);
  const allConcentrations = useMemo(() => [...new Set(products.map(p => p.concentration))], []);
  const allNotes = useMemo(() => {
    const notesSet = new Set<string>();
    products.forEach(product => {
      product.notes.top.forEach(note => notesSet.add(note));
      product.notes.middle.forEach(note => notesSet.add(note));
      product.notes.base.forEach(note => notesSet.add(note));
    });
    return [...notesSet];
  }, []);

  // URL parametrlərini oxu və filterləri yenilə
  useEffect(() => {
    // Öncə bildirişi sıfırla
    setShowNoProductsNotification(false);
    
    // URL-dən brand parametrini oxu
    const brandParam = searchParams.get('brand');
    if (brandParam) {
      // Case-insensitive yoxlama (böyük-kiçik hərfə həssas olmayan)
      const normalizedBrandParam = brandParam.toLowerCase().trim();
      const exactBrand = allBrands.find(
        b => b.toLowerCase().trim() === normalizedBrandParam
      );
      if (exactBrand) {
        setBrandFilters([exactBrand]);
      } else {
        // Brend tapılmadıqda bildiriş göstər
        setShowNoProductsNotification(true);
        setNotificationMessage(`"${brandParam}" brendi tapılmadı. Bütün məhsullar göstərilir.`);
        setBrandFilters([]);
      }
    }

    // URL-dən gender parametrini oxu
    const genderParam = searchParams.get('gender') as GenderFilter;
    if (genderParam && ['kişi', 'qadın', 'uniseks'].includes(genderParam)) {
      setGenderFilter(genderParam);
    }

    // URL-dən search parametrini oxu
    const searchParam = searchParams.get('search');
    if (searchParam) {
      setSearchQuery(searchParam);
    }
    
    // URL-dən family parametrini oxu
    const familyParam = searchParams.get('family');
    if (familyParam && fragranceFamilies.includes(familyParam)) {
      setFamilyFilters([familyParam]);
    }
    
    // URL-dən not parametrini oxu
    const noteParam = searchParams.get('note');
    if (noteParam) {
      const exactNote = allNotes.find(
        n => n.toLowerCase() === noteParam.toLowerCase()
      );
      if (exactNote) {
        setNoteFilters([exactNote]);
      }
    }
  }, [searchParams, allNotes, allBrands]);

  // Filtr dəyişdikdə URL parametrlərini yenilə
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (searchQuery) {
      params.set('search', searchQuery);
    }
    
    if (genderFilter !== 'hamısı') {
      params.set('gender', genderFilter);
    }
    
    if (brandFilters.length === 1) {
      params.set('brand', brandFilters[0]);
    }
    
    if (familyFilters.length === 1) {
      params.set('family', familyFilters[0]);
    }
    
    if (noteFilters.length === 1) {
      params.set('note', noteFilters[0]);
    }
    
    setSearchParams(params, { replace: true });
  }, [searchQuery, genderFilter, brandFilters, familyFilters, noteFilters, setSearchParams]);

  // Filtr tətbiq edilib-edilmədiyini yoxla
  const isFilterActive = 
    brandFilters.length > 0 || 
    concentrationFilters.length > 0 || 
    noteFilters.length > 0 ||
    familyFilters.length > 0;

  // Bütün filtrləri təmizlə
  const clearAllFilters = () => {
    setSearchQuery('');
    setGenderFilter('hamısı');
    setBrandFilters([]);
    setConcentrationFilters([]);
    setNoteFilters([]);
    setFamilyFilters([]);
    setSortOption('default');
  };

  // Çoxlu seçim filtrləri üçün yardımçı funksiya
  const toggleFilter = (value: string, currentFilters: string[], setFilters: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (currentFilters.includes(value)) {
      setFilters(currentFilters.filter(v => v !== value));
    } else {
      setFilters([...currentFilters, value]);
    }
  };

  // Məhsulların filtrələnmiş və sıralanmış siyahısı
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Axtarış filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.brand.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }

    // Gender filter
    if (genderFilter !== 'hamısı') {
      filtered = filtered.filter(product => product.gender === genderFilter);
    }

    // Brend filter
    if (brandFilters.length > 0) {
      filtered = filtered.filter(product => {
        return brandFilters.some(brandFilter => {
          // Brend adlarını normalize edək
          const normalizedProductBrand = product.brand.toLowerCase().trim();
          const normalizedBrandFilter = brandFilter.toLowerCase().trim();

          // Xüsusi hallar üçün alternativ adlar
          if (normalizedProductBrand === "ysl" && normalizedBrandFilter === "yves saint laurent") {
            return true;
          }
          if (normalizedProductBrand === "yves saint laurent" && normalizedBrandFilter === "ysl") {
            return true;
          }
          if (normalizedProductBrand === "giorgio armani" && normalizedBrandFilter === "armani") {
            return true;
          }
          if (normalizedProductBrand === "armani" && normalizedBrandFilter === "giorgio armani") {
            return true;
          }

          // Brend filtri məhsul brendində var mı?
          return normalizedProductBrand.includes(normalizedBrandFilter) || 
                 normalizedBrandFilter.includes(normalizedProductBrand);
        });
      });
    }

    // Konsentrasiya filter
    if (concentrationFilters.length > 0) {
      filtered = filtered.filter(product => concentrationFilters.includes(product.concentration));
    }

    // Notlar filter
    if (noteFilters.length > 0) {
      filtered = filtered.filter(product => 
        product.notes.top.some(note => noteFilters.includes(note)) ||
        product.notes.middle.some(note => noteFilters.includes(note)) ||
        product.notes.base.some(note => noteFilters.includes(note))
      );
    }
    
    // Qrup filter
    if (familyFilters.length > 0) {
      filtered = filtered.filter(product => {
        // Bütün notları birləşdir
        const productNotes = [
          ...product.notes.top.map(note => note.toLowerCase()),
          ...product.notes.middle.map(note => note.toLowerCase()),
          ...product.notes.base.map(note => note.toLowerCase())
        ];
        
        return familyFilters.some(family => {
          const familyLower = family.toLowerCase();
          switch (familyLower) {
            case 'çiçəkli':
              return productNotes.some(note => ['qızılgül', 'jasmin', 'çiçək', 'bənövşə', 'yasəmən', 'pion'].some(f => note.includes(f)));
            case 'ədviyyəli':
              return productNotes.some(note => ['ədviyyə', 'istiot', 'darçın', 'zəfəran', 'qaranfil', 'kardamon'].some(f => note.includes(f)));
            case 'odunsu':
              return productNotes.some(note => ['ağac', 'sandal', 'tütün', 'sedir', 'məxmər'].some(f => note.includes(f)));
            case 'sitruslu':
              return productNotes.some(note => ['sitrus', 'limon', 'portağal', 'qreypfrut', 'mandarin'].some(f => note.includes(f)));
            case 'şərqli':
              return productNotes.some(note => ['şərq', 'ətirli', 'vanil', 'müşk', 'ənbər'].some(f => note.includes(f)));
            case 'meyvəli':
              return productNotes.some(note => ['meyvə', 'alma', 'armud', 'şaftalı', 'gilas'].some(f => note.includes(f)));
            case 'dəniz':
              return productNotes.some(note => ['dəniz', 'okyanus', 'su', 'marin'].some(f => note.includes(f)));
            case 'ətirli':
              return productNotes.some(note => ['ətir', 'gül', 'nərgiz', 'lavanda'].some(f => note.includes(f)));
            default:
              return false;
          }
        });
      });
    }

    // Sıralama
    switch (sortOption) {
      case 'price-low-high':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Default sıralama (bəlkə populyarlığa görə)
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    // Filtrləmədən sonra nəticə yoxdursa və brend filtri tətbiq olunubsa
    const brandParam = searchParams.get('brand');
    if (filtered.length === 0 && brandParam && brandFilters.length > 0) {
      // Bildirişi göstər
      setShowNoProductsNotification(true);
      setNotificationMessage(`"${brandParam}" brendi üçün məhsul tapılmadı. Filtrləri dəyişdirin və ya bütün məhsullara baxın.`);
      // Brend filtrini təmizlə ki, digər məhsullar göstərilsin
      setBrandFilters([]);
      // Yenidən filtrlə, amma brend filtri olmadan
      return products;
    } else if (filtered.length > 0) {
      // Əgər məhsullar tapılıbsa, bildirişi gizlət
      setShowNoProductsNotification(false);
    }
    
    return filtered;
  }, [searchQuery, genderFilter, brandFilters, concentrationFilters, noteFilters, familyFilters, sortOption, searchParams]);
  
  // Səhifə sayını hesabla
  const pageCount = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
  
  // Məhsulları səhifələ
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedProducts(filteredAndSortedProducts.slice(startIndex, endIndex));
    
    // Səhifə dəyişdikdə yuxarı qaytarır
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, itemsPerPage, filteredAndSortedProducts]);
  
  // URL-dən səhifə parametrini oxu
  useEffect(() => {
    const pageParam = searchParams.get('page');
    if (pageParam) {
      const page = parseInt(pageParam);
      if (!isNaN(page) && page > 0 && page <= pageCount) {
        setCurrentPage(page);
      } else {
        // Səhifə səhv dəyərsə birinci səhifəyə qayıt
        setCurrentPage(1);
      }
    } else {
      // Səhifə parametri yoxdursa birinci səhifədən başla
      setCurrentPage(1);
    }
  }, [searchParams, pageCount]);
  
  // Səhifə dəyişdikdə URL-ə əlavə et
  useEffect(() => {
    if (currentPage > 1) {
      searchParams.set('page', currentPage.toString());
    } else {
      searchParams.delete('page');
    }
    
    setSearchParams(searchParams, { replace: true });
  }, [currentPage, setSearchParams]);
  
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
      // Əks halda sətif və sondan bir-ikisini, ortada isə ellipsisləri göstər
      if (currentPage <= 3) {
        // İlk 3 səhifədəyiksə
        for (let i = 1; i <= 5; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('ellipsis');
        pageNumbers.push(pageCount);
      } else if (currentPage >= pageCount - 2) {
        // Son 3 səhifədəyiksə
        pageNumbers.push(1);
        pageNumbers.push('ellipsis');
        for (let i = pageCount - 4; i <= pageCount; i++) {
          pageNumbers.push(i);
        }
      } else {
        // Ortadayıqsa
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
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8 mb-4">
        <div className="isolate inline-flex -space-x-px rounded-md shadow-sm">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className={`relative inline-flex items-center rounded-l-md px-3 py-2 text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors ${
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
                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700"
              >
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => goToPage(page as number)}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                  currentPage === page
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-50 transition-colors'
                }`}
              >
                {page}
              </button>
            )
          ))}
          
          <button
            onClick={goToNextPage}
            disabled={currentPage === pageCount}
            className={`relative inline-flex items-center rounded-r-md px-3 py-2 text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors ${
              currentPage === pageCount ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <span className="sr-only">Sonrakı</span>
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        
        {/* Səhifədəki element sayını seçmək üçün selector */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700">Bir səhifədə:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="rounded-md border border-gray-300 py-1 px-2 text-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
          >
            <option value={12}>12</option>
            <option value={24}>24</option>
            <option value={36}>36</option>
            <option value={48}>48</option>
          </select>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-2 md:px-4 py-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-medium">Ətirlər</h1>
          <div className="flex items-center gap-3">
            <button 
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-500'}`}
              onClick={() => setViewMode('grid')}
              aria-label="Məhsulları grid görünüşündə göstər"
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-500'}`}
              onClick={() => setViewMode('list')}
              aria-label="Məhsulları siyahı görünüşündə göstər"
            >
              <LayoutList size={18} />
            </button>
          </div>
        </div>
        
        {/* Bildiriş komponenti */}
        {showNoProductsNotification && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md flex items-center">
            <div className="text-yellow-600 mr-3">
              <CircleSlash size={20} />
            </div>
            <p className="text-yellow-700 text-sm">{notificationMessage}</p>
            <button 
              className="ml-auto text-yellow-600 hover:text-yellow-800"
              onClick={() => setShowNoProductsNotification(false)}
            >
              <X size={18} />
            </button>
          </div>
        )}
        
        {/* İnterface */}
        <div className="flex flex-col items-center sm:items-stretch sm:flex-row gap-4 mb-8">
          {/* Axtarış */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input 
              type="text" 
              placeholder="Marka və ya məhsul adı..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full sm:w-80 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/50 focus:border-transparent outline-none"
            />
          </div>

          {/* Filtr və sıralama kontrolları */}
          <div className="flex flex-wrap justify-between items-center mb-6">
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`flex items-center text-sm font-medium ${showAdvancedFilters ? 'bg-primary text-white' : 'bg-gray-50 hover:bg-gray-100 text-gray-800'} px-4 py-2 rounded-lg transition-colors`}
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              {showAdvancedFilters ? 'Filtrləri gizlət' : 'Ətraflı filtr'}
              {isFilterActive && (
                <span className={`ml-1.5 ${showAdvancedFilters ? 'bg-white text-primary' : 'bg-primary text-white'} rounded-full w-5 h-5 flex items-center justify-center text-xs`}>
                  {brandFilters.length + concentrationFilters.length + noteFilters.length + familyFilters.length}
                </span>
              )}
            </button>

            {/* Cins filtri - ortada */}
            <div className="flex justify-center flex-1 mx-2 overflow-x-auto py-1">
              <div className="flex gap-2">
                {['hamısı', 'kişi', 'qadın', 'uniseks'].map((gender) => (
                  <button
                    key={gender}
                    onClick={() => setGenderFilter(gender as GenderFilter)}
                    className={`px-5 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap ${
                      genderFilter === gender
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                    }`}
                  >
                    {gender.charAt(0).toUpperCase() + gender.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Görünüş və sıralama seçimi */}
            <div className="flex items-center gap-2">
              {/* Görünüş rejimi seçimləri */}
              <div className="flex border rounded-lg overflow-hidden mr-2 bg-gray-50">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                  title="Grid görünüşü"
                >
                  <LayoutGrid size={16} />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                  title="Siyahı görünüşü"
                >
                  <LayoutList size={16} />
                </button>
                <button 
                  onClick={() => setViewMode('group')}
                  className={`p-2 ${viewMode === 'group' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                  title="Qruplaşdırılmış görünüş"
                >
                  <Filter size={16} />
                </button>
              </div>

              <ArrowUpDown className="w-4 h-4 mr-2 text-gray-600" />
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              >
                <option value="default">Tövsiyə edilən</option>
                <option value="price-low-high">Qiymət: aşağıdan yuxarıya</option>
                <option value="price-high-low">Qiymət: yuxarıdan aşağıya</option>
                <option value="rating">Reytinq</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tez filtrlər paneli */}
        <div className="mb-8 bg-primary/5 p-4 rounded-lg">
          <div className="flex items-center gap-3 mb-3">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="font-medium text-gray-800">Tez filtrlər</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {fragranceSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedSuggestion(selectedSuggestion === index ? null : index);
                  if (suggestion.filters.family) {
                    setFamilyFilters(suggestion.filters.family);
                  }
                }}
                className={`py-3 px-4 rounded-lg text-center transition-all ${
                  selectedSuggestion === index
                    ? 'bg-primary text-white shadow-md' 
                    : 'bg-white hover:bg-gray-100 text-gray-800 shadow-sm border border-gray-200'
                }`}
              >
                <span className="text-sm font-medium">{suggestion.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Ətir çarxı açma düyməsi */}
        <div className="mb-6 flex justify-center">
          <button
            onClick={() => setShowFragranceWheel(!showFragranceWheel)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              showFragranceWheel ? 'bg-primary text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            <span className="text-sm font-medium">
              {showFragranceWheel ? 'Ətir çarxını gizlət' : 'Ətir çarxını göstər'}
            </span>
          </button>
        </div>

        {/* Ətir çarxı */}
        {showFragranceWheel && (
          <div className="mb-8 p-5 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Ətir çarxı</h3>
            <div className="aspect-square max-w-md mx-auto relative mb-4">
              <div className="absolute inset-0 rounded-full border-4 border-primary/20 flex items-center justify-center">
                <div className="w-3/4 h-3/4 rounded-full border-2 border-primary/30 flex items-center justify-center">
                  <div className="w-1/2 h-1/2 rounded-full border border-primary/40 flex items-center justify-center">
                    <div className="w-4 h-4 bg-primary rounded-full"></div>
                  </div>
                </div>
              </div>
              
              {/* Ətir qrupları yerləşdirmə */}
              {fragranceFamilies.map((family, index) => {
                const angle = (index * 45) * (Math.PI / 180);
                const radius = 45; // Faiz olaraq
                const x = 50 + radius * Math.cos(angle);
                const y = 50 + radius * Math.sin(angle);
                
                return (
                  <button
                    key={family}
                    onClick={() => toggleFilter(family, familyFilters, setFamilyFilters)}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      familyFilters.includes(family)
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                    }`}
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    {family}
                  </button>
                );
              })}
            </div>
            <p className="text-gray-500 text-sm text-center">
              Ətir qruplarını seçərək özünüzə uyğun ətirləri tapın
            </p>
          </div>
        )}

        {/* Müqayisə paneli */}
        {showComparison && compareProducts.length > 0 && (
          <div className="mb-8 p-5 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-800">Məhsul müqayisəsi</h3>
              <button 
                onClick={() => setShowComparison(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {compareProducts.map(product => (
                <div key={product.id} className="border rounded-lg p-3 relative">
                  <button 
                    onClick={() => setCompareProducts(compareProducts.filter(p => p.id !== product.id))}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-3">
                    <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                    <div>
                      <p className="text-sm font-medium">{product.brand}</p>
                      <p className="text-xs text-gray-500">{product.name}</p>
                      <p className="text-sm font-bold mt-1">{product.price} ₼</p>
                    </div>
                  </div>
                </div>
              ))}
              
              {compareProducts.length < 4 && (
                <div className="border border-dashed rounded-lg p-3 flex items-center justify-center h-[104px]">
                  <p className="text-gray-400 text-sm">+ Müqayisə üçün məhsul əlavə edin</p>
                </div>
              )}
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-4">
              <button 
                onClick={() => setCompareProducts([])}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 text-sm font-medium transition-colors"
              >
                Siyahını təmizlə
              </button>
              <Link
                to="/compare"
                className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium transition-colors hover:bg-primary/90 text-center"
              >
                Ətraflı müqayisə et
              </Link>
            </div>
          </div>
        )}

        <div className="mt-3"></div>

        {/* Ətraflı filtrlər - açılıb bağlanan */}
        {showAdvancedFilters && (
          <div className="bg-white p-5 rounded-lg shadow-md mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-lg">Ətraflı filtrlər</h3>
            </div>
            
            {/* Ətir qrupları filtri */}
            <div className="mb-6 border-b border-gray-200 pb-6">
              <h3 className="font-medium mb-3 text-gray-800">Ətir qrupları</h3>
              <div className="flex flex-wrap gap-2">
                {fragranceFamilies.map((family) => (
                  <button 
                    key={family}
                    onClick={() => toggleFilter(family, familyFilters, setFamilyFilters)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      familyFilters.includes(family)
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                    }`}
                  >
                    {family}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Brendlər filter */}
              <div className="border border-gray-200 rounded-lg p-3">
                <h3 className="font-medium mb-3 text-gray-700 flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                  Brendlər
                </h3>
                <div className="max-h-40 overflow-y-auto pr-2">
                  {allBrands.map((brand) => (
                    <label key={brand} className="flex items-center py-1.5 px-2 rounded cursor-pointer mb-1.5 hover:bg-accent/20">
                      <input 
                        type="checkbox" 
                        className="mr-2 h-4 w-4 accent-primary rounded"
                        checked={brandFilters.includes(brand)}
                        onChange={() => toggleFilter(brand, brandFilters, setBrandFilters)}
                      />
                      <span className="text-gray-700 text-sm font-medium">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Konsentrasiya filter */}
              <div className="border border-gray-200 rounded-lg p-3">
                <h3 className="font-medium mb-3 text-gray-700 flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                  Konsentrasiya
                </h3>
                <div className="space-y-1">
                  {allConcentrations.map((concentration) => (
                    <label key={concentration} className="flex items-center py-1.5 px-2 rounded cursor-pointer mb-1.5 hover:bg-accent/20">
                      <input 
                        type="checkbox" 
                        className="mr-2 h-4 w-4 accent-primary rounded"
                        checked={concentrationFilters.includes(concentration)}
                        onChange={() => toggleFilter(concentration, concentrationFilters, setConcentrationFilters)}
                      />
                      <span className="text-gray-700 text-sm font-medium">{concentration}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Notlar filter */}
              <div className="border border-gray-200 rounded-lg p-3">
                <h3 className="font-medium mb-3 text-gray-700 flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                  Notlar
                </h3>
                <div className="max-h-40 overflow-y-auto pr-2">
                  {allNotes.map((note) => (
                    <label key={note} className="flex items-center py-1.5 px-2 rounded cursor-pointer mb-1.5 hover:bg-accent/20">
                      <input
                        type="checkbox"
                        className="mr-2 h-4 w-4 accent-primary rounded"
                        checked={noteFilters.includes(note)}
                        onChange={() => toggleFilter(note, noteFilters, setNoteFilters)}
                      />
                      <span className="text-gray-700 text-sm font-medium">{note}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Məhsulların siyahısı */}
        {filteredAndSortedProducts.length === 0 ? (
          <div className="py-12 text-center bg-white rounded-lg shadow-sm mt-6">
            <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">Məhsul tapılmadı</h3>
            <p className="text-gray-500">Axtarış parametrlərini dəyişin.</p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-medium text-gray-800">Məhsullar ({filteredAndSortedProducts.length})</h3>
              {isFilterActive && (
                <button 
                  onClick={clearAllFilters}
                  className="text-primary hover:text-primary/80 text-sm flex items-center bg-primary/5 px-3 py-1.5 rounded-lg hover:bg-primary/10 transition-colors whitespace-nowrap"
                >
                  <X className="w-4 h-4 mr-1" />
                  Hamısını təmizlə
                </button>
              )}
            </div>
            
            {/* Aktiv filtrlər sətri */}
            {isFilterActive && (
              <div className="flex flex-wrap gap-2 mb-4">
                {brandFilters.map(brand => (
                  <div key={brand} className="flex items-center bg-primary/10 px-3 py-1 rounded-full text-sm">
                    <span className="text-primary font-medium">{brand}</span>
                    <button onClick={() => toggleFilter(brand, brandFilters, setBrandFilters)} className="ml-2 text-primary">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                
                {concentrationFilters.map(concentration => (
                  <div key={concentration} className="flex items-center bg-primary/10 px-3 py-1 rounded-full text-sm">
                    <span className="text-primary font-medium">{concentration}</span>
                    <button onClick={() => toggleFilter(concentration, concentrationFilters, setConcentrationFilters)} className="ml-2 text-primary">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                
                {noteFilters.map(note => (
                  <div key={note} className="flex items-center bg-primary/10 px-3 py-1 rounded-full text-sm">
                    <span className="text-primary font-medium">{note}</span>
                    <button onClick={() => toggleFilter(note, noteFilters, setNoteFilters)} className="ml-2 text-primary">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                
                {familyFilters.map(family => (
                  <div key={family} className="flex items-center bg-primary/10 px-3 py-1 rounded-full text-sm">
                    <span className="text-primary font-medium">{family}</span>
                    <button onClick={() => toggleFilter(family, familyFilters, setFamilyFilters)} className="ml-2 text-primary">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            {/* Məhsullar grid */}
            {viewMode === 'grid' && (
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} size="small" />
                ))}
              </div>
            )}

            {/* Məhsullar siyahı */}
            {viewMode === 'list' && (
              <div className="mt-6 space-y-4">
                {paginatedProducts.map((product) => (
                  <div key={product.id} className="flex flex-col sm:flex-row gap-4 p-4 bg-white rounded-lg shadow-sm">
                    <div className="sm:w-[150px]">
                      <img src={product.image} alt={product.name} className="w-full h-[150px] object-cover rounded-lg" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-500">{product.brand}</p>
                          <h3 className="text-lg font-medium">
                            <Link to={`/products/${product.id}`} className="hover:text-primary">{product.name}</Link>
                          </h3>
                        </div>
                        <div className="mt-2 sm:mt-0 flex items-center">
                          <span className="font-bold text-lg">{product.price} ₼</span>
                        </div>
                      </div>
                      
                      <div className="mt-2 flex items-center text-amber-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < product.rating ? 'fill-current' : 'stroke-current fill-transparent'}`}
                          />
                        ))}
                        <span className="ml-1 text-xs text-gray-500">({product.reviewCount})</span>
                      </div>
                      
                      <p className="mt-2 text-gray-600 text-sm line-clamp-2">{product.description}</p>
                      
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Link 
                          to={`/products/${product.id}`}
                          className="px-4 py-1.5 bg-primary text-white rounded-lg text-sm hover:bg-primary/90 transition-colors"
                        >
                          Ətraflı
                        </Link>
                        <button
                          onClick={() => {
                            if (compareProducts.some(p => p.id === product.id)) {
                              setCompareProducts(compareProducts.filter(p => p.id !== product.id));
                            } else if (compareProducts.length < 4) {
                              setCompareProducts([...compareProducts, {
                                id: product.id,
                                name: product.name,
                                brand: product.brand,
                                image: product.image,
                                price: product.price
                              }]);
                              setShowComparison(true);
                            }
                          }}
                          className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${
                            compareProducts.some(p => p.id === product.id)
                              ? 'bg-gray-700 text-white'
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          }`}
                        >
                          <Scale className="w-4 h-4 inline-block mr-1" />
                          {compareProducts.some(p => p.id === product.id) ? 'Müqayisədən çıxar' : 'Müqayisə et'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Məhsullar qruplaşdırılmış */}
            {viewMode === 'group' && (
              <div className="mt-6 space-y-8">
                {Object.entries(
                  paginatedProducts.reduce((acc, product) => {
                    if (!acc[product.brand]) {
                      acc[product.brand] = [];
                    }
                    acc[product.brand].push(product);
                    return acc;
                  }, {} as Record<string, typeof products>)
                ).map(([brand, brandProducts]) => (
                  <div key={brand} className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="text-lg font-medium mb-4 pb-2 border-b">{brand}</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                      {brandProducts.map(product => (
                        <ProductCard key={product.id} product={product} size="small" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Səhifələmə */}
            {filteredAndSortedProducts.length > itemsPerPage && renderPagination()}
          </>
        )}
      </div>
    </div>
  );
}