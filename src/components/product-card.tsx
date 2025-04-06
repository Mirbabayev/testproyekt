import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye, SlidersHorizontal } from 'lucide-react';
import { Product } from '../data/products';
import { cn } from '../lib/utils';
import { useState, useRef, useEffect } from 'react';
import { useCart } from '../lib/cart-context';
import { useWishlist } from '../lib/wishlist-context';
import { useCompare } from '../lib/compare-context';

interface ProductCardProps {
  product: Product;
  size?: 'small' | 'medium' | 'large';
}

export const ProductCard = ({ product, size = 'medium' }: ProductCardProps) => {
  const { id, name, brand, price, image } = product;
  const [isHovering, setIsHovering] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { isInCompare, addToCompare, removeFromCompare } = useCompare();
  
  const isFavorite = isInWishlist(id);
  const isCompared = isInCompare(id);

  // Daha canlı və staggered animasiya
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Yüklənmədən sonra kiçik bir pulse animasiyası əlavə edirik
      setTimeout(() => {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 400);
      }, 300);
    }, 100 + (parseInt(id) % 10) * 70); // Stagger müddətini artırdıq
    return () => clearTimeout(timer);
  }, [id]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate percentage position
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Daha parlaq 3D effekti üçün dəyərlər artırıldı
    const percentX = (x - centerX) / centerX * 5; // 3%-dən 5%-ə artırıldı
    const percentY = (y - centerY) / centerY * 4; // 2.5%-dən 4%-ə artırıldı
    
    setPosition({ x: percentX, y: percentY });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
    // Üzərinə gələndə kiçik bir "pulse" effekti əlavə edirik
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    // Reset position with smooth animation
    setPosition({ x: 0, y: 0 });
  };
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavorite) {
      removeFromWishlist(id);
    } else {
      addToWishlist(product);
    }
    
    // Animasiya əlavə edildi
    const heartBtn = e.currentTarget;
    heartBtn.classList.add('scale-125');
    setTimeout(() => heartBtn.classList.remove('scale-125'), 300);
  };
  
  const toggleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isCompared) {
      removeFromCompare(id);
    } else {
      addToCompare(product);
    }
    
    // Animasiya əlavə edildi
    const compareBtn = e.currentTarget;
    compareBtn.classList.add('scale-125');
    setTimeout(() => compareBtn.classList.remove('scale-125'), 300);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Səbətə əlavə etmək
    addToCart(product);
    
    // Klikləndikdə animasiya əlavə edirik
    const button = e.currentTarget;
    button.classList.add('scale-90');
    setTimeout(() => {
      button.classList.remove('scale-90');
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 400);
    }, 200);
  };

  // Ölçüdən asılı olaraq sinifləri təyin edirik
  const sizeClasses = {
    small: {
      card: 'h-full',
      image: 'h-48',
      title: 'text-sm',
      brand: 'text-xs',
      price: 'text-sm',
      button: 'text-xs py-1.5 px-2',
    },
    medium: {
      card: 'h-full',
      image: 'h-56',
      title: 'text-base',
      brand: 'text-sm',
      price: 'text-base',
      button: 'text-xs py-2 px-3',
    },
    large: {
      card: 'h-full',
      image: 'h-64',
      title: 'text-lg',
      brand: 'text-base',
      price: 'text-lg',
      button: 'text-xs py-2 px-4',
    }
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`bg-white border border-gray-100 rounded-lg overflow-hidden parfumbar-card transition-all duration-300 ${sizeClasses[size].card} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${isAnimating ? 'scale-[1.02]' : ''}`}
      style={{
        transform: isHovering 
          ? `perspective(1000px) rotateX(${position.y}deg) rotateY(${position.x}deg) scale(1.03)`
          : `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`,
        boxShadow: isHovering 
          ? `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 15px rgba(0, 0, 0, 0.1)` 
          : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        transition: 'all 0.4s cubic-bezier(0.17, 0.67, 0.83, 0.67)'
      }}
    >
      <div className="relative group">
        {/* Action buttons */}
        <div className="absolute top-2 right-2 z-10 flex flex-col gap-2">
          {/* Favorite button */}
          <button 
            onClick={toggleFavorite}
            className="bg-white/80 hover:bg-white rounded-full p-1.5 transition-all duration-300 shadow-sm hover:scale-110"
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'} transition-colors`} />
          </button>
          
          {/* Compare button */}
          <button 
            onClick={toggleCompare}
            className="bg-white/80 hover:bg-white rounded-full p-1.5 transition-all duration-300 shadow-sm hover:scale-110"
          >
            <SlidersHorizontal className={`h-4 w-4 ${isCompared ? 'fill-primary text-primary' : 'text-gray-400'} transition-colors`} />
          </button>
        </div>
        
        {/* Product image */}
        <Link to={`/products/${id}`}>
          <div className="overflow-hidden">
            <img 
              src={image || '/images/placeholder.jpg'} 
              alt={name}
              className={`w-full ${sizeClasses[size].image} object-contain transition-all duration-700 group-hover:scale-110`}
              style={{
                filter: isHovering ? 'brightness(1.05)' : 'brightness(1)',
              }}
            />
          </div>
        </Link>
        
        {/* Quick action overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex gap-3 -translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <button 
              onClick={handleAddToCart}
              className="bg-white rounded-full p-2.5 hover:bg-primary hover:text-white transition-colors shadow-md hover:scale-110 active:scale-95"
            >
              <ShoppingBag size={18} />
            </button>
            <Link to={`/products/${id}`} className="bg-white rounded-full p-2.5 hover:bg-primary hover:text-white transition-colors shadow-md hover:scale-110 active:scale-95">
              <Eye size={18} />
            </Link>
            <button 
              onClick={toggleCompare}
              className="bg-white rounded-full p-2.5 hover:bg-primary hover:text-white transition-colors shadow-md hover:scale-110 active:scale-95"
            >
              <SlidersHorizontal size={18} className={isCompared ? 'text-primary' : ''} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Product info */}
      <div className="p-4">
        <div className="text-center mb-3">
          <h4 className={`uppercase tracking-wider font-medium ${sizeClasses[size].brand} text-gray-600 group-hover:text-primary transition-colors`}>
            {brand}
          </h4>
          <h3 className={`font-medium ${sizeClasses[size].title} mt-1 hover:text-primary transition-colors`}>
            <Link to={`/products/${id}`}>{name}</Link>
          </h3>
          <p className={`font-bold mt-2 ${sizeClasses[size].price} group-hover:scale-105 transition-transform`}>
            {price} ₼
          </p>
        </div>
        
        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          <button 
            onClick={handleAddToCart}
            className={`parfumbar-btn ${sizeClasses[size].button} flex items-center justify-center overflow-hidden whitespace-nowrap`}
          >
            <ShoppingBag size={size === 'small' ? 12 : 14} className="mr-1.5 flex-shrink-0 transition-transform group-hover:scale-110" /> 
            <span className="truncate">Səbətə at</span>
          </button>
          <Link 
            to={`/products/${id}`} 
            className={`parfumbar-btn-outline ${sizeClasses[size].button} flex items-center justify-center overflow-hidden whitespace-nowrap`}
          >
            <Eye size={size === 'small' ? 12 : 14} className="mr-1.5 flex-shrink-0 transition-transform group-hover:scale-110" />
            <span className="truncate">Ətraflı bax</span>
          </Link>
        </div>
      </div>
    </div>
  );
}; 