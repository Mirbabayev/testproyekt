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
import { useCart } from '../../lib/cart-context';
import { useWishlist } from '../../lib/wishlist-context';
import { LanguageSelector } from '../language-selector';

export const Header = () => {
  const { user, isAdmin } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const { totalItems } = useCart();
  const { items } = useWishlist();

  useEffect(() => {
    const checkAdminStatus = async () => {
      const hasAdminRole = await isAdmin();
      setIsAdminUser(hasAdminRole);
    };
    
    if (user) {
      checkAdminStatus();
    } else {
      setIsAdminUser(false);
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

  return (
    <header className="bg-white border-b border-gray-200 relative z-50">      
      {/* Main header */}
      <div className="container mx-auto px-6 py-2">
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
          <button 
            onClick={() => handleCategoryClick('/products')}
            className="text-2xl font-light tracking-[0.2em] text-black hover:opacity-75 transition-opacity duration-300"
          >
            EASY PARFUM
          </button>
          
          {/* User actions */}
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => handleCategoryClick('/wishlist')}
              className="text-black hover:opacity-50 transition-opacity duration-300 relative"
            >
              <Heart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-black text-white text-[10px] flex items-center justify-center rounded-full">
                {items.length}
              </span>
            </button>
            
            <button 
              onClick={() => handleCategoryClick('/cart')}
              className="text-black hover:opacity-50 transition-opacity duration-300 relative"
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-black text-white text-[10px] flex items-center justify-center rounded-full">
                {totalItems}
              </span>
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
            
            <div className="text-black">
              <LanguageSelector />
            </div>
          </div>
        </div>
      </div>
      
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
                <li className="border-b border-gray-200 py-2 px-4">
                  <div className="flex items-center justify-between">
                    <span className="uppercase tracking-widest text-xs">Dil</span>
                    <LanguageSelector />
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};