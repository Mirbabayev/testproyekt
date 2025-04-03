import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../data/products';
import { cn } from '../lib/utils';
import { useState, useRef, useEffect } from 'react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Daha canlı və staggered animasiya
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Yüklənmədən sonra kiçik bir pulse animasiyası əlavə edirik
      setTimeout(() => {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 400);
      }, 300);
    }, 100 + (parseInt(product.id) % 10) * 70); // Stagger müddətini artırdıq
    return () => clearTimeout(timer);
  }, [product.id]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate percentage position
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Daha parlaq 3D effekti üçün dəyərlər artırıldı
    const percentX = (x - centerX) / centerX * 3; // 2%-dən 3%-ə artırıldı
    const percentY = (y - centerY) / centerY * 2.5; // 1.5%-dən 2.5%-ə artırıldı
    
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
  
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/products/${product.id}`);
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    // Favoritə əlavə edəndə animasiya
    const btn = e.currentTarget;
    btn.classList.add('scale-110');
    setTimeout(() => {
      btn.classList.remove('scale-110');
    }, 200);
  };

  const addToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Add to cart functionality with more energetic visual feedback
    const btn = e.currentTarget;
    btn.classList.add('scale-95', 'bg-opacity-80');
    setTimeout(() => {
      btn.classList.remove('scale-95', 'bg-opacity-80');
      btn.classList.add('scale-105');
      setTimeout(() => {
        btn.classList.remove('scale-105');
      }, 100);
    }, 150);
  };

  return (
    <div 
      ref={cardRef}
      className={cn(
        "group relative bg-white border border-gray-100 transition-all duration-500 cursor-pointer hover:shadow-md rounded-xl overflow-hidden",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        isAnimating ? "animate-pulse" : ""
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      style={{ 
        transform: isHovering ? `scale(1.03) translateY(-4px)` : 'scale(1) translateY(0)',
        transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.6s ease, translate 0.4s ease, box-shadow 0.3s ease',
        boxShadow: isHovering ? '0 10px 25px -5px rgba(0, 0, 0, 0.1)' : 'none',
        borderColor: isHovering ? 'rgba(0, 0, 0, 0.2)' : ''
      }}
    >
      {/* Favorite button - daha canlı animasiya ilə */}
      <button 
        className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
        aria-label="Seçilmişlərə əlavə et"
        onClick={toggleFavorite}
      >
        <Heart className={cn("h-5 w-5 transition-all duration-300", 
          isFavorite ? "text-red-500 fill-red-500" : "text-gray-500 hover:text-red-500"
        )} />
      </button>

      {/* Image container with enhanced 3D effect and rounded corners */}
      <div className="aspect-square overflow-hidden p-6 bg-white flex items-center justify-center rounded-t-xl">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain object-center transition-all duration-500 ease-out filter drop-shadow-sm group-hover:drop-shadow-md"
          style={{ 
            transform: isHovering ? `scale(1.05) translate(${position.x * 1.2}px, ${position.y * 1.2}px)` : 'scale(1) translate(0, 0)',
            transition: 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://dummyimage.com/200x200/f0f0f0/333333.png&text=Şəkil+yoxdur";
            target.onerror = null;
          }}
        />
      </div>

      {/* Overlay with buttons - daha canlı animasiyalar */}
      <div 
        className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-4 rounded-xl"
        style={{ 
          backdropFilter: 'blur(1.5px)'
        }}
      >
        <button 
          className="lelabo-btn-black flex items-center gap-2 transform translate-y-6 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 hover:scale-105"
          onClick={addToCart}
          style={{ transitionDelay: '0.05s' }}
        >
          <ShoppingBag className="h-4 w-4 animate-pulse" />
          SƏBƏTƏ ƏLAVƏ ET
        </button>
        <button 
          className="lelabo-btn flex items-center gap-2 transform translate-y-6 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 hover:scale-105"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            navigate(`/products/${product.id}`);
          }}
          style={{ transitionDelay: '0.1s' }}
        >
          <Eye className="h-4 w-4 animate-pulse" />
          ƏTRAFI BAX
        </button>
      </div>

      {/* Product info with subtle animations */}
      <div 
        className="p-4 text-center bg-white relative"
        style={{ 
          transform: isHovering ? `translateY(${position.y * 0.5}px)` : '',
          transition: 'transform 0.4s ease'
        }}
      >
        {/* Brand name */}
        <p className="text-xs uppercase tracking-widest mb-1 text-gray-600 group-hover:text-gray-800 transition-colors duration-400">
          {product.brand}
        </p>
        
        {/* Daha parlaq dekorativ xətt */}
        <div className="h-[1px] w-0 bg-black/10 mx-auto mb-2 group-hover:w-1/2 transition-all duration-500 ease-out"></div>
        
        {/* Product name with letter spacing animation */}
        <h3 className="text-sm uppercase tracking-widest mb-3 font-normal group-hover:tracking-[0.2em] transition-all duration-400 group-hover:text-black">
          {product.name}
        </h3>

        {/* Price with more vivid highlight */}
        <p className="lelabo-price inline-block relative">
          <span className="group-hover:font-medium transition-all duration-300 group-hover:text-black text-base">
            {product.price} ₼
          </span>
        </p>
      </div>

      {/* Concentration and size info */}
      <div className="py-2 px-4 text-center overflow-hidden rounded-b-xl">
        <p className="text-xs text-gray-500 transform group-hover:text-gray-700 transition-all duration-400">
          {product.concentration} • {product.size}
        </p>
      </div>

      {/* Yeni - dekorativ künclər */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-transparent group-hover:border-black/10 transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-transparent group-hover:border-black/10 transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-transparent group-hover:border-black/10 transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-transparent group-hover:border-black/10 transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
    </div>
  );
} 