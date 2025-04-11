import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Info } from 'lucide-react';
import { Product } from '../data/products';
import { cn } from '../lib/utils';
import { useState } from 'react';
import { useCart } from '../lib/cart-context';
import { useWishlist } from '../lib/wishlist-context';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [isHovering, setIsHovering] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      navigate(`/products/${product.id}`);
    } catch (error) {
      console.error("Yönləndirmə xətası:", error);
    }
  };

  return (
    <motion.div
      className="group cursor-pointer relative"
      onClick={handleClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setShowTooltip(false);
      }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      {/* Badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
        {product.isNew && (
          <span className="bg-black text-white text-[10px] px-2 py-1 uppercase tracking-wider">
            Yeni
          </span>
        )}
        {product.isBestSeller && (
          <span className="bg-primary text-white text-[10px] px-2 py-1 uppercase tracking-wider">
            Bestseller
          </span>
        )}
      </div>

      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-50 aspect-[3/4] mb-2">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://dummyimage.com/400x600/f0f0f0/333333.png&text=Şəkil+yoxdur";
            target.onerror = null;
          }}
        />
        
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100"
        >
          <div className="flex flex-col gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="bg-white/90 backdrop-blur-sm text-black text-xs px-4 py-2 uppercase tracking-wider hover:bg-black hover:text-white transition-colors duration-300"
            >
              <ShoppingBag className="w-3.5 h-3.5 inline-block mr-2" />
              Səbətə əlavə et
            </motion.button>
          </div>
        </motion.div>

        {/* Wishlist Button */}
        <motion.button
          className="absolute top-2 right-2 z-10 bg-white/80 backdrop-blur-sm p-1.5 rounded-full"
          onClick={toggleFavorite}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart 
            className={cn(
              "w-3.5 h-3.5 transition-colors duration-300",
              isInWishlist(product.id) ? "text-red-500 fill-red-500" : "text-gray-700"
            )} 
          />
        </motion.button>

        {/* Info Button & Tooltip */}
        <motion.button
          className="absolute bottom-2 right-2 z-10 bg-white/80 backdrop-blur-sm p-1.5 rounded-full"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowTooltip(!showTooltip);
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Info className="w-3.5 h-3.5 text-gray-700" />
        </motion.button>

        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-12 right-2 bg-white/90 backdrop-blur-sm p-2 rounded text-xs text-gray-700 max-w-[200px]"
            >
              {product.description}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Product Info */}
      <motion.div 
        className="text-center"
        initial={false}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
      >
        <motion.h3 
          className="text-xs tracking-[0.15em] text-gray-400 uppercase mb-0.5"
          whileHover={{ color: "#000000" }}
          transition={{ duration: 0.2 }}
        >
          {product.brand}
        </motion.h3>
        <motion.h2 
          className="text-sm font-light mb-1 line-clamp-1"
          whileHover={{ letterSpacing: "0.05em" }}
          transition={{ duration: 0.3 }}
        >
          {product.name}
        </motion.h2>
        <div className="flex items-center justify-center gap-1 mb-1">
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          <span className="text-xs text-gray-600">{product.rating}</span>
        </div>
        <motion.p 
          className="text-sm relative inline-block"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          {product.price} ₼
          <motion.span 
            className="absolute bottom-0 left-0 w-0 h-[1px] bg-black group-hover:w-full transition-all duration-300"
          />
        </motion.p>
      </motion.div>
    </motion.div>
  );
} 