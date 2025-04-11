import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { products } from '../../data/products';
import { ProductCard } from '../../components/product-card';
import { motion, AnimatePresence } from 'framer-motion';

type SortOption = 'default' | 'price-low-high' | 'price-high-low' | 'popular';
type GenderFilter = 'all' | 'kişi' | 'qadın' | 'uniseks';
type PriceRange = { min: number; max: number };
type FragranceFamily = 'all' | 'citrus' | 'floral' | 'woody' | 'oriental' | 'fresh' | 'fruity' | 'gourmand' | 'aqua';

const Products = () => {
  const [visibleCount, setVisibleCount] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [showFilters, setShowFilters] = useState(false);
  const [genderFilter, setGenderFilter] = useState<GenderFilter>('all');
  const [priceRange, setPriceRange] = useState<PriceRange>({ min: 0, max: 1000 });
  const [concentrationFilter, setConcentrationFilter] = useState<string>('all');
  const [fragranceFamilyFilter, setFragranceFamilyFilter] = useState<FragranceFamily>('all');
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);

  // Bütün mövcud notları əldə et
  const allNotes = useMemo(() => {
    const notesSet = new Set<string>();
    products.forEach(product => {
      product.notes.forEach(note => notesSet.add(note));
    });
    return Array.from(notesSet).sort();
  }, []);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let result = [...products];
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query)
      );
    }
    
    // Gender filter
    if (genderFilter !== 'all') {
      result = result.filter(product => product.gender === genderFilter);
    }

    // Price range filter
    result = result.filter(product => 
      product.price >= priceRange.min && 
      product.price <= priceRange.max
    );

    // Concentration filter
    if (concentrationFilter !== 'all') {
      result = result.filter(product => product.concentration === concentrationFilter);
    }

    // Fragrance family filter
    if (fragranceFamilyFilter !== 'all') {
      result = result.filter(product => product.fragranceFamily === fragranceFamilyFilter);
    }

    // Notes filter
    if (selectedNotes.length > 0) {
      result = result.filter(product => 
        selectedNotes.every(note => product.notes.includes(note))
      );
    }
    
    // Sort
    switch (sortOption) {
      case 'price-low-high':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        result.sort((a, b) => parseInt(a.id) - parseInt(b.id));
    }
    
    return result;
  }, [searchQuery, sortOption, genderFilter, priceRange, concentrationFilter, fragranceFamilyFilter, selectedNotes]);

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + 8);
      setIsLoading(false);
    }, 500);
  };

  const resetFilters = () => {
    setGenderFilter('all');
    setPriceRange({ min: 0, max: 1000 });
    setConcentrationFilter('all');
    setFragranceFamilyFilter('all');
    setSelectedNotes([]);
    setSearchQuery('');
    setSortOption('default');
  };

  const toggleNote = (note: string) => {
    setSelectedNotes(prev => 
      prev.includes(note) 
        ? prev.filter(n => n !== note) 
        : [...prev, note]
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-white">
        <div className="container mx-auto px-6 py-3">
          <h1 className="text-3xl font-light tracking-[0.2em] text-center text-black uppercase">Məhsullar</h1>
          <p className="text-center text-gray-500 tracking-wide text-sm mt-1">Bütün parfümlərimiz</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="sticky top-0 z-10 bg-white border-y border-gray-100">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between py-2 gap-4">
            {/* Search */}
            <div className="flex-1 max-w-md relative group">
              <input
                type="text"
                placeholder="Axtar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-4 py-2 border-b border-gray-200 focus:outline-none focus:border-black transition-all bg-transparent text-base group-hover:border-gray-400"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-2 top-1/2 transform -translate-y-1/2 group-hover:text-gray-600 transition-colors" />
            </div>

            {/* Sort and Filter */}
            <div className="flex items-center gap-4">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="border-b border-gray-200 py-2 pr-4 focus:outline-none focus:border-black transition-all bg-transparent text-base appearance-none cursor-pointer hover:border-gray-400"
              >
                <option value="default">SIRALA</option>
                <option value="price-low-high">QİYMƏT: AZDAN ÇOXA</option>
                <option value="price-high-low">QİYMƏT: ÇOXDAN AZA</option>
                <option value="popular">POPULYARLIQ</option>
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-1.5 text-base hover:text-gray-600 transition-colors uppercase tracking-wider"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span className="hidden sm:inline">Filtrlər</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="container mx-auto px-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Gender Filter */}
                <div>
                  <h3 className="text-sm uppercase tracking-wider mb-2">Cins</h3>
                  <div className="flex flex-col gap-2">
                    {['all', 'kişi', 'qadın', 'uniseks'].map((gender) => (
                      <label key={gender} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="gender"
                          value={gender}
                          checked={genderFilter === gender}
                          onChange={(e) => setGenderFilter(e.target.value as GenderFilter)}
                          className="text-black focus:ring-black"
                        />
                        <span className="text-base capitalize">{gender === 'all' ? 'Hamısı' : gender}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div>
                  <h3 className="text-sm uppercase tracking-wider mb-2">Qiymət Aralığı</h3>
                  <div className="flex flex-col gap-2">
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                      className="w-full"
                    />
                    <div className="flex justify-between text-base">
                      <span>{priceRange.min} ₼</span>
                      <span>{priceRange.max} ₼</span>
                    </div>
                  </div>
                </div>

                {/* Concentration Filter */}
                <div>
                  <h3 className="text-sm uppercase tracking-wider mb-2">Konsentrasiya</h3>
                  <div className="flex flex-col gap-2">
                    {['all', 'Eau de Toilette', 'Eau de Parfum', 'Extrait de Parfum'].map((concentration) => (
                      <label key={concentration} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="concentration"
                          value={concentration}
                          checked={concentrationFilter === concentration}
                          onChange={(e) => setConcentrationFilter(e.target.value)}
                          className="text-black focus:ring-black"
                        />
                        <span className="text-base">{concentration === 'all' ? 'Hamısı' : concentration}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Fragrance Family Filter */}
                <div>
                  <h3 className="text-sm uppercase tracking-wider mb-2">Ətir Qrupu</h3>
                  <div className="flex flex-col gap-2">
                    {['all', 'citrus', 'floral', 'woody', 'oriental', 'fresh', 'fruity', 'gourmand', 'aqua'].map((family) => (
                      <label key={family} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="fragranceFamily"
                          value={family}
                          checked={fragranceFamilyFilter === family}
                          onChange={(e) => setFragranceFamilyFilter(e.target.value as FragranceFamily)}
                          className="text-black focus:ring-black"
                        />
                        <span className="text-base capitalize">{family === 'all' ? 'Hamısı' : family}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Notes Filter */}
                <div className="md:col-span-2">
                  <h3 className="text-sm uppercase tracking-wider mb-2">Notlar</h3>
                  <div className="flex flex-wrap gap-2">
                    {allNotes.map((note) => (
                      <button
                        key={note}
                        onClick={() => toggleNote(note)}
                        className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                          selectedNotes.includes(note)
                            ? 'bg-black text-white border-black'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-black'
                        }`}
                      >
                        {note}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Reset Filters Button */}
              <div className="mt-4 flex justify-end">
                <button
                  onClick={resetFilters}
                  className="text-sm uppercase tracking-wider text-gray-500 hover:text-black transition-colors"
                >
                  Filtrləri Sıfırla
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Products Grid */}
      <div className="container mx-auto px-6 py-8">
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {filteredProducts.slice(0, visibleCount).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>

        {/* Load More Button */}
        {visibleCount < filteredProducts.length && (
          <div className="text-center mt-8">
            <button
              onClick={handleLoadMore}
              disabled={isLoading}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Yüklənir...' : 'Daha çox'}
            </button>
          </div>
        )}

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 tracking-[0.2em] uppercase">Heç bir nəticə tapılmadı</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;