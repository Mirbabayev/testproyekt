import { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Star, Filter, Search, ShoppingBag, X, SlidersHorizontal, ArrowUpDown, Heart } from 'lucide-react';
import { products } from '../../data/products';
import { ProductCard } from '../../components/product-card';

// Filtrlər üçün tiplər
type GenderFilter = 'hamısı' | 'kişi' | 'qadın' | 'uniseks';
type SortOption = 'default' | 'price-low-high' | 'price-high-low' | 'rating';

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
    // URL-dən brand parametrini oxu
    const brandParam = searchParams.get('brand');
    if (brandParam) {
      const exactBrand = allBrands.find(
        b => b.toLowerCase() === brandParam.toLowerCase()
      );
      if (exactBrand) {
        setBrandFilters([exactBrand]);
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
  const filteredProducts = useMemo(() => {
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
      filtered = filtered.filter(product => brandFilters.includes(product.brand));
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
              return productNotes.some(note => ['portağal', 'limon', 'bergamot', 'sitra', 'mandarin'].some(f => note.includes(f)));
            case 'şərqli':
              return productNotes.some(note => ['amber', 'müşk', 'oud', 'dəri', 'vanil'].some(f => note.includes(f)));
            case 'meyvəli':
              return productNotes.some(note => ['alma', 'şaftalı', 'meyvə', 'armud', 'qarağat'].some(f => note.includes(f)));
            case 'dəniz':
              return productNotes.some(note => ['dəniz', 'su', 'okean'].some(f => note.includes(f)));
            case 'ətirli':
              return productNotes.some(note => ['lavanda', 'rozmarin', 'mint', 'nanə', 'yaşıl çay'].some(f => note.includes(f)));
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
        filtered.sort((a, b) => parseInt(a.id) - parseInt(b.id));
    }

    return filtered;
  }, [searchQuery, genderFilter, brandFilters, concentrationFilters, noteFilters, familyFilters, sortOption]);

  return (
    <div className="container mx-auto px-4 pt-0 pb-12">
      {/* Axtarış */}
      <div className="mt-0 mb-6">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="font-medium text-gray-800 px-3 py-1.5 bg-gray-100 rounded-lg">
            <span className="text-primary font-bold">{filteredProducts.length}</span> məhsul tapıldı
          </div>
          
          <div className="relative w-full sm:max-w-lg mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Axtarış..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
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

        <div className="flex items-center">
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

      <div className="mt-3"></div>

      {/* Məhsulların siyahısı */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-lg text-gray-500">Axtarışınıza uyğun məhsul tapılmadı.</p>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-medium text-gray-800">Məhsullar ({filteredProducts.length})</h3>
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
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}