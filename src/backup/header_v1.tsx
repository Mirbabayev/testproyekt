import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../lib/auth-context';
import { useTranslation } from 'react-i18next';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  Menu,
  X
} from 'lucide-react';
import { useState, useEffect } from 'react';

export const Header = () => {
  const { user, isAdmin } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const checkAdminStatus = async () => {
      const hasAdminRole = await isAdmin();
      setIsAdminUser(hasAdminRole);
    };
    
    if (user) {
      checkAdminStatus();
    }
  }, [user, isAdmin]);

  // Naviqasiya funksiyaları
  const handleCategoryClick = (path: string) => {
    navigate(path);
    // Mobil menyu açıqdırsa bağlayırıq
    if (isMenuOpen) {
      setIsMenuOpen(false);
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
          <Link to="/" className="flex items-center mx-auto md:mx-0">
            <span className="text-lg md:text-xl uppercase tracking-widest font-light">
              by Mirbabayev
            </span>
          </Link>
          
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