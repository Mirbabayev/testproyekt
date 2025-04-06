import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../lib/auth-context';
import { useCart } from '../../lib/cart-context';
import { useWishlist } from '../../lib/wishlist-context';
import { useCompare } from '../../lib/compare-context';
import { useTranslation } from 'react-i18next';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  Menu,
  X,
  Droplet,
  LogOut,
  Settings,
  Package,
  SlidersHorizontal
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export const Header = () => {
  const { user, isAdmin, signOut } = useAuth();
  const { itemCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();
  const { itemCount: compareCount } = useCompare();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkAdminStatus = async () => {
      const hasAdminRole = await isAdmin();
      setIsAdminUser(hasAdminRole);
    };
    
    if (user) {
      checkAdminStatus();
    }
  }, [user, isAdmin]);
  
  // Dropdown menu üçün xaric kliklərə reaksiya
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Naviqasiya funksiyaları
  const handleCategoryClick = (path: string) => {
    navigate(path);
    // Mobil menyu açıqdırsa bağlayırıq
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
    // User menyu açıqdırsa bağlayırıq
    if (isUserMenuOpen) {
      setIsUserMenuOpen(false);
    }
  };
  
  // Hesabdan çıxış
  const handleSignOut = async () => {
    try {
      await signOut();
      setIsUserMenuOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Çıxış zamanı xəta:', error);
    }
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
      {/* Main header */}
      <div className="container mx-auto px-6 py-3">
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
          <Link to="/" className="flex items-center mx-auto md:mx-0">
            <span className="text-lg md:text-xl uppercase tracking-widest font-light">
              by Mirbabayev
            </span>
          </Link>
          
          {/* Desktop Navigation (yeni əlavə edildi) */}
          <div className="hidden md:flex items-center space-x-6 absolute left-1/2 transform -translate-x-1/2">
            <Link to="/" className="nav-link">Ana Səhifə</Link>
            <Link to="/products" className="nav-link">Məhsullar</Link>
            <Link to="/perfume-advisor" className="nav-link flex items-center">
              <Droplet className="h-4 w-4 mr-1" />
              Ətir Tövsiyəçisi
            </Link>
          </div>
          
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
              onClick={() => handleCategoryClick('/compare')}
              className="text-black hover:opacity-50 transition-opacity duration-300 relative"
            >
              <SlidersHorizontal className="h-5 w-5" />
              <span className={`absolute -top-2 -right-2 w-4 h-4 bg-black text-white text-[10px] flex items-center justify-center rounded-full transition-all duration-300 ${compareCount > 0 ? 'scale-100' : 'scale-0'}`}>
                {compareCount > 99 ? '99+' : compareCount}
              </span>
            </button>
            
            <button 
              onClick={() => handleCategoryClick('/wishlist')}
              className="text-black hover:opacity-50 transition-opacity duration-300 relative"
            >
              <Heart className="h-5 w-5" />
              <span className={`absolute -top-2 -right-2 w-4 h-4 bg-black text-white text-[10px] flex items-center justify-center rounded-full transition-all duration-300 ${wishlistCount > 0 ? 'scale-100' : 'scale-0'}`}>
                {wishlistCount > 99 ? '99+' : wishlistCount}
              </span>
            </button>
            
            <button 
              onClick={() => handleCategoryClick('/cart')}
              className="text-black hover:opacity-50 transition-opacity duration-300 relative"
            >
              <ShoppingBag className="h-5 w-5" />
              <span className={`absolute -top-2 -right-2 w-4 h-4 bg-black text-white text-[10px] flex items-center justify-center rounded-full transition-all duration-300 ${itemCount > 0 ? 'scale-100' : 'scale-0'}`}>
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            </button>
            
            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="text-black hover:opacity-50 transition-opacity duration-300 relative"
                  aria-label="İstifadəçi menyusu"
                  aria-expanded={isUserMenuOpen}
                >
                  <User className="h-5 w-5" />
                </button>
                
                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-md border border-gray-200 py-1 z-50 transition-opacity duration-200">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-xs text-gray-500">Giriş:</p>
                      <p className="text-sm font-medium truncate">{user.email}</p>
                    </div>
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center transition-colors duration-200"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <User className="h-4 w-4 mr-2 opacity-70" />
                      Profilim
                    </Link>
                    <Link 
                      to="/orders" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center transition-colors duration-200"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Package className="h-4 w-4 mr-2 opacity-70" />
                      Sifarişlərim
                    </Link>
                    {isAdminUser && (
                      <Link 
                        to="/admin" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center transition-colors duration-200"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings className="h-4 w-4 mr-2 opacity-70" />
                        Admin Panel
                      </Link>
                    )}
                    <div className="border-t border-gray-100 mt-1">
                      <button 
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center transition-colors duration-200"
                      >
                        <LogOut className="h-4 w-4 mr-2 opacity-70" />
                        Çıxış
                      </button>
                    </div>
                  </div>
                )}
              </div>
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
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg fixed top-[98px] left-0 right-0 h-[calc(100vh-98px)] z-50 overflow-y-auto">
          <div className="container mx-auto">
            <nav className="py-4">
              <ul className="space-y-0">
                <li className="border-b border-gray-200">
                  <Link 
                    to="/"
                    className="block w-full text-left px-4 py-3 text-black uppercase tracking-widest text-xs hover:opacity-50 transition-opacity" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Ana Səhifə
                  </Link>
                </li>
                
                <li className="border-b border-gray-200">
                  <Link 
                    to="/products"
                    className="block w-full text-left px-4 py-3 text-black uppercase tracking-widest text-xs hover:opacity-50 transition-opacity" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Məhsullar
                  </Link>
                </li>
                
                <li className="border-b border-gray-200">
                  <Link 
                    to="/perfume-advisor"
                    className="block w-full text-left px-4 py-3 text-black uppercase tracking-widest text-xs hover:opacity-50 transition-opacity flex items-center" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Droplet className="h-4 w-4 mr-1" />
                    Ətir Tövsiyəçisi
                  </Link>
                </li>
                
                <li className="border-b border-gray-200">
                  <Link 
                    to="/compare"
                    className="block w-full text-left px-4 py-3 text-black uppercase tracking-widest text-xs hover:opacity-50 transition-opacity flex items-center" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <SlidersHorizontal className="h-4 w-4 mr-1" />
                    Müqayisə {compareCount > 0 && <span className="ml-1 text-xs rounded-full bg-black text-white h-4 w-4 inline-flex items-center justify-center">{compareCount}</span>}
                  </Link>
                </li>
                
                <li className="border-b border-gray-200">
                  <Link 
                    to="/wishlist"
                    className="block w-full text-left px-4 py-3 text-black uppercase tracking-widest text-xs hover:opacity-50 transition-opacity flex items-center" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Heart className="h-4 w-4 mr-1" />
                    Seçilmişlər {wishlistCount > 0 && <span className="ml-1 text-xs rounded-full bg-black text-white h-4 w-4 inline-flex items-center justify-center">{wishlistCount}</span>}
                  </Link>
                </li>
                
                <li className="border-b border-gray-200">
                  <Link 
                    to="/cart"
                    className="block w-full text-left px-4 py-3 text-black uppercase tracking-widest text-xs hover:opacity-50 transition-opacity flex items-center" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <ShoppingBag className="h-4 w-4 mr-1" />
                    Səbət {itemCount > 0 && <span className="ml-1 text-xs rounded-full bg-black text-white h-4 w-4 inline-flex items-center justify-center">{itemCount}</span>}
                  </Link>
                </li>
                
                {user && (
                  <>
                    <li className="border-b border-gray-200">
                      <Link 
                        to="/profile"
                        className="block w-full text-left px-4 py-3 text-black uppercase tracking-widest text-xs hover:opacity-50 transition-opacity flex items-center" 
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <User className="h-4 w-4 mr-1" />
                        Profilim
                      </Link>
                    </li>
                    
                    <li className="border-b border-gray-200">
                      <Link 
                        to="/orders"
                        className="block w-full text-left px-4 py-3 text-black uppercase tracking-widest text-xs hover:opacity-50 transition-opacity flex items-center" 
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Package className="h-4 w-4 mr-1" />
                        Sifarişlərim
                      </Link>
                    </li>
                  </>
                )}
                
                {isAdminUser && (
                  <li className="border-b border-gray-200">
                    <Link
                      to="/admin"
                      className="block w-full text-left px-4 py-3 text-black uppercase tracking-widest text-xs hover:opacity-50 transition-opacity flex items-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Settings className="h-4 w-4 mr-1" />
                      ADMIN PANEL
                    </Link>
                  </li>
                )}
                
                {user ? (
                  <li className="border-b border-gray-200">
                    <button 
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-3 text-red-600 uppercase tracking-widest text-xs hover:opacity-50 transition-opacity flex items-center"
                    >
                      <LogOut className="h-4 w-4 mr-1" />
                      Çıxış
                    </button>
                  </li>
                ) : (
                  <li className="border-b border-gray-200">
                    <Link 
                      to="/auth/login"
                      className="block w-full text-left px-4 py-3 text-primary uppercase tracking-widest text-xs hover:opacity-50 transition-opacity flex items-center" 
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="h-4 w-4 mr-1" />
                      Giriş
                    </Link>
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