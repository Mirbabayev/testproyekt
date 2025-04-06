import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../lib/auth-context';
import { useTranslation } from 'react-i18next';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  Menu,
  X,
  ChevronDown
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export const Header = () => {
  const { user, isAdmin } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Refs for tracking dropdown elements
  const dropdownRefs = {
    perfumes: useRef<HTMLDivElement>(null),
    brands: useRef<HTMLDivElement>(null)
  };

  useEffect(() => {
    const checkAdminStatus = async () => {
      const hasAdminRole = await isAdmin();
      setIsAdminUser(hasAdminRole);
    };
    
    if (user) {
      checkAdminStatus();
    }
  }, [user, isAdmin]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown && 
          dropdownRefs[activeDropdown as keyof typeof dropdownRefs]?.current && 
          !dropdownRefs[activeDropdown as keyof typeof dropdownRefs].current?.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]);

  // Naviqasiya funksiyaları
  const handleCategoryClick = (path: string) => {
    navigate(path);
    // Mobil menyu açıqdırsa bağlayırıq
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
    // Aktiv dropdown varsa bağlayırıq
    setActiveDropdown(null);
  };

  // Dropdown toggle
  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  // Axtarış funksiyası
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 relative z-50">
      {/* Announcement bar */}
      <div className="bg-accent py-2 px-4 text-center">
        <p className="text-xs tracking-widest">BÜTÜN SİFARİŞLƏR ÜÇÜN PULSUZ ÇATDIRILMA</p>
      </div>
      
      {/* Main header */}
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Mobile menu toggle */}
          <button 
            className="md:hidden text-black"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-lg md:text-xl uppercase tracking-widest font-light">
              by Mirbabayev
            </span>
          </Link>
          
          {/* Desktop navigation - Centered */}
          <nav className="hidden md:flex items-center justify-center space-x-12 flex-1 mx-8">
            {/* ƏTIRLƏR dropdown */}
            <div 
              className="relative" 
              ref={dropdownRefs.perfumes}
              onMouseEnter={() => setActiveDropdown('perfumes')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button 
                onClick={() => handleCategoryClick('/products')}
                className={`nav-link flex items-center text-sm ${activeDropdown === 'perfumes' ? 'text-black' : ''}`}
              >
                ƏTIRLƏR <ChevronDown className={`h-4 w-4 ml-1 transition-transform duration-300 ${activeDropdown === 'perfumes' ? 'rotate-180' : ''}`} />
              </button>
              
              {/* ƏTIRLƏR dropdown menu */}
              <div 
                className={`absolute left-0 w-[600px] grid grid-cols-4 gap-6 p-6 bg-white shadow-lg border border-gray-100 transition-all duration-300 ${
                  activeDropdown === 'perfumes' 
                  ? 'opacity-100 visible translate-y-0' 
                  : 'opacity-0 invisible -translate-y-2'
                }`}
              >
                {/* KLASSİK KOLLEKSİYA */}
                <div>
                  <button 
                    onClick={() => handleCategoryClick('/products/collection/klassik')}
                    className="font-medium text-sm uppercase tracking-wider mb-3 w-full text-left border-b pb-2 hover:text-gray-600 transition-colors"
                  >
                    KLASSİK KOLLEKSİYA
                  </button>
                  <ul className="space-y-2">
                    <li>
                      <button 
                        onClick={() => handleCategoryClick('/products/category/floral')}
                        className="text-xs tracking-wide w-full text-left hover:translate-x-1 hover:text-black transition-all"
                      >
                        ÇİÇƏKLİ
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => handleCategoryClick('/products/category/woody')}
                        className="text-xs tracking-wide w-full text-left hover:translate-x-1 hover:text-black transition-all"
                      >
                        ODUNSU
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => handleCategoryClick('/products/category/fresh')}
                        className="text-xs tracking-wide w-full text-left hover:translate-x-1 hover:text-black transition-all"
                      >
                        TƏRAVƏTLİ
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => handleCategoryClick('/products/category/oriental')}
                        className="text-xs tracking-wide w-full text-left hover:translate-x-1 hover:text-black transition-all"
                      >
                        ORIENTAL
                      </button>
                    </li>
                  </ul>
                </div>

                {/* FORMAT */}
                <div>
                  <button 
                    onClick={() => handleCategoryClick('/products/format')}
                    className="font-medium text-sm uppercase tracking-wider mb-3 w-full text-left border-b pb-2 hover:text-gray-600 transition-colors"
                  >
                    FORMAT
                  </button>
                  <ul className="space-y-2">
                    <li>
                      <button 
                        onClick={() => handleCategoryClick('/products/format/edp')}
                        className="text-xs tracking-wide w-full text-left hover:translate-x-1 hover:text-black transition-all"
                      >
                        EAU DE PARFUM
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => handleCategoryClick('/products/format/discovery')}
                        className="text-xs tracking-wide w-full text-left hover:translate-x-1 hover:text-black transition-all"
                      >
                        DISCOVERY
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => handleCategoryClick('/products/format/body-lotion')}
                        className="text-xs tracking-wide w-full text-left hover:translate-x-1 hover:text-black transition-all"
                      >
                        BODY LOTION
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => handleCategoryClick('/products/format/shower-gel')}
                        className="text-xs tracking-wide w-full text-left hover:translate-x-1 hover:text-black transition-all"
                      >
                        SHOWER GEL
                      </button>
                    </li>
                  </ul>
                </div>

                {/* CİNS */}
                <div>
                  <button 
                    onClick={() => handleCategoryClick('/products/gender')}
                    className="font-medium text-sm uppercase tracking-wider mb-3 w-full text-left border-b pb-2 hover:text-gray-600 transition-colors"
                  >
                    CİNS
                  </button>
                  <ul className="space-y-2">
                    <li>
                      <button 
                        onClick={() => handleCategoryClick('/products/gender/men')}
                        className="text-xs tracking-wide w-full text-left hover:translate-x-1 hover:text-black transition-all"
                      >
                        KİŞİ
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => handleCategoryClick('/products/gender/women')}
                        className="text-xs tracking-wide w-full text-left hover:translate-x-1 hover:text-black transition-all"
                      >
                        QADIN
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => handleCategoryClick('/products/gender/unisex')}
                        className="text-xs tracking-wide w-full text-left hover:translate-x-1 hover:text-black transition-all"
                      >
                        UNISEKS
                      </button>
                    </li>
                  </ul>
                </div>

                {/* BESTSELLERLƏR */}
                <div>
                  <button 
                    onClick={() => handleCategoryClick('/products/bestsellers')}
                    className="font-medium text-sm uppercase tracking-wider mb-3 w-full text-left border-b pb-2 hover:text-gray-600 transition-colors"
                  >
                    BESTSELLERLƏR
                  </button>
                  <ul className="space-y-2">
                    <li>
                      <button 
                        onClick={() => handleCategoryClick('/products/bestsellers')}
                        className="text-xs tracking-wide w-full text-left hover:translate-x-1 hover:text-black transition-all"
                      >
                        TOP MƏHSULLAR
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => handleCategoryClick('/products/new')}
                        className="text-xs tracking-wide w-full text-left hover:translate-x-1 hover:text-black transition-all"
                      >
                        YENİ GƏLƏNLƏR
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* BRENDLƏR dropdown */}
            <div 
              className="relative" 
              ref={dropdownRefs.brands}
              onMouseEnter={() => setActiveDropdown('brands')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button 
                onClick={() => handleCategoryClick('/brands')}
                className={`nav-link flex items-center text-sm ${activeDropdown === 'brands' ? 'text-black' : ''}`}
              >
                BRENDLƏR <ChevronDown className={`h-4 w-4 ml-1 transition-transform duration-300 ${activeDropdown === 'brands' ? 'rotate-180' : ''}`} />
              </button>
              
              {/* BRENDLƏR dropdown menu */}
              <div 
                className={`absolute left-0 w-[400px] p-6 bg-white shadow-lg border border-gray-100 transition-all duration-300 ${
                  activeDropdown === 'brands' 
                  ? 'opacity-100 visible translate-y-0' 
                  : 'opacity-0 invisible -translate-y-2'
                }`}
              >
                <div className="grid grid-cols-3 gap-x-4 gap-y-2">
                  <button 
                    onClick={() => handleCategoryClick('/brands/chanel')}
                    className="text-xs tracking-wide hover:translate-x-1 hover:text-black transition-all text-left"
                  >
                    CHANEL
                  </button>
                  <button 
                    onClick={() => handleCategoryClick('/brands/dior')}
                    className="text-xs tracking-wide hover:translate-x-1 hover:text-black transition-all text-left"
                  >
                    DIOR
                  </button>
                  <button 
                    onClick={() => handleCategoryClick('/brands/guerlain')}
                    className="text-xs tracking-wide hover:translate-x-1 hover:text-black transition-all text-left"
                  >
                    GUERLAIN
                  </button>
                  <button 
                    onClick={() => handleCategoryClick('/brands/creed')}
                    className="text-xs tracking-wide hover:translate-x-1 hover:text-black transition-all text-left"
                  >
                    CREED
                  </button>
                  <button 
                    onClick={() => handleCategoryClick('/brands/tomford')}
                    className="text-xs tracking-wide hover:translate-x-1 hover:text-black transition-all text-left"
                  >
                    TOM FORD
                  </button>
                  <button 
                    onClick={() => handleCategoryClick('/brands/hermes')}
                    className="text-xs tracking-wide hover:translate-x-1 hover:text-black transition-all text-left"
                  >
                    HERMÈS
                  </button>
                  <button 
                    onClick={() => handleCategoryClick('/brands/lelabo')}
                    className="text-xs tracking-wide hover:translate-x-1 hover:text-black transition-all text-left"
                  >
                    LE LABO
                  </button>
                  <button 
                    onClick={() => handleCategoryClick('/brands/byredo')}
                    className="text-xs tracking-wide hover:translate-x-1 hover:text-black transition-all text-left"
                  >
                    BYREDO
                  </button>
                  <button 
                    onClick={() => handleCategoryClick('/brands/kilians')}
                    className="text-xs tracking-wide hover:translate-x-1 hover:text-black transition-all text-left"
                  >
                    KILIAN'S
                  </button>
                </div>
              </div>
            </div>
          </nav>
          
          {/* User actions */}
          <div className="flex items-center space-x-6">
            <button 
              className="text-black hover:opacity-50 transition-opacity duration-300"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Axtarış"
            >
              <Search className="h-5 w-5" />
            </button>
            
            <button 
              onClick={() => handleCategoryClick('/wishlist')}
              className="text-black hover:opacity-50 transition-opacity duration-300 relative"
            >
              <Heart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-black text-white text-[10px] flex items-center justify-center rounded-full">0</span>
            </button>
            
            <button 
              onClick={() => handleCategoryClick('/cart')}
              className="text-black hover:opacity-50 transition-opacity duration-300 relative"
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-black text-white text-[10px] flex items-center justify-center rounded-full">0</span>
            </button>
            
            {user ? (
              <button 
                onClick={() => handleCategoryClick('/profile')}
                className="text-black hover:opacity-50 transition-opacity duration-300"
              >
                <User className="h-5 w-5" />
              </button>
            ) : (
              <button 
                onClick={() => handleCategoryClick('/auth/login')}
                className="text-black hover:opacity-50 transition-opacity duration-300"
              >
                <User className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Search bar */}
      {isSearchOpen && (
        <div className="border-t border-gray-200 py-4 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-lg mx-auto">
              <form onSubmit={handleSearch} className="relative">
                <input 
                  type="text" 
                  placeholder="Axtarış..."
                  className="lelabo-input w-full py-3"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <button 
                  type="submit"
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-black hover:opacity-50 transition-opacity"
                >
                  <Search className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="container mx-auto">
            <nav className="py-4">
              <ul className="space-y-0">
                <li className="border-b border-gray-200">
                  <button 
                    onClick={() => toggleDropdown('mobile-perfumes')}
                    className="flex justify-between items-center w-full px-4 py-3 text-black uppercase tracking-widest text-xs"
                  >
                    ƏTIRLƏR
                    <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${activeDropdown === 'mobile-perfumes' ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {activeDropdown === 'mobile-perfumes' && (
                    <div className="px-6 py-2 space-y-3 bg-gray-50">
                      <div>
                        <button 
                          onClick={() => handleCategoryClick('/products/collection/klassik')}
                          className="text-xs font-medium uppercase tracking-wide mb-1 w-full text-left"
                        >
                          KLASSİK KOLLEKSİYA
                        </button>
                        <ul className="space-y-1 pl-2">
                          <li>
                            <button 
                              onClick={() => handleCategoryClick('/products/category/floral')}
                              className="text-xs w-full text-left text-gray-700"
                            >
                              ÇİÇƏKLİ
                            </button>
                          </li>
                          <li>
                            <button 
                              onClick={() => handleCategoryClick('/products/category/woody')}
                              className="text-xs w-full text-left text-gray-700"
                            >
                              ODUNSU
                            </button>
                          </li>
                          <li>
                            <button 
                              onClick={() => handleCategoryClick('/products/category/fresh')}
                              className="text-xs w-full text-left text-gray-700"
                            >
                              TƏRAVƏTLİ
                            </button>
                          </li>
                          <li>
                            <button 
                              onClick={() => handleCategoryClick('/products/category/oriental')}
                              className="text-xs w-full text-left text-gray-700"
                            >
                              ORIENTAL
                            </button>
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <button 
                          onClick={() => handleCategoryClick('/products/format')}
                          className="text-xs font-medium uppercase tracking-wide mb-1 w-full text-left"
                        >
                          FORMAT
                        </button>
                        <ul className="space-y-1 pl-2">
                          <li>
                            <button 
                              onClick={() => handleCategoryClick('/products/format/edp')}
                              className="text-xs w-full text-left text-gray-700"
                            >
                              EAU DE PARFUM
                            </button>
                          </li>
                          <li>
                            <button 
                              onClick={() => handleCategoryClick('/products/format/discovery')}
                              className="text-xs w-full text-left text-gray-700"
                            >
                              DISCOVERY
                            </button>
                          </li>
                          <li>
                            <button 
                              onClick={() => handleCategoryClick('/products/format/body-lotion')}
                              className="text-xs w-full text-left text-gray-700"
                            >
                              BODY LOTION
                            </button>
                          </li>
                          <li>
                            <button 
                              onClick={() => handleCategoryClick('/products/format/shower-gel')}
                              className="text-xs w-full text-left text-gray-700"
                            >
                              SHOWER GEL
                            </button>
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <button 
                          onClick={() => handleCategoryClick('/products/gender')}
                          className="text-xs font-medium uppercase tracking-wide mb-1 w-full text-left"
                        >
                          CİNS
                        </button>
                        <ul className="space-y-1 pl-2">
                          <li>
                            <button 
                              onClick={() => handleCategoryClick('/products/gender/men')}
                              className="text-xs w-full text-left text-gray-700"
                            >
                              KİŞİ
                            </button>
                          </li>
                          <li>
                            <button 
                              onClick={() => handleCategoryClick('/products/gender/women')}
                              className="text-xs w-full text-left text-gray-700"
                            >
                              QADIN
                            </button>
                          </li>
                          <li>
                            <button 
                              onClick={() => handleCategoryClick('/products/gender/unisex')}
                              className="text-xs w-full text-left text-gray-700"
                            >
                              UNISEKS
                            </button>
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <button 
                          onClick={() => handleCategoryClick('/products/bestsellers')}
                          className="text-xs font-medium uppercase tracking-wide mb-1 w-full text-left"
                        >
                          BESTSELLERLƏR
                        </button>
                        <ul className="space-y-1 pl-2">
                          <li>
                            <button 
                              onClick={() => handleCategoryClick('/products/bestsellers')}
                              className="text-xs w-full text-left text-gray-700"
                            >
                              TOP MƏHSULLAR
                            </button>
                          </li>
                          <li>
                            <button 
                              onClick={() => handleCategoryClick('/products/new')}
                              className="text-xs w-full text-left text-gray-700"
                            >
                              YENİ GƏLƏNLƏR
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </li>
                
                <li className="border-b border-gray-200">
                  <button 
                    onClick={() => toggleDropdown('mobile-brands')}
                    className="flex justify-between items-center w-full px-4 py-3 text-black uppercase tracking-widest text-xs"
                  >
                    BRENDLƏR
                    <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${activeDropdown === 'mobile-brands' ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {activeDropdown === 'mobile-brands' && (
                    <div className="px-6 py-2 space-y-1 bg-gray-50">
                      <button 
                        onClick={() => handleCategoryClick('/brands/chanel')}
                        className="text-xs w-full text-left text-gray-700 py-1"
                      >
                        CHANEL
                      </button>
                      <button 
                        onClick={() => handleCategoryClick('/brands/dior')}
                        className="text-xs w-full text-left text-gray-700 py-1"
                      >
                        DIOR
                      </button>
                      <button 
                        onClick={() => handleCategoryClick('/brands/guerlain')}
                        className="text-xs w-full text-left text-gray-700 py-1"
                      >
                        GUERLAIN
                      </button>
                      <button 
                        onClick={() => handleCategoryClick('/brands/creed')}
                        className="text-xs w-full text-left text-gray-700 py-1"
                      >
                        CREED
                      </button>
                      <button 
                        onClick={() => handleCategoryClick('/brands/tomford')}
                        className="text-xs w-full text-left text-gray-700 py-1"
                      >
                        TOM FORD
                      </button>
                      <button 
                        onClick={() => handleCategoryClick('/brands/hermes')}
                        className="text-xs w-full text-left text-gray-700 py-1"
                      >
                        HERMÈS
                      </button>
                      <button 
                        onClick={() => handleCategoryClick('/brands/lelabo')}
                        className="text-xs w-full text-left text-gray-700 py-1"
                      >
                        LE LABO
                      </button>
                      <button 
                        onClick={() => handleCategoryClick('/brands/byredo')}
                        className="text-xs w-full text-left text-gray-700 py-1"
                      >
                        BYREDO
                      </button>
                      <button 
                        onClick={() => handleCategoryClick('/brands/kilians')}
                        className="text-xs w-full text-left text-gray-700 py-1"
                      >
                        KILIAN'S
                      </button>
                    </div>
                  )}
                </li>
                
                {isAdminUser && (
                  <li className="border-b border-gray-200">
                    <button 
                      onClick={() => handleCategoryClick('/admin')}
                      className="block w-full text-left px-4 py-3 text-black uppercase tracking-widest text-xs hover:opacity-50 transition-opacity"
                    >
                      ADMIN PANEL
                    </button>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}; 