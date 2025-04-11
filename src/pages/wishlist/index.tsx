import { useWishlist } from '../../lib/wishlist-context';
import { ProductCard } from '../../components/product-card';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WishlistPage() {
  const { items } = useWishlist();

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-24 h-24 mx-auto mb-6 text-gray-300" />
          <h2 className="text-3xl font-light tracking-[0.2em] mb-4">SEÇİLMİŞLƏR BOŞDUR</h2>
          <p className="text-gray-600 mb-8 tracking-wide">
            Bəyəndiyiniz məhsulları seçilmişlərə əlavə edərək daha sonra baxmaq üçün saxlaya bilərsiniz.
          </p>
          <Link 
            to="/products" 
            className="inline-block px-8 py-3 border border-black text-black hover:bg-black hover:text-white transition-colors duration-300 tracking-[0.2em] uppercase"
          >
            Alış-verişə davam et
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Seçilmişlər ({items.length})</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
} 