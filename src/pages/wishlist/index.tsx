import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowLeft, Trash2, ShoppingBag, AlertCircle } from 'lucide-react';
import { useWishlist } from '../../lib/wishlist-context';
import { useCart } from '../../lib/cart-context';

export default function Wishlist() {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (item) => {
    // Cart üçün lazım olan struktura çeviririk
    const product = {
      id: item.id,
      name: item.name,
      brand: item.brand,
      price: item.price,
      image: item.image
    };
    
    addToCart(product);
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-6">Seçilmişlər</h1>
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="flex flex-col items-center justify-center space-y-4">
            <Heart size={48} className="text-gray-400" />
            <p className="text-lg">Seçilmişləriniz boşdur</p>
            <p className="text-gray-500 mb-4">Sevdiyiniz məhsulları seçilmişlərə əlavə edin</p>
            <Link to="/products" className="btn-primary inline-flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Məhsullara baxın
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <Heart className="mr-2 h-5 w-5 text-primary" /> Seçilmişlər
      </h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold">Məhsullar ({items.length})</h2>
          <button 
            onClick={clearWishlist}
            className="text-red-500 text-sm hover:text-red-700 transition-colors flex items-center"
          >
            <Trash2 className="h-4 w-4 mr-1" /> Hamısını təmizlə
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.id} className="border border-gray-100 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="relative">
                <Link to={`/products/${item.id}`}>
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-48 object-contain"
                  />
                </Link>
                <button 
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full p-1.5 transition-all duration-300 shadow-sm"
                >
                  <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                </button>
              </div>
              
              <div className="p-4">
                <div className="text-center mb-3">
                  <h4 className="uppercase tracking-wider font-medium text-xs text-gray-600">
                    {item.brand}
                  </h4>
                  <h3 className="font-medium text-sm mt-1">
                    <Link to={`/products/${item.id}`} className="hover:text-primary transition-colors">
                      {item.name}
                    </Link>
                  </h3>
                  <p className="font-bold mt-2 text-sm">
                    {item.price} ₼
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <button 
                    onClick={() => handleAddToCart(item)}
                    className="bg-black text-white text-xs py-1.5 px-2 rounded-md hover:bg-primary transition-all duration-300 flex items-center justify-center"
                  >
                    <ShoppingBag size={14} className="mr-1.5" /> 
                    Səbətə əlavə et
                  </button>
                  <Link 
                    to={`/products/${item.id}`} 
                    className="border border-black text-black text-xs py-1.5 px-2 rounded-md hover:bg-black hover:text-white transition-all duration-300 flex items-center justify-center"
                  >
                    Ətraflı bax
                  </Link>
                </div>
                
                <button 
                  onClick={() => removeFromWishlist(item.id)}
                  className="w-full mt-3 text-red-500 text-xs hover:text-red-700 transition-colors flex items-center justify-center"
                >
                  <Trash2 className="h-3 w-3 mr-1" /> Seçilmişlərdən sil
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-6">
        <Link to="/products" className="text-primary hover:underline flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Məhsullara qayıt
        </Link>
      </div>
    </div>
  );
} 